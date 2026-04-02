import { LEVEL_THRESHOLDS, XP_REWARDS } from "@/types";

type LevelThreshold = {
  level: number;
  xp: number;
  title: string;
};

export function calculateLevel(xp: number): { level: number; title: string; nextLevelXp: number; progress: number } {
  let currentLevel: LevelThreshold = LEVEL_THRESHOLDS[0] as LevelThreshold;
  
  for (const threshold of LEVEL_THRESHOLDS as readonly LevelThreshold[]) {
    if (xp >= threshold.xp) {
      currentLevel = threshold;
    } else {
      break;
    }
  }

  const currentIndex = (LEVEL_THRESHOLDS as readonly LevelThreshold[]).findIndex((l) => l.level === currentLevel.level);
  const nextLevel = LEVEL_THRESHOLDS[currentIndex + 1] as LevelThreshold | undefined;
  const nextLevelXp = nextLevel?.xp ?? currentLevel.xp;
  const prevLevelXp = currentLevel.xp;
  const progress = nextLevel
    ? ((xp - prevLevelXp) / (nextLevelXp - prevLevelXp)) * 100
    : 100;

  return {
    level: currentLevel.level,
    title: currentLevel.title,
    nextLevelXp,
    progress: Math.min(progress, 100),
  };
}

export function calculateXPReward(score: number, total: number, isFirstTest: boolean): number {
  let xp = XP_REWARDS.COMPLETE_TEST;
  
  const percentage = (score / total) * 100;
  if (percentage === 100) {
    xp += XP_REWARDS.PERFECT_SCORE;
  }
  
  if (isFirstTest) {
    xp += XP_REWARDS.FIRST_TEST;
  }
  
  return xp;
}

export function formatPercentage(value: number): string {
  return `${Math.round(value)}%`;
}

export function getScoreColor(percentage: number): string {
  if (percentage >= 80) return "text-green-600";
  if (percentage >= 60) return "text-yellow-600";
  return "text-red-600";
}

export function getScoreBgColor(percentage: number): string {
  if (percentage >= 80) return "bg-green-500";
  if (percentage >= 60) return "bg-yellow-500";
  return "bg-red-500";
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatDateTime(date: string | Date): string {
  return new Date(date).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function classNames(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}
