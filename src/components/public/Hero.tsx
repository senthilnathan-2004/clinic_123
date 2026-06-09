"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Phone, ArrowRight, Star, HeartHandshake, Stethoscope, Baby } from "lucide-react";

const translations: Record<string, Record<string, string>> = {
  english: {
    tag: "Trusted Pediatric & Gastro Care",
    cta_book: "Book Appointment",
    cta_call: "Call Us Now",
    stat_patients: "Happy Patients",
    stat_experience: "Years Experience",
    stat_completed: "Appointments Completed",
    badge: "Quality Care Guaranteed",
    badge_sub: "Experienced Medical Professionals",
    exp_badge: "24/7 Support",
    care_badge: "Expert Care",
  },
  tamil: {
    tag: "நம்பிக்கையான குழந்தை மற்றும் வயிறு சிகிச்சை",
    cta_book: "முன்பதிவு",
    cta_call: "அழைக்க",
    stat_patients: "மகிழ்ச்சியான நோயாளிகள்",
    stat_experience: "ஆண்டுகள் அனுபவம்",
    stat_completed: "முன்பதிவுகள் பூர்த்தி",
    badge: "தரமான சிகிச்சை உறுதி",
    badge_sub: "அனுபவம் வாய்ந்த மருத்துவர்கள்",
    exp_badge: "24/7 ஆதரவு",
    care_badge: "நிபுணர் சிகிச்சை",
  },
  malayalam: {
    tag: "വിശ്വസ്തമായ ശിശു, ഗ്യാസ്ട്രോ കെയർ",
    cta_book: "ബുക്ക് ചെയ്യുക",
    cta_call: "വിളിക്കുക",
    stat_patients: "സന്തുഷ്ടരായ രോഗികൾ",
    stat_experience: "വർഷത്തെ പരിചയം",
    stat_completed: "അപ്പോയിന്റ്മെന്റുകൾ പൂർത്തിയായി",
    badge: "ഗുണനിലവാരമുള്ള പരിചരണം",
    badge_sub: "പരിചയസമ്പന്നരായ ഡോക്ടർമാർ",
    exp_badge: "24/7 പിന്തുണ",
    care_badge: "വിദഗ്ദ്ധ പരിചരണം",
  },
  kannada: {
    tag: "ವಿಶ್ವಾಸಾರ್ಹ ಮಕ್ಕಳ ಮತ್ತು ಗ್ಯಾಸ್ಟ್ರೋ ಆರೈಕೆ",
    cta_book: "ಬುಕ್ ಮಾಡಿ",
    cta_call: "ಕರೆ ಮಾಡಿ",
    stat_patients: "ಸಂತೋಷದ ರೋಗಿಗಳು",
    stat_experience: "ವರ್ಷಗಳ ಅನುಭವ",
    stat_completed: "ಅಪಾಯಿಂಟ್ಮೆಂಟ್ ಪೂರ್ಣಗೊಂಡಿದೆ",
    badge: "ಗುಣಮಟ್ಟದ ಆರೈಕೆ ಖಾತರಿ",
    badge_sub: "ಅನುಭವಿ ವೈದ್ಯಕೀಯ ವೃತ್ತಿಪರರು",
    exp_badge: "24/7 ಬೆಂಬಲ",
    care_badge: "ತಜ್ಞರ ಆರೈಕೆ",
  },
  telugu: {
    tag: "విశ్వసనీయమైన పిల్లల మరియు గ్యాస్ట్రో కేర్",
    cta_book: "బుక్ చేయండి",
    cta_call: "కాల్ చేయండి",
    stat_patients: "సంతోషకరమైన రోగులు",
    stat_experience: "సంవత్సరాల అనుభవం",
    stat_completed: "అపాయింట్‌మెంట్‌లు పూర్తయ్యాయి",
    badge: "నాణ్యమైన సంరక్షణ హామీ",
    badge_sub: "అనుభవజ్ఞులైన వైద్య నిపుణులు",
    exp_badge: "24/7 మద్దతు",
    care_badge: "నిపుణుల సంరక్షణ",
  }
};

export function Hero({ settings, doctors }: { settings: any; doctors: any[] }) {
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

  const stats = [
    { value: "15,000+", label: t.stat_patients },
    { value: "18+", label: t.stat_experience },
    { value: "50,000+", label: t.stat_completed },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden bg-gradient-to-br from-primary/10 via-slate-50 to-secondary/20 dark:from-slate-950 dark:via-slate-900 dark:to-primary/15 bg-grid-pattern">
      {/* Background blobs for premium depth */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/15 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/15 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Text content */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-primary/10 dark:bg-primary/20 text-primary px-4 py-1.5 rounded-full text-xs font-semibold self-start"
            >
              <Star size={12} className="fill-current animate-spin" style={{ animationDuration: "6s" }} />
              {t.tag}
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-outfit text-slate-900 dark:text-white leading-[1.1]"
            >
              {settings?.name || "Sugam Child & Gastro Care Clinic"}
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-slate-655 dark:text-slate-300 max-w-xl leading-relaxed font-inter"
            >
              {settings?.tagline || "Providing the highest standard of pediatric neonatology and gastroenterology healthcare services with love and dedication."}
            </motion.p>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap gap-4 items-center pt-2"
            >
              <Link
                href="#book-appointment"
                className="flex items-center gap-2 bg-primary hover:bg-primary/95 text-white font-semibold px-8 py-4 rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/35 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
              >
                <Calendar size={18} /> {t.cta_book} <ArrowRight size={16} />
              </Link>
              <Link
                href={`tel:${settings?.phone || ""}`}
                className="flex items-center gap-2 border border-slate-300 dark:border-slate-700 bg-white/60 dark:bg-slate-800/60 hover:bg-slate-100 hover:dark:bg-slate-800 text-slate-805 dark:text-white font-semibold px-8 py-4 rounded-full transition-all duration-300"
              >
                <Phone size={18} className="text-secondary" /> {t.cta_call}
              </Link>
            </motion.div>

            {/* Counters / Stats */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-3 gap-4 border-t border-slate-200 dark:border-slate-800 pt-8 mt-4"
            >
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-2xl sm:text-3xl font-extrabold text-primary font-outfit">{stat.value}</span>
                  <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-inter">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Dynamic Doctors / Clinic Image + Creative Badges */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Creative Floating Badge 1 - Top Left */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -left-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 rounded-2xl shadow-xl flex items-center gap-2.5 z-20"
            >
              <div className="bg-emerald-500/10 p-2 rounded-xl text-emerald-500">
                <Stethoscope size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 font-bold uppercase">{t.care_badge}</span>
                <span className="text-xs font-extrabold text-slate-900 dark:text-white font-outfit">Consultants</span>
              </div>
            </motion.div>

            {/* Creative Floating Badge 2 - Bottom Right */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -right-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 rounded-2xl shadow-xl flex items-center gap-2.5 z-20"
            >
              <div className="bg-primary/10 p-2 rounded-xl text-primary">
                <Baby size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-400 font-bold uppercase">{t.exp_badge}</span>
                <span className="text-xs font-extrabold text-slate-900 dark:text-white font-outfit">Emergency</span>
              </div>
            </motion.div>

             {/* Layered Decorative Rounded Cards in Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-3xl -rotate-3 translate-x-3 translate-y-3 opacity-20 pointer-events-none" />
            <div className="absolute inset-0 border-2 border-dashed border-primary/30 rounded-3xl rotate-3 -translate-x-2 -translate-y-2 pointer-events-none" />

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative w-full max-w-[420px] h-[480px] rounded-3xl overflow-hidden shadow-2xl shadow-primary/10 border-4 border-white dark:border-slate-800 z-10"
            >
              {settings?.heroImageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={settings.heroImageUrl}
                  alt="Sugam Clinic Care"
                  className="w-full h-full object-cover"
                />
              ) : doctors && doctors.length > 0 ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={doctors[0].photoUrl || "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&q=80&w=800"}
                  alt="Doctor at Clinic"
                  className="w-full h-full object-cover"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800"
                  alt="Medical Care"
                  className="w-full h-full object-cover"
                />
              )}

              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 right-6 glass-panel py-4 px-6 rounded-2xl flex items-center gap-4 border border-white/20">
                <div className="bg-secondary/20 p-2.5 rounded-full text-secondary">
                  <HeartHandshake size={24} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white font-outfit">{t.badge}</h4>
                  <p className="text-xs text-slate-605 dark:text-slate-300 font-inter">{t.badge_sub}</p>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
