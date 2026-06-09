"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Calculator, CalendarCheck2, BellRing, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const translations: Record<string, Record<string, string>> = {
  english: {
    tag: "FAQs",
    title: "Frequently Answered Queries",
    subtitle: "Common healthcare queries addressed by our expert doctors.",
    calc_title: "Child Vaccination Scheduler",
    calc_desc: "Calculate and track immunization schedules instantly. Simply enter your child's date of birth.",
    label_name: "Child's Name",
    placeholder_name: "Enter baby's name",
    label_dob: "Date of Birth",
    btn_generate: "Generate Vaccination Chart",
    btn_clear: "Clear Chart",
    born: "Born",
    email_reminder_title: "Enable Email Reminders",
    email_reminder_desc: "Enroll now to receive automated reminders 3 days before each scheduled vaccination date.",
    btn_register: "Register Reminders",
    registering: "Enrolling...",
    enrolled_title: "Reminders Registered!",
    enrolled_desc: "We have sent an enrollment confirmation to",
    age: "Age",
  },
  tamil: {
    tag: "கேள்விகள்",
    title: "அடிக்கடி கேட்கப்படும் கேள்விகள்",
    subtitle: "எங்கள் நிபுணர் மருத்துவர்களால் பதிலளிக்கப்பட்ட பொதுவான சுகாதார வினவல்கள்.",
    calc_title: "குழந்தை தடுப்பூசி அட்டவணை",
    calc_desc: "தடுப்பூசி அட்டவணையை உடனடியாகக் கணக்கிட்டு கண்காணிக்கவும். உங்கள் குழந்தையின் பிறந்த தேதியை உள்ளிடவும்.",
    label_name: "குழந்தையின் பெயர்",
    placeholder_name: "குழந்தையின் பெயரை உள்ளிடவும்",
    label_dob: "பிறந்த தேதி",
    btn_generate: "தடுப்பூசி அட்டவணையை உருவாக்கு",
    btn_clear: "அட்டவணையை அழி",
    born: "பிறப்பு",
    email_reminder_title: "மின்னஞ்சல் நினைவூட்டல்களை இயக்கு",
    email_reminder_desc: "ஒவ்வொரு திட்டமிடப்பட்ட தடுப்பூசி தேதிக்கு 3 நாட்களுக்கு முன்பு தானியங்கி நினைவூட்டல்களைப் பெற இப்போது பதிவு செய்யவும்.",
    btn_register: "நினைவூட்டல்களைப் பதிவுசெய்க",
    registering: "பதிவு செய்கிறது...",
    enrolled_title: "நினைவூட்டல்கள் பதிவு செய்யப்பட்டன!",
    enrolled_desc: "மின்னஞ்சலுக்கு உறுதிப்படுத்தலை அனுப்பியுள்ளோம்",
    age: "வயது",
  },
  malayalam: {
    tag: "ചോദ്യങ്ങൾ",
    title: "പതിവായി ചോദിക്കുന്ന ചോദ്യങ്ങൾ",
    subtitle: "ഞങ്ങളുടെ വിദഗ്ദ്ധ ഡോക്ടർമാർ മറുപടി നൽകിയ പൊതുവായ ആരോഗ്യ ചോദ്യങ്ങൾ.",
    calc_title: "കുട്ടികളുടെ വാക്സിനേഷൻ ഷെഡ്യൂളർ",
    calc_desc: "പ്രതിരോധ കുത്തിവെപ്പ് ഷെഡ്യൂളുകൾ തൽക്ഷണം കണക്കാക്കുക. നിങ്ങളുടെ കുട്ടിയുടെ ജനനത്തീയതി നൽകുക.",
    label_name: "കുട്ടിയുടെ പേര്",
    placeholder_name: "കുട്ടിയുടെ പേര് നൽകുക",
    label_dob: "ജനനത്തീയതി",
    btn_generate: "വാക്സിനേഷൻ ചാർട്ട് ഉണ്ടാക്കുക",
    btn_clear: "ചാർട്ട് മായ്ക്കുക",
    born: "ജനനം",
    email_reminder_title: "ഇമെയിൽ ഓർമ്മപ്പെടുത്തലുകൾ പ്രവർത്തനക്ഷമമാക്കുക",
    email_reminder_desc: "ഓരോ വാക്സിനേഷൻ തീയതിക്കും 3 ദിവസം മുമ്പ് ഓർമ്മപ്പെടുത്തലുകൾ ലഭിക്കുന്നതിന് ഇപ്പോൾ രജിസ്റ്റർ ചെയ്യുക.",
    btn_register: "ഓർമ്മപ്പെടുത്തലുകൾ രജിസ്റ്റർ ചെയ്യുക",
    registering: "രജിസ്റ്റർ ചെയ്യുന്നു...",
    enrolled_title: "ഓർമ്മപ്പെടുത്തലുകൾ രജിസ്റ്റർ ചെയ്തു!",
    enrolled_desc: "ഞങ്ങൾ ഇമെയിലിിലേക്ക് സ്ഥിരീകരണം അയച്ചിട്ടുണ്ട്",
    age: "പ്രായം",
  },
  kannada: {
    tag: "ಪ್ರಶ್ನೆಗಳು",
    title: "ಪದೇ ಪದೇ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು",
    subtitle: "ನಮ್ಮ ತಜ್ಞ ವೈದ್ಯರಿಂದ ಸಾಮಾನ್ಯ ಆರೋಗ್ಯ ಪ್ರಶ್ನೆಗಳಿಗೆ ಉತ್ತರಗಳು.",
    calc_title: "ಮಕ್ಕಳ ಲಸಿಕೆ ವೇಳಾಪಟ್ಟಿ",
    calc_desc: "ಲಸಿಕೆ ವೇಳಾಪಟ್ಟಿಯನ್ನು ತಕ್ಷಣವೇ ಲೆಕ್ಕ ಹಾಕಿ. ನಿಮ್ಮ ಮಗುವಿನ ಜನ್ಮ ದಿನಾಂಕವನ್ನು ನಮೂದಿಸಿ.",
    label_name: "ಮಗುವಿನ ಹೆಸರು",
    placeholder_name: "ಮಗುವಿನ ಹೆಸರು ನಮೂದಿಸಿ",
    label_dob: "ಜನ್ಮ ದಿನಾಂಕ",
    btn_generate: "ಲಸಿಕೆ ಚಾರ್ಟ್ ರಚಿಸಿ",
    btn_clear: "ಚಾರ್ಟ್ ಅಳಿಸಿ",
    born: "ಜನನ",
    email_reminder_title: "ಇಮೇಲ್ ಜ್ಞಾಪನೆಗಳನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಿ",
    email_reminder_desc: "ಪ್ರತಿ ಲಸಿಕೆ ದಿನಾಂಕದ 3 ದಿನಗಳ ಮೊದಲು ಸ್ವಯಂಚಾಲಿತ ಜ್ಞಾಪನೆಗಳನ್ನು ಪಡೆಯಲು ಈಗಲೇ ನೋಂದಾಯಿಸಿ.",
    btn_register: "ಜ್ಞಾಪನೆಗಳನ್ನು ನೋಂದಾಯಿಸಿ",
    registering: "ನೋಂದಾಯಿಸಲಾಗುತ್ತಿದೆ...",
    enrolled_title: "ಜ್ಞಾಪನೆಗಳನ್ನು ನೋಂದಾಯಿಸಲಾಗಿದೆ!",
    enrolled_desc: "ನಾವು ಇಮೇಲ್‌ಗೆ ದೃಢೀಕರಣವನ್ನು ಕಳುಹಿಸಿದ್ದೇವೆ",
    age: "ವಯಸ್ಸು",
  },
  telugu: {
    tag: "ప్రశ్నలు",
    title: "తరచుగా అడిగే ప్రశ్నలు",
    subtitle: "మా నిపుణులైన వైద్యులు సమాధానమిచ్చిన సాధారణ ఆరోగ్య ప్రశ్నలు.",
    calc_title: "పిల్లల టీకాల షెడ్యూలర్",
    calc_desc: "టీకాల షెడ్యూల్‌ను తక్షణమే లెక్కించండి. మీ బిడ్డ పుట్టిన తేదీని నమోదు చేయండి.",
    label_name: "పిల్లల పేరు",
    placeholder_name: "బిడ్డ పేరు నమోదు చేయండి",
    label_dob: "పుట్టిన తేదీ",
    btn_generate: "టీకా చార్ట్‌ను సృష్టించండి",
    btn_clear: "చార్ట్‌ను క్లియర్ చేయి",
    born: "జననం",
    email_reminder_title: "ఇమెయిల్ రిమైండర్‌లను ప్రారంభించండి",
    email_reminder_desc: "ప్రతి షెడ్యూల్ చేసిన టీకా తేదీకి 3 రోజుల ముందు ఆటోమేటిక్ రిమైండర్‌లను పొందడానికి ఇప్పుడే నమోదు చేసుకోండి.",
    btn_register: "రిమైండర్‌లను నమోదు చేయి",
    registering: "నమోదు అవుతోంది...",
    enrolled_title: "రిమైండర్‌లు విజయవంతంగా నమోదయ్యాయి!",
    enrolled_desc: "మేము ఇమెయిల్‌కు ధృవీకరణను పంపాము",
    age: "వయస్సు",
  }
};

export function FAQ({ faqs }: { faqs: any[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  
  // Vaccination Calculator states
  const [childName, setChildName] = useState("");
  const [dob, setDob] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [calculatedSchedule, setCalculatedSchedule] = useState<any[] | null>(null);
  const [enrolling, setEnrolling] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
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

  const toggleFAQ = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  const calculateSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dob) return;

    const birthDate = new Date(dob);
    
    // IAP vaccination schedule guidelines
    const scheduleItems = [
      { name: "BCG, OPV-0, HepB-1", age: "At Birth", daysToAdd: 0 },
      { name: "OPV-1, Pentavalent-1, Rota-1, PCV-1, IPV-1", age: "6 Weeks", daysToAdd: 42 },
      { name: "OPV-2, Pentavalent-2, Rota-2, PCV-2, IPV-2", age: "10 Weeks", daysToAdd: 70 },
      { name: "OPV-3, Pentavalent-3, Rota-3, PCV-3, IPV-3", age: "14 Weeks", daysToAdd: 98 },
      { name: "Measles/MR 1st Dose, Je 1st Dose", age: "9 Months", daysToAdd: 270 },
      { name: "Typhoid Conjugate Vaccine", age: "12 Months", daysToAdd: 365 },
      { name: "Measles/MR 2nd Dose, OPV Booster, DPT Booster-1", age: "16-24 Months", daysToAdd: 540 },
    ];

    const finalSchedule = scheduleItems.map((item) => {
      const vDate = new Date(birthDate);
      vDate.setDate(birthDate.getDate() + item.daysToAdd);
      return {
        ...item,
        dateString: vDate.toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
      };
    });

    setCalculatedSchedule(finalSchedule);
  };

  const enrollReminders = async () => {
    if (!childName || !dob || !parentEmail || !parentPhone) return;
    setEnrolling(true);

    try {
      const response = await fetch("/api/admin/vaccinations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          childName,
          parentName: "Parent",
          parentEmail,
          parentPhone,
          birthDate: dob,
        }),
      });

      if (!response.ok) throw new Error("Enrollment failed");
      setEnrolled(true);
    } catch (error) {
      console.error(error);
    } finally {
      setEnrolling(false);
    }
  };

  return (
    <section id="faq" className="py-20 bg-background relative bg-dot-pattern lg:min-h-screen lg:flex lg:items-center">
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
      >
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* FAQ Accordion Side */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <h2 className="text-base font-bold text-secondary tracking-widest uppercase font-outfit">{t.tag}</h2>
              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white font-outfit">
                {t.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 font-inter">
                {t.subtitle}
              </p>
            </div>

            <div className="flex flex-col gap-4 mt-6">
              {faqs.map((faq, idx) => (
                <div
                  key={faq._id}
                  className="glass-panel border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFAQ(idx)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left text-slate-900 dark:text-white font-bold font-outfit text-base hover:bg-slate-100/50"
                  >
                    <span>{faq.question}</span>
                    {openIdx === idx ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  
                  {openIdx === idx && (
                    <div className="px-6 pb-5 pt-1 text-sm text-slate-600 dark:text-slate-400 font-inter leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Vaccination Schedule Side */}
          <div className="lg:col-span-6 bg-slate-50 dark:bg-slate-900/50 p-8 rounded-3xl border border-slate-150 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-2 mb-6 text-primary">
              <Calculator size={24} className="text-secondary" />
              <h4 className="text-xl font-bold font-outfit text-slate-900 dark:text-white">
                {t.calc_title}
              </h4>
            </div>

            {!calculatedSchedule ? (
              <form onSubmit={calculateSchedule} className="space-y-4">
                <p className="text-xs text-slate-500 dark:text-slate-450 leading-relaxed font-inter">
                  {t.calc_desc}
                </p>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">{t.label_name}</label>
                  <input
                    type="text"
                    required
                    value={childName}
                    onChange={(e) => setChildName(e.target.value)}
                    placeholder={t.placeholder_name}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/40 text-sm"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">{t.label_dob}</label>
                  <input
                    type="date"
                    required
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/40 text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/95 text-white font-bold py-3 rounded-xl shadow transition-all cursor-pointer text-sm"
                >
                  {t.btn_generate}
                </button>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-between items-center bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm">
                  <div>
                    <h5 className="text-sm font-bold text-slate-800 dark:text-white font-outfit">{childName}</h5>
                    <p className="text-xs text-slate-500 font-inter">{t.born}: {dob}</p>
                  </div>
                  <button
                    onClick={() => {
                      setCalculatedSchedule(null);
                      setEnrolled(false);
                    }}
                    className="text-xs text-primary hover:underline font-semibold font-inter"
                  >
                    {t.btn_clear}
                  </button>
                </div>

                <div className="max-h-64 overflow-y-auto space-y-2.5 pr-2">
                  {calculatedSchedule.map((item, i) => (
                    <div
                      key={i}
                      className="bg-white dark:bg-slate-800/60 p-3 rounded-xl flex items-center justify-between border border-slate-100 dark:border-slate-800/80 text-xs"
                    >
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900 dark:text-white font-outfit">{item.name}</span>
                        <span className="text-slate-500 font-inter font-medium">{t.age}: {item.age}</span>
                      </div>
                      <span className="bg-primary/10 text-primary px-3 py-1.5 rounded-lg font-bold">
                        {item.dateString}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Enroll Reminders Option */}
                {!enrolled ? (
                  <div className="bg-primary/5 p-5 rounded-2xl border border-primary/15 space-y-3">
                    <h5 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <BellRing size={16} className="text-secondary" /> {t.email_reminder_title}
                    </h5>
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-inter leading-relaxed">
                      {t.email_reminder_desc}
                    </p>
                    <div className="flex flex-col gap-2">
                      <input
                        type="email"
                        required
                        value={parentEmail}
                        onChange={(e) => setParentEmail(e.target.value)}
                        placeholder="parent@example.com"
                        className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-1 focus:ring-primary/45"
                      />
                      <input
                        type="tel"
                        required
                        value={parentPhone}
                        onChange={(e) => setParentPhone(e.target.value)}
                        placeholder="Mobile Number"
                        className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-1 focus:ring-primary/45"
                      />
                      <button
                        onClick={enrollReminders}
                        disabled={enrolling}
                        className="bg-secondary hover:bg-secondary/95 text-white font-semibold py-2 rounded-lg text-xs transition-all flex items-center justify-center gap-1.5"
                      >
                        <CalendarCheck2 size={14} /> {enrolling ? t.registering : t.btn_register}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-emerald-50 dark:bg-emerald-950/20 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-950 text-center flex flex-col items-center gap-2">
                    <Sparkles size={24} className="text-emerald-500" />
                    <h5 className="text-sm font-bold text-emerald-800 dark:text-emerald-400 font-outfit">{t.enrolled_title}</h5>
                    <p className="text-xs text-emerald-700 dark:text-emerald-500 font-inter leading-normal">
                      {t.enrolled_desc} {parentEmail}.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>

      </motion.div>
    </section>
  );
}
