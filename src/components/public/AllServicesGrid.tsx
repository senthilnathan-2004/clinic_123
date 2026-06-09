"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const translations: Record<string, Record<string, string>> = {
  english: {
    tag: "All Specialities",
    title: "Our Complete Medical Services",
    desc: "Explore the full range of healthcare services offered at Sugam Clinic, delivered by experienced specialists.",
    back: "Back to Home",
  },
  tamil: {
    tag: "அனைத்து சிறப்புகள்",
    title: "எங்கள் முழு மருத்துவ சேவைகள்",
    desc: "சுகம் கிளினிக்கில் வழங்கப்படும் மருத்துவ சேவைகளின் முழுப் பட்டியலைக் காணுங்கள்.",
    back: "முகப்புக்கு திரும்பு",
  },
  malayalam: {
    tag: "എല്ലാ പ്രത്യേകതകൾ",
    title: "ഞങ്ങളുടെ സമ്പൂർണ്ണ ആരോഗ്യ സേവനങ്ങൾ",
    desc: "സുഗം ക്ലിനിക്കിൽ ലഭ്യമായ എല്ലാ സേവനങ്ങളും കണ്ടെത്തുക.",
    back: "ഹോമിലേക്ക് മടങ്ങുക",
  },
  kannada: {
    tag: "ಎಲ್ಲಾ ವಿಶೇಷತೆಗಳು",
    title: "ನಮ್ಮ ಸಂಪೂರ್ಣ ವೈದ್ಯಕೀಯ ಸೇವೆಗಳು",
    desc: "ಸುಗಮ್ ಕ್ಲಿನಿಕ್ ನೀಡುವ ಎಲ್ಲಾ ಆರೋಗ್ಯ ಸೇವೆಗಳನ್ನು ಅನ್ವೇಷಿಸಿ.",
    back: "ಮನೆಗೆ ಹಿಂತಿರುಗಿ",
  },
  telugu: {
    tag: "అన్ని ప్రత్యేకతలు",
    title: "మా సంపూర్ణ వైద్య సేవలు",
    desc: "సుగమ్ క్లినిక్ అందించే అన్ని వైద్య సేవలను అన్వేషించండి.",
    back: "హోమ్‌కు తిరిగి వెళ్ళు",
  },
};

export function AllServicesGrid({ services }: { services: any[] }) {
  const [lang, setLang] = useState("english");

  useEffect(() => {
    const current = localStorage.getItem("clinic_lang") || "english";
    setLang(current);
    const handleLangChange = (e: any) => setLang(e.detail);
    window.addEventListener("langChange", handleLangChange);
    return () => window.removeEventListener("langChange", handleLangChange);
  }, []);

  const t = translations[lang] || translations.english;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back button */}
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-10"
      >
        <Link
          href="/#services"
          className="inline-flex items-center gap-2 text-primary font-semibold hover:underline font-outfit text-sm"
        >
          <ArrowLeft size={16} />
          {t.back}
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-3"
      >
        <h2 className="text-base font-bold text-secondary tracking-widest uppercase font-outfit">{t.tag}</h2>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-outfit">
          {t.title}
        </h1>
        <p className="text-slate-600 dark:text-slate-400 font-inter">{t.desc}</p>
      </motion.div>

      {/* All services grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, idx) => {
          const IconComponent = (Icons as any)[service.icon] || Icons.HeartPulse;

          return (
            <motion.div
              key={service._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              className="glass-card flex flex-col items-start gap-4 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800"
            >
              <div className="bg-primary/10 dark:bg-primary/20 p-4 rounded-2xl text-primary mb-2">
                <IconComponent size={28} />
              </div>
              <h3 className="text-xl font-bold font-outfit text-slate-900 dark:text-white">
                {service.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-inter leading-relaxed">
                {service.description}
              </p>
              <div className="w-full h-40 mt-4 rounded-2xl overflow-hidden shadow-inner bg-slate-100 dark:bg-slate-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={service.imageUrl || "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&q=80&w=400"}
                  alt={service.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&q=80&w=400";
                  }}
                  loading="lazy"
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {services.length === 0 && (
        <div className="text-center py-24 text-slate-400 font-inter">
          No services available yet.
        </div>
      )}
    </div>
  );
}
