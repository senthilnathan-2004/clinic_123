"use client";

export const dynamic = "force-dynamic";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Plus, Edit3, Trash2, HeartPulse, Sparkles } from "lucide-react";
import * as Icons from "lucide-react";
import { uploadToImageKit } from "@/lib/upload";

export default function ServicesManager() {
  const { data: session, status } = useSession();
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [editingService, setEditingService] = useState<any | null>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("HeartPulse");
  const [imageUrl, setImageUrl] = useState("");

  const fetchServices = async () => {
    try {
      const res = await fetch("/api/admin/services");
      if (res.ok) {
        const data = await res.json();
        setServices(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchServices();
    }
  }, [status]);

  const openAddModal = () => {
    setEditingService(null);
    setTitle("");
    setDescription("");
    setIcon("HeartPulse");
    setImageUrl("");
    setIsOpen(true);
  };

  const openEditModal = (service: any) => {
    setEditingService(service);
    setTitle(service.title);
    setDescription(service.description);
    setIcon(service.icon || "HeartPulse");
    setImageUrl(service.imageUrl || "");
    setIsOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { title, description, icon, imageUrl };

    try {
      let url = "/api/admin/services";
      let method = "POST";
      if (editingService) {
        url = `/api/admin/services?id=${editingService._id}`;
        method = "PUT";
      }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        fetchServices();
        setIsOpen(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    try {
      const res = await fetch(`/api/admin/services?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setServices(services.filter((s) => s._id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const iconsList = [
    "Baby", "HeartPulse", "ShieldAlert", "Activity", "Stethoscope", "Apple",
    "Heart", "Brain", "Dna", "Thermometer", "Sparkles", "ClipboardList",
  ];

  if (loading) {
    return <p className="text-center py-12 text-slate-400">Loading services...</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-extrabold font-outfit text-slate-900 dark:text-white flex items-center gap-2">
            <HeartPulse className="text-primary" /> Clinic Specialities & Services
          </h1>
          <p className="text-sm text-slate-500 font-inter">Manage treatments, checkups, vaccinations, and services offered.</p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-primary hover:bg-primary/95 text-white font-bold text-xs px-5 py-2.5 rounded-xl flex items-center gap-1.5 shadow transition-all cursor-pointer"
        >
          <Plus size={16} /> Add Clinic Service
        </button>
      </div>

      {/* Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((s) => {
          const IconComponent = (Icons as any)[s.icon] || Icons.HeartPulse;
          return (
            <div
              key={s._id}
              className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col gap-4 shadow-sm relative"
            >
              <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-xl text-primary self-start">
                <IconComponent size={22} />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-outfit">{s.title}</h3>
                <p className="text-xs text-slate-500 font-inter mt-1.5 line-clamp-3 leading-relaxed">{s.description}</p>
              </div>

              {s.imageUrl && (
                <div className="w-full h-32 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.imageUrl} alt={s.title} className="w-full h-full object-cover" />
                </div>
              )}

              {/* Actions */}
              <div className="absolute top-4 right-4 flex gap-1">
                <button
                  onClick={() => openEditModal(s)}
                  className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 p-1.5 rounded-lg"
                >
                  <Edit3 size={13} />
                </button>
                <button
                  onClick={() => handleDelete(s._id)}
                  className="bg-rose-50 hover:bg-rose-100 text-rose-600 p-1.5 rounded-lg"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add/Edit Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white dark:bg-slate-900 max-w-lg w-full rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col max-h-[85vh]">
            <header className="p-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
              <h3 className="text-sm font-extrabold font-outfit text-slate-900 dark:text-white">
                {editingService ? "Edit Service" : "Add Service"}
              </h3>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600 text-xs font-bold">Close</button>
            </header>

            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-700 dark:text-slate-350">Service Title</label>
                <input
                  type="text" required value={title} onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Newborn Care & Neonatology"
                  className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-700 dark:text-slate-350">Description</label>
                <textarea
                  rows={4} required value={description} onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe treatment procedures, diagnostic setups, or clinical focus..."
                  className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-slate-700 dark:text-slate-350">Choose Icon</label>
                  <select
                    value={icon} onChange={(e) => setIcon(e.target.value)}
                    className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                  >
                    {iconsList.map((ic) => (
                      <option key={ic} value={ic}>{ic}</option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-bold text-slate-700 dark:text-slate-350">Cover Image</label>
                  <div className="flex items-center gap-4">
                    {imageUrl && (
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-855 flex-shrink-0 border border-slate-200">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <input
                      type="text"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="Paste URL or select file below..."
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
                          setImageUrl(url);
                        } catch (err) {
                          console.error(err);
                        }
                      }
                    }}
                    className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/95 text-white font-bold py-3.5 rounded-xl shadow transition-all cursor-pointer text-xs mt-2"
              >
                Save Service Details
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
