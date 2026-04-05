"use client";

import { useEffect, useState } from "react";
import { TrendingUp, Trophy, Target, ArrowRight } from "lucide-react";
import Link from "next/link";

interface TestResult {
  id: string;
  testNumber: number;
  subject: string;
  chapter: string;
  total: number;
  correct: number;
  wrong: number;
  percentage: number;
  date: string;
}

export default function StudentProgress() {
  const [tests, setTests] = useState<TestResult[]>([]);
  const [totalTests, setTotalTests] = useState(0);
  const [avgScore, setAvgScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("testResults");
    if (saved) {
      try {
        const parsed: TestResult[] = JSON.parse(saved);
        setTests(parsed);
        setTotalTests(parsed.length);
        
        if (parsed.length > 0) {
          const avg = Math.round(parsed.reduce((sum, t) => sum + t.percentage, 0) / parsed.length);
          setAvgScore(avg);
          const best = Math.max(...parsed.map(t => t.percentage));
          setBestScore(best);
        }
      } catch {}
    }
  }, []);

  return (
    <section className="glass-card rounded-[2rem] p-8 border border-outline-variant/15 shadow-xl shadow-primary/5">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-container/20 flex items-center justify-center">
            <TrendingUp className="text-primary w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold font-headline text-primary">Student Progress</h3>
        </div>
        <Link
          href="/test"
          className="text-sm font-bold text-primary flex items-center gap-1 hover:gap-2 transition-all"
        >
          Take Test <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-primary/5 rounded-2xl p-4 text-center border border-primary/10">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
            <Trophy className="w-4 h-4 text-primary" />
          </div>
          <div className="text-2xl font-black text-foreground">{totalTests}</div>
          <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Tests Given</div>
        </div>
        <div className="bg-primary/5 rounded-2xl p-4 text-center border border-primary/10">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
            <Target className="w-4 h-4 text-primary" />
          </div>
          <div className="text-2xl font-black text-foreground">{avgScore}%</div>
          <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Avg Score</div>
        </div>
        <div className="bg-primary/5 rounded-2xl p-4 text-center border border-primary/10">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
            <TrendingUp className="w-4 h-4 text-primary" />
          </div>
          <div className="text-2xl font-black text-foreground">{bestScore}%</div>
          <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Best Score</div>
        </div>
      </div>

      {/* Test History */}
      {tests.length > 0 ? (
        <div className="space-y-3">
          <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Test History</h4>
          {tests.map((test) => (
            <div
              key={test.id}
              className="flex items-center gap-4 p-4 rounded-xl bg-surface-container-low border border-outline-variant/10"
            >
              <div className="flex-shrink-0">
                <span className="text-xs font-black text-primary bg-primary/10 px-3 py-1.5 rounded-lg">
                  #{test.testNumber}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-foreground truncate">{test.subject} - {test.chapter}</div>
                <div className="text-xs text-muted-foreground">{test.date}</div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className={`text-lg font-black ${
                  test.percentage >= 80 ? 'text-green-500' :
                  test.percentage >= 60 ? 'text-yellow-500' :
                  'text-red-500'
                }`}>
                  {test.percentage}%
                </div>
                <div className="text-[10px] text-muted-foreground">
                  {test.correct}/{test.total} correct
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-8 h-8 text-primary/30" />
          </div>
          <p className="text-muted-foreground text-sm mb-2">No tests taken yet</p>
          <p className="text-muted-foreground text-xs">Take your first test to see progress here</p>
        </div>
      )}
    </section>
  );
}
