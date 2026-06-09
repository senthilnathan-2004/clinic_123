import mongoose, { Schema, model, models } from "mongoose";

// Clinic Settings Schema
const ClinicSettingsSchema = new Schema({
  name: { type: String, default: "Sugam Child & Gastro Care Clinic" },
  tagline: { type: String, default: "Premium Pediatric & Gastroenterology Care" },
  logoUrl: { type: String, default: "" },
  faviconUrl: { type: String, default: "" },
  phone: { type: String, default: "+91 98765 43210" },
  emergencyPhone: { type: String, default: "+91 98765 00000" },
  email: { type: String, default: "info@sugamclinic.com" },
  whatsapp: { type: String, default: "919876543210" },
  address: { type: String, default: "123 Healthcare Ave, Medical District, Chennai" },
  googleMapsUrl: { type: String, default: "https://maps.google.com" },
  workingHours: { type: String, default: "Mon - Sat: 9:00 AM - 8:00 PM" },
  facebook: { type: String, default: "" },
  instagram: { type: String, default: "" },
  youtube: { type: String, default: "" },
  linkedin: { type: String, default: "" },
  seoTitle: { type: String, default: "Sugam Child & Gastro Care Clinic - Best Pediatrician & Gastroenterologist" },
  seoDescription: { type: String, default: "Expert Child care, Newborn care, Gastroenterology, and Liver care services." },
  seoKeywords: { type: String, default: "pediatrician, gastro care, newborn care, liver care, Sugam Clinic" },
  seoOgImage: { type: String, default: "" },
  heroImageUrl: { type: String, default: "" },
  copyright: { type: String, default: "© 2026 Sugam Child & Gastro Care Clinic. All Rights Reserved." },
}, { timestamps: true });

// Doctor Schema
const DoctorSchema = new Schema({
  name: { type: String, required: true },
  qualification: { type: String, required: true },
  specialization: { type: String, required: true },
  experience: { type: Number, required: true },
  description: { type: String, required: true },
  consultingTime: { type: String, required: true },
  phone: { type: String, default: "" },
  photoUrl: { type: String, default: "" },
  facebook: { type: String, default: "" },
  twitter: { type: String, default: "" },
  linkedin: { type: String, default: "" },
  availability: { 
    type: String, 
    enum: ["Available Today", "Fully Booked", "On Leave"], 
    default: "Available Today" 
  },
}, { timestamps: true });

// Service Schema
const ServiceSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, default: "HeartPulse" }, // Lucide icon name
  imageUrl: { type: String, default: "" },
}, { timestamps: true });

// Appointment Schema
const AppointmentSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: String, required: true }, // YYYY-MM-DD
  time: { type: String, required: true },
  doctorId: { type: String, required: true }, // can be doctor name or ID
  doctorName: { type: String, required: true },
  message: { type: String, default: "" },
  status: { 
    type: String, 
    enum: ["Pending", "Confirmed", "Completed", "Cancelled"], 
    default: "Pending" 
  },
}, { timestamps: true });

// Review Schema
const ReviewSchema = new Schema({
  name: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  photoUrl: { type: String, default: "" },
  reviewText: { type: String, required: true },
  isApproved: { type: Boolean, default: true },
}, { timestamps: true });

// Gallery Schema
const GallerySchema = new Schema({
  url: { type: String, required: true },
  category: { type: String, default: "gallery" },
  alt: { type: String, default: "Clinic photo" },
}, { timestamps: true });

// Contact Message Schema
const ContactMessageSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
}, { timestamps: true });

// FAQ Schema
const FAQSchema = new Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

// Blog Post Schema
const BlogPostSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  imageUrl: { type: String, default: "" },
  author: { type: String, default: "Dr. Sugam" },
  category: { type: String, default: "Child Health" },
  published: { type: Boolean, default: true },
}, { timestamps: true });

// Vaccination Reminder Schema
const VaccinationReminderSchema = new Schema({
  childName: { type: String, required: true },
  parentName: { type: String, required: true },
  parentEmail: { type: String, required: true },
  parentPhone: { type: String, required: true },
  birthDate: { type: String, required: true }, // YYYY-MM-DD
  remindersSent: [{ type: String }], // Array of sent dates/vaccine names
}, { timestamps: true });

// Exports
export const ClinicSettings = models.ClinicSettings || model("ClinicSettings", ClinicSettingsSchema);
export const Doctor = models.Doctor || model("Doctor", DoctorSchema);
export const Service = models.Service || model("Service", ServiceSchema);
export const Appointment = models.Appointment || model("Appointment", AppointmentSchema);
export const Review = models.Review || model("Review", ReviewSchema);
export const Gallery = models.Gallery || model("Gallery", GallerySchema);
export const ContactMessage = models.ContactMessage || model("ContactMessage", ContactMessageSchema);
export const FAQ = models.FAQ || model("FAQ", FAQSchema);
export const BlogPost = models.BlogPost || model("BlogPost", BlogPostSchema);
export const VaccinationReminder = models.VaccinationReminder || model("VaccinationReminder", VaccinationReminderSchema);
