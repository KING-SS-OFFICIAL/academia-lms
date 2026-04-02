export interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "teacher" | "admin";
  class?: string;
  school?: string;
  medium?: string;
  avatarUrl?: string;
  xp: number;
  level: number;
  streakDays: number;
  lastActive: string;
  createdAt: string;
}

export interface Course {
  id: string;
  title: string;
  description?: string;
  category?: string;
  thumbnailUrl?: string;
  teacherId: string;
  createdAt: string;
  modules?: Module[];
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  order: number;
  lessons?: Lesson[];
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  content?: string;
  videoUrl?: string;
  pdfUrl?: string;
  order: number;
}

export interface Quiz {
  id: string;
  title?: string;
  topic?: string;
  isAiGenerated: boolean;
  questions?: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  quizId: string;
  questionText: string;
  options: Record<string, string>;
  correctAnswer: string;
  explanation?: string;
  order: number;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  studentId: string;
  score: number;
  totalQuestions: number;
  percentage: number;
  answers?: Record<string, string>;
  weakAreas: string[];
  xpEarned: number;
  completedAt: string;
}

export interface Badge {
  id: string;
  name: string;
  description?: string;
  iconUrl?: string;
  xpRequired?: number;
  conditionType?: string;
}

export interface UserBadge {
  id: string;
  userId: string;
  badgeId: string;
  earnedAt: string;
  badge?: Badge;
}

export interface StudyMaterial {
  id: string;
  title: string;
  description?: string;
  class?: string;
  category?: string;
  type: "video" | "pdf" | "image";
  url: string;
  thumbnailUrl?: string;
  uploadedBy: string;
  createdAt: string;
}

export interface Announcement {
  id: string;
  title: string;
  content?: string;
  courseId?: string;
  teacherId: string;
  createdAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  read: boolean;
  createdAt: string;
}

export interface LeaderboardEntry {
  rank: number;
  student: User;
  totalTests: number;
  averageScore: number;
  bestScore: number;
  badges: Badge[];
}

export interface QuizGenerationRequest {
  topic: string;
  weakAreas?: string[];
  studentLevel?: number;
}

export interface QuizGenerationResponse {
  questions: {
    question: string;
    options: Record<string, string>;
    correctAnswer: string;
    explanation: string;
  }[];
}

export const GRADE_LEVELS = ["V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"] as const;
export const MEDIUMS = ["English", "Hindi", "Bengali", "Other"] as const;
export const GRAMMAR_TOPICS = [
  "All Topics",
  "Tenses",
  "Articles",
  "Prepositions",
  "Subject-Verb Agreement",
  "Voice (Active/Passive)",
  "Narration (Direct/Indirect)",
  "Error Spotting",
  "Fill in the Blanks",
  "Sentence Improvement",
] as const;
export const MATERIAL_CATEGORIES = ["Grammar", "Vocabulary", "Writing", "Reading", "Exam Prep"] as const;

export const LEVEL_THRESHOLDS = [
  { level: 1, xp: 0, title: "Beginner" },
  { level: 2, xp: 200, title: "Learner" },
  { level: 3, xp: 500, title: "Student" },
  { level: 4, xp: 1000, title: "Scholar" },
  { level: 5, xp: 2000, title: "Expert" },
  { level: 6, xp: 5000, title: "Master" },
  { level: 7, xp: 10000, title: "Grandmaster" },
  { level: 8, xp: 20000, title: "Legend" },
] as const;

export const XP_REWARDS = {
  COMPLETE_TEST: 50,
  PERFECT_SCORE: 100,
  SEVEN_DAY_STREAK: 200,
  FIRST_TEST: 25,
  PROFILE_PICTURE: 10,
} as const;
