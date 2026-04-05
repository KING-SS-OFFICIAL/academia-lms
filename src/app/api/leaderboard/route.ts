import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const leaderboard = await prisma.user.findMany({
      where: { role: "student" },
      select: {
        id: true,
        name: true,
        class: true,
        medium: true,
        avatarUrl: true,
        xp: true,
        level: true,
        quizAttempts: {
          select: {
            score: true,
            totalQuestions: true,
            percentage: true,
          },
        },
      },
      orderBy: { xp: "desc" },
      take: 50,
    });

    const formatted = leaderboard.map(
      (
        student: {
          id: string;
          name: string;
          class: string | null;
          medium: string | null;
          avatarUrl: string | null;
          xp: number;
          level: number;
          quizAttempts: {
            score: number;
            totalQuestions: number;
            percentage: number;
          }[];
        },
        index: number
      ) => {
        const attempts = student.quizAttempts;
        const totalTests = attempts.length;
        const averageScore =
          totalTests > 0
            ? attempts.reduce(
                (sum: number, a: { percentage: number }) =>
                  sum + a.percentage,
                0
              ) / totalTests
            : 0;
        const bestScore =
          totalTests > 0
            ? Math.max(
                ...attempts.map((a: { percentage: number }) => a.percentage)
              )
            : 0;

        return {
          rank: index + 1,
          id: student.id,
          name: student.name,
          class: student.class,
          medium: student.medium,
          avatarUrl: student.avatarUrl,
          xp: student.xp,
          level: student.level,
          totalTests,
          averageScore: Math.round(averageScore),
          bestScore: Math.round(bestScore),
        };
      }
    );

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("Leaderboard error:", error);
    return NextResponse.json(
      { error: "Failed to fetch leaderboard" },
      { status: 500 }
    );
  }
}
