import grammarData from "./questionBanks/grammar.json";
import gkData from "./questionBanks/gk.json";
import historyData from "./questionBanks/history.json";
import reasoningData from "./questionBanks/reasoning.json";
import mathData from "./questionBanks/math.json";
import quizData from "./questionBanks/quiz.json";

interface Question {
  question: string;
  options: Record<string, string>;
  correctAnswer: string;
}

interface QuestionBank {
  [chapter: string]: Question[];
}

export const QUESTION_BANKS: Record<string, QuestionBank> = {
  grammar: grammarData as QuestionBank,
  gk: gkData as QuestionBank,
  history: historyData as QuestionBank,
  reasoning: reasoningData as QuestionBank,
  mathematics: mathData as QuestionBank,
  quiz: quizData as QuestionBank,
};

export function getStaticQuestions(
  subject: string,
  chapter: string,
  count: number
): Question[] {
  // Normalize subject - could be "grammar", "Grammar", "gk", "General Knowledge", etc.
  const subjectLower = subject.toLowerCase();
  
  // Map subject names/IDs to internal keys
  const subjectKeyMap: Record<string, string> = {
    "grammar": "grammar",
    "gk": "gk",
    "general knowledge": "gk",
    "history": "history",
    "reasoning": "reasoning",
    "mathematics": "mathematics",
    "math": "mathematics",
    "quiz": "quiz",
  };
  
  const bankKey = subjectKeyMap[subjectLower] || subjectLower;
  const bank = QUESTION_BANKS[bankKey];
  
  if (!bank) {
    console.log(`[QuestionBank] No bank found for subject: ${subject} (key: ${bankKey})`);
    return [];
  }

  console.log(`[QuestionBank] Found bank for ${bankKey}, looking for chapter: ${chapter}`);
  console.log(`[QuestionBank] Available chapters:`, Object.keys(bank));

  // Try exact match first, then case-insensitive match
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

  // Try partial match if still not found
  if (!chapterQuestions) {
    const chapterLower = chapter.toLowerCase();
    for (const key of Object.keys(bank)) {
      if (key.toLowerCase().includes(chapterLower) || chapterLower.includes(key.toLowerCase())) {
        chapterQuestions = bank[key];
        break;
      }
    }
  }

  // Fallback to Miscellaneous
  if (!chapterQuestions) {
    chapterQuestions = bank["Miscellaneous"];
  }

  if (!chapterQuestions || chapterQuestions.length === 0) {
    console.log(`[QuestionBank] No questions found for chapter: ${chapter}`);
    return [];
  }

  const shuffled = [...chapterQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}