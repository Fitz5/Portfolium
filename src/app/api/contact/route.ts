import { NextResponse } from "next/server";
import { Resend } from "resend";
import { rateLimit } from "@/lib/rate-limit";

const resend = new Resend(process.env.RESEND_API_KEY!);
const CONTACT_EMAIL = process.env.CONTACT_EMAIL!;

interface ContactBody {
  name: string;
  email: string;
  phone?: string;
  projectType: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "anonymous";
    if (!rateLimit(ip, 5, 60000)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body: ContactBody = await request.json();

    if (!body.name || !body.email || !body.projectType || !body.message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const { error } = await resend.emails.send({
      from: "Portfolium <onboarding@resend.dev>",
      to: CONTACT_EMAIL,
      replyTo: body.email,
      subject: `New Inquiry: ${body.projectType} from ${body.name}`,
      text: [
        `Name: ${body.name}`,
        `Email: ${body.email}`,
        `Phone: ${body.phone || "Not provided"}`,
        `Project Type: ${body.projectType}`,
        ``,
        `Message:`,
        body.message,
      ].join("\n"),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
