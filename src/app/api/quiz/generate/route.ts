import { NextResponse } from "next/server";
import { generateQuizQuestions } from "@/lib/gemini";

export async function POST(request: Request) {
  try {
    const { topic, weakAreas } = await request.json();

    if (!topic) {
      return NextResponse.json(
        { error: "Topic is required" },
        { status: 400 }
      );
    }

    const questions = await generateQuizQuestions(topic, weakAreas || []);

    return NextResponse.json({ questions });
  } catch (error) {
    console.error("Quiz generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate quiz. Please try again." },
      { status: 500 }
    );
  }
}
