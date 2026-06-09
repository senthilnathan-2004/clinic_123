"use client";

export const dynamic = "force-dynamic";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Plus, Edit3, Trash2, UserCog, CalendarClock } from "lucide-react";
import { uploadToImageKit } from "@/lib/upload";

export default function DoctorsManager() {
  const { data: session, status } = useSession();
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [editingDoc, setEditingDoc] = useState<any | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [qualification, setQualification] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [experience, setExperience] = useState("");
  const [description, setDescription] = useState("");
  const [consultingTime, setConsultingTime] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [availability, setAvailability] = useState("Available Today");

  const fetchDoctors = async () => {
    try {
      const res = await fetch("/api/admin/doctors");
      if (res.ok) {
        const data = await res.json();
        setDoctors(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchDoctors();
    }
  }, [status]);

  const openAddModal = () => {
    setEditingDoc(null);
    setName("");
    setQualification("");
    setSpecialization("");
    setExperience("");
    setDescription("");
    setConsultingTime("");
    setPhotoUrl("");
    setAvailability("Available Today");
    setIsOpen(true);
  };

  const openEditModal = (doc: any) => {
    setEditingDoc(doc);
    setName(doc.name);
    setQualification(doc.qualification);
    setSpecialization(doc.specialization);
    setExperience(String(doc.experience));
    setDescription(doc.description);
    setConsultingTime(doc.consultingTime);
    setPhotoUrl(doc.photoUrl);
    setAvailability(doc.availability);
    setIsOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name,
      qualification,
      specialization,
      experience: parseInt(experience) || 0,
      description,
      consultingTime,
      photoUrl,
      availability,
    };

    try {
      let url = "/api/admin/doctors";
      let method = "POST";
      if (editingDoc) {
        url = `/api/admin/doctors?id=${editingDoc._id}`;
        method = "PUT";
      }

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        fetchDoctors();
        setIsOpen(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this doctor?")) return;
    try {
      const res = await fetch(`/api/admin/doctors?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setDoctors(doctors.filter((doc) => doc._id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <p className="text-center py-12 text-slate-400">Loading doctors...</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-extrabold font-outfit text-slate-900 dark:text-white flex items-center gap-2">
            <UserCog className="text-primary" /> Doctors Directory
          </h1>
          <p className="text-sm text-slate-500 font-inter">Manage profile information, consultant times, and schedules.</p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-primary hover:bg-primary/95 text-white font-bold text-xs px-5 py-2.5 rounded-xl flex items-center gap-1.5 shadow transition-all cursor-pointer"
        >
          <Plus size={16} /> Add Consulting Doctor
        </button>
      </div>

      {/* Grid of Doctor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {doctors.map((doc) => (
          <div
            key={doc._id}
            className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex gap-4 shadow-sm relative"
          >
            <div className="w-24 h-28 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={doc.photoUrl || "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200"}
                alt={doc.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex flex-col gap-1.5 justify-between flex-grow">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-outfit">{doc.name}</h3>
                <p className="text-xs font-semibold text-primary font-inter">{doc.specialization}</p>
                <p className="text-[11px] text-slate-500 font-inter">{doc.qualification} • {doc.experience} Yrs Exp</p>
                <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-1 font-inter"><CalendarClock size={12} /> {doc.consultingTime}</p>
              </div>

              {/* Status Badge */}
              <span className={`self-start px-2 py-0.5 rounded-full text-[9px] font-bold ${
                doc.availability === "Available Today"
                  ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400"
                  : doc.availability === "Fully Booked"
                  ? "bg-orange-100 text-orange-800 dark:bg-orange-950/40 dark:text-orange-400"
                  : "bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-400"
              }`}>
                {doc.availability}
              </span>
            </div>

            {/* Quick Actions */}
            <div className="absolute top-4 right-4 flex gap-1.5">
              <button
                onClick={() => openEditModal(doc)}
                className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-750 dark:text-slate-200 p-1.5 rounded-lg"
              >
                <Edit3 size={14} />
              </button>
              <button
                onClick={() => handleDelete(doc._id)}
                className="bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/20 text-rose-600 p-1.5 rounded-lg"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white dark:bg-slate-900 max-w-xl w-full rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col max-h-[90vh]">
            <header className="p-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
              <h3 className="text-base font-extrabold font-outfit text-slate-900 dark:text-white">
                {editingDoc ? "Edit Doctor Profile" : "Add Consulting Doctor"}
              </h3>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600 text-sm font-bold">Close</button>
            </header>
            
            <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-slate-700 dark:text-slate-350">Doctor Name</label>
                  <input
                    type="text" required value={name} onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Dr. Senthil Kumar"
                    className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-slate-700 dark:text-slate-350">Qualifications</label>
                  <input
                    type="text" required value={qualification} onChange={(e) => setQualification(e.target.value)}
                    placeholder="e.g. MD (Peds), DNB"
                    className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-slate-700 dark:text-slate-350">Specialization</label>
                  <input
                    type="text" required value={specialization} onChange={(e) => setSpecialization(e.target.value)}
                    placeholder="e.g. Senior Pediatrician"
                    className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-slate-700 dark:text-slate-350">Experience (Years)</label>
                  <input
                    type="number" required value={experience} onChange={(e) => setExperience(e.target.value)}
                    placeholder="e.g. 15"
                    className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-700 dark:text-slate-350">Short Bio / Description</label>
                <textarea
                  rows={3} required value={description} onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell patients about this doctor's special focus..."
                  className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-slate-700 dark:text-slate-350">Consulting Time Slot</label>
                  <input
                    type="text" required value={consultingTime} onChange={(e) => setConsultingTime(e.target.value)}
                    placeholder="e.g. Mon - Sat: 9:00 AM - 1:00 PM"
                    className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-slate-700 dark:text-slate-350">Availability Status</label>
                  <select
                    value={availability} onChange={(e) => setAvailability(e.target.value)}
                    className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
                  >
                    <option value="Available Today">Available Today</option>
                    <option value="Fully Booked">Fully Booked</option>
                    <option value="On Leave">On Leave</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-bold text-slate-700 dark:text-slate-350">Doctor Profile Photo</label>
                <div className="flex items-center gap-4">
                  {photoUrl && (
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-850 flex-shrink-0 border border-slate-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={photoUrl} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <input
                    type="text"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
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
                        setPhotoUrl(url);
                      } catch (err) {
                        console.error(err);
                      }
                    }
                  }}
                  className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/95 text-white font-bold py-3.5 rounded-xl shadow transition-all cursor-pointer text-xs mt-2"
              >
                Save Doctor Profile
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
