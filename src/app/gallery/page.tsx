import React from "react";
import { dbConnect } from "@/lib/db";
import { ClinicSettings } from "@/lib/models/schemas";
import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";
import { GalleryPageContent } from "@/components/public/GalleryPageContent";

export const dynamic = "force-dynamic";

export default async function AllGallery() {
  await dbConnect();

  const settings = await ClinicSettings.findOne();
  const safeSettings = JSON.parse(JSON.stringify(settings));

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar settings={safeSettings} />

      <main className="flex-grow pt-28 pb-20 bg-slate-50 dark:bg-slate-900/50 bg-grid-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GalleryPageContent />
        </div>
      </main>

      <Footer settings={safeSettings} />
    </div>
  );
}
