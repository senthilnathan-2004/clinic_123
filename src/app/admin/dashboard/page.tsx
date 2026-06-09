import React from "react";
export const dynamic = "force-dynamic";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { dbConnect } from "@/lib/db";
import { Appointment, ContactMessage, Review, Doctor } from "@/lib/models/schemas";
import { 
  CalendarCheck, 
  Clock, 
  MessageSquare, 
  Star, 
  Users, 
  AlertTriangle 
} from "lucide-react";

export const revalidate = 0;

export default async function AdminDashboard() {
  const session = await getServerSession();
  if (!session) {
    redirect("/admin/login");
  }

  await dbConnect();

  // Fetch counts
  const totalAppointments = await Appointment.countDocuments();
  const pendingAppointments = await Appointment.countDocuments({ status: "Pending" });
  const completedAppointments = await Appointment.countDocuments({ status: "Completed" });
  const totalReviews = await Review.countDocuments();
  const totalDoctors = await Doctor.countDocuments();
  const totalMessages = await ContactMessage.countDocuments();
  const unreadMessages = await ContactMessage.countDocuments({ isRead: false });

  // Fetch recent appointments
  const recentAppointments = await Appointment.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();

  // Fetch recent contact messages
  const recentMessages = await ContactMessage.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();

  const safeAppointments = JSON.parse(JSON.stringify(recentAppointments));
  const safeMessages = JSON.parse(JSON.stringify(recentMessages));

  const stats = [
    { label: "Total Appointments", value: totalAppointments, icon: CalendarCheck, color: "text-blue-600 bg-blue-50 dark:bg-blue-950/20" },
    { label: "Pending Confirms", value: pendingAppointments, icon: Clock, color: "text-amber-600 bg-amber-50 dark:bg-amber-950/20" },
    { label: "Completed Visits", value: completedAppointments, icon: CalendarCheck, color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20" },
    { label: "Clinic Reviews", value: totalReviews, icon: Star, color: "text-pink-600 bg-pink-50 dark:bg-pink-950/20" },
    { label: "Contact Enquiries", value: totalMessages, icon: MessageSquare, color: "text-teal-600 bg-teal-50 dark:bg-teal-950/20" },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Welcome banner */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-extrabold font-outfit text-slate-900 dark:text-white">Dashboard Overview</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 font-inter">
          Welcome back! Here is a summary of Sugam Clinic's activity.
        </p>
      </div>

      {/* Stats Cards */}
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

      {/* Grid for Recent Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recent Appointments */}
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
                {safeAppointments.map((app: any) => (
                  <tr key={app._id} className="hover:bg-slate-50/50">
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
                {safeAppointments.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center py-6 text-slate-400 font-medium">No appointments booked yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Contact Submissions */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-4">
          <h2 className="text-lg font-bold font-outfit text-slate-900 dark:text-white">Recent Enquiries</h2>
          
          <div className="flex flex-col gap-3 max-h-96 overflow-y-auto pr-2">
            {safeMessages.map((msg: any) => (
              <div
                key={msg._id}
                className="bg-slate-50 dark:bg-slate-850 p-4 rounded-xl border border-slate-100 dark:border-slate-800/80 flex flex-col gap-1.5"
              >
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-slate-900 dark:text-white font-bold font-outfit">{msg.name}</span>
                  <span className="text-slate-400 font-inter">{new Date(msg.createdAt).toLocaleDateString("en-IN")}</span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-655 dark:text-slate-400 font-inter leading-relaxed line-clamp-2 italic">
                  "{msg.message}"
                </p>
                <span className="text-[10px] text-slate-400 font-medium font-inter">
                  Phone: {msg.phone} • Email: {msg.email}
                </span>
              </div>
            ))}
            {safeMessages.length === 0 && (
              <p className="text-center py-6 text-slate-400 font-medium text-xs">No messages received yet.</p>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
