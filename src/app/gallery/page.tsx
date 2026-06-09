import React from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { dbConnect } from "@/lib/db";
import { ClinicSettings, Gallery as GalleryModel } from "@/lib/models/schemas";
import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";

export const revalidate = 30;

export default async function AllGallery() {
  await dbConnect();

  const settings = await ClinicSettings.findOne();
  const gallery = await GalleryModel.find().sort({ createdAt: -1 }).lean();

  const safeSettings = JSON.parse(JSON.stringify(settings));
  const safeGallery = JSON.parse(JSON.stringify(gallery));

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar settings={safeSettings} />

      <main className="flex-grow pt-28 pb-20 bg-slate-50 dark:bg-slate-900/50 bg-grid-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header with back button */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-slate-200 dark:border-slate-800 pb-8">
            <div className="flex flex-col gap-2">
              <Link
                href="/#gallery"
                className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-primary-foreground hover:bg-primary px-4 py-2 rounded-xl border border-primary/20 hover:border-transparent transition-all duration-300 self-start mb-2"
              >
                <ArrowLeft size={14} /> Back to Home
              </Link>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-outfit">
                 Sugam Gallery & Media
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-inter">
                Browse our complete collection of clinical, pediatric play areas, consultations, and medical infrastructure photos.
              </p>
            </div>
            <div className="text-xs bg-primary/10 text-primary px-4 py-2 rounded-2xl font-bold font-outfit self-start md:self-center">
              Total Images: {safeGallery.length}
            </div>
          </div>

          {/* Grid Layout */}
          {safeGallery.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <p className="text-slate-550 dark:text-slate-400 font-semibold font-inter">No gallery images available at the moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {safeGallery.map((img: any, idx: number) => (
                <div
                  key={img._id || idx}
                  className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-150 dark:border-slate-800/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  <div className="h-56 w-full overflow-hidden bg-slate-100 dark:bg-slate-800 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.url}
                      alt={img.alt || "Gallery Image"}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-4 left-4 bg-primary/90 text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full backdrop-blur-sm">
                      {img.category || "General"}
                    </span>
                  </div>
                  <div className="p-4 flex flex-col justify-between flex-grow gap-2">
                    <p className="text-xs text-slate-700 dark:text-slate-300 font-inter line-clamp-2 italic">
                      {img.alt || "Sugam Clinic Facilities"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </main>

      <Footer settings={safeSettings} />
    </div>
  );
}
