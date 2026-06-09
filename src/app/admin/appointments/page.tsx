"use client";

export const dynamic = "force-dynamic";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { 
  Check, 
  X, 
  Trash2, 
  Filter, 
  Calendar, 
  CalendarDays,
  User, 
  Phone, 
  Mail, 
  Clock 
} from "lucide-react";

export default function AppointmentsManager() {
  const { data: session, status } = useSession();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [doctorFilter, setDoctorFilter] = useState("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchAppointments = async () => {
    try {
      const res = await fetch("/api/admin/appointments");
      if (res.ok) {
        const data = await res.json();
        setAppointments(data);
      }
    } catch (error) {
      console.error("Failed to load appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchAppointments();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const updateStatus = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/appointments?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        const updated = await res.json();
        setAppointments(appointments.map((app) => (app._id === id ? updated : app)));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setUpdatingId(null);
    }
  };

  const deleteAppointment = async (id: string) => {
    if (!confirm("Are you sure you want to delete this appointment?")) return;
    try {
      const res = await fetch(`/api/admin/appointments?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setAppointments(appointments.filter((app) => app._id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const filtered = appointments.filter((app) => {
    const statusMatch = statusFilter === "all" || app.status === statusFilter;
    const doctorMatch = doctorFilter === "all" || app.doctorName === doctorFilter;
    return statusMatch && doctorMatch;
  });

  const doctorsList = Array.from(new Set(appointments.map((app) => app.doctorName)));

  if (loading) {
    return <p className="text-center py-12 text-slate-400">Loading appointments...</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      
      {/* Header */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-extrabold font-outfit text-slate-900 dark:text-white flex items-center gap-2">
            <CalendarDays className="text-primary" /> Appointments Management
          </h1>
          <p className="text-sm text-slate-500 font-inter">View, approve, complete, or cancel patient appointments.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-wrap gap-4 items-center">
        <span className="text-xs font-bold font-outfit text-slate-700 dark:text-slate-350 flex items-center gap-1">
          <Filter size={14} /> Filter Bookings:
        </span>
        
        {/* Status */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold focus:outline-none"
        >
          <option value="all">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        {/* Doctor */}
        <select
          value={doctorFilter}
          onChange={(e) => setDoctorFilter(e.target.value)}
          className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold focus:outline-none"
        >
          <option value="all">All Doctors</option>
          {doctorsList.map((doc: any) => (
            <option key={doc} value={doc}>{doc}</option>
          ))}
        </select>
      </div>

      {/* List Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-slate-500 font-bold">
                <th className="p-4">Patient Info</th>
                <th className="p-4">Requested Doctor</th>
                <th className="p-4">Schedule</th>
                <th className="p-4">Symptoms / Message</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-inter text-slate-700 dark:text-slate-300">
              {filtered.map((app) => (
                <tr key={app._id} className="hover:bg-slate-50/30">
                  {/* Info */}
                  <td className="p-4">
                    <div className="flex flex-col gap-1">
                      <span className="font-bold text-slate-900 dark:text-white text-sm">{app.name}</span>
                      <span className="flex items-center gap-1 text-[11px] text-slate-500"><Phone size={11} /> {app.phone}</span>
                      <span className="flex items-center gap-1 text-[11px] text-slate-500"><Mail size={11} /> {app.email}</span>
                    </div>
                  </td>
                  {/* Doctor */}
                  <td className="p-4 font-semibold text-slate-800 dark:text-slate-200">{app.doctorName}</td>
                  {/* Schedule */}
                  <td className="p-4">
                    <div className="flex flex-col gap-1">
                      <span className="flex items-center gap-1 font-bold text-primary"><Calendar size={12} /> {app.date}</span>
                      <span className="flex items-center gap-1 text-slate-500"><Clock size={12} /> {app.time}</span>
                    </div>
                  </td>
                  {/* Symptoms */}
                  <td className="p-4 max-w-xs truncate" title={app.message}>{app.message || "N/A"}</td>
                  {/* Status badge */}
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      app.status === "Pending"
                        ? "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400"
                        : app.status === "Confirmed"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-400"
                        : app.status === "Completed"
                        ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400"
                        : "bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-400"
                    }`}>
                      {app.status}
                    </span>
                  </td>
                  {/* Actions */}
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      {app.status === "Pending" && (
                        <button
                          onClick={() => updateStatus(app._id, "Confirmed")}
                          disabled={updatingId === app._id}
                          className="bg-emerald-500 hover:bg-emerald-600 text-white p-1.5 rounded-lg shadow-sm"
                          title="Confirm Slot"
                        >
                          <Check size={14} />
                        </button>
                      )}
                      {app.status === "Confirmed" && (
                        <button
                          onClick={() => updateStatus(app._id, "Completed")}
                          disabled={updatingId === app._id}
                          className="bg-sky-500 hover:bg-sky-600 text-white p-1.5 rounded-lg shadow-sm"
                          title="Mark Completed"
                        >
                          <Check size={14} />
                        </button>
                      )}
                      {app.status !== "Cancelled" && app.status !== "Completed" && (
                        <button
                          onClick={() => updateStatus(app._id, "Cancelled")}
                          disabled={updatingId === app._id}
                          className="bg-amber-500 hover:bg-amber-600 text-white p-1.5 rounded-lg shadow-sm"
                          title="Cancel Slot"
                        >
                          <X size={14} />
                        </button>
                      )}
                      <button
                        onClick={() => deleteAppointment(app._id)}
                        className="bg-rose-500 hover:bg-rose-600 text-white p-1.5 rounded-lg shadow-sm"
                        title="Delete Record"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-slate-400 font-medium font-inter">
                    No matching appointments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
