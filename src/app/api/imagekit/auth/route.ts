export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import ImageKit from "imagekit";

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY || "public_mock_key",
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "private_mock_key",
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || "https://ik.imagekit.io/mock",
});

export async function GET() {
  try {
    const authParams = imagekit.getAuthenticationParameters();
    return NextResponse.json(authParams);
  } catch (error) {
    console.error("Error generating ImageKit auth parameters:", error);
    return NextResponse.json({ error: "Failed to authenticate" }, { status: 500 });
  }
}
