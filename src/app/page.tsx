import React from "react";
import { dbConnect } from "@/lib/db";
import { ClinicSettings, Doctor, Service, FAQ, Review, BlogPost, Gallery as GalleryModel } from "@/lib/models/schemas";
import { seedDatabase } from "@/lib/seed";
import { Navbar } from "@/components/public/Navbar";
import { Hero } from "@/components/public/Hero";
import { Services } from "@/components/public/Services";
import { Doctors } from "@/components/public/Doctors";
import { BookingForm } from "@/components/public/BookingForm";
import { Reviews } from "@/components/public/Reviews";
import { Gallery } from "@/components/public/Gallery";
import { FAQ as FAQComponent } from "@/components/public/FAQ";
import { Blog } from "@/components/public/Blog";
import { Contact } from "@/components/public/Contact";
import { Footer } from "@/components/public/Footer";
import { EmergencyCall } from "@/components/public/EmergencyCall";
import { ChatBot } from "@/components/public/ChatBot";
import { ScrollingTicker } from "@/components/public/ScrollingTicker";

export const revalidate = 0; // Disable caching to fetch updated data instantly from the admin dashboard

export default async function Home() {
  await dbConnect();

  // Try to find settings; if none exist, seed default database values
  let settings = await ClinicSettings.findOne();
  if (!settings) {
    await seedDatabase();
    settings = await ClinicSettings.findOne();
  }

  // Fetch all collections
  const doctors = await Doctor.find().lean();
  const services = await Service.find().lean();
  const faqs = await FAQ.find().sort({ order: 1 }).lean();
  const reviews = await Review.find({ isApproved: true }).lean();
  const posts = await BlogPost.find({ published: true }).sort({ createdAt: -1 }).lean();
  const gallery = await GalleryModel.find().sort({ createdAt: -1 }).lean();

  // Map to plain objects for client safety
  const safeDoctors = JSON.parse(JSON.stringify(doctors));
  const safeServices = JSON.parse(JSON.stringify(services));
  const safeFaqs = JSON.parse(JSON.stringify(faqs));
  const safeReviews = JSON.parse(JSON.stringify(reviews));
  const safePosts = JSON.parse(JSON.stringify(posts));
  const safeSettings = JSON.parse(JSON.stringify(settings));
  const safeGallery = JSON.parse(JSON.stringify(gallery));

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar settings={safeSettings} />
      
      <main className="flex-grow">
        <Hero settings={safeSettings} doctors={safeDoctors} />
        <ScrollingTicker />
        <Services services={safeServices} />
        <Doctors doctors={safeDoctors} />
        <BookingForm doctors={safeDoctors} />
        <Reviews reviews={safeReviews} />
        <Gallery images={safeGallery} />
        <FAQComponent faqs={safeFaqs} />
        <Blog posts={safePosts} />
        <Contact settings={safeSettings} />
      </main>

      <Footer settings={safeSettings} />
      <EmergencyCall settings={safeSettings} />
      <ChatBot settings={safeSettings} doctors={safeDoctors} />
    </div>
  );
}
