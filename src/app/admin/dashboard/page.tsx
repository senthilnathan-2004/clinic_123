import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { dbConnect } from "@/lib/db";
import { Appointment, ContactMessage, Review } from "@/lib/models/schemas";
import {
  CalendarCheck,
  Clock,
  MessageSquare,
  Star,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const session = await getServerSession();
  if (!session) {
    redirect("/admin/login");
  }

  await dbConnect();

  const [
    totalAppointments,
    pendingAppointments,
    completedAppointments,
    totalReviews,
    totalMessages,
    recentAppointments,
    recentMessages,
  ] = await Promise.all([
    Appointment.countDocuments(),
    Appointment.countDocuments({ status: "Pending" }),
    Appointment.countDocuments({ status: "Completed" }),
    Review.countDocuments(),
    ContactMessage.countDocuments(),
    Appointment.find().sort({ createdAt: -1 }).limit(5).lean(),
    ContactMessage.find().sort({ createdAt: -1 }).limit(5).lean(),
  ]);

  const stats = [
    { label: "Total Appointments", value: totalAppointments, icon: CalendarCheck, color: "text-blue-600 bg-blue-50 dark:bg-blue-950/20" },
    { label: "Pending Confirms", value: pendingAppointments, icon: Clock, color: "text-amber-600 bg-amber-50 dark:bg-amber-950/20" },
    { label: "Completed Visits", value: completedAppointments, icon: CalendarCheck, color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20" },
    { label: "Clinic Reviews", value: totalReviews, icon: Star, color: "text-pink-600 bg-pink-50 dark:bg-pink-950/20" },
    { label: "Contact Enquiries", value: totalMessages, icon: MessageSquare, color: "text-teal-600 bg-teal-50 dark:bg-teal-950/20" },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-extrabold font-outfit text-slate-900 dark:text-white">Dashboard Overview</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-inter">
          Welcome back! Here is a summary of Sugam Clinic&apos;s activity.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 flex items-center gap-4"
            >
              <div className={`p-3 rounded-xl ${stat.color} flex-shrink-0`}>
                <Icon size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-extrabold text-slate-900 dark:text-white font-outfit">
                  {stat.value}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold font-inter">
                  {stat.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-4">
          <h2 className="text-lg font-bold font-outfit text-slate-900 dark:text-white">Recent Appointment Bookings</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-500 font-bold">
                  <th className="pb-3">Patient</th>
                  <th className="pb-3">Doctor</th>
                  <th className="pb-3">Date/Time</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-inter text-slate-700 dark:text-slate-300">
                {recentAppointments.map((app) => (
                  <tr key={app._id.toString()} className="hover:bg-slate-50/50">
                    <td className="py-3.5 font-semibold text-slate-900 dark:text-white">{app.name}</td>
                    <td className="py-3.5">{app.doctorName}</td>
                    <td className="py-3.5">{app.date} • {app.time}</td>
                    <td className="py-3.5">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
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
                  </tr>
                ))}
                {recentAppointments.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center py-6 text-slate-400 font-medium">No appointments booked yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-4">
          <h2 className="text-lg font-bold font-outfit text-slate-900 dark:text-white">Recent Enquiries</h2>

          <div className="flex flex-col gap-3 max-h-96 overflow-y-auto pr-2">
            {recentMessages.map((msg) => (
              <div
                key={msg._id.toString()}
                className="bg-slate-50 dark:bg-slate-850 p-4 rounded-xl border border-slate-100 dark:border-slate-800/80 flex flex-col gap-1.5"
              >
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-900 dark:text-white font-bold font-outfit">{msg.name}</span>
                  <span className="text-slate-400 font-inter">{new Date(msg.createdAt).toLocaleDateString("en-IN")}</span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-655 dark:text-slate-400 font-inter leading-relaxed line-clamp-2 italic">
                  &quot;{msg.message}&quot;
                </p>
                <span className="text-[10px] text-slate-400 font-medium font-inter">
                  Phone: {msg.phone} • Email: {msg.email}
                </span>
              </div>
            ))}
            {recentMessages.length === 0 && (
              <p className="text-center py-6 text-slate-400 font-medium text-xs">No messages received yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
