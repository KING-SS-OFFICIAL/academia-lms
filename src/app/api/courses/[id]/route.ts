import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  return NextResponse.json({
    message: `Course ${params.id} - coming soon`,
  });
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  return NextResponse.json({
    message: `Update course ${params.id} - coming soon`,
  });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  return NextResponse.json({
    message: `Delete course ${params.id} - coming soon`,
  });
}
