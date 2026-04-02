import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "Materials API - coming soon",
    materials: [],
  });
}

export async function POST() {
  return NextResponse.json({
    message: "Materials upload - coming soon",
  });
}
