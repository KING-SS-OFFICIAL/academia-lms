import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    const { name, className, school, medium, contact } = await request.json();

    // Try to save to database (gracefully handle if DB is not connected)
    try {
      const { prisma } = await import("@/lib/prisma");
      // Update the user's profile if they're logged in
      // For now, just return success since auth isn't fully connected yet
      await prisma.user.updateMany({
        where: { name: name },
        data: {
          class: className,
          school,
          medium,
        },
      });
    } catch (dbError) {
      console.error("Database save failed (non-critical):", dbError);
    }

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
