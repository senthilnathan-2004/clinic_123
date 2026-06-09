"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

const translations: Record<string, Record<string, string>> = {
  english: {
    tag: "Gallery",
    title: "A Tour of Our Clinic",
    subtitle: "Step inside Sugam Clinic. Take a look at our hygienic consultation rooms, specialized pediatric wards, and modern diagnostic facilities.",
    filter_all: "All Photos",
    filter_gallery: "Clinic & Facilities",
    filter_doctors: "Doctors",
    filter_services: "Services & Treatment",
    filter_about: "Events",
    see_all: "See All Images",
    show_less: "Show Less",
  },
  tamil: {
    tag: "புகைப்படங்கள்",
    title: "எங்கள் மருத்துவமனை உலா",
    subtitle: "சுகம் மருத்துவமனைக்குள் நுழையுங்கள். எங்களின் சுகாதாரமான ஆலோசனை அறைகள், பிரத்யேக குழந்தை சிகிச்சை வார்டுகள் மற்றும் நவீன கண்டறியும் வசதிகளைப் பாருங்கள்.",
    filter_all: "அனைத்து புகைப்படங்கள்",
    filter_gallery: "மருத்துவமனை & வசதிகள்",
    filter_doctors: "மருத்துவர்கள்",
    filter_services: "சேவைகள் & சிகிச்சை",
    filter_about: "நிகழ்வுகள்",
    see_all: "அனைத்து புகைப்படங்களையும் காட்டு",
    show_less: "குறைவாகக் காட்டு",
  },
  malayalam: {
    tag: "ഗാലറി",
    title: "ഞങ്ങളുടെ ക്ലിനിക്ക് സന്ദർശനം",
    subtitle: "സുഗം ക്ലിനിക്കിനുള്ളിലേക്ക് കടക്കുക. ഞങ്ങളുടെ ശുചിത്വമുള്ള കൺസൾട്ടേഷൻ റൂമുകൾ, പ്രത്യേക ശിശുരോഗ വാർഡുകൾ, ആധുനിക ഡയഗ്നോസ്റ്റിക് സൗകര്യങ്ങൾ എന്നിവ പരിശോധിക്കുക.",
    filter_all: "എല്ലാ ഫോട്ടോകളും",
    filter_gallery: "ക്ലിനിക്കും സൗകര്യങ്ങളും",
    filter_doctors: "ഡോക്ടർമാർ",
    filter_services: "സേവനങ്ങളും ചികിത്സയും",
    filter_about: "പരിപാടികൾ",
    see_all: "എല്ലാ ചിത്രങ്ങളും കാണുക",
    show_less: "കുറച്ചു കാണിക്കുക",
  },
  kannada: {
    tag: "ಗ್ಯಾಲರಿ",
    title: "ನಮ್ಮ ಕ್ಲಿನಿಕ್ ಪ್ರವಾಸ",
    subtitle: "ಸುಗಮ್ ಕ್ಲಿನಿಕ್ ಒಳಗೆ ಹೆಜ್ಜೆ ಹಾಕಿ. ನಮ್ಮ ನೈರ್ಮಲ್ಯದ ಸಮಾಲೋಚನಾ ಕೊಠಡಿಗಳು, ವಿಶೇಷ ಮಕ್ಕಳ ವಾರ್ಡ್‌ಗಳು ಮತ್ತು ಆಧುನಿಕ ರೋಗನಿರ್ಣಯ ಸೌಲಭ್ಯಗಳನ್ನು ನೋಡಿ.",
    filter_all: "ಎಲ್ಲಾ ಫೋಟೋಗಳು",
    filter_gallery: "ಕ್ಲಿನಿಕ್ ಮತ್ತು ಸೌಲಭ್ಯಗಳು",
    filter_doctors: "ವೈದ್ಯರು",
    filter_services: "ಸೇವೆಗಳು ಮತ್ತು ಚಿಕಿತ್ಸೆ",
    filter_about: "ಕಾರ್ಯಕ್ರಮಗಳು",
    see_all: "ಎಲ್ಲಾ ಚಿತ್ರಗಳನ್ನು ನೋಡಿ",
    show_less: "ಕಡಿಮೆ ತೋರಿಸಿ",
  },
  telugu: {
    tag: "గ్యాలరీ",
    title: "మా క్లినిక్ పర్యటన",
    subtitle: "సుగమ్ క్లినిక్‌లోకి అడుగు పెట్టండి. మా పరిశుభ్రమైన సంప్రదింపు గదులు, ప్రత్యేక పీడియాట్రిక్ వార్డులు మరియు ఆధునిక రోగనిర్ధారణ సౌకర్యాలను పరిశీలించండి.",
    filter_all: "అన్ని ఫోటోలు",
    filter_gallery: "క్లినిక్ & సౌకర్యాలు",
    filter_doctors: "వైద్యులు",
    filter_services: "సేవలు & చికిత్స",
    filter_about: "ఈవెంట్స్",
    see_all: "అన్ని చిత్రాలను చూడండి",
    show_less: "తక్కువ చూపించు",
  }
};

export function Gallery({ images }: { images: any[] }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [lang, setLang] = useState("english");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  const labelMap: Record<string, string> = {
    gallery: t.filter_gallery,
    doctors: t.filter_doctors,
    services: t.filter_services,
    about: t.filter_about,
  };

  // Get all unique categories present in the database images, falling back to static ones if empty
  const dbCategories = images && images.length > 0 
    ? Array.from(new Set(images.map((img) => img.category))).filter(Boolean)
    : ["gallery", "doctors", "services"];

  const categories = [
    { key: "all", label: t.filter_all },
    ...dbCategories.map((cat) => ({
      key: cat,
      label: labelMap[cat] || (cat.charAt(0).toUpperCase() + cat.slice(1)),
    })),
  ];

  const filteredImages = activeFilter === "all"
    ? images
    : images.filter((img) => img.category === activeFilter);

  // Fallback if no images are seeded yet
  const displayImages = filteredImages && filteredImages.length > 0
    ? filteredImages
    : [
        { _id: "1", url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=400", category: "gallery", alt: "OPD consultation rooms" },
        { _id: "2", url: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=400", category: "gallery", alt: "Newborn waiting ward" },
        { _id: "3", url: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=400", category: "gallery", alt: "Pediatric play area" },
        { _id: "4", url: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=400", category: "gallery", alt: "Gastroenterology lab" },
      ];

  const maxVisible = isMobile ? 3 : 8;
  const visibleImages = displayImages.slice(0, maxVisible);

  return (
    <section id="gallery" className="py-20 bg-slate-50 dark:bg-slate-900/50 relative bg-grid-pattern lg:min-h-screen lg:flex lg:items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        <div className="text-center max-w-3xl mx-auto mb-12 flex flex-col gap-3">
          <h2 className="text-base font-bold text-secondary tracking-widest uppercase font-outfit">{t.tag}</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-outfit">
            {t.title}
          </h3>
          <p className="text-slate-600 dark:text-slate-400 font-inter">
            {t.subtitle}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => {
                setActiveFilter(cat.key);
                setShowAll(false);
              }}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                activeFilter === cat.key
                  ? "bg-primary text-white shadow-md shadow-primary/15 scale-105"
                  : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60 border border-slate-200 dark:border-slate-800"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid Images */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {visibleImages.map((img) => (
            <motion.div
              layout
              key={img._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative group h-64 rounded-2xl overflow-hidden cursor-pointer shadow-md bg-slate-200 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-800/80"
              onClick={() => setSelectedImage(img.url)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.url}
                alt={img.alt || "Clinic media"}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-primary/45 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                <div className="bg-white text-primary p-3 rounded-full shadow-lg scale-75 group-hover:scale-100 transition-transform duration-300">
                  <Search size={18} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* See All button linking to dedicated page */}
        {displayImages.length > (isMobile ? 3 : 8) && (
          <div className="flex justify-center mt-12">
            <Link
              href="/gallery"
              className="flex items-center gap-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 px-6 py-3 rounded-full text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm cursor-pointer"
            >
              {t.see_all} ({displayImages.length}) <ChevronDown size={16} />
            </Link>
          </div>
        )}

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
              onClick={() => setSelectedImage(null)}
            >
              <button
                className="absolute top-6 right-6 text-white hover:text-slate-300 p-2 bg-white/10 rounded-full"
                onClick={() => setSelectedImage(null)}
              >
                <X size={24} />
              </button>

              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="max-w-4xl max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedImage}
                  alt="Enlarged view"
                  className="w-auto max-h-[85vh] object-contain"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
