"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, MessageSquarePlus, X, CheckCircle2 } from "lucide-react";

const translations: Record<string, Record<string, string>> = {
  english: {
    tag: "Patient Stories",
    title: "What Our Patients Say",
    subtitle: "Real feedback from parents and patients who have experienced our care.",
    write_btn: "Write a Review",
    verified: "Verified Patient",
    modal_title: "Submit Patient Review",
    modal_desc: "Help other families learn about our clinic care quality.",
    label_name: "Your Name",
    label_rating: "Rating",
    label_msg: "Review / Message",
    placeholder_name: "Enter your name",
    placeholder_msg: "Share your experience with our doctor and care team...",
    submit_btn: "Submit Review",
    submitting: "Submitting...",
    success_title: "Review Submitted!",
    success_desc: "Thank you for sharing your experience. Your review has been sent for moderation and will appear on the website once approved.",
    close_btn: "Close Window",
  },
  tamil: {
    tag: "நோயாளிகளின் கதைகள்",
    title: "எங்கள் நோயாளிகள் கூறுவது",
    subtitle: "எங்கள் சிகிச்சையைப் பெற்ற பெற்றோர்கள் மற்றும் நோயாளிகளின் உண்மையான கருத்துக்கள்.",
    write_btn: "மதிப்புரை எழுதவும்",
    verified: "சரிபார்க்கப்பட்ட நோயாளி",
    modal_title: "நோயாளி மதிப்புரையை சமர்ப்பிக்கவும்",
    modal_desc: "எங்கள் மருத்துவமனையின் சிகிச்சை தரத்தைப் பற்றி மற்ற குடும்பங்கள் அறிய உதவுங்கள்.",
    label_name: "உங்கள் பெயர்",
    label_rating: "மதிப்பீடு",
    label_msg: "மதிப்புரை / செய்தி",
    placeholder_name: "உங்கள் பெயரை உள்ளிடவும்",
    placeholder_msg: "எங்கள் மருத்துவர் மற்றும் பராமரிப்புக் குழுவுடனான உங்கள் அனுபவத்தைப் பகிர்ந்து கொள்ளுங்கள்...",
    submit_btn: "மதிப்புரையைச் சமர்ப்பிக்கவும்",
    submitting: "சமர்ப்பிக்கிறது...",
    success_title: "மதிப்புரை சமர்ப்பிக்கப்பட்டது!",
    success_desc: "உங்கள் அனுபவத்தைப் பகிர்ந்தமைக்கு நன்றி. உங்கள் மதிப்புரை மதிப்பீட்டிற்கு அனுப்பப்பட்டுள்ளது மற்றும் அங்கீகரிக்கப்பட்டதும் இணையதளத்தில் தோன்றும்.",
    close_btn: "சாளரத்தை மூடவும்",
  },
  malayalam: {
    tag: "രോഗികളുടെ കഥകൾ",
    title: "ഞങ്ങളുടെ രോഗികൾ പറയുന്നത്",
    subtitle: "ഞങ്ങളുടെ പരിചരണം അനുഭവിച്ചറിഞ്ഞ മാതാപിതാക്കളുടെയും രോഗികളുടെയും യഥാർത്ഥ പ്രതികരണങ്ങൾ.",
    write_btn: "അഭിപ്രായം എഴുതുക",
    verified: "അംഗീകൃത രോഗി",
    modal_title: "രോഗിയുടെ അഭിപ്രായം സമർപ്പിക്കുക",
    modal_desc: "ഞങ്ങളുടെ ക്ലിനിക്കിലെ പരിചരണ നിലവാരത്തെക്കുറിച്ച് മറ്റ് കുടുംബങ്ങൾക്ക് അറിയാൻ സഹായിക്കുക.",
    label_name: "നിങ്ങളുടെ പേര്",
    label_rating: "റേറ്റിംഗ്",
    label_msg: "അഭിപ്രായം / സന്ദേശം",
    placeholder_name: "നിങ്ങളുടെ പേര് നൽകുക",
    placeholder_msg: "ഞങ്ങളുടെ ഡോക്ടറുമായും പരിചരണ സംഘവുമായുള്ള നിങ്ങളുടെ അനുഭവം പങ്കിടുക...",
    submit_btn: "അഭിപ്രായം സമർപ്പിക്കുക",
    submitting: "സമർപ്പിക്കുന്നു...",
    success_title: "അഭിപ്രായം സമർപ്പിച്ചു!",
    success_desc: "നിങ്ങളുടെ അനുഭവം പങ്കിട്ടതിന് നന്ദി. നിങ്ങളുടെ അഭിപ്രായം പരിശോധനയ്ക്കായി അയച്ചിരിക്കുന്നു, അംഗീകരിച്ചുകഴിഞ്ഞാൽ വെബ്സൈറ്റിൽ ദൃശ്യമാകും.",
    close_btn: "വിൻഡോ അടയ്ക്കുക",
  },
  kannada: {
    tag: "ರೋಗಿಗಳ ಕಥೆಗಳು",
    title: "ನಮ್ಮ ರೋಗಿಗಳು ಏನು ಹೇಳುತ್ತಾರೆ",
    subtitle: "ನಮ್ಮ ಸೇವೆಯನ್ನು ಪಡೆದ ಪೋಷಕರು ಮತ್ತು ರೋಗಿಗಳಿಂದ ನೈಜ ಪ್ರತಿಕ್ರಿಯೆ.",
    write_btn: "ಅಭಿಪ್ರಾಯ ಬರೆಯಿರಿ",
    verified: "ಪರಿಶೀಲಿಸಿದ ರೋಗಿ",
    modal_title: "ರೋಗಿಯ ಅಭಿಪ್ರಾಯವನ್ನು ಸಲ್ಲಿಸಿ",
    modal_desc: "ಇತರ ಕುಟುಂಬಗಳು ನಮ್ಮ ಚಿಕಿತ್ಸೆಯ ಗುಣಮಟ್ಟವನ್ನು ತಿಳಿಯಲು ಸಹಾಯ ಮಾಡಿ.",
    label_name: "ನಿಮ್ಮ ಹೆಸರು",
    label_rating: "ರೇಟಿಂಗ್",
    label_msg: "ಅಭಿಪ್ರಾಯ / ಸಂದೇಶ",
    placeholder_name: "ನಿಮ್ಮ ಹೆಸರು ನಮೂದಿಸಿ",
    placeholder_msg: "ನಮ್ಮ ವೈದ್ಯರು ಮತ್ತು ಆರೈಕೆ ತಂಡದೊಂದಿಗಿನ ನಿಮ್ಮ ಅನುಭವವನ್ನು ಹಂಚಿಕೊಳ್ಳಿ...",
    submit_btn: "ಅಭಿಪ್ರಾಯ ಸಲ್ಲಿಸಿ",
    submitting: "ಸಲ್ಲಿಸಲಾಗುತ್ತಿದೆ...",
    success_title: "ಅಭಿಪ್ರಾಯ ಸಲ್ಲಿಸಲಾಗಿದೆ!",
    success_desc: "ನಿಮ್ಮ ಅನುಭವವನ್ನು ಹಂಚಿಕೊಂಡಿದ್ದಕ್ಕಾಗಿ ಧನ್ಯವಾದಗಳು. ನಿಮ್ಮ ಅಭಿಪ್ರಾಯವನ್ನು ಪರಿಶೀಲನೆಗೆ ಕಳುಹಿಸಲಾಗಿದೆ ಮತ್ತು ಅನುಮೋದಿಸಿದ ನಂತರ ವೆಬ್‌ಸೈಟ್‌ನಲ್ಲಿ ಪ್ರದರ್ಶಿಸಲಾಗುತ್ತದೆ.",
    close_btn: "ವಿಂಡೋ ಮುಚ್ಚಿ",
  },
  telugu: {
    tag: "రోగుల కథనాలు",
    title: "మా రోగులు ఏమంటున్నారు",
    subtitle: "మా సంరక్షణను అనుభవించిన తల్లిదండ్రులు మరియు రోగుల నుండి నిజమైన అభిప్రాయాలు.",
    write_btn: "సమీక్ష రాయండి",
    verified: "ధృవీకరించబడిన రోగి",
    modal_title: "రోగి సమీక్షను సమర్పించండి",
    modal_desc: "మా క్లినిక్ సంరక్షణ నాణ్యత గురించి ఇతర కుటుంబాలు తెలుసుకోవడానికి సహాయపడండి.",
    label_name: "మీ పేరు",
    label_rating: "రేటింగ్",
    label_msg: "సమీక్ష / సందేశం",
    placeholder_name: "మీ పేరు నమోదు చేయండి",
    placeholder_msg: "మా వైద్యుడు మరియు సంరక్షణ బృందంతో మీ అనుభవాన్ని పంచుకోండి...",
    submit_btn: "సమీక్షను సమర్పించండి",
    submitting: "సమర్పిస్తోంది...",
    success_title: "సమీక్ష సమర్పించబడింది!",
    success_desc: "మీ అనుభవాన్ని పంచుకున్నందుకు ధన్యవాదాలు. సమీక్ష మోడరేషన్ కోసం పంపబడింది మరియు ఆమోదించబడిన తర్వాత వెబ్‌సైట్‌లో కనిపిస్తుంది.",
    close_btn: "విండోను మూసివేయి",
  }
};

export function Reviews({ reviews }: { reviews: any[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [lang, setLang] = useState("english");

  React.useEffect(() => {
    const current = localStorage.getItem("clinic_lang") || "english";
    setLang(current);

    const handleLangChange = (e: any) => {
      setLang(e.detail);
    };
    window.addEventListener("langChange", handleLangChange);
    return () => window.removeEventListener("langChange", handleLangChange);
  }, []);

  const t = translations[lang] || translations.english;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/admin/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, rating, reviewText }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit review");
      }

      setSuccess(true);
      setName("");
      setReviewText("");
      setRating(5);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  // Duplicate the reviews array to create a seamless infinite scroll loop
  const scrollReviews = [...reviews, ...reviews, ...reviews];

  return (
    <section id="reviews" className="py-20 bg-background overflow-hidden relative bg-dot-pattern lg:min-h-screen lg:flex lg:items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
          <div className="text-left max-w-2xl flex flex-col gap-3">
            <h2 className="text-base font-bold text-secondary tracking-widest uppercase font-outfit">{t.tag}</h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-outfit">
              {t.title}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 font-inter">
              {t.subtitle}
            </p>
          </div>
          
          <button
            onClick={() => {
              setSuccess(false);
              setIsOpen(true);
            }}
            className="flex items-center gap-2 bg-primary hover:bg-primary/95 text-white font-semibold px-6 py-3 rounded-full shadow-lg shadow-primary/10 hover:shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer text-sm font-outfit"
          >
            <MessageSquarePlus size={16} /> {t.write_btn}
          </button>
        </div>
      </div>

      {/* Infinite Auto-Scrolling Testimonial Row */}
      <div className="relative w-full overflow-hidden py-4">
        {/* Left Gradient Shadow */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />

        {/* Marquee Wrapper */}
        <motion.div
          className="flex gap-6 px-4 flex-nowrap"
          style={{ width: "max-content" }}
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            duration: 40,
            ease: "linear",
          }}
        >
          {/* Duplicate for seamless loop */}
          {[...scrollReviews].map((review, idx) => (
            <div
              key={`${review._id}-${idx}`}
              className="glass-card p-6 rounded-2xl flex flex-col justify-between border border-slate-100 dark:border-slate-800 w-80 sm:w-96 flex-shrink-0"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex gap-1 text-amber-500 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < review.rating ? "fill-current" : "opacity-35"}
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-sm text-slate-750 dark:text-slate-300 font-inter leading-relaxed italic mb-6">
                  "{review.reviewText}"
                </p>
              </div>

              {/* Patient Info */}
              <div className="flex items-center gap-3 border-t border-slate-50 dark:border-slate-800/80 pt-4 mt-auto">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 flex-shrink-0">
                  {review.photoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={review.photoUrl}
                      alt={review.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                      {review.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <h5 className="text-sm font-bold text-slate-900 dark:text-white font-outfit">
                    {review.name}
                  </h5>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-inter">{t.verified}</span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Right Gradient Shadow */}
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      </div>


      {/* Review Submission Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white dark:bg-slate-900 max-w-md w-full rounded-3xl p-6 sm:p-8 shadow-2xl relative border border-slate-200 dark:border-slate-800"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
              >
                <X size={20} />
              </button>

              {success ? (
                <div className="text-center py-6 flex flex-col items-center gap-4">
                  <div className="bg-emerald-100 dark:bg-emerald-950/40 p-4 rounded-full text-emerald-500 mb-2">
                    <CheckCircle2 size={48} />
                  </div>
                  <h4 className="text-xl font-bold font-outfit text-slate-900 dark:text-white">{t.success_title}</h4>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-inter leading-relaxed max-w-xs">
                    {t.success_desc}
                  </p>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="mt-4 bg-primary text-white text-xs font-bold py-2.5 px-6 rounded-full transition-all cursor-pointer"
                  >
                    {t.close_btn}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 text-xs sm:text-sm">
                  <div className="flex flex-col gap-1.5">
                    <h4 className="text-lg font-bold font-outfit text-slate-900 dark:text-white">{t.modal_title}</h4>
                    <p className="text-[11px] text-slate-500 font-inter">{t.modal_desc}</p>
                  </div>

                  {error && <p className="text-xs text-rose-500 font-bold">{error}</p>}

                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-bold text-slate-700 dark:text-slate-350 font-outfit">{t.label_name}</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t.placeholder_name}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/45 text-xs"
                    />
                  </div>

                  {/* Rating Star Picker */}
                  <div className="flex flex-col gap-2">
                    <label className="font-bold text-slate-700 dark:text-slate-350 font-outfit">{t.label_rating}</label>
                    <div className="flex gap-2">
                      {Array.from({ length: 5 }).map((_, i) => {
                        const starValue = i + 1;
                        return (
                          <button
                            type="button"
                            key={i}
                            onClick={() => setRating(starValue)}
                            onMouseEnter={() => setHoverRating(starValue)}
                            onMouseLeave={() => setHoverRating(null)}
                            className="text-amber-500 transition-transform hover:scale-110 cursor-pointer"
                          >
                            <Star
                              size={28}
                              className={
                                starValue <= (hoverRating ?? rating)
                                  ? "fill-current"
                                  : "opacity-35"
                              }
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Review Text */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-bold text-slate-700 dark:text-slate-350 font-outfit">{t.label_msg}</label>
                    <textarea
                      required
                      rows={4}
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      placeholder={t.placeholder_msg}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/45 text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-primary hover:bg-primary/95 text-white font-bold py-3 rounded-xl shadow transition-all cursor-pointer text-xs disabled:opacity-50"
                  >
                    {submitting ? t.submitting : t.submit_btn}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
