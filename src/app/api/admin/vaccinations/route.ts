export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import { VaccinationReminder } from "@/lib/models/schemas";
import { getServerSession } from "next-auth";
import { sendEmail } from "@/lib/mail";

export async function GET() {
  try {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await dbConnect();
    const reminders = await VaccinationReminder.find().sort({ createdAt: -1 });
    return NextResponse.json(reminders);
  } catch (error) {
    console.error("Failed to fetch reminders:", error);
    return NextResponse.json({ error: "Failed to fetch reminders" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await dbConnect();

    const reminder = await VaccinationReminder.create(body);

    // Send confirmation email of vaccination enrollment
    sendEmail({
      to: reminder.parentEmail,
      subject: `Vaccination Reminders Scheduled for ${reminder.childName} - Sugam Clinic`,
      html: `
        <h2>Vaccination Reminder Enrolled</h2>
        <p>Dear ${reminder.parentName},</p>
        <p>You have successfully registered <strong>${reminder.childName}</strong> for our Vaccination Reminder System at Sugam Clinic.</p>
        <p>Child Date of Birth: <strong>${reminder.birthDate}</strong></p>
        <p>We will send email notifications to this address for upcoming vaccinations according to the standard IAP immunization schedule.</p>
        <br/>
        <p>Best Regards,</p>
        <p><strong>Sugam Child & Gastro Care Clinic</strong></p>
      `,
    }).catch((err) => console.error("Error sending enrollment email:", err));

    return NextResponse.json(reminder, { status: 201 });
  } catch (error) {
    console.error("Failed to create reminder:", error);
    return NextResponse.json({ error: "Failed to create reminder" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Reminder ID is required" }, { status: 400 });

    await dbConnect();
    const reminder = await VaccinationReminder.findByIdAndDelete(id);
    if (!reminder) return NextResponse.json({ error: "Reminder not found" }, { status: 404 });

    return NextResponse.json({ success: true, message: "Reminder cancelled successfully" });
  } catch (error) {
    console.error("Failed to delete reminder:", error);
    return NextResponse.json({ error: "Failed to delete reminder" }, { status: 500 });
  }
}
