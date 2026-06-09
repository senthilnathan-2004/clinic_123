"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Calendar, User, Phone, Mail, Clock, MessageSquare, CheckCircle, AlertCircle } from "lucide-react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";

const translations: Record<string, Record<string, string>> = {
  english: {
    title: "Appointment",
    subtitle: "Book an Appointment Instantly",
    desc: "Fill in the details below to request a slot. We will confirm your appointment via email or phone.",
    name: "Full Name",
    phone: "Phone Number",
    email: "Email Address",
    date: "Preferred Date",
    time: "Preferred Time",
    doctor: "Choose Pediatrician / Consultant",
    message: "Message / Symptoms",
    submit: "Request Appointment Slot",
    success_title: "Request Received!",
    success_desc: "Thank you for booking with Sugam Clinic. We have sent an acknowledgment email. We will reach out shortly to confirm your slot.",
    success_btn: "Book Another Appointment",
  },
  tamil: {
    title: "முன்பதிவு",
    subtitle: "உடனடியாக முன்பதிவு செய்ய",
    desc: "முன்பதிவு செய்ய கீழ் உள்ள விவரங்களை நிரப்பவும். மின்னஞ்சல் அல்லது தொலைபேசி மூலம் உறுதி செய்வோம்.",
    name: "முழு பெயர்",
    phone: "தொலைபேசி எண்",
    email: "மின்னஞ்சல் முகவரி",
    date: "முன்பதிவு தேதி",
    time: "முன்பதிவு நேரம்",
    doctor: "மருத்துவரை தேர்ந்தெடுக்கவும்",
    message: "அறிகுறிகள் / செய்தி",
    submit: "முன்பதிவு கோரவும்",
    success_title: "கோரிக்கை பெறப்பட்டது!",
    success_desc: "முன்பதிவு செய்தமைக்கு நன்றி. உறுதிப்படுத்தியதும் உங்களைத் தொடர்பு கொள்வோம்.",
    success_btn: "மீண்டும் முன்பதிவு செய்ய",
  },
  malayalam: {
    title: "അപ്പോയിന്റ്മെന്റ്",
    subtitle: "പെട്ടെന്ന് ബുക്ക് ചെയ്യുക",
    desc: "താഴെ വിവരങ്ങൾ നൽകി ബുക്കിങ് അഭ്യർത്ഥിക്കുക. ഫോൺ അല്ലെങ്കിൽ ഇമെയിൽ വഴി ഞങ്ങൾ അപ്പോയിന്റ്മെന്റ് സ്ഥിരീകരിക്കും.",
    name: "പൂർണ്ണ പേര്",
    phone: "ഫോൺ നമ്പർ",
    email: "ഇമെയിൽ വിലാസം",
    date: "തീയതി",
    time: "സമയം",
    doctor: "ഡോക്ടറെ തിരഞ്ഞെടുക്കുക",
    message: "രോഗലക്ഷണങ്ങൾ / സന്ദേശം",
    submit: "അപ്പോയിന്റ്മെന്റ് ബുക്ക് ചെയ്യുക",
    success_title: "ബുക്കിങ് ലഭിച്ചു!",
    success_desc: "ബുക്ക് ചെയ്തതിന് നന്ദി. സ്ഥിരീകരണത്തിനായി ഞങ്ങൾ ഉടൻ ബന്ധപ്പെടും.",
    success_btn: "മറ്റൊരു അപ്പോയിന്റ്മെന്റ് ബുക്ക് ചെയ്യുക",
  },
  kannada: {
    title: "ಅಪಾಯಿಂಟ್ಮೆಂಟ್",
    subtitle: "ತಕ್ಷಣ ಅಪಾಯಿಂಟ್ಮೆಂಟ್ ಬುಕ್ ಮಾಡಿ",
    desc: "ಅಪಾಯಿಂಟ್ಮೆಂಟ್ ಕೋರಲು ಈ ಕೆಳಗಿನ ವಿವರಗಳನ್ನು ತುಂಬಿ. ಇಮೇಲ್ ಅಥವಾ ಫೋನ್ ಮೂಲಕ ನಾವು ದೃಢೀಕರಿಸುತ್ತೇವೆ.",
    name: "ಪೂರ್ಣ ಹೆಸರು",
    phone: "ಫ್ಹೋನ್ ಸಂಖ್ಯೆ",
    email: "ಇಮೇಲ್ ವಿಳಾಸ",
    date: "ದಿನಾಂಕ",
    time: "ಸಮಯ",
    doctor: "ವೈದ್ಯರನ್ನು ಆಯ್ಕೆ ಮಾಡಿ",
    message: "ರೋಗಲಕ್ಷಣಗಳು / ಸಂದೇಶ",
    submit: "ಅಪಾಯಿಂಟ್ಮೆಂಟ್ ಕೋರಿಕೆ ಸಲ್ಲಿಸಿ",
    success_title: "ಕೋರಿಕೆ ಸ್ವೀಕರಿಸಲಾಗಿದೆ!",
    success_desc: "ಬುಕ್ ಮಾಡಿದ್ದಕ್ಕಾಗಿ ಧನ್ಯವಾದಗಳು. ಅಪಾಯಿಂಟ್ಮೆಂಟ್ ದೃಢೀಕರಿಸಲು ನಾವು ಶೀಘ್ರದಲ್ಲೇ ಸಂಪರ್ಕಿಸುತ್ತೇವೆ.",
    success_btn: "ಮತ್ತೊಂದು ಅಪಾಯಿಂಟ್ಮೆಂಟ್ ಬುಕ್ ಮಾಡಿ",
  },
  telugu: {
    title: "అపాయింట్‌మెంట్",
    subtitle: "తక్షణమే అపాయింట్‌మెంట్ బుక్ చేసుకోండి",
    desc: "అపాయింట్‌మెంట్ కోసం క్రింది వివరాలను పూరించండి. ఈమెయిల్ లేదా ఫోన్ ద్వారా మేము నిర్ధారిస్తాము.",
    name: "పూర్తి పేరు",
    phone: "ఫోన్ నంబర్",
    email: "ఈమెయిల్ చిరునామా",
    date: "తేదీ",
    time: "సమయం",
    doctor: "వైద్యుడిని ఎంచుకోండి",
    message: "లక్షణాలు / సందేశం",
    submit: "అపాయింట్‌మెంట్ బుక్ చేయండి",
    success_title: "అభ్యర్థన స్వీకరించబడింది!",
    success_desc: "బుకింగ్ చేసినందుకు ధನ್ಯవాదాలు. అపాయింట్‌మెంట్ నిర్ధారించడానికి మేము త్వరలోనే సంప్రదిస్తాము.",
    success_btn: "మరొక అపాయింట్‌మెంట్ బుక్ చేయండి",
  }
};

const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  email: z.string().email("Invalid email address"),
  date: z.string().min(1, "Please select a date"),
  time: z.string().min(1, "Please select a time slot"),
  doctorId: z.string().min(1, "Please select a doctor"),
  message: z.string().optional(),
});

type BookingInput = z.infer<typeof bookingSchema>;

export function BookingForm({ doctors }: { doctors: any[] }) {
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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = async (data: BookingInput) => {
    setIsSubmitting(true);
    setError("");
    try {
      const selectedDoc = doctors.find((doc) => doc._id === data.doctorId);
      const payload = {
        ...data,
        doctorName: selectedDoc ? selectedDoc.name : "Any Doctor",
      };

      const response = await fetch("/api/admin/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to submit appointment request");
      }

      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
      });

      setSuccess(true);
      reset();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM",
    "06:30 PM", "07:00 PM", "07:30 PM", "08:00 PM",
  ];

  return (
    <section id="book-appointment" className="py-20 bg-slate-50 dark:bg-slate-900/50 bg-dot-pattern">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >

        <div className="text-center mb-12 flex flex-col gap-3">
          <h2 className="text-base font-bold text-secondary tracking-widest uppercase font-outfit">Appointment</h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-outfit">
            Book an Appointment Instantly
          </h3>
          <p className="text-slate-600 dark:text-slate-400 font-inter">
            Fill in the details below to request a slot. We will confirm your appointment via email or phone.
          </p>
        </div>

        <div className="max-w-7xl mx-auto glass-panel p-8 sm:p-10 rounded-3xl shadow-xl border border-white/20 dark:border-slate-800">
          {success ? (
            <div className="text-center py-8 flex flex-col items-center gap-4">
              <div className="bg-emerald-100 dark:bg-emerald-950/40 p-4 rounded-full text-emerald-500 mb-2">
                <CheckCircle size={52} />
              </div>
              <h4 className="text-2xl font-bold font-outfit text-slate-900 dark:text-white">Request Received!</h4>
              <p className="text-slate-600 dark:text-slate-400 max-w-md font-inter leading-relaxed">
                Thank you for booking with Sugam Clinic. We have sent an acknowledgment email. We will reach out shortly to confirm your slot.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="mt-6 bg-primary hover:bg-primary/95 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition-all"
              >
                Book Another Appointment
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

              {error && (
                <div className="bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 p-4 rounded-xl flex items-center gap-3 border border-rose-100 dark:border-rose-950">
                  <AlertCircle size={20} />
                  <p className="text-sm font-medium">{error}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Full Name */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 font-outfit">
                    <User size={15} className="text-secondary" /> Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    {...register("name")}
                    className={`w-full px-4 py-3 rounded-xl border ${errors.name ? "border-rose-500" : "border-slate-200 dark:border-slate-700"
                      } bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm`}
                  />
                  {errors.name && <span className="text-xs text-rose-500">{errors.name.message}</span>}
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 font-outfit">
                    <Phone size={15} className="text-secondary" /> Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="Enter 10-digit mobile number"
                    {...register("phone")}
                    className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? "border-rose-500" : "border-slate-200 dark:border-slate-700"
                      } bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm`}
                  />
                  {errors.phone && <span className="text-xs text-rose-500">{errors.phone.message}</span>}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 font-outfit">
                    <Mail size={15} className="text-secondary" /> Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="yourname@example.com"
                    {...register("email")}
                    className={`w-full px-4 py-3 rounded-xl border ${errors.email ? "border-rose-500" : "border-slate-200 dark:border-slate-700"
                      } bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm`}
                  />
                  {errors.email && <span className="text-xs text-rose-500">{errors.email.message}</span>}
                </div>

                {/* Select Doctor */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 font-outfit">
                    <User size={15} className="text-secondary" /> Select Doctor
                  </label>
                  <select
                    {...register("doctorId")}
                    className={`w-full px-4 py-3 rounded-xl border ${errors.doctorId ? "border-rose-500" : "border-slate-200 dark:border-slate-700"
                      } bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm`}
                  >
                    <option value="">-- Choose Doctor --</option>
                    {doctors.map((doc) => (
                      <option key={doc._id} value={doc._id}>
                        {doc.name} ({doc.specialization})
                      </option>
                    ))}
                  </select>
                  {errors.doctorId && <span className="text-xs text-rose-500">{errors.doctorId.message}</span>}
                </div>

                {/* Select Date */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 font-outfit">
                    <Calendar size={15} className="text-secondary" /> Select Date
                  </label>
                  <input
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    {...register("date")}
                    className={`w-full px-4 py-3 rounded-xl border ${errors.date ? "border-rose-500" : "border-slate-200 dark:border-slate-700"
                      } bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm`}
                  />
                  {errors.date && <span className="text-xs text-rose-500">{errors.date.message}</span>}
                </div>

                {/* Select Time */}
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 font-outfit">
                    <Clock size={15} className="text-secondary" /> Select Time Slot
                  </label>
                  <select
                    {...register("time")}
                    className={`w-full px-4 py-3 rounded-xl border ${errors.time ? "border-rose-500" : "border-slate-200 dark:border-slate-700"
                      } bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm`}
                  >
                    <option value="">-- Choose Time --</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                  {errors.time && <span className="text-xs text-rose-500">{errors.time.message}</span>}
                </div>

              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 font-outfit">
                  <MessageSquare size={15} className="text-secondary" /> Additional Message / Symptoms
                </label>
                <textarea
                  rows={3}
                  placeholder="Optional details (e.g. fever for 2 days, chest pain, child's age)"
                  {...register("message")}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/95 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? "Submitting Booking..." : "Submit Appointment Request"}
              </button>

            </form>
          )}
        </div>

      </motion.div>
    </section>
  );
}
