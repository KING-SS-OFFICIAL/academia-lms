"use client";

import { useEffect, useState } from "react";
import { Trophy, ArrowRight, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

// Custom Gamified Rank Icons (Free Fire style)
function BronzeBadge() {
  return (
    <svg viewBox="0 0 64 64" className="w-10 h-10" fill="none">
      <defs>
        <linearGradient id="bronzeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#CD7F32" />
          <stop offset="100%" stopColor="#8B4513" />
        </linearGradient>
      </defs>
      <path d="M32 4L44 16L56 28L48 44L36 56L20 52L8 40L12 24L24 12L32 4Z" fill="url(#bronzeGrad)" stroke="#CD7F32" strokeWidth="2"/>
      <path d="M32 16L38 22L44 28L40 38L32 46L24 40L20 30L24 22L32 16Z" fill="#D2691E" opacity="0.6"/>
      <text x="32" y="36" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">B</text>
    </svg>
  );
}

function SilverBadge() {
  return (
    <svg viewBox="0 0 64 64" className="w-10 h-10" fill="none">
      <defs>
        <linearGradient id="silverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C0C0C0" />
          <stop offset="100%" stopColor="#808080" />
        </linearGradient>
      </defs>
      <path d="M32 4L44 16L56 28L48 44L36 56L20 52L8 40L12 24L24 12L32 4Z" fill="url(#silverGrad)" stroke="#C0C0C0" strokeWidth="2"/>
      <path d="M32 16L38 22L44 28L40 38L32 46L24 40L20 30L24 22L32 16Z" fill="#A9A9A9" opacity="0.6"/>
      <text x="32" y="36" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">S</text>
    </svg>
  );
}

function GoldBadge() {
  return (
    <svg viewBox="0 0 64 64" className="w-10 h-10" fill="none">
      <defs>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#DAA520" />
        </linearGradient>
      </defs>
      <path d="M32 4L44 16L56 28L48 44L36 56L20 52L8 40L12 24L24 12L32 4Z" fill="url(#goldGrad)" stroke="#FFD700" strokeWidth="2"/>
      <path d="M32 16L38 22L44 28L40 38L32 46L24 40L20 30L24 22L32 16Z" fill="#FFA500" opacity="0.6"/>
      <path d="M32 10L36 14L40 18L38 24L32 30L26 24L24 18L28 14L32 10Z" fill="#FFEC8B" opacity="0.8"/>
      <text x="32" y="36" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">G</text>
    </svg>
  );
}

function PlatinumBadge() {
  return (
    <svg viewBox="0 0 64 64" className="w-10 h-10" fill="none">
      <defs>
        <linearGradient id="platGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00CED1" />
          <stop offset="100%" stopColor="#008B8B" />
        </linearGradient>
      </defs>
      <path d="M32 4L44 16L56 28L48 44L36 56L20 52L8 40L12 24L24 12L32 4Z" fill="url(#platGrad)" stroke="#00CED1" strokeWidth="2"/>
      <path d="M32 16L38 22L44 28L40 38L32 46L24 40L20 30L24 22L32 16Z" fill="#20B2AA" opacity="0.6"/>
      <path d="M32 10L36 14L40 18L38 24L32 30L26 24L24 18L28 14L32 10Z" fill="#48D1CC" opacity="0.8"/>
      <text x="32" y="36" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">P</text>
    </svg>
  );
}

function DiamondBadge() {
  return (
    <svg viewBox="0 0 64 64" className="w-10 h-10" fill="none">
      <defs>
        <linearGradient id="diaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4169E1" />
          <stop offset="50%" stopColor="#6495ED" />
          <stop offset="100%" stopColor="#1E90FF" />
        </linearGradient>
      </defs>
      <path d="M32 2L46 18L58 32L46 48L32 62L18 48L6 32L18 18L32 2Z" fill="url(#diaGrad)" stroke="#4169E1" strokeWidth="2"/>
      <path d="M32 14L40 24L48 32L40 42L32 50L24 42L16 32L24 24L32 14Z" fill="#87CEEB" opacity="0.5"/>
      <path d="M32 22L36 28L40 32L36 38L32 42L28 38L24 32L28 28L32 22Z" fill="#B0E0E6" opacity="0.7"/>
      <text x="32" y="36" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">D</text>
    </svg>
  );
}

function HeroicBadge() {
  return (
    <svg viewBox="0 0 64 64" className="w-10 h-10" fill="none">
      <defs>
        <linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9B59B6" />
          <stop offset="50%" stopColor="#8E44AD" />
          <stop offset="100%" stopColor="#6C3483" />
        </linearGradient>
      </defs>
      <path d="M32 2L40 14L52 20L48 34L56 46L42 48L32 60L22 48L8 46L16 34L12 20L24 14L32 2Z" fill="url(#heroGrad)" stroke="#9B59B6" strokeWidth="2"/>
      <path d="M32 12L38 20L46 26L42 36L48 44L36 46L32 54L28 46L16 44L22 36L18 26L26 20L32 12Z" fill="#BB8FCE" opacity="0.5"/>
      <path d="M28 26L32 20L36 26L34 34L28 36L26 30Z" fill="#E8DAEF" opacity="0.8"/>
      <text x="32" y="50" textAnchor="middle" fill="white" fontSize="7" fontWeight="bold">HERO</text>
    </svg>
  );
}

function GrandmasterBadge() {
  return (
    <svg viewBox="0 0 64 64" className="w-10 h-10" fill="none">
      <defs>
        <linearGradient id="gmGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="50%" stopColor="#FF6B35" />
          <stop offset="100%" stopColor="#FF1493" />
        </linearGradient>
        <linearGradient id="gmGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF4500" />
          <stop offset="100%" stopColor="#FFD700" />
        </linearGradient>
      </defs>
      <path d="M8 44L16 20L24 32L32 8L40 32L48 20L56 44L48 52L16 52L8 44Z" fill="url(#gmGrad)" stroke="#FFD700" strokeWidth="2"/>
      <path d="M16 42L22 26L28 36L32 18L36 36L42 26L48 42L42 48L22 48L16 42Z" fill="url(#gmGrad2)" opacity="0.8"/>
      <circle cx="26" cy="32" r="3" fill="white" opacity="0.9"/>
      <circle cx="38" cy="32" r="3" fill="white" opacity="0.9"/>
      <path d="M28 38L32 42L36 38" stroke="white" strokeWidth="2" fill="none" opacity="0.9"/>
      <text x="18" y="14" fill="#FFD700" fontSize="8">★</text>
      <text x="42" y="14" fill="#FFD700" fontSize="8">★</text>
      <text x="32" y="60" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold">GM</text>
    </svg>
  );
}

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
    icon: <BronzeBadge />,
    color: "text-orange-600",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/20",
    levels: ["I", "II", "III"],
    minExams: 10,
    maxExams: 30,
  },
  {
    name: "Silver",
    icon: <SilverBadge />,
    color: "text-gray-400",
    bgColor: "bg-gray-400/10",
    borderColor: "border-gray-400/20",
    levels: ["I", "II", "III"],
    minExams: 40,
    maxExams: 80,
  },
  {
    name: "Gold",
    icon: <GoldBadge />,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/20",
    levels: ["I", "II", "III", "IV"],
    minExams: 90,
    maxExams: 120,
  },
  {
    name: "Platinum",
    icon: <PlatinumBadge />,
    color: "text-cyan-400",
    bgColor: "bg-cyan-400/10",
    borderColor: "border-cyan-400/20",
    levels: ["I", "II", "III", "IV"],
    minExams: 130,
    maxExams: 170,
  },
  {
    name: "Diamond",
    icon: <DiamondBadge />,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    borderColor: "border-blue-400/20",
    levels: ["I", "II", "III", "IV"],
    minExams: 180,
    maxExams: 220,
  },
  {
    name: "Heroic",
    icon: <HeroicBadge />,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
    levels: [""],
    minExams: 280,
    maxExams: 399,
  },
  {
    name: "Grandmaster",
    icon: <GrandmasterBadge />,
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
            <div className="inline-flex items-center gap-2 mb-2 justify-center">
              {rank.tier.icon}
              <span className={`text-2xl font-black ${rank.tier.color}`}>{rank.tier.name}</span>
              {rank.level && <span className={`text-xl font-bold ${rank.tier.color}`}>{rank.level}</span>}
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
                ? `${Math.max(0, rank.tier.minExams + Math.ceil((1 - rank.progress / 100) * (rank.tier.maxExams - rank.tier.minExams)) - testCount)} more tests for next level`
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
              <div className="flex-shrink-0">
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
