"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Phone, Clock, BadgeAlert, Award, CalendarCheck } from "lucide-react";
import Link from "next/link";

const translations: Record<string, Record<string, string>> = {
  english: {
    title: "Our Experts",
    subtitle: "Meet Our Experienced Doctors",
    desc: "Dedicated pediatricians and gastroenterologists providing compassionate healthcare to your children.",
  },
  tamil: {
    title: "எங்கள் நிபுணர்கள்",
    subtitle: "எங்கள் அனுபவமிக்க மருத்துவர்களை சந்திக்கவும்",
    desc: "உங்கள் குழந்தைகளுக்கு அன்பான மற்றும் கனிவான சிகிச்சை அளிக்க அர்ப்பணிக்கப்பட்ட குழந்தை நல மருத்துவர்கள்.",
  },
  malayalam: {
    title: "ഞങ്ങളുടെ വിദഗ്ദ്ധർ",
    subtitle: "ഞങ്ങളുടെ പരിചയസമ്പന്നരായ ഡോക്ടർമാരെ പരിചയപ്പെടുക",
    desc: "നിങ്ങളുടെ കുട്ടികൾക്ക് സ്നേഹത്തോടെയുള്ള ശിശുരോഗ, ഗ്യാസ്ട്രോ ചികിത്സ നൽകാൻ പ്രതിജ്ഞാബദ്ധരായ ഡോക്ടർമാർ.",
  },
  kannada: {
    title: "ನಮ್ಮ ತಜ್ಞರು",
    subtitle: "ನಮ್ಮ ಅನುಭವಿ ವೈದ್ಯರನ್ನು ಭೇಟಿ ಮಾಡಿ",
    desc: "ನಿಮ್ಮ ಮಕ್ಕಳಿಗೆ ಕರುಣಾಮಯಿ ಮತ್ತು ಉತ್ತಮ ಆರೋಗ್ಯ ಸೇವೆ ನೀಡಲು ಬದ್ಧರಾಗಿರುವ ಮಕ್ಕಳ ತಜ್ಞರು.",
  },
  telugu: {
    title: "మా నిపుణులు",
    subtitle: "మా అనుభవజ్ఞులైన వైద్యులను కలవండి",
    desc: "మీ పిల్లలకు అంకితభావంతో కూడిన వైద్య సేవలు అందించే అనుభవజ్ఞులైన శిశువైద్యులు.",
  }
};

export function Doctors({ doctors }: { doctors: any[] }) {
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

  if (!doctors || doctors.length === 0) return null;

  return (
    <section id="doctors" className="py-20 bg-slate-50 dark:bg-slate-900/50 bg-grid-pattern lg:min-h-screen lg:flex lg:items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-3">
          <h2 className="text-base font-bold text-secondary tracking-widest uppercase font-outfit">{t.title}</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-outfit">
            {t.subtitle}
          </h3>
          <p className="text-slate-655 dark:text-slate-400 font-inter">
            {t.desc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center">
          {doctors.map((doctor, idx) => (
            <motion.div
              key={doctor._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card flex flex-col sm:flex-row gap-6 p-6 rounded-3xl overflow-hidden shadow-lg border border-white/20 dark:border-slate-800"
            >
              {/* Doctor Photo */}
              <div className="w-full sm:w-44 h-48 sm:h-64 relative rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={doctor.photoUrl || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300"}
                  alt={doctor.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300";
                  }}
                />
              </div>

              {/* Doctor Details */}
              <div className="flex flex-col justify-between flex-grow gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h4 className="text-xl font-extrabold font-outfit text-slate-900 dark:text-white">
                      {doctor.name}
                    </h4>
                    
                    {/* Availability Status */}
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                        doctor.availability === "Available Today"
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-400"
                          : doctor.availability === "Fully Booked"
                          ? "bg-orange-100 text-orange-800 dark:bg-orange-950/50 dark:text-orange-400"
                          : "bg-rose-100 text-rose-800 dark:bg-rose-950/50 dark:text-rose-400"
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        doctor.availability === "Available Today" 
                          ? "bg-emerald-500" 
                          : doctor.availability === "Fully Booked" 
                          ? "bg-orange-500" 
                          : "bg-rose-500"
                      }`} />
                      {doctor.availability}
                    </span>
                  </div>

                  <p className="text-sm font-semibold text-primary font-inter">{doctor.specialization}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium font-inter flex items-center gap-1">
                    <Award size={14} className="text-secondary" /> {doctor.qualification} • {doctor.experience} Yrs Experience
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-300 font-inter line-clamp-3 mt-1">
                    {doctor.description}
                  </p>
                </div>

                <div className="flex flex-col gap-2 border-t border-slate-100 dark:border-slate-800 pt-3">
                  <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 font-inter">
                    <Clock size={14} className="text-primary" />
                    <span>{doctor.consultingTime}</span>
                  </div>
                  {doctor.phone && (
                    <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 font-inter">
                      <Phone size={14} className="text-primary" />
                      <span>{doctor.phone}</span>
                    </div>
                  )}
                </div>

                <Link
                  href="#book-appointment"
                  className="flex items-center justify-center gap-1.5 bg-primary/10 hover:bg-primary text-primary hover:text-white text-xs font-semibold py-2 px-4 rounded-xl transition-all duration-300 self-start"
                >
                  <CalendarCheck size={14} /> Book Schedule
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
