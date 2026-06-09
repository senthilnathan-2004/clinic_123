"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

const translations: Record<string, Record<string, string>> = {
  english: {
    tag: "Get in Touch",
    title: "We are Here to Help You",
    subtitle: "Contact us for any clinical queries, emergency support, or guidance.",
    address_label: "Clinic Address",
    phone_label: "Phone Number",
    phone_consult: "Consultation",
    phone_emergency: "Emergency",
    email_label: "Email Support",
    hours_label: "Working Hours",
    form_title: "Send Us a Message",
    form_name: "Name",
    form_phone: "Phone",
    form_email: "Email",
    form_msg: "Message",
    placeholder_name: "Your name",
    placeholder_phone: "Mobile number",
    placeholder_email: "Email address",
    placeholder_msg: "Write your clinical inquiry...",
    btn_submit: "Submit Message",
    submitting: "Sending...",
    success_title: "Message Sent!",
    success_desc: "Thank you. We have received your inquiry and will respond to your email or phone number shortly.",
    btn_another: "Send Another Message",
  },
  tamil: {
    tag: "தொடர்பு கொள்ள",
    title: "நாங்கள் உங்களுக்கு உதவ தயாராக உள்ளோம்",
    subtitle: "ஏதேனும் மருத்துவ கேள்விகள், அவசர உதவி அல்லது வழிகாட்டுதலுக்கு எங்களைத் தொடர்பு கொள்ளவும்.",
    address_label: "மருத்துவமனை முகவரி",
    phone_label: "தொலைபேசி எண்",
    phone_consult: "ஆலோசனை",
    phone_emergency: "அவசரம்",
    email_label: "மின்னஞ்சல் ஆதரவு",
    hours_label: "வேலை நேரம்",
    form_title: "எங்களுக்கு ஒரு செய்தி அனுப்பவும்",
    form_name: "பெயர்",
    form_phone: "தொலைபேசி",
    form_email: "மின்னஞ்சல்",
    form_msg: "செய்தி",
    placeholder_name: "உங்கள் பெயர்",
    placeholder_phone: "கைபேசி எண்",
    placeholder_email: "மின்னஞ்சல் முகவரி",
    placeholder_msg: "உங்கள் மருத்துவ கேள்வியை எழுதவும்...",
    btn_submit: "செய்தியை அனுப்பவும்",
    submitting: "அனுப்புகிறது...",
    success_title: "செய்தி அனுப்பப்பட்டது!",
    success_desc: "நன்றி. உங்கள் விசாரிப்பு எங்களுக்குக் கிடைத்துள்ளது. விரைவில் உங்களைத் தொடர்பு கொள்வோம்.",
    btn_another: "மற்றொரு செய்தியை அனுப்பவும்",
  },
  malayalam: {
    tag: "ബന്ധപ്പെടുക",
    title: "ഞങ്ങൾ സഹായിക്കാൻ ഇവിടെയുണ്ട്",
    subtitle: "ക്ലിനിക്കൽ ചോദ്യങ്ങൾക്കും അടിയന്തര പിന്തുണയ്ക്കും മാർഗ്ഗനിർദ്ദേശങ്ങൾക്കുമായി ഞങ്ങളെ ബന്ധപ്പെടുക.",
    address_label: "ക്ലിനിക് വിലാസം",
    phone_label: "ഫോൺ നമ്പർ",
    phone_consult: "കൺസൾട്ടേഷൻ",
    phone_emergency: "അടിയന്തിരം",
    email_label: "ഇമെയിൽ പിന്തുണ",
    hours_label: "പ്രവൃത്തി സമയം",
    form_title: "ഞങ്ങൾക്ക് ഒരു സന്ദേശം അയയ്‌ക്കുക",
    form_name: "പേര്",
    form_phone: "ഫോൺ",
    form_email: "ഇമെയിൽ",
    form_msg: "സന്ദേശം",
    placeholder_name: "നിങ്ങളുടെ പേര്",
    placeholder_phone: "മൊബൈൽ നമ്പർ",
    placeholder_email: "ഇമെയിൽ വിലാസം",
    placeholder_msg: "നിങ്ങളുടെ ചോദ്യം ഇവിടെ എഴുതുക...",
    btn_submit: "സന്ദേശം അയക്കുക",
    submitting: "അയക്കുന്നു...",
    success_title: "സന്ദേശം അയച്ചു!",
    success_desc: "നന്ദി. നിങ്ങളുടെ അന്വേഷണം ഞങ്ങൾക്ക് ലഭിച്ചു, ഞങ്ങൾ നിങ്ങളെ ഉടൻ ബന്ധപ്പെടും.",
    btn_another: "മറ്റൊരു സന്ദേശം അയക്കുക",
  },
  kannada: {
    tag: "ಸಂಪರ್ಕಿಸಿ",
    title: "ನಾವು ನಿಮಗೆ ಸಹಾಯ ಮಾಡಲು ಇಲ್ಲಿದ್ದೇವೆ",
    subtitle: "ಯಾವುದೇ ಕ್ಲಿನಿಕಲ್ ಪ್ರಶ್ನೆಗಳು, ತುರ್ತು ಬೆಂಬಲ ಅಥವಾ ಮಾರ್ಗದರ್ಶನಕ್ಕಾಗಿ ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ.",
    address_label: "ಕ್ಲಿನಿಕ್ ವಿಳಾಸ",
    phone_label: "ದೂರವಾಣಿ ಸಂಖ್ಯೆ",
    phone_consult: "ಸಮಾಲೋಚನೆ",
    phone_emergency: "ತುರ್ತು",
    email_label: "ಇಮೇಲ್ ಬೆಂಬಲ",
    hours_label: "ಕೆಲಸದ ಸಮಯ",
    form_title: "ನಮಗೆ ಸಂದೇಶ ಕಳುಹಿಸಿ",
    form_name: "ಹೆಸರು",
    form_phone: "ದೂರವಾಣಿ",
    form_email: "ಇಮೇಲ್",
    form_msg: "ಸಂದೇಶ",
    placeholder_name: "ನಿಮ್ಮ ಹೆಸರು",
    placeholder_phone: "ಮೊಬೈಲ್ ಸಂಖ್ಯೆ",
    placeholder_email: "ಇಮೇಲ್ ವಿಳಾಸ",
    placeholder_msg: "ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಇಲ್ಲಿ ಬರೆಯಿರಿ...",
    btn_submit: "ಸಂದೇಶ ಕಳುಹಿಸಿ",
    submitting: "ಕಳುಹಿಸಲಾಗುತ್ತಿದೆ...",
    success_title: "ಸಂದೇಶ ಕಳುಹಿಸಲಾಗಿದೆ!",
    success_desc: "ಧನ್ಯವಾದಗಳು. ನಿಮ್ಮ ವಿಚಾರಣೆಯನ್ನು ನಾವು ಸ್ವೀಕರಿಸಿದ್ದೇವೆ ಮತ್ತು ಶೀಘ್ರದಲ್ಲೇ ಪ್ರತಿಕ್ರಿಯಿಸುತ್ತೇವೆ.",
    btn_another: "ಮತ್ತೊಂದು ಸಂದೇಶ ಕಳುಹಿಸಿ",
  },
  telugu: {
    tag: "సంప్రదించండి",
    title: "మేము సహాయం చేయడానికి ఇక్కడ ఉన్నాము",
    subtitle: "ఏవైనా వైద్య ప్రశ్నలు, అత్యవసర మద్దతు లేదా మార్గదర్శకత్వం కోసం మమ్మల్ని సంప్రదించండి.",
    address_label: "క్లినిక్ చిరునామా",
    phone_label: "ఫోన్ నంబర్",
    phone_consult: "సంప్రదింపులు",
    phone_emergency: "అత్యవసరం",
    email_label: "ఇమెయిల్ మద్దతు",
    hours_label: "పని వేళలు",
    form_title: "మాకు సందేశం పంపండి",
    form_name: "పేరు",
    form_phone: "ఫోన్",
    form_email: "ఇమెయిల్",
    form_msg: "సందేశం",
    placeholder_name: "మీ పేరు",
    placeholder_phone: "మొబైల్ సంఖ్య",
    placeholder_email: "ఇమెయిల్ చిరునామా",
    placeholder_msg: "మీ ప్రశ్నను ఇక్కడ రాయండి...",
    btn_submit: "సందేశాన్ని సమర్పించండి",
    submitting: "పంపుతోంది...",
    success_title: "సందేశం పంపబడింది!",
    success_desc: "ధన్యవాదங்கள். మేము మీ విచారణను అందుకున్నాము మరియు త్వరలోనే మీకు ప్రతిస్పందిస్తాము.",
    btn_another: "మరో సందేశాన్ని పంపండి",
  }
};

export function Contact({ settings }: { settings: any }) {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setSuccess(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-background relative bg-dot-pattern">
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-3">
          <h2 className="text-base font-bold text-secondary tracking-widest uppercase font-outfit">{t.tag}</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-outfit">
            {t.title}
          </h3>
          <p className="text-slate-600 dark:text-slate-400 font-inter">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Info Side */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            <div className="glass-panel p-6 rounded-2xl flex items-start gap-4 border border-slate-100 dark:border-slate-800">
              <div className="bg-primary/10 dark:bg-primary/20 p-3.5 rounded-xl text-primary flex-shrink-0">
                <MapPin size={22} />
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white font-outfit">{t.address_label}</h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-350 leading-relaxed font-inter">
                  {settings?.address || "123 Doctors Plaza, Central Metro, Chennai"}
                </p>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl flex items-start gap-4 border border-slate-100 dark:border-slate-800">
              <div className="bg-primary/10 dark:bg-primary/20 p-3.5 rounded-xl text-primary flex-shrink-0">
                <Phone size={22} />
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white font-outfit">{t.phone_label}</h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-350 font-inter">
                  {t.phone_consult}: {settings?.phone || "+91 94444 56789"}
                </p>
                <p className="text-xs text-rose-500 font-semibold font-inter">
                  {t.phone_emergency}: {settings?.emergencyPhone || "+91 94444 99999"}
                </p>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl flex items-start gap-4 border border-slate-100 dark:border-slate-800">
              <div className="bg-primary/10 dark:bg-primary/20 p-3.5 rounded-xl text-primary flex-shrink-0">
                <Mail size={22} />
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white font-outfit">{t.email_label}</h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-350 font-inter">
                  {settings?.email || "contact@sugamclinic.com"}
                </p>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl flex items-start gap-4 border border-slate-100 dark:border-slate-800">
              <div className="bg-primary/10 dark:bg-primary/20 p-3.5 rounded-xl text-primary flex-shrink-0">
                <Clock size={22} />
              </div>
              <div className="flex flex-col gap-1">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white font-outfit">{t.hours_label}</h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-350 font-inter">
                  {settings?.workingHours || "Mon - Sat: 9:00 AM - 8:30 PM"}
                </p>
              </div>
            </div>

          </div>

          {/* Form Side */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-8 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800 h-full flex flex-col justify-center">
              
              {success ? (
                <div className="text-center py-10 flex flex-col items-center gap-4">
                  <div className="bg-emerald-100 dark:bg-emerald-950/40 p-4 rounded-full text-emerald-500 mb-2">
                    <CheckCircle size={48} />
                  </div>
                  <h4 className="text-xl font-bold font-outfit text-slate-900 dark:text-white">{t.success_title}</h4>
                  <p className="text-slate-600 dark:text-slate-400 font-inter max-w-sm">
                    {t.success_desc}
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="mt-4 bg-primary text-white text-xs font-bold py-2 px-6 rounded-full transition-all cursor-pointer"
                  >
                    {t.btn_another}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h4 className="text-lg font-bold font-outfit text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                    <MessageSquare size={18} className="text-secondary" /> {t.form_title}
                  </h4>

                  {error && <p className="text-xs text-rose-500 font-semibold">{error}</p>}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-600 dark:text-slate-450 font-outfit">{t.form_name}</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm"
                        placeholder={t.placeholder_name}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-600 dark:text-slate-450 font-outfit">{t.form_phone}</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm"
                        placeholder={t.placeholder_phone}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-455 font-outfit">{t.form_email}</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm"
                      placeholder={t.placeholder_email}
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-455 font-outfit">{t.form_msg}</label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm"
                      placeholder={t.placeholder_msg}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary hover:bg-primary/95 text-white font-bold py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Send size={16} /> {loading ? t.submitting : t.btn_submit}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

        {/* Map Embed Section */}
        <div className="mt-16 rounded-3xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 h-[380px] bg-slate-100 dark:bg-slate-900">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.6234984210967!2d80.2039281!3d13.0601988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5266ef21f92e03%3A0x6e9f6920f666b69b!2sChennai%20Central%20Railway%20Station!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title="Clinic Location Map"
          ></iframe>
        </div>

      </motion.div>
    </section>
  );
}
