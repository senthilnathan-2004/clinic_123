import React from "react";
import { getClinicSettings } from "@/lib/data";
import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";
import { GalleryPageContent } from "@/components/public/GalleryPageContent";

export const revalidate = 60;

export default async function AllGallery() {
  const settings = await getClinicSettings();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar settings={settings ?? {}} />

      <main className="flex-grow pt-28 pb-20 bg-slate-50 dark:bg-slate-900/50 bg-grid-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GalleryPageContent />
        </div>
      </main>

      <Footer settings={settings ?? {}} />
    </div>
  );
}
