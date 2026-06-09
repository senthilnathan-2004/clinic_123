"use client";

import React from "react";
import { motion } from "framer-motion";

export function ScrollingTicker() {
  const items = [
    "Pediatric Consultation",
    "Newborn Care & Neonatology",
    "Comprehensive Vaccination",
    "Gastroenterology & Endoscopy",
    "Liver Care & Hepatology",
    "Nutritional Counseling",
    "Lactation Support",
    "Child Growth & Development",
    "24/7 Emergency Support",
  ];

  // Repeat items to fill space and enable seamless loop
  const tickerItems = [...items, ...items, ...items];

  return (
    <div className="w-full bg-primary py-4 overflow-hidden relative shadow-md">
      {/* Side overlays to blur edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-primary to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-primary to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex items-center gap-12 whitespace-nowrap"
        animate={{ x: [0, -1000] }}
        transition={{
          repeat: Infinity,
          duration: 25,
          ease: "linear",
        }}
      >
        {tickerItems.map((item, idx) => (
          <span
            key={idx}
            className="text-white font-extrabold text-sm sm:text-base tracking-widest uppercase font-outfit flex items-center gap-4"
          >
            <span>{item}</span>
            <span className="w-2.5 h-2.5 rounded-full bg-secondary inline-block flex-shrink-0" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
