"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import Link from "next/link";

const translations: Record<string, Record<string, string>> = {
  english: {
    title: "Our Specialities",
    subtitle: "Comprehensive Medical Care",
    desc: "Sugam Clinic provides dedicated pediatric and gastroenterology treatments from experienced pediatricians.",
    seeAll: "See All Services",
  },
  tamil: {
    title: "எங்கள் சிறப்புகள்",
    subtitle: "முழுமையான மருத்துவ சிகிச்சை",
    desc: "சுகம் கிளினிக் அனுபவம் வாய்ந்த மருத்துவர்களின் மூலம் அர்ப்பணிப்புள்ள குழந்தை மற்றும் வயிறு சிகிச்சை அளிக்கிறது.",
    seeAll: "அனைத்து சேவைகளும் காண்க",
  },
  malayalam: {
    title: "ഞങ്ങളുടെ പ്രത്യേകതകൾ",
    subtitle: "സമഗ്രമായ മെഡിക്കൽ കെയർ",
    desc: "സുഗം ക്ലിനിക് പരിചയസമ്പന്നരായ ശിശുരോഗ വിദഗ്ദ്ധരിൽ നിന്ന് ശിശുരോഗ, ഗ്യാസ്ട്രോ എൻട്രോളജി ചികിത്സകൾ നൽകുന്നു.",
    seeAll: "എല്ലാ സേവനങ്ങളും കാണുക",
  },
  kannada: {
    title: "ನಮ್ಮ ವಿಶೇಷತೆಗಳು",
    subtitle: "ಸಮಗ್ರ ವೈದ್ಯಕೀಯ ಆರೈಕೆ",
    desc: "ಸುಗಮ್ ಕ್ಲಿನಿಕ್ ಅನುಭವಿ ಮಕ್ಕಳ ತಜ್ಞರಿಂದ ಮಕ್ಕಳ ಮತ್ತು ಗ್ಯಾಸ್ಟ್ರೋಎಂಟರಾಲಜಿ ಚಿಕಿತ್ಸೆಗಳನ್ನು ನೀಡುತ್ತದೆ.",
    seeAll: "ಎಲ್ಲಾ ಸೇವೆಗಳನ್ನು ನೋಡಿ",
  },
  telugu: {
    title: "మా ప్రత్యేకతలు",
    subtitle: "సమగ్ర వైద్య సంరక్షణ",
    desc: "సుగమ్ క్లినిక్ అనుభవజ్ఞులైన వైద్యుల నుండి ప్రత్యేకమైన పిల్లల మరియు గ్యాస్ట్రోఎంటరాలజీ చికిత్సలను అందిస్తుంది.",
    seeAll: "అన్ని సేవలు చూడండి",
  },
};

/** Show 3 on mobile, 6 on desktop – a "See All" link opens /services */
export function Services({ services }: { services: any[] }) {
  const [lang, setLang] = useState("english");

  useEffect(() => {
    const current = localStorage.getItem("clinic_lang") || "english";
    setLang(current);

    const handleLangChange = (e: any) => {
      setLang(e.detail);
    };
    window.addEventListener("langChange", handleLangChange);
    return () => window.removeEventListener("langChange", handleLangChange);
  }, []);

  const t = translations[lang] || translations.english;

  if (!services || services.length === 0) return null;

  // Desktop shows first 6, mobile shows first 3
  // We rely on CSS to hide extra cards on mobile
  const desktopLimit = 6;
  const mobileLimit = 3;
  const visible = services.slice(0, desktopLimit);
  const hasMore = services.length > desktopLimit;

  return (
    <section id="services" className="py-20 bg-background bg-dot-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-3">
          <h2 className="text-base font-bold text-secondary tracking-widest uppercase font-outfit">{t.title}</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-outfit">
            {t.subtitle}
          </h3>
          <p className="text-slate-655 dark:text-slate-400 font-inter">
            {t.desc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visible.map((service, idx) => {
            const IconComponent = (Icons as any)[service.icon] || Icons.HeartPulse;
            // Hide cards beyond index 2 on mobile (0-indexed: 0,1,2 = 3 cards)
            const hiddenOnMobile = idx >= mobileLimit;

            return (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className={`glass-card flex flex-col items-start gap-4 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800${hiddenOnMobile ? " hidden md:flex" : ""}`}
              >
                {/* Service Icon */}
                <div className="bg-primary/10 dark:bg-primary/20 p-4 rounded-2xl text-primary mb-2">
                  <IconComponent size={28} />
                </div>

                {/* Title */}
                <h4 className="text-xl font-bold font-outfit text-slate-900 dark:text-white">
                  {service.title}
                </h4>

                {/* Description */}
                <p className="text-sm text-slate-600 dark:text-slate-400 font-inter leading-relaxed">
                  {service.description}
                </p>

                {/* Cover Image */}
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

        {/* See All Services button */}
        {(hasMore || services.length > mobileLimit) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-12 flex justify-center"
          >
            <Link
              href="/services"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-3.5 rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 font-outfit text-sm"
            >
              <Icons.LayoutGrid size={16} />
              {t.seeAll}
            </Link>
          </motion.div>
        )}

      </div>
    </section>
  );
}
