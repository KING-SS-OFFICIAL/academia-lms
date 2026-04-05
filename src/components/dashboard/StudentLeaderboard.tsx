"use client";

import { useEffect, useState } from "react";
import { Trophy, Star, Award, Shield, Diamond, Sword, Crown, ArrowRight, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

interface RankTier {
  name: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  borderColor: string;
  levels: string[];
  minExams: number;
  maxExams: number;
}

const RANK_TIERS: RankTier[] = [
  {
    name: "Bronze",
    icon: <Shield className="w-6 h-6" />,
    color: "text-orange-600",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/20",
    levels: ["I", "II", "III"],
    minExams: 10,
    maxExams: 30,
  },
  {
    name: "Silver",
    icon: <Shield className="w-6 h-6" />,
    color: "text-gray-400",
    bgColor: "bg-gray-400/10",
    borderColor: "border-gray-400/20",
    levels: ["I", "II", "III"],
    minExams: 40,
    maxExams: 80,
  },
  {
    name: "Gold",
    icon: <Award className="w-6 h-6" />,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/20",
    levels: ["I", "II", "III", "IV"],
    minExams: 90,
    maxExams: 120,
  },
  {
    name: "Platinum",
    icon: <Star className="w-6 h-6" />,
    color: "text-cyan-400",
    bgColor: "bg-cyan-400/10",
    borderColor: "border-cyan-400/20",
    levels: ["I", "II", "III", "IV"],
    minExams: 130,
    maxExams: 170,
  },
  {
    name: "Diamond",
    icon: <Diamond className="w-6 h-6" />,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    borderColor: "border-blue-400/20",
    levels: ["I", "II", "III", "IV"],
    minExams: 180,
    maxExams: 220,
  },
  {
    name: "Heroic",
    icon: <Sword className="w-6 h-6" />,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
    levels: [""],
    minExams: 280,
    maxExams: 399,
  },
  {
    name: "Grandmaster",
    icon: <Crown className="w-6 h-6" />,
    color: "text-amber-400",
    bgColor: "bg-amber-400/10",
    borderColor: "border-amber-400/20",
    levels: [""],
    minExams: 400,
    maxExams: Infinity,
  },
];

function calculateRank(testCount: number): { tier: RankTier | null; level: string; progress: number } {
  for (const tier of RANK_TIERS) {
    if (testCount >= tier.minExams && testCount <= tier.maxExams) {
      const range = tier.maxExams - tier.minExams;
      const progress = range > 0 ? Math.min(((testCount - tier.minExams) / range) * 100, 100) : 100;
      
      if (tier.levels.length === 1 && tier.levels[0] === "") {
        return { tier, level: "", progress };
      }
      
      const levelIndex = Math.min(
        Math.floor(((testCount - tier.minExams) / range) * tier.levels.length),
        tier.levels.length - 1
      );
      return { tier, level: tier.levels[levelIndex], progress };
    }
  }
  
  if (testCount < RANK_TIERS[0].minExams) {
    return { tier: null, level: "", progress: (testCount / RANK_TIERS[0].minExams) * 100 };
  }
  
  return { tier: RANK_TIERS[RANK_TIERS.length - 1], level: "", progress: 100 };
}

export default function StudentLeaderboard() {
  const [testCount, setTestCount] = useState(0);
  const [hasQualified, setHasQualified] = useState(false);
  const [showQualification, setShowQualification] = useState(false);
  const [qualifyingTest, setQualifyingTest] = useState<{ question: string; options: Record<string, string>; correctAnswer: string } | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [qualResult, setQualResult] = useState<"pass" | "fail" | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("testResults");
    if (saved) {
      try {
        const tests = JSON.parse(saved);
        const qualifiedTests = tests.filter((t: { percentage: number }) => t.percentage >= 75);
        setTestCount(qualifiedTests.length);
        setHasQualified(tests.some((t: { percentage: number }) => t.percentage >= 75));
      } catch {}
    }
  }, []);

  const rank = calculateRank(testCount);

  const startQualificationTest = () => {
    const sampleQuestions = [
      { question: "Choose the correct sentence:", options: { A: "She don't like coffee", B: "She doesn't like coffee", C: "She not like coffee", D: "She isn't like coffee" }, correctAnswer: "B" },
      { question: "What is the synonym of 'Happy'?", options: { A: "Sad", B: "Angry", C: "Joyful", D: "Tired" }, correctAnswer: "C" },
      { question: "Which is the correct spelling?", options: { A: "Accomodation", B: "Accommodation", C: "Acommodation", D: "Acomodation" }, correctAnswer: "B" },
      { question: "The sun ____ in the east.", options: { A: "rise", B: "rises", C: "rising", D: "rose" }, correctAnswer: "B" },
      { question: "What is the antonym of 'Brave'?", options: { A: "Courageous", B: "Bold", C: "Coward", D: "Fearless" }, correctAnswer: "C" },
    ];
    const q = sampleQuestions[Math.floor(Math.random() * sampleQuestions.length)];
    setQualifyingTest(q);
    setSelectedAnswer(null);
    setQualResult(null);
    setShowQualification(true);
  };

  const submitQualification = () => {
    if (!qualifyingTest || !selectedAnswer) return;
    if (selectedAnswer === qualifyingTest.correctAnswer) {
      setQualResult("pass");
    } else {
      setQualResult("fail");
    }
  };

  return (
    <section className="glass-card rounded-[2rem] p-8 border border-outline-variant/15 shadow-xl shadow-primary/5">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-container/20 flex items-center justify-center">
            <Trophy className="text-primary w-5 h-5" />
          </div>
          <h3 className="text-xl font-bold font-headline text-primary">Student Leaderboard</h3>
        </div>
        <Link
          href="/test"
          className="text-sm font-bold text-primary flex items-center gap-1 hover:gap-2 transition-all"
        >
          Take Test <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Current Rank Display */}
      <div className="text-center mb-8 p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-primary-container/5 border border-primary/10">
        {rank.tier ? (
          <>
            <div className={`inline-flex items-center gap-2 ${rank.tier.color} mb-2`}>
              {rank.tier.icon}
              <span className="text-2xl font-black">{rank.tier.name}</span>
              {rank.level && <span className="text-xl font-bold">{rank.level}</span>}
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              {testCount} qualified tests completed
            </p>
            <div className="w-full bg-surface-container-highest rounded-full h-3 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${rank.tier.color.replace('text-', 'bg-')}`}
                style={{ width: `${rank.progress}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {rank.progress < 100
                ? `${Math.ceil((rank.tier.maxExams - testCount) / (rank.tier.maxExams - rank.tier.minExams) * (rank.tier.levels.length - (rank.level ? rank.tier.levels.indexOf(rank.level) : 0)))} more tests for next level`
                : "Maximum rank achieved!"}
            </p>
          </>
        ) : (
          <>
            <div className="text-muted-foreground mb-2">
              <Trophy className="w-12 h-12 mx-auto opacity-30" />
            </div>
            <p className="text-lg font-bold text-foreground mb-1">No Rank Yet</p>
            <p className="text-sm text-muted-foreground mb-4">
              Complete {RANK_TIERS[0].minExams - testCount} more tests with 75%+ to qualify and reach Bronze
            </p>
            <div className="w-full bg-surface-container-highest rounded-full h-3 overflow-hidden">
              <div
                className="h-full rounded-full bg-orange-500/50 transition-all duration-500"
                style={{ width: `${rank.progress}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {testCount} / {RANK_TIERS[0].minExams} tests
            </p>
          </>
        )}
      </div>

      {/* Qualification Test */}
      {!hasQualified && !showQualification && (
        <div className="mb-6 p-6 rounded-2xl bg-yellow-500/5 border border-yellow-500/20 text-center">
          <p className="text-sm text-muted-foreground mb-3">
            You need to score 75%+ in at least one test to start earning ranks
          </p>
          <button
            onClick={startQualificationTest}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-container text-white font-bold text-sm hover:opacity-90 transition-all"
          >
            Take Qualification Test
          </button>
        </div>
      )}

      {showQualification && qualifyingTest && (
        <div className="mb-6 p-6 rounded-2xl bg-surface-container-low border border-outline-variant/10">
          <h4 className="font-bold text-foreground mb-4">Qualification Test (Need 75%+)</h4>
          <p className="text-sm text-foreground mb-4">{qualifyingTest.question}</p>
          <div className="space-y-2 mb-4">
            {Object.entries(qualifyingTest.options).map(([key, val]) => (
              <button
                key={key}
                onClick={() => { setSelectedAnswer(key); setQualResult(null); }}
                className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all text-sm ${
                  selectedAnswer === key
                    ? "border-primary bg-primary/10 text-primary font-medium"
                    : "border-border hover:border-primary/50 text-foreground"
                }`}
              >
                <span className="font-bold mr-2">{key}.</span> {val}
              </button>
            ))}
          </div>
          {qualResult ? (
            <div className={`p-4 rounded-xl text-center ${
              qualResult === "pass" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
            }`}>
              {qualResult === "pass" ? (
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-bold">Passed! Your tests will now count towards ranking.</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <XCircle className="w-5 h-5" />
                  <span className="font-bold">Failed. Try again or score 75%+ in a real test.</span>
                </div>
              )}
              <button
                onClick={() => setShowQualification(false)}
                className="mt-3 text-sm underline"
              >
                Close
              </button>
            </div>
          ) : (
            <button
              onClick={submitQualification}
              disabled={!selectedAnswer}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-primary-container text-white font-bold text-sm disabled:opacity-50"
            >
              Submit Answer
            </button>
          )}
        </div>
      )}

      {/* Rank Tiers */}
      <div className="space-y-3">
        <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Rank Tiers</h4>
        {RANK_TIERS.map((tier) => {
          const isCurrentRank = rank.tier?.name === tier.name;
          const isAchieved = testCount >= tier.minExams;
          
          return (
            <div
              key={tier.name}
              className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                isCurrentRank
                  ? `${tier.bgColor} ${tier.borderColor}`
                  : "bg-surface-container-low border-outline-variant/10"
              }`}
            >
              <div className={`flex-shrink-0 ${tier.color}`}>
                {tier.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`font-bold ${tier.color}`}>{tier.name}</span>
                  {tier.levels.length > 0 && tier.levels[0] !== "" && (
                    <span className="text-xs text-muted-foreground">
                      ({tier.levels.join(", ")})
                    </span>
                  )}
                  {isCurrentRank && (
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${tier.bgColor} ${tier.color}`}>
                      Current
                    </span>
                  )}
                </div>
                <div className="text-xs text-muted-foreground">
                  {tier.minExams} - {tier.maxExams === Infinity ? "∞" : tier.maxExams} exams
                </div>
              </div>
              {isAchieved && !isCurrentRank && (
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
              )}
              {!isAchieved && (
                <div className="text-xs font-bold text-muted-foreground flex-shrink-0">
                  {tier.minExams - testCount} more
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
