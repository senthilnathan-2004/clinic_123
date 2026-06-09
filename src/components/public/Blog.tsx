"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, User, Calendar, X, ArrowUpRight, ChevronDown } from "lucide-react";
import Link from "next/link";

const translations: Record<string, Record<string, string>> = {
  english: {
    tag: "Health Blog",
    title: "Tips from Our Medical Experts",
    subtitle: "Read medical advisories, vaccination guideposts, and gut health tips published by our consulting doctors.",
    btn_read: "Read Full Article",
    author_by: "By",
    see_all: "See All Blogs",
  },
  tamil: {
    tag: "வலைப்பதிவு",
    title: "எங்கள் மருத்துவ நிபுணர்களின் குறிப்புகள்",
    subtitle: "எங்கள் ஆலோசனை மருத்துவர்கள் வெளியிட்ட மருத்துவ ஆலோசனைகள், தடுப்பூசி வழிகாட்டிகள் மற்றும் குடல் ஆரோக்கியக் குறிப்புகளைப் படியுங்கள்.",
    btn_read: "முழு கட்டுரையையும் படியுங்கள்",
    author_by: "எழுதியவர்",
    see_all: "அனைத்து வலைப்பதிவுகளையும் காண்க",
  },
  malayalam: {
    tag: "ബ്ലോഗ്",
    title: "ഞങ്ങളുടെ മെഡിക്കൽ വിദഗ്ദ്ധരുടെ നുറുങ്ങുകൾ",
    subtitle: "ഞങ്ങളുടെ കൺസൾട്ടിംഗ് ഡോക്ടർമാർ പ്രസിദ്ധീകരിച്ച മെഡിക്കൽ നിർദ്ദേശങ്ങളും ആരോഗ്യ നുറുങ്ങുകളും വായിക്കുക.",
    btn_read: "മുഴുവൻ ലേഖനവും വായിക്കുക",
    author_by: "രചയിതാവ്",
    see_all: "എല്ലാ ബ്ലോഗുകളും കാണുക",
  },
  kannada: {
    tag: "ಬ್ಲಾಗ್",
    title: "ನಮ್ಮ ವೈದ್ಯಕೀಯ ತಜ್ಞರ ಸಲಹೆಗಳು",
    subtitle: "ನಮ್ಮ ಸಮಾಲೋಚನಾ ವೈದ್ಯರು ಪ್ರಕಟಿಸಿದ ವೈದ್ಯಕೀಯ ಸಲಹೆಗಳು ಮತ್ತು ಆರೋಗ್ಯ ಸಲಹೆಗಳನ್ನು ಓದಿ.",
    btn_read: "ಪೂರ್ಣ ಲೇಖನ ಓದಿ",
    author_by: "ಬರೆದವರು",
    see_all: "ಎಲ್ಲಾ ಬ್ಲಾಗ್‌ಗಳನ್ನು ನೋಡಿ",
  },
  telugu: {
    tag: "బ్లాగ్",
    title: "మా వైద్య నిపుణుల చిట్కాలు",
    subtitle: "మా కన్సల్టింగ్ వైద్యులు ప్రచురించిన వైద్య సలహాలు మరియు ఆరోగ్య చిట్కాలను చదవండి.",
    btn_read: "పూర్తి కథనాన్ని చదవండి",
    author_by: "రాసిన వారు",
  }
};

export function Blog({ posts }: { posts: any[] }) {
  const [selectedPost, setSelectedPost] = useState<any | null>(null);
  const [lang, setLang] = useState("english");
  const [isMobile, setIsMobile] = useState(false);

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

  const maxVisible = isMobile ? 2 : 3;
  const visiblePosts = posts.slice(0, maxVisible);

  return (
    <section id="blog" className="py-20 bg-slate-50 dark:bg-slate-900/50 relative bg-grid-pattern lg:min-h-screen lg:flex lg:items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-3">
          <h2 className="text-base font-bold text-secondary tracking-widest uppercase font-outfit">{t.tag}</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-outfit">
            {t.title}
          </h3>
          <p className="text-slate-600 dark:text-slate-400 font-inter">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visiblePosts.map((post, idx) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="glass-card flex flex-col h-full rounded-3xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-800"
            >
              {/* Blog Image */}
              {post.imageUrl && (
                <div className="h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800 relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.imageUrl || "https://images.unsplash.com/photo-1628771065518-0d82f11181d6?auto=format&fit=crop&q=80&w=400"}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1628771065518-0d82f11181d6?auto=format&fit=crop&q=80&w=400";
                    }}
                  />
                  <span className="absolute top-4 left-4 bg-primary text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                </div>
              )}

              {/* Content Panel */}
              <div className="p-6 flex flex-col justify-between flex-grow gap-4">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3 text-[10px] sm:text-xs text-slate-500 dark:text-slate-400 font-medium font-inter">
                    <span className="flex items-center gap-1"><User size={12} /> {post.author}</span>
                    <span className="flex items-center gap-1"><Calendar size={12} /> {new Date(post.createdAt).toLocaleDateString("en-IN")}</span>
                  </div>
                  <h4 className="text-lg font-bold font-outfit text-slate-900 dark:text-white leading-snug line-clamp-2">
                    {post.title}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-inter line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedPost(post)}
                  className="flex items-center gap-1 text-xs font-bold text-primary hover:text-primary-foreground hover:bg-primary px-4 py-2.5 rounded-xl border border-primary/20 hover:border-transparent transition-all duration-300 self-start"
                >
                  {t.btn_read} <ArrowUpRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* See All Blogs button */}
        {posts.length > (isMobile ? 2 : 3) && (
          <div className="flex justify-center mt-12">
            <Link
              href="/blogs"
              className="flex items-center gap-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 px-6 py-3 rounded-full text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm cursor-pointer"
            >
              {t.see_all} ({posts.length}) <ChevronDown size={16} />
            </Link>
          </div>
        )}

        {/* Blog Modal Lightbox */}
        <AnimatePresence>
          {selectedPost && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 overflow-y-auto"
              onClick={() => setSelectedPost(null)}
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                className="bg-white dark:bg-slate-955 max-w-2xl w-full rounded-3xl overflow-hidden shadow-2xl relative max-h-[85vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  className="absolute top-4 right-4 text-slate-600 dark:text-slate-400 hover:bg-slate-100 p-2 rounded-full z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur"
                  onClick={() => setSelectedPost(null)}
                >
                  <X size={20} />
                </button>

                <div className="overflow-y-auto p-6 sm:p-8 flex flex-col gap-6">
                  {/* Category Tag & Meta */}
                  <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-405 font-inter">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">{selectedPost.category}</span>
                    <span>{t.author_by} {selectedPost.author}</span>
                    <span>•</span>
                    <span>{new Date(selectedPost.createdAt).toLocaleDateString("en-IN")}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl font-extrabold font-outfit text-slate-900 dark:text-white leading-tight">
                    {selectedPost.title}
                  </h3>

                  {/* Featured Image */}
                  {selectedPost.imageUrl && (
                    <div className="w-full h-64 sm:h-80 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 shadow-inner">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={selectedPost.imageUrl || "https://images.unsplash.com/photo-1628771065518-0d82f11181d6?auto=format&fit=crop&q=80&w=400"}
                        alt={selectedPost.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1628771065518-0d82f11181d6?auto=format&fit=crop&q=80&w=400";
                        }}
                      />
                    </div>
                  )}

                  {/* Body Content */}
                  <div
                    className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 font-inter leading-relaxed text-sm sm:text-base space-y-4"
                    dangerouslySetInnerHTML={{ __html: selectedPost.content }}
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
