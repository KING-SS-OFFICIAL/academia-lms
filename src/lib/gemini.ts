const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

export async function generateQuizQuestions(
  topic: string,
  weakAreas: string[] = []
): Promise<
  {
    question: string;
    options: Record<string, string>;
    correctAnswer: string;
    explanation: string;
  }[]
> {
  const weakAreaInstruction =
    weakAreas.length > 0
      ? `Focus 70% of questions on these weak areas where the student struggles: ${weakAreas.join(", ")}.`
      : "";

  const prompt = `You are an expert English teacher for Indian competitive exams and school boards.
Generate exactly 10 multiple-choice questions on English Grammar.
Topic: ${topic}
${weakAreaInstruction}

Each question must have:
- A clear question text
- 4 options labeled A, B, C, D
- One correct answer (A, B, C, or D)
- A brief explanation of why that answer is correct

Return ONLY a valid JSON array with no markdown formatting, no code blocks, no extra text:
[{"question":"...","options":{"A":"...","B":"...","C":"...","D":"..."},"correctAnswer":"A","explanation":"..."}]`;

  const response = await fetch(
    `${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 4096,
        },
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.statusText}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error("No response from Gemini API");
  }

  const cleaned = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
  const questions = JSON.parse(cleaned);

  return questions;
}

export async function askAITutor(question: string): Promise<string> {
  const prompt = `You are ACADEMIA AI Tutor, an expert English grammar teacher for Indian students preparing for competitive exams (WBCS, SSC, BANK) and school boards (CBSE, ICSE, State).
Answer the student's question clearly and simply. Provide examples when helpful. Keep the response concise and educational.
Student question: ${question}`;

  const response = await fetch(
    `${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.6,
          maxOutputTokens: 1024,
        },
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't process that question. Please try again.";
}

export async function getRecommendation(
  topicScores: Record<string, number>
): Promise<{ topic: string; reason: string }> {
  const scoresText = Object.entries(topicScores)
    .map(([topic, score]) => `${topic}: ${score}% average`)
    .join("\n");

  const prompt = `Based on this student's test history:
${scoresText}

Recommend which topic they should study next and why. Keep it brief (2-3 sentences) and encouraging.
Return as JSON: {"topic": "...", "reason": "..."}`;

  const response = await fetch(
    `${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.5,
          maxOutputTokens: 256,
        },
      }),
    }
  );

  if (!response.ok) {
    return { topic: "Tenses", reason: "Start with the fundamentals of English grammar." };
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  try {
    const cleaned = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    return JSON.parse(cleaned);
  } catch {
    return { topic: "Tenses", reason: "Start with the fundamentals of English grammar." };
  }
}
