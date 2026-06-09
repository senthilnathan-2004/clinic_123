export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import { ContactMessage } from "@/lib/models/schemas";
import { getServerSession } from "next-auth";
import {
  sendEmail,
  buildAdminContactEmail,
  buildPatientContactAutoReplyEmail,
} from "@/lib/mail";

export async function GET(request: Request) {
  try {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await dbConnect();
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    return NextResponse.json(messages);
  } catch (error) {
    console.error("Failed to fetch messages:", error);
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await dbConnect();

    const message = await ContactMessage.create(body);

    const clinicEmail = process.env.CLINIC_NOTIFICATION_EMAIL || "admin@sugamclinic.com";

    // 1. Notify admin
    sendEmail({
      to: clinicEmail,
      subject: `📨 New Contact Message from ${message.name} – Sugam Clinic`,
      html: buildAdminContactEmail({
        name: message.name,
        email: message.email,
        phone: message.phone,
        message: message.message,
        subject: message.subject,
      }),
    }).catch((err) => console.error("Admin contact email error:", err));

    // 2. Auto-reply to the sender
    if (message.email) {
      sendEmail({
        to: message.email,
        subject: `✉️ We Received Your Message – Sugam Clinic`,
        html: buildPatientContactAutoReplyEmail(message.name),
      }).catch((err) => console.error("Contact auto-reply email error:", err));
    }

    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    console.error("Failed to submit message:", error);
    return NextResponse.json({ error: "Failed to submit message" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Message ID is required" }, { status: 400 });

    const body = await request.json();
    await dbConnect();

    const message = await ContactMessage.findByIdAndUpdate(id, body, { new: true });
    if (!message) return NextResponse.json({ error: "Message not found" }, { status: 404 });

    return NextResponse.json(message);
  } catch (error) {
    console.error("Failed to update message status:", error);
    return NextResponse.json({ error: "Failed to update message status" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Message ID is required" }, { status: 400 });

    await dbConnect();
    const message = await ContactMessage.findByIdAndDelete(id);
    if (!message) return NextResponse.json({ error: "Message not found" }, { status: 404 });

    return NextResponse.json({ success: true, message: "Message deleted successfully" });
  } catch (error) {
    console.error("Failed to delete message:", error);
    return NextResponse.json({ error: "Failed to delete message" }, { status: 500 });
  }
}
