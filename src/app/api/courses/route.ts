import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "Courses API - coming soon",
    courses: [],
  });
}

export async function POST() {
  return NextResponse.json({
    message: "Course creation - coming soon",
  });
}
