"use client";

import React, { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { 
  Menu, 
  X, 
  LayoutDashboard, 
  CalendarDays, 
  UserSquare2, 
  HeartPulse, 
  Image, 
  Star, 
  BookOpen,
  Settings, 
  Home, 
  LogOut 
} from "lucide-react";

export function AdminMobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const adminLinks = [
    { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Appointments", href: "/admin/appointments", icon: CalendarDays },
    { label: "Doctors", href: "/admin/doctors", icon: UserSquare2 },
    { label: "Services", href: "/admin/services", icon: HeartPulse },
    { label: "Gallery & Media", href: "/admin/gallery", icon: Image },
    { label: "Reviews", href: "/admin/reviews", icon: Star },
    { label: "Health Blogs", href: "/admin/blog", icon: BookOpen },
    { label: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
        aria-label="Toggle admin menu"
      >
        <Menu size={22} />
      </button>

      {/* Drawer Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-50 animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        >
          {/* Drawer Content */}
          <div 
            className="w-64 h-full bg-slate-900 text-slate-400 p-5 flex flex-col justify-between animate-in slide-in-from-left duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-5 border-b border-slate-800 mb-6">
                <span className="text-white font-extrabold text-lg font-outfit">Sugam Admin</span>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Links */}
              <nav className="space-y-1 text-sm font-semibold font-outfit flex flex-col">
                {adminLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 hover:text-white transition-colors"
                    >
                      <Icon size={18} /> {link.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Footer */}
            <div className="border-t border-slate-800 pt-4 flex flex-col gap-2.5">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-slate-800 hover:text-white text-xs font-semibold"
              >
                <Home size={15} /> Visit Website
              </Link>
              <button
                onClick={async (e) => {
                  e.preventDefault();
                  setIsOpen(false);
                  await signOut({ callbackUrl: "/admin/login" });
                }}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-slate-800 text-rose-500 hover:text-rose-400 text-xs font-semibold text-left w-full border-none cursor-pointer"
              >
                <LogOut size={15} /> Logout
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
