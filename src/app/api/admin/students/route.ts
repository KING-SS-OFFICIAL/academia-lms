import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const students = await prisma.user.findMany({
      where: { role: "student" },
      select: {
        id: true,
        name: true,
        email: true,
        class: true,
        school: true,
        medium: true,
        avatarUrl: true,
        xp: true,
        level: true,
        streakDays: true,
        lastActive: true,
        createdAt: true,
        quizAttempts: {
          select: {
            id: true,
            score: true,
            totalQuestions: true,
            percentage: true,
            completedAt: true,
            quiz: {
              select: {
                title: true,
                topic: true,
              },
            },
          },
          orderBy: { completedAt: "desc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const formattedStudents = students.map((student) => {
      const attempts = student.quizAttempts;
      const totalTests = attempts.length;
      const avgScore = totalTests > 0
        ? Math.round(attempts.reduce((sum, a) => sum + a.percentage, 0) / totalTests)
        : 0;
      const qualifiedTests = attempts.filter((a: any) => a.percentage >= 75).length;

      const rank = qualifiedTests >= 400 ? "Grandmaster" :
                   qualifiedTests >= 280 ? "Heroic" :
                   qualifiedTests >= 180 ? "Diamond" :
                   qualifiedTests >= 130 ? "Platinum" :
                   qualifiedTests >= 90 ? "Gold" :
                   qualifiedTests >= 40 ? "Silver" :
                   qualifiedTests >= 10 ? "Bronze" : "Bronze I";

      return {
        id: student.id,
        name: student.name || "Student",
        email: student.email || "",
        className: student.class || "N/A",
        school: student.school || "N/A",
        medium: student.medium || "N/A",
        contact: "N/A",
        parentContact: "N/A",
        avatarUrl: student.avatarUrl || "",
        testsTaken: totalTests,
        avgScore,
        rank,
        joinedDate: new Date(student.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        testHistory: attempts.map((a: any) => ({
          subject: a.quiz?.title || a.quiz?.topic || "Test",
          chapter: a.quiz?.topic || "General",
          score: a.score,
          total: a.totalQuestions,
          percentage: Math.round(a.percentage),
          date: new Date(a.completedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
        })),
      };
    });

    return NextResponse.json({ students: formattedStudents });
  } catch (error) {
    console.error("[Students API] Error:", error);
    return NextResponse.json({ students: [] });
  }
}
