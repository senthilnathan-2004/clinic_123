import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import { FAQ } from "@/lib/models/schemas";
import { getServerSession } from "next-auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await dbConnect();
    const faqs = await FAQ.find().sort({ order: 1, createdAt: -1 });
    return NextResponse.json(faqs);
  } catch (error) {
    console.error("Failed to fetch FAQs:", error);
    return NextResponse.json({ error: "Failed to fetch FAQs" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    await dbConnect();

    const faq = await FAQ.create(body);
    return NextResponse.json(faq, { status: 201 });
  } catch (error) {
    console.error("Failed to create FAQ:", error);
    return NextResponse.json({ error: "Failed to create FAQ" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "FAQ ID is required" }, { status: 400 });

    const body = await request.json();
    await dbConnect();

    const faq = await FAQ.findByIdAndUpdate(id, body, { new: true });
    if (!faq) return NextResponse.json({ error: "FAQ not found" }, { status: 404 });

    return NextResponse.json(faq);
  } catch (error) {
    console.error("Failed to update FAQ:", error);
    return NextResponse.json({ error: "Failed to update FAQ" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "FAQ ID is required" }, { status: 400 });

    await dbConnect();
    const faq = await FAQ.findByIdAndDelete(id);
    if (!faq) return NextResponse.json({ error: "FAQ not found" }, { status: 404 });

    return NextResponse.json({ success: true, message: "FAQ deleted successfully" });
  } catch (error) {
    console.error("Failed to delete FAQ:", error);
    return NextResponse.json({ error: "Failed to delete FAQ" }, { status: 500 });
  }
}
