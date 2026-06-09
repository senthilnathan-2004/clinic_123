"use client";

export const dynamic = "force-dynamic";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Settings, Save, AlertCircle, CheckCircle } from "lucide-react";
import { uploadToImageKit } from "@/lib/upload";

export default function SettingsManager() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Clinic fields
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [phone, setPhone] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [address, setAddress] = useState("");
  const [googleMapsUrl, setGoogleMapsUrl] = useState("");
  const [workingHours, setWorkingHours] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [faviconUrl, setFaviconUrl] = useState("");
  const [heroImageUrl, setHeroImageUrl] = useState("");

  // Socials
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [youtube, setYoutube] = useState("");
  const [linkedin, setLinkedin] = useState("");

  // SEO
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [seoKeywords, setSeoKeywords] = useState("");

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/admin/settings");
      if (res.ok) {
        const data = await res.json();
        setName(data.name || "");
        setTagline(data.tagline || "");
        setPhone(data.phone || "");
        setEmergencyPhone(data.emergencyPhone || "");
        setEmail(data.email || "");
        setWhatsapp(data.whatsapp || "");
        setAddress(data.address || "");
        setGoogleMapsUrl(data.googleMapsUrl || "");
        setWorkingHours(data.workingHours || "");
        setLogoUrl(data.logoUrl || "");
        setFaviconUrl(data.faviconUrl || "");
        setHeroImageUrl(data.heroImageUrl || "");
        setFacebook(data.facebook || "");
        setInstagram(data.instagram || "");
        setYoutube(data.youtube || "");
        setLinkedin(data.linkedin || "");
        setSeoTitle(data.seoTitle || "");
        setSeoDescription(data.seoDescription || "");
        setSeoKeywords(data.seoKeywords || "");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchSettings();
    }
  }, [status]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    setError("");

    const payload = {
      name, tagline, phone, emergencyPhone, email, whatsapp, address, googleMapsUrl, workingHours,
      facebook, instagram, youtube, linkedin, seoTitle, seoDescription, seoKeywords,
      logoUrl, faviconUrl, heroImageUrl
    };

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        throw new Error("Failed to save settings");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-center py-12 text-slate-400">Loading settings...</p>;
  }

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold font-outfit text-slate-900 dark:text-white flex items-center gap-2">
          <Settings className="text-primary" /> Clinic settings & Configuration
        </h1>
        <p className="text-sm text-slate-500 font-inter">Manage details dynamically: name, contact credentials, links, and SEO tags.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6 text-xs">
        
        {success && (
          <div className="bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 p-4 rounded-xl flex items-center gap-3 border border-emerald-100 dark:border-emerald-950">
            <CheckCircle size={18} />
            <p className="font-semibold">Clinic configuration updated successfully!</p>
          </div>
        )}

        {error && (
          <div className="bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 p-4 rounded-xl flex items-center gap-3 border border-rose-100 dark:border-rose-950">
            <AlertCircle size={18} />
            <p className="font-semibold">{error}</p>
          </div>
        )}

        {/* Clinic General */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="text-sm font-bold font-outfit text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">
            Clinic Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-700 dark:text-slate-350">Clinic Name</label>
              <input
                type="text" required value={name} onChange={(e) => setName(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-700 dark:text-slate-350">Tagline / Mission</label>
              <input
                type="text" required value={tagline} onChange={(e) => setTagline(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-700 dark:text-slate-350">Contact Phone</label>
              <input
                type="text" required value={phone} onChange={(e) => setPhone(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-700 dark:text-slate-350">Emergency Contact</label>
              <input
                type="text" required value={emergencyPhone} onChange={(e) => setEmergencyPhone(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-700 dark:text-slate-350">Email Support</label>
              <input
                type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-700 dark:text-slate-350">WhatsApp Number (No spaces/country code first)</label>
              <input
                type="text" required value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="e.g. 919876543210"
                className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-bold text-slate-700 dark:text-slate-350">Clinic Address</label>
            <input
              type="text" required value={address} onChange={(e) => setAddress(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-700 dark:text-slate-350">Working Hours String</label>
              <input
                type="text" required value={workingHours} onChange={(e) => setWorkingHours(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-700 dark:text-slate-350">Google Maps Location URL</label>
              <input
                type="text" value={googleMapsUrl} onChange={(e) => setGoogleMapsUrl(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-bold text-slate-700 dark:text-slate-350">Clinic Logo</label>
              <div className="flex items-center gap-4">
                {logoUrl && (
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-855 flex-shrink-0 border border-slate-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={logoUrl} alt="Logo Preview" className="w-full h-full object-cover" />
                  </div>
                )}
                <input
                  type="text"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  placeholder="Paste Logo URL or select file below..."
                  className="flex-grow px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                />
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    try {
                      const url = await uploadToImageKit(file);
                      setLogoUrl(url);
                    } catch (err) {
                      console.error(err);
                    }
                  }
                }}
                className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-bold text-slate-700 dark:text-slate-350">Browser Favicon URL</label>
              <div className="flex items-center gap-4">
                {faviconUrl && (
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-855 flex-shrink-0 border border-slate-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={faviconUrl} alt="Favicon Preview" className="w-full h-full object-cover" />
                  </div>
                )}
                <input
                  type="text"
                  value={faviconUrl}
                  onChange={(e) => setFaviconUrl(e.target.value)}
                  placeholder="Paste Favicon URL or select file below..."
                  className="flex-grow px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                />
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    try {
                      const url = await uploadToImageKit(file);
                      setFaviconUrl(url);
                    } catch (err) {
                      console.error(err);
                    }
                  }
                }}
                className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
              />
            </div>

            <div className="col-span-1 sm:col-span-2 flex flex-col gap-2">
              <label className="font-bold text-slate-700 dark:text-slate-350">Hero Banner Image</label>
              <div className="flex items-center gap-4">
                {heroImageUrl && (
                  <div className="w-16 h-12 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-855 flex-shrink-0 border border-slate-200">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={heroImageUrl} alt="Hero Preview" className="w-full h-full object-cover" />
                  </div>
                )}
                <input
                  type="text"
                  value={heroImageUrl}
                  onChange={(e) => setHeroImageUrl(e.target.value)}
                  placeholder="Paste Hero URL or select file below..."
                  className="flex-grow px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                />
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    try {
                      const url = await uploadToImageKit(file);
                      setHeroImageUrl(url);
                    } catch (err) {
                      console.error(err);
                    }
                  }
                }}
                className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* SEO management */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="text-sm font-bold font-outfit text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">
            SEO Settings
          </h3>
          <div className="flex flex-col gap-1">
            <label className="font-bold text-slate-700 dark:text-slate-350">Meta Title</label>
            <input
              type="text" value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-bold text-slate-700 dark:text-slate-350">Meta Keywords</label>
            <input
              type="text" value={seoKeywords} onChange={(e) => setSeoKeywords(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-bold text-slate-700 dark:text-slate-350">Meta Description</label>
            <textarea
              rows={3} value={seoDescription} onChange={(e) => setSeoDescription(e.target.value)}
              className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
            />
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
          <h3 className="text-sm font-bold font-outfit text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">
            Social Media Links
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-700 dark:text-slate-350">Facebook URL</label>
              <input
                type="text" value={facebook} onChange={(e) => setFacebook(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-700 dark:text-slate-350">Instagram URL</label>
              <input
                type="text" value={instagram} onChange={(e) => setInstagram(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-700 dark:text-slate-350">YouTube Channel</label>
              <input
                type="text" value={youtube} onChange={(e) => setYoutube(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bold text-slate-700 dark:text-slate-350">LinkedIn Profile</label>
              <input
                type="text" value={linkedin} onChange={(e) => setLinkedin(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-primary hover:bg-primary/95 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 text-xs"
        >
          <Save size={16} /> {saving ? "Saving Changes..." : "Save Clinic Configuration"}
        </button>

      </form>

    </div>
  );
}
