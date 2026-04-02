import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const TEACHER_EMAIL = "souravbwn77@gmail.com";

export async function POST(request: Request) {
  try {
    const { name, className, medium, contact, email, course } =
      await request.json();

    if (!name || !className || !medium || !contact || !email || !course) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Store in database
    const enquiry = await prisma.enquiry.create({
      data: {
        name,
        className,
        medium,
        contact,
        email,
        course,
      },
    });

    // Send email notification using Web3Forms (free, no signup needed)
    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: process.env.WEB3FORMS_KEY || "YOUR_FREE_KEY",
          subject: `New Admission Enquiry - ${name} | ACADEMIA`,
          from_name: "ACADEMIA LMS",
          to_email: TEACHER_EMAIL,
          replyto: email,
          name: name,
          class: className,
          medium: medium,
          contact: contact,
          email: email,
          course: course,
          message: `
New Admission Enquiry Received

Student Details:
- Name: ${name}
- Class: ${className}
- Medium: ${medium}
- Contact: ${contact}
- Email: ${email}
- Desired Course: ${course}

Please contact the student at ${contact} or reply to ${email}.

---
This email was sent from ACADEMIA LMS
          `.trim(),
        }),
      });
    } catch (emailError) {
      console.error("Email notification failed:", emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json({
      success: true,
      message: "Enquiry submitted successfully",
      id: enquiry.id,
    });
  } catch (error) {
    console.error("Enrollment error:", error);
    return NextResponse.json(
      { error: "Failed to submit enquiry. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const enquiries = await prisma.enquiry.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    return NextResponse.json(enquiries);
  } catch (error) {
    console.error("Fetch enquiries error:", error);
    return NextResponse.json(
      { error: "Failed to fetch enquiries" },
      { status: 500 }
    );
  }
}
