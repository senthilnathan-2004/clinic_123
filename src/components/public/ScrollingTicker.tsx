import React from "react";

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

  const tickerItems = [...items, ...items, ...items];

  return (
    <div className="w-full bg-primary py-4 overflow-hidden relative shadow-md">
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-primary to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-primary to-transparent z-10 pointer-events-none" />

      <div className="ticker-track flex items-center gap-12 whitespace-nowrap">
        {tickerItems.map((item, idx) => (
          <span
            key={idx}
            className="text-white font-extrabold text-sm sm:text-base tracking-widest uppercase font-outfit flex items-center gap-4"
          >
            <span>{item}</span>
            <span className="w-2.5 h-2.5 rounded-full bg-secondary inline-block flex-shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}
