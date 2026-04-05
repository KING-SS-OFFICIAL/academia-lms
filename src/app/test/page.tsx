'use client';

import { useState, useEffect } from 'react';
import { SUBJECTS, TEST_CONFIGS, SubjectId } from '@/constants/test';

interface Question {
  id: string;
  question: string;
  options: Record<string, string>;
  correctAnswer: string;
  type: 'mcq';
}

type Screen = 'setup' | 'quiz' | 'results';

function getUsedQuestions(): Set<string> {
  try {
    const data = localStorage.getItem('usedQuestions');
    if (data) return new Set(JSON.parse(data));
  } catch {}
  return new Set();
}

function saveUsedQuestions(questions: Question[]) {
  try {
    const used = getUsedQuestions();
    questions.forEach(q => used.add(q.question));
    const usedArr: string[] = [];
    used.forEach(v => usedArr.push(v));
    localStorage.setItem('usedQuestions', JSON.stringify(usedArr));
  } catch {}
}

export default function TestPage() {
  const [screen, setScreen] = useState<Screen>('setup');
  const [subject, setSubject] = useState<SubjectId | null>(null);
  const [chapter, setChapter] = useState('');
  const [configId, setConfigId] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentQ, setCurrentQ] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [availableCount, setAvailableCount] = useState<number | null>(null);

  useEffect(() => {
    if (timeLeft > 0 && screen === 'quiz') {
      const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (timeLeft === 0 && screen === 'quiz' && questions.length > 0) {
      handleSubmit();
    }
  }, [timeLeft, screen, questions.length]);

  useEffect(() => {
    if (subject && chapter) {
      try {
        const allData = localStorage.getItem(`questions_${subject}_${chapter}`);
        if (allData) {
          const allQuestions = JSON.parse(allData);
          const used = getUsedQuestions();
          const available = allQuestions.filter((q: Question) => !used.has(q.question));
          setAvailableCount(available.length);
        } else {
          setAvailableCount(null);
        }
      } catch {
        setAvailableCount(null);
      }
    } else {
      setAvailableCount(null);
    }
  }, [subject, chapter]);

  const config = TEST_CONFIGS.find(c => c.id === configId);
  const subjectData = SUBJECTS.find(s => s.id === subject);

  const handleStartTest = async () => {
    if (!subject || !chapter || !configId) return;
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/quiz/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject,
          topic: chapter,
          questionCount: config?.questions || 15,
          seed: Date.now() + Math.floor(Math.random() * 100000),
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || 'Failed to generate questions');
      }

      if (!data.questions || data.questions.length === 0) {
        throw new Error('No questions returned');
      }

      // Filter out already-used questions
      const used = getUsedQuestions();
      let newQuestions = data.questions.filter((q: Question) => !used.has(q.question));

      // If not enough new questions, reset used questions for this chapter
      if (newQuestions.length < (config?.questions || 15)) {
        // Reset: clear used questions for this subject+chapter
        const allData = localStorage.getItem(`questions_${subject}_${chapter}`);
        if (allData) {
          const allQ = JSON.parse(allData);
          const toRemove = new Set(allQ.map((q: Question) => q.question));
          const usedSet = getUsedQuestions();
          const usedArr: string[] = [];
          usedSet.forEach(v => usedArr.push(v));
          const newUsed = usedArr.filter(q => !toRemove.has(q));
          localStorage.setItem('usedQuestions', JSON.stringify(newUsed));
          newQuestions = data.questions;
        }
      }

      // Take only the requested number
      newQuestions = newQuestions.slice(0, config?.questions || 15);

      if (newQuestions.length === 0) {
        throw new Error('All questions used. Try a different chapter.');
      }

      // Save all questions from this chapter to localStorage for tracking
      try {
        const existing = localStorage.getItem(`questions_${subject}_${chapter}`);
        const existingQ = existing ? JSON.parse(existing) : [];
        const combined = [...existingQ, ...data.questions];
        const unique = combined.filter((q: Question, i: number, arr: Question[]) =>
          arr.findIndex(x => x.question === q.question) === i
        );
        localStorage.setItem(`questions_${subject}_${chapter}`, JSON.stringify(unique));
      } catch {}

      // Mark these questions as used
      saveUsedQuestions(newQuestions);

      setQuestions(newQuestions);
      setAnswers({});
      setCurrentQ(0);
      setTimeLeft((config?.time || 20) * 60);
      setScreen('quiz');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate questions');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    // Save test result to localStorage
    const results = getResults();
    const percentage = Math.round((results.correct / results.total) * 100);
    
    const saved = localStorage.getItem("testResults");
    let allTests: any[] = [];
    if (saved) {
      try { allTests = JSON.parse(saved); } catch {}
    }
    
    const testNumber = allTests.length + 1;
    const newTest = {
      id: `test-${Date.now()}`,
      testNumber,
      subject: subjectData?.name || subject,
      chapter,
      total: results.total,
      correct: results.correct,
      wrong: results.wrong,
      percentage,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    };
    
    allTests.push(newTest);
    localStorage.setItem("testResults", JSON.stringify(allTests));
    
    setScreen('results');
  };

  const handleReset = () => {
    setScreen('setup');
    setQuestions([]);
    setAnswers({});
    setCurrentQ(0);
    setError(null);
  };

  const handleClearHistory = () => {
    localStorage.removeItem('usedQuestions');
    // Clear all chapter caches
    const keys = Object.keys(localStorage).filter(k => k.startsWith('questions_'));
    keys.forEach(k => localStorage.removeItem(k));
    setAvailableCount(null);
  };

  const selectAnswer = (qId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [qId]: answer }));
  };

  const getResults = () => {
    let correct = 0;
    let wrong = 0;
    let unanswered = 0;
    questions.forEach(q => {
      if (!answers[q.id]) unanswered++;
      else if (answers[q.id] === q.correctAnswer) correct++;
      else wrong++;
    });
    return { correct, wrong, unanswered, total: questions.length };
  };

  const formatTime = (s: number) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  if (screen === 'results') {
    const results = getResults();
    const percentage = Math.round((results.correct / results.total) * 100);
    return (
      <div className="min-h-screen bg-background py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Test Results</h1>
            <div className={`text-6xl font-bold ${percentage >= 60 ? 'text-green-500' : 'text-red-500'}`}>
              {percentage}%
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-green-500">{results.correct}</div>
              <div className="text-sm text-muted-foreground">Correct</div>
            </div>
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-red-500">{results.wrong}</div>
              <div className="text-sm text-muted-foreground">Wrong</div>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-yellow-500">{results.unanswered}</div>
              <div className="text-sm text-muted-foreground">Skipped</div>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            {questions.map((q, i) => {
              const userAnswer = answers[q.id];
              const isCorrect = userAnswer === q.correctAnswer;
              const isAnswered = !!userAnswer;
              return (
                <div key={q.id} className={`rounded-2xl p-5 border ${
                  !isAnswered ? 'bg-yellow-500/5 border-yellow-500/20' :
                  isCorrect ? 'bg-green-500/5 border-green-500/20' : 'bg-red-500/5 border-red-500/20'
                }`}>
                  <div className="flex items-start gap-3">
                    <span className="text-sm font-bold text-muted-foreground mt-1">Q{i + 1}.</span>
                    <div className="flex-1">
                      <p className="font-medium text-foreground mb-3">{q.question}</p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {Object.entries(q.options).map(([key, val]) => {
                          const isSelected = userAnswer === key;
                          const isCorrectOption = q.correctAnswer === key;
                          return (
                            <div key={key} className={`px-3 py-2 rounded-lg ${
                              isCorrectOption ? 'bg-green-500/20 text-green-400 font-medium' :
                              isSelected && !isCorrect ? 'bg-red-500/20 text-red-400 line-through' :
                              'text-muted-foreground'
                            }`}>
                              {key}. {val}
                            </div>
                          );
                        })}
                      </div>
                      {!isAnswered && <p className="text-yellow-500 text-sm mt-2">Not answered</p>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <button onClick={handleReset} className="w-full py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-primary to-primary-container shadow-lg">
            Take Another Test
          </button>
        </div>
      </div>
    );
  }

  if (screen === 'quiz' && questions.length > 0) {
    const q = questions[currentQ];
    const progress = ((currentQ + 1) / questions.length) * 100;
    return (
      <div className="min-h-screen bg-background py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <button onClick={handleSubmit} className="text-sm font-medium text-primary hover:underline">
              Submit Test
            </button>
            <div className={`text-lg font-bold ${timeLeft < 60 ? 'text-red-500' : 'text-foreground'}`}>
              {formatTime(timeLeft)}
            </div>
            <span className="text-sm text-muted-foreground">
              {currentQ + 1} / {questions.length}
            </span>
          </div>

          <div className="w-full bg-surface rounded-full h-2 mb-8">
            <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
          </div>

          <div className="bg-surface rounded-2xl p-6 mb-6">
            <h2 className="text-xl font-semibold text-foreground mb-6">{q.question}</h2>
            <div className="space-y-3">
              {Object.entries(q.options).map(([key, val]) => (
                <button
                  key={key}
                  onClick={() => selectAnswer(q.id, key)}
                  className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all ${
                    answers[q.id] === key
                      ? 'border-primary bg-primary/10 text-primary font-medium'
                      : 'border-border hover:border-primary/50 text-foreground'
                  }`}
                >
                  <span className="font-bold mr-3">{key}.</span> {val}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setCurrentQ(Math.max(0, currentQ - 1))}
              disabled={currentQ === 0}
              className="flex-1 py-4 rounded-2xl font-bold border-2 border-border text-foreground disabled:opacity-30 hover:bg-surface"
            >
              Previous
            </button>
            {currentQ < questions.length - 1 ? (
              <button
                onClick={() => setCurrentQ(currentQ + 1)}
                className="flex-1 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-primary to-primary-container"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="flex-1 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-green-500 to-emerald-600"
              >
                Submit Test
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-black font-headline text-shimmer mb-2">
            ACADEMIA EXCELLENCE TEST SERIES
          </h1>
          <p className="text-muted-foreground">Select your subject, chapter, and test configuration</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 font-medium">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">Select Subject</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {SUBJECTS.map(s => (
                <button
                  key={s.id}
                  onClick={() => { setSubject(s.id as SubjectId); setChapter(''); }}
                  className={`p-4 rounded-xl border-2 transition-all text-center ${
                    subject === s.id ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="text-2xl mb-1">{s.icon}</div>
                  <div className="text-sm font-medium text-foreground">{s.name}</div>
                </button>
              ))}
            </div>
          </div>

          {subject && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">Select Chapter</label>
              <select
                value={chapter}
                onChange={e => setChapter(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-border bg-surface text-foreground focus:border-primary focus:outline-none"
              >
                <option value="">Choose a chapter...</option>
                {subjectData?.chapters.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          )}

          {chapter && availableCount !== null && (
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium text-primary">{availableCount}</span> new questions available for this chapter
              </p>
            </div>
          )}

          {chapter && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">Test Configuration</label>
              <div className="grid grid-cols-2 gap-3">
                {TEST_CONFIGS.map(c => (
                  <button
                    key={c.id}
                    onClick={() => setConfigId(c.id)}
                    className={`p-4 rounded-xl border-2 transition-all text-center ${
                      configId === c.id ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="text-lg font-bold text-foreground">{c.questions} Questions</div>
                    <div className="text-sm text-muted-foreground">{c.time} Minutes</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleStartTest}
            disabled={isLoading || !subject || !chapter || !configId}
            className="w-full py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-primary to-primary-container shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                Generating Questions...
              </>
            ) : (
              'Start Test'
            )}
          </button>

          <button
            onClick={handleClearHistory}
            className="w-full py-3 rounded-2xl font-medium text-sm text-muted-foreground border border-border hover:bg-surface transition-all"
          >
            Reset Question History (see all questions again)
          </button>
        </div>
      </div>
    </div>
  );
}
