export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import { Doctor } from "@/lib/models/schemas";
import { getServerSession } from "next-auth";

export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      const doctor = await Doctor.findById(id);
      if (!doctor) return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
      return NextResponse.json(doctor);
    }

    const doctors = await Doctor.find().sort({ createdAt: -1 });
    return NextResponse.json(doctors);
  } catch (error) {
    console.error("Failed to fetch doctors:", error);
    return NextResponse.json({ error: "Failed to fetch doctors" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    await dbConnect();

    const doctor = await Doctor.create(body);
    return NextResponse.json(doctor, { status: 201 });
  } catch (error) {
    console.error("Failed to create doctor:", error);
    return NextResponse.json({ error: "Failed to create doctor" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Doctor ID is required" }, { status: 400 });

    const body = await request.json();
    await dbConnect();

    const doctor = await Doctor.findByIdAndUpdate(id, body, { new: true });
    if (!doctor) return NextResponse.json({ error: "Doctor not found" }, { status: 404 });

    return NextResponse.json(doctor);
  } catch (error) {
    console.error("Failed to update doctor:", error);
    return NextResponse.json({ error: "Failed to update doctor" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Doctor ID is required" }, { status: 400 });

    await dbConnect();
    const doctor = await Doctor.findByIdAndDelete(id);
    if (!doctor) return NextResponse.json({ error: "Doctor not found" }, { status: 404 });

    return NextResponse.json({ success: true, message: "Doctor deleted successfully" });
  } catch (error) {
    console.error("Failed to delete doctor:", error);
    return NextResponse.json({ error: "Failed to delete doctor" }, { status: 500 });
  }
}
