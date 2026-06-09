"use client";

import React from "react";
import { Phone, MessageCircle } from "lucide-react";
import Link from "next/link";

export function EmergencyCall({ settings }: { settings: any }) {
  const whatsappNumber = settings?.whatsapp || "919444456789";
  const emergencyPhone = settings?.emergencyPhone || "+91 94444 99999";

  return (
    <>
      {/* Floating WhatsApp Chat Button - Hidden on mobile screens */}
      <Link
        href={`https://wa.me/${whatsappNumber}?text=Hello%20Sugam%20Clinic%2C%20I%20would%20like%20to%20inquire%20about%20appointment%20slots.`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-28 md:bottom-6 right-6 z-40 hidden md:flex bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 items-center justify-center"
        title="Chat on WhatsApp"
        aria-label="WhatsApp Clinic Support"
      >
        <MessageCircle size={26} className="fill-current" />
      </Link>

      {/* Sticky Emergency Call Bar for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-rose-600 border-t border-rose-500 py-3 px-4 flex items-center justify-between shadow-2xl text-white">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase font-bold tracking-wider opacity-90">24/7 Emergency Support</span>
          <span className="text-sm font-extrabold font-outfit">{emergencyPhone}</span>
        </div>
        <Link
          href={`tel:${emergencyPhone}`}
          className="bg-white text-rose-600 font-extrabold text-xs px-5 py-2.5 rounded-full flex items-center gap-1.5 hover:bg-slate-100 transition-all uppercase"
        >
          <Phone size={14} className="fill-current" /> Call Emergency
        </Link>
      </div>
    </>
  );
}
