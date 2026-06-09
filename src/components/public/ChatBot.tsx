"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageSquareCode, Send, X, Bot, Sparkles, User } from "lucide-react";

export function ChatBot({ settings, doctors }: { settings: any; doctors: any[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([
    {
      sender: "bot",
      text: `Hello! Welcome to Sugam Child & Gastro Care Clinic. How can I help you today?`,
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setInput("");

    // Simple Rule-Based AI Response logic based on clinic details
    setTimeout(() => {
      let botResponse = "I'm sorry, I'm a basic clinic query assistant. For detailed medical concerns, please book an appointment with our doctor or call us directly.";

      const lowerText = userText.toLowerCase();

      if (lowerText.includes("doctor") || lowerText.includes("dr") || lowerText.includes("who")) {
        const docNames = doctors.map((d) => d.name).join(", ");
        botResponse = `Our clinic features experienced consulting doctors: ${docNames || "Dr. Senthil Kumar (Pediatrician) and Dr. Priya Senthil (Gastro Care)"}. You can view their timings in the Doctors section.`;
      } else if (lowerText.includes("time") || lowerText.includes("hour") || lowerText.includes("open") || lowerText.includes("when")) {
        botResponse = `Sugam Clinic is open from ${settings?.workingHours || "Monday to Saturday, 9:00 AM to 8:30 PM"}. We are closed on Sundays.`;
      } else if (lowerText.includes("location") || lowerText.includes("map") || lowerText.includes("where") || lowerText.includes("address")) {
        botResponse = `Our clinic is located at: ${settings?.address || "doctors Plaza, Chennai"}. You can check our map location at the bottom of the page.`;
      } else if (lowerText.includes("phone") || lowerText.includes("contact") || lowerText.includes("call") || lowerText.includes("number")) {
        botResponse = `You can call our reception desk at ${settings?.phone || "+91 94444 56789"}. For emergency support, contact ${settings?.emergencyPhone || "+91 94444 99999"}.`;
      } else if (lowerText.includes("service") || lowerText.includes("treatment") || lowerText.includes("care") || lowerText.includes("child")) {
        botResponse = "We specialize in Pediatric Consultation, Newborn/Neonatology Care, Vaccinations, Pediatric Gastroenterology, Liver Care/Hepatology, and Diet Counseling.";
      } else if (lowerText.includes("appointment") || lowerText.includes("book") || lowerText.includes("slot")) {
        botResponse = "You can request an appointment using our booking form on the website! Simply scroll down to the 'Book Appointment' section and enter your details.";
      } else if (lowerText.includes("vaccin") || lowerText.includes("immuniz")) {
        botResponse = "We offer standard vaccinations for infants and children. You can generate a vaccination schedule by entering your child's date of birth in the FAQ section!";
      }

      setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
    }, 800);
  };

  return (
    <>
      {/* Chat Bot Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-6 z-40 bg-primary hover:bg-primary/95 text-white p-4 rounded-full shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center border border-white/20"
        title="Clinic Assistant"
        aria-label="Toggle chat assistant"
      >
        <MessageSquareCode size={26} />
      </button>

      {/* Dialog box */}
      {isOpen && (
        <div className="fixed bottom-36 right-6 z-50 w-80 sm:w-96 h-[460px] bg-white dark:bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col animate-in slide-in-from-bottom duration-300">
          
          {/* Header */}
          <div className="bg-primary text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="bg-white/20 p-2 rounded-xl">
                <Bot size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold font-outfit">Clinic Assistant</h4>
                <p className="text-[10px] text-teal-200 flex items-center gap-1 font-inter">
                  <Sparkles size={8} /> Online • Quick Answers
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/10 p-1.5 rounded-lg transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Panel */}
          <div className="flex-grow overflow-y-auto p-4 space-y-3 bg-slate-50 dark:bg-slate-900/40">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2.5 max-w-[85%] ${
                  msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold ${
                    msg.sender === "user"
                      ? "bg-secondary text-white"
                      : "bg-primary text-white"
                  }`}
                >
                  {msg.sender === "user" ? <User size={14} /> : <Bot size={14} />}
                </div>

                <div
                  className={`p-3 rounded-2xl text-xs sm:text-sm font-inter leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-secondary text-white rounded-tr-none"
                      : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none border border-slate-200 dark:border-slate-800/80"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Panel */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-200 dark:border-slate-800 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask working hours, locations, doctors..."
              className="flex-grow px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-primary/45 text-xs sm:text-sm font-inter"
            />
            <button
              type="submit"
              className="bg-primary hover:bg-primary/95 text-white p-2.5 rounded-xl flex items-center justify-center transition-all cursor-pointer"
            >
              <Send size={15} />
            </button>
          </form>

        </div>
      )}
    </>
  );
}
