import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 30;

// Import JSON directly to avoid any module issues
import grammarData from "@/constants/questionBanks/grammar.json";
import gkData from "@/constants/questionBanks/gk.json";
import historyData from "@/constants/questionBanks/history.json";
import reasoningData from "@/constants/questionBanks/reasoning.json";
import mathData from "@/constants/questionBanks/math.json";
import quizData from "@/constants/questionBanks/quiz.json";

interface Question {
  question: string;
  options: Record<string, string>;
  correctAnswer: string;
}

type QuestionBank = Record<string, Question[]>;

const QUESTION_BANKS: Record<string, QuestionBank> = {
  grammar: grammarData as QuestionBank,
  gk: gkData as QuestionBank,
  history: historyData as QuestionBank,
  reasoning: reasoningData as QuestionBank,
  mathematics: mathData as QuestionBank,
  quiz: quizData as QuestionBank,
};

function getStaticQuestions(subject: string, chapter: string, count: number): Question[] {
  const subjectKeyMap: Record<string, string> = {
    "grammar": "grammar", "gk": "gk", "history": "history",
    "reasoning": "reasoning", "mathematics": "mathematics", "math": "mathematics", "quiz": "quiz"
  };
  
  const bankKey = subjectKeyMap[subject.toLowerCase()] || subject;
  const bank = QUESTION_BANKS[bankKey];
  
  if (!bank) return [];
  
  let chapterQuestions = bank[chapter];
  
  if (!chapterQuestions) {
    const chapterLower = chapter.toLowerCase();
    for (const key of Object.keys(bank)) {
      if (key.toLowerCase() === chapterLower) {
        chapterQuestions = bank[key];
        break;
      }
    }
  }
  
  if (!chapterQuestions) {
    const chapterLower = chapter.toLowerCase();
    for (const key of Object.keys(bank)) {
      if (key.toLowerCase().includes(chapterLower) || chapterLower.includes(key.toLowerCase())) {
        chapterQuestions = bank[key];
        break;
      }
    }
  }
  
  if (!chapterQuestions) {
    chapterQuestions = bank["Miscellaneous"];
  }
  
  if (!chapterQuestions || chapterQuestions.length === 0) return [];
  
  const shuffled = [...chapterQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { subject, topic, questionCount = 10 } = body;

    console.log("[Generate] Request:", { subject, topic, questionCount });

    if (!topic) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    const staticQuestions = getStaticQuestions(subject, topic, questionCount);
    
    console.log("[Generate] Found:", staticQuestions.length, "questions");

    if (staticQuestions.length === 0) {
      return NextResponse.json({ 
        error: "No questions available for this topic",
        debug: { subject, topic }
      }, { status: 404 });
    }

    const questions = staticQuestions.map((q, index) => ({
      id: `q-${index}`,
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer,
      type: "mcq" as const,
    }));

    return NextResponse.json({ questions, isStatic: true });
  } catch (err) {
    console.error("[Generate] Error:", err);
    return NextResponse.json({ 
      error: "Failed to generate questions",
      details: err instanceof Error ? err.message : "Unknown"
    }, { status: 500 });
  }
}