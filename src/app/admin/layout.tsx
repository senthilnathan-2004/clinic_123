"use client";

import React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  LayoutDashboard,
  CalendarDays,
  UserSquare2,
  HeartPulse,
  Star,
  Image,
  BookOpen,
  Settings,
  Home,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { AdminProviders } from "./providers";
import { AdminMobileNav } from "@/components/admin/AdminMobileNav";
import { LogoutButton } from "@/components/admin/LogoutButton";

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/admin/login";

  React.useEffect(() => {
    if (status === "unauthenticated" && !isLoginPage) {
      router.replace("/admin/login");
    }
  }, [status, isLoginPage, router]);

  if (!isLoginPage && status === "loading") {
    return (
      <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex items-center justify-center">
        <span className="text-sm font-semibold text-slate-500 font-inter animate-pulse">Loading Sugam Admin...</span>
      </div>
    );
  }

  if (!isLoginPage && status === "unauthenticated") {
    return null;
  }

  if (isLoginPage || !session) {
    return <div className="w-full">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex">
      <div className="flex w-full">
        <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-slate-400 border-r border-slate-800 flex-shrink-0 h-screen sticky top-0 overflow-y-auto">
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <Link href="/admin/dashboard" className="text-white font-extrabold text-lg font-outfit">
              Sugam Clinic
            </Link>
          </div>

          <nav className="flex-grow p-4 space-y-1 text-sm font-semibold font-outfit">
            <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 hover:text-white transition-colors">
              <LayoutDashboard size={18} /> Dashboard
            </Link>
            <Link href="/admin/appointments" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 hover:text-white transition-colors">
              <CalendarDays size={18} /> Appointments
            </Link>
            <Link href="/admin/doctors" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 hover:text-white transition-colors">
              <UserSquare2 size={18} /> Doctors
            </Link>
            <Link href="/admin/services" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 hover:text-white transition-colors">
              <HeartPulse size={18} /> Services
            </Link>
            <Link href="/admin/gallery" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 hover:text-white transition-colors">
              <Image size={18} /> Gallery & Media
            </Link>
            <Link href="/admin/reviews" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 hover:text-white transition-colors">
              <Star size={18} /> Reviews
            </Link>
            <Link href="/admin/blog" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 hover:text-white transition-colors">
              <BookOpen size={18} /> Health Blogs
            </Link>
            <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 hover:text-white transition-colors">
              <Settings size={18} /> Settings
            </Link>
          </nav>

          <div className="p-4 border-t border-slate-800 flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-slate-800 hover:text-white text-xs font-semibold">
              <Home size={15} /> Visit Website
            </Link>
          </div>
        </aside>

        <div className="flex-grow flex flex-col overflow-x-hidden">
          <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 h-16 flex items-center justify-between px-6">
            <div className="flex items-center gap-3">
              <AdminMobileNav />
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200 font-outfit">
                Logged in as Admin
              </span>
            </div>
            <div className="flex items-center gap-4">
              <LogoutButton />
            </div>
          </header>

          <main className="flex-grow p-6 sm:p-8 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminProviders>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </AdminProviders>
  );
}
