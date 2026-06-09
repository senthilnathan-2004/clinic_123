export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import { Review } from "@/lib/models/schemas";
import { getServerSession } from "next-auth";
import {
  sendEmail,
  buildAdminReviewEmail,
  buildPatientReviewThankYouEmail,
} from "@/lib/mail";

export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const approvedOnly = searchParams.get("approved") === "true";
    const id = searchParams.get("id");

    if (id) {
      const review = await Review.findById(id);
      if (!review) return NextResponse.json({ error: "Review not found" }, { status: 404 });
      return NextResponse.json(review);
    }

    const query = approvedOnly ? { isApproved: true } : {};
    const reviews = await Review.find(query).sort({ createdAt: -1 });
    return NextResponse.json(reviews);
  } catch (error) {
    console.error("Failed to fetch reviews:", error);
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await dbConnect();

    const session = await getServerSession();
    const isApproved = !!session;

    const review = await Review.create({ ...body, isApproved });

    const clinicEmail = process.env.CLINIC_NOTIFICATION_EMAIL || "admin@sugamclinic.com";

    // Notify admin
    sendEmail({
      to: clinicEmail,
      subject: `⭐ New ${body.rating}-Star Patient Review from ${body.name} – Sugam Clinic`,
      html: buildAdminReviewEmail({
        name: body.name,
        rating: body.rating,
        reviewText: body.reviewText,
      }),
    }).catch((err) => console.error("Admin review email error:", err));

    // Thank you email to reviewer (only if they provided an email)
    if (body.email) {
      sendEmail({
        to: body.email,
        subject: `Thank You for Your Review – Sugam Clinic`,
        html: buildPatientReviewThankYouEmail(body.name),
      }).catch((err) => console.error("Patient review thank-you email error:", err));
    }

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error("Failed to create review:", error);
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Review ID is required" }, { status: 400 });

    const body = await request.json();
    await dbConnect();

    const review = await Review.findByIdAndUpdate(id, body, { new: true });
    if (!review) return NextResponse.json({ error: "Review not found" }, { status: 404 });

    return NextResponse.json(review);
  } catch (error) {
    console.error("Failed to update review:", error);
    return NextResponse.json({ error: "Failed to update review" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Review ID is required" }, { status: 400 });

    await dbConnect();
    const review = await Review.findByIdAndDelete(id);
    if (!review) return NextResponse.json({ error: "Review not found" }, { status: 404 });

    return NextResponse.json({ success: true, message: "Review deleted successfully" });
  } catch (error) {
    console.error("Failed to delete review:", error);
    return NextResponse.json({ error: "Failed to delete review" }, { status: 500 });
  }
}
