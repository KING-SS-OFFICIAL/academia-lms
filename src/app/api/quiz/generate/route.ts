import { NextResponse } from "next/server";

async function fetchWithRetry(url: string, options: RequestInit, retries = 3): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);
    
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      
      if (response.status === 429) {
        await new Promise(resolve => setTimeout(resolve, 2000 * (i + 1)));
        continue;
      }
      return response;
    } catch (err) {
      clearTimeout(timeoutId);
      if (i === retries - 1) throw err;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
  throw new Error("Max retries exceeded");
}

export async function POST(request: Request) {
  try {
    const { subject, topic, questionCount = 15 } = await request.json();

    if (!topic) {
      return NextResponse.json(
        { error: "Topic is required" },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      console.error("OPENROUTER_API_KEY is not set");
      return NextResponse.json(
        { error: "AI API key not configured" },
        { status: 500 }
      );
    }

    const subjectContext = getSubjectContext(subject, topic);
    
    const prompt = `You are an expert teacher for Indian competitive exams (WBCS, SSC, BANK, RAILWAY) and school boards (CBSE, ICSE, West Bengal Board).
Generate exactly ${questionCount} questions on ${subjectContext}.

IMPORTANT: Generate exactly ${Math.max(0, questionCount - 3)} MCQ questions and exactly 3 Short Answer questions. Total: ${questionCount} questions.

MCQ Questions (first ${Math.max(0, questionCount - 3)} questions):
- Each must have: question text, 4 options (A,B,C,D), correct answer (A/B/C/D), explanation
- Format: {"question":"...","options":{"A":"...","B":"...","C":"...","D":"..."},"correctAnswer":"A","explanation":"...","type":"mcq"}

Short Answer Questions (last 3 questions):
- No options, user writes answer
- Include correct answer for grading
- Format: {"question":"...","type":"short","correctAnswer":"..."}

Return ONLY a valid JSON array with no markdown formatting, no code blocks, no extra text.`;

    const response = await fetchWithRetry(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
          "HTTP-Referer": "https://academia-lms-nine.vercel.app",
          "X-Title": "ACADEMIA LMS",
        },
        body: JSON.stringify({
          model: "nvidia/nemotron-3-super-120b-a12b:free",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
          max_tokens: 4096,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("OpenRouter error:", response.status, errorData);
      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content;

    if (!text) {
      throw new Error("No response from AI");
    }

    const cleaned = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const questions = JSON.parse(cleaned);

    return NextResponse.json({ questions });
  } catch (error) {
    console.error("Quiz generation error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Failed to generate quiz: ${message}` },
      { status: 500 }
    );
  }
}

function getSubjectContext(subject: string, topic: string): string {
  const contexts: Record<string, string> = {
    grammar: `English Grammar - Topic: ${topic}`,
    gk: `General Knowledge - Topic: ${topic}`,
    history: `History - Topic: ${topic}`,
    reasoning: `Reasoning/Logical Ability - Topic: ${topic}`,
    mathematics: `Mathematics/Quantitative Aptitude - Topic: ${topic}`,
    quiz: `General Knowledge & Current Affairs - Topic: ${topic}`,
  };
  return contexts[subject] || `General Knowledge - Topic: ${topic}`;
}