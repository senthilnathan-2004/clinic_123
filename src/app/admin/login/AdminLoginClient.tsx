"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Lock, Mail, AlertCircle, KeyRound, HeartHandshake, ShieldCheck, Stethoscope } from "lucide-react";
import { Navbar } from "@/components/public/Navbar";

export function AdminLoginClient({ settings }: { settings: Record<string, unknown> | null }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid email address or password.");
      } else {
        router.push("/admin/dashboard");
        router.refresh();
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <Navbar settings={settings} compact={true} />

      <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 pt-16 items-stretch min-h-[calc(100vh-64px)]">
        <div className="flex items-center justify-center p-8 sm:p-12 md:p-16 bg-white dark:bg-slate-900 border-r border-slate-150 dark:border-slate-800">
          <div className="w-full max-w-md flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-2xl text-primary self-start">
                <KeyRound size={24} />
              </div>
              <h1 className="text-3xl font-extrabold font-outfit text-slate-900 dark:text-white mt-2">
                Welcome Back
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-inter">
                Please enter your credentials to access the Sugam clinic administration dashboard.
              </p>
            </div>

            {error && (
              <div className="bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 p-4 rounded-xl flex items-center gap-3 border border-rose-100 dark:border-rose-950">
                <AlertCircle size={18} />
                <p className="text-xs font-semibold">{error}</p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4 text-xs">
              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-slate-700 dark:text-slate-350 font-outfit">Email Address</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@sugamclinic.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm font-inter"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-bold text-slate-700 dark:text-slate-350 font-outfit">Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm font-inter"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/95 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center cursor-pointer disabled:opacity-50 text-xs mt-2"
              >
                {loading ? "Verifying Credentials..." : "Access Admin Console"}
              </button>
            </form>
          </div>
        </div>

        <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-primary to-secondary text-white p-16 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl" />

          <div className="flex items-center gap-2 relative">
            <span className="text-xl font-bold font-outfit tracking-wider">
              {(settings?.name as string) || "Sugam Child & Gastro Care Clinic"}
            </span>
          </div>

          <div className="flex flex-col gap-6 max-w-lg relative z-10 my-auto">
            <h2 className="text-4xl font-extrabold font-outfit leading-tight">
              A Secure Portal for Clinical Operations
            </h2>
            <p className="text-sm text-white/80 leading-relaxed font-inter">
              Securely monitor child healthcare checklists, confirm doctor bookings, publish medical advisories, and track inquiries.
            </p>

            <div className="flex flex-col gap-4 mt-4 font-inter">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-lg text-white">
                  <ShieldCheck size={18} />
                </div>
                <span className="text-xs font-semibold">JWT NextAuth Secure Session Protocol</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-lg text-white">
                  <HeartHandshake size={18} />
                </div>
                <span className="text-xs font-semibold">Live Patient Analytics Overview</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-lg text-white">
                  <Stethoscope size={18} />
                </div>
                <span className="text-xs font-semibold">Dynamic Doctors Availability Updates</span>
              </div>
            </div>
          </div>

          <p className="text-xs text-white/60 relative font-inter">
            {(settings?.copyright as string) || "© 2026 Sugam Child & Gastro Care Clinic. All Rights Reserved."}
          </p>
        </div>
      </div>
    </div>
  );
}
