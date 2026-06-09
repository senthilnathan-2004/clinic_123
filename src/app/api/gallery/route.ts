import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import { Gallery } from "@/lib/models/schemas";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await dbConnect();
    const images = await Gallery.find()
      .select("_id url category alt")
      .sort({ createdAt: -1 })
      .lean();
    return NextResponse.json(images);
  } catch (error) {
    console.error("Failed to fetch gallery:", error);
    return NextResponse.json({ error: "Failed to fetch gallery" }, { status: 500 });
  }
}
