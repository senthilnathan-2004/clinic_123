export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import { Appointment } from "@/lib/models/schemas";
import { getServerSession } from "next-auth";
import {
  sendEmail,
  buildAdminBookingEmail,
  buildPatientBookingConfirmEmail,
  buildPatientBookingConfirmedEmail,
} from "@/lib/mail";

export async function GET(request: Request) {
  try {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      const appointment = await Appointment.findById(id);
      if (!appointment) return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
      return NextResponse.json(appointment);
    }

    const appointments = await Appointment.find().sort({ createdAt: -1 });
    return NextResponse.json(appointments);
  } catch (error) {
    console.error("Failed to fetch appointments:", error);
    return NextResponse.json({ error: "Failed to fetch appointments" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await dbConnect();

    const appointment = await Appointment.create(body);

    const clinicEmail = process.env.CLINIC_NOTIFICATION_EMAIL || "admin@sugamclinic.com";
    const patientEmail = appointment.email;

    // 1. Notify admin with full details
    sendEmail({
      to: clinicEmail,
      subject: `📅 New Appointment Request: ${appointment.name} – ${appointment.date}`,
      html: buildAdminBookingEmail({
        name: appointment.name,
        phone: appointment.phone,
        email: appointment.email,
        date: appointment.date,
        time: appointment.time,
        doctorName: appointment.doctorName,
        message: appointment.message,
      }),
    }).catch((err) => console.error("Admin booking email error:", err));

    // 2. Send patient a pending confirmation
    if (patientEmail) {
      sendEmail({
        to: patientEmail,
        subject: `📋 Appointment Request Received – Sugam Clinic`,
        html: buildPatientBookingConfirmEmail({
          name: appointment.name,
          date: appointment.date,
          time: appointment.time,
          doctorName: appointment.doctorName,
        }),
      }).catch((err) => console.error("Patient booking email error:", err));
    }

    return NextResponse.json(appointment, { status: 201 });
  } catch (error) {
    console.error("Failed to create appointment:", error);
    return NextResponse.json({ error: "Failed to create appointment" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Appointment ID is required" }, { status: 400 });

    const body = await request.json();
    await dbConnect();

    const oldAppointment = await Appointment.findById(id);
    const appointment = await Appointment.findByIdAndUpdate(id, body, { new: true });
    if (!appointment) return NextResponse.json({ error: "Appointment not found" }, { status: 404 });

    // Send confirmed email when status changes to Confirmed
    if (
      oldAppointment &&
      oldAppointment.status !== "Confirmed" &&
      appointment.status === "Confirmed" &&
      appointment.email
    ) {
      sendEmail({
        to: appointment.email,
        subject: `✅ Appointment Confirmed – Sugam Clinic`,
        html: buildPatientBookingConfirmedEmail({
          name: appointment.name,
          date: appointment.date,
          time: appointment.time,
          doctorName: appointment.doctorName,
        }),
      }).catch((err) => console.error("Appointment confirmed email error:", err));
    }

    return NextResponse.json(appointment);
  } catch (error) {
    console.error("Failed to update appointment:", error);
    return NextResponse.json({ error: "Failed to update appointment" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Appointment ID is required" }, { status: 400 });

    await dbConnect();
    const appointment = await Appointment.findByIdAndDelete(id);
    if (!appointment) return NextResponse.json({ error: "Appointment not found" }, { status: 404 });

    return NextResponse.json({ success: true, message: "Appointment deleted successfully" });
  } catch (error) {
    console.error("Failed to delete appointment:", error);
    return NextResponse.json({ error: "Failed to delete appointment" }, { status: 500 });
  }
}
