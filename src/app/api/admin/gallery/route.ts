export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import { Gallery } from "@/lib/models/schemas";
import { getServerSession } from "next-auth";

export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    const query = category ? { category } : {};
    const images = await Gallery.find(query).sort({ createdAt: -1 });
    return NextResponse.json(images);
  } catch (error) {
    console.error("Failed to fetch gallery:", error);
    return NextResponse.json({ error: "Failed to fetch gallery" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    await dbConnect();

    const image = await Gallery.create(body);
    return NextResponse.json(image, { status: 201 });
  } catch (error) {
    console.error("Failed to add image to gallery:", error);
    return NextResponse.json({ error: "Failed to add image to gallery" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Image ID is required" }, { status: 400 });

    await dbConnect();
    const image = await Gallery.findByIdAndDelete(id);
    if (!image) return NextResponse.json({ error: "Image not found" }, { status: 404 });

    return NextResponse.json({ success: true, message: "Image deleted successfully from gallery" });
  } catch (error) {
    console.error("Failed to delete image from gallery:", error);
    return NextResponse.json({ error: "Failed to delete image from gallery" }, { status: 500 });
  }
}
