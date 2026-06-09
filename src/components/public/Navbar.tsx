"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Phone, MessageCircle } from "lucide-react";

const navLinks = [
  { label: "Home",    href: "/#home" },
  { label: "Services", href: "/#services" },
  { label: "Doctors", href: "/#doctors" },
  { label: "Gallery", href: "/#gallery" },
  { label: "FAQ",     href: "/#faq" },
  { label: "Blog",    href: "/#blog" },
  { label: "Contact", href: "/#contact" },
  { label: "Admin",   href: "/admin/dashboard" },
];

export function Navbar({ settings, compact = false }: { settings: any; compact?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Always start as scrolled so the glass panel shows immediately
    setScrolled(window.scrollY > 0 || compact);

    const handleScroll = () => setScrolled(window.scrollY > 10 || compact);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [compact]);

  const logoText = settings?.name || "Sugam Clinic";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass-panel shadow-lg shadow-black/30 py-2.5"
          : "bg-background/80 backdrop-blur-md py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            {settings?.logoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={settings.logoUrl}
                alt="Logo"
                className="h-10 w-auto object-contain"
              />
            ) : (
              <span className="text-xl md:text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-outfit">
                {logoText}
              </span>
            )}
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-foreground/80 hover:text-primary font-medium text-sm transition-colors duration-200 font-outfit"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Book Appointment CTA */}
            <Link
              href="/#book-appointment"
              className="bg-primary hover:bg-primary/90 text-white font-semibold text-sm px-5 py-2.5 rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 font-outfit whitespace-nowrap"
            >
              Book Appointment
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex md:hidden p-2 rounded-lg text-foreground/80 hover:bg-foreground/5"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden glass-panel border-t border-border/40 mt-2 animate-in slide-in-from-top duration-200">
          <div className="px-3 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2.5 rounded-lg text-base font-medium text-foreground/80 hover:bg-primary/5 hover:text-primary font-outfit"
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-3 px-1 flex flex-col gap-2">
              <Link
                href={`tel:${settings?.phone || ""}`}
                className="flex items-center justify-center gap-2 border border-border py-2.5 rounded-full text-sm font-medium hover:bg-foreground/5 text-foreground font-outfit"
              >
                <Phone size={16} /> Call Clinic
              </Link>
              <Link
                href={`https://wa.me/${settings?.whatsapp || ""}`}
                target="_blank"
                className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white py-2.5 rounded-full text-sm font-medium font-outfit"
              >
                <MessageCircle size={16} /> WhatsApp Us
              </Link>
              <Link
                href="/#book-appointment"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center bg-primary hover:bg-primary/90 text-white py-2.5 rounded-full text-sm font-semibold font-outfit"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
