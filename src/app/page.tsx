import React from "react";
import dynamic from "next/dynamic";
import { getHomePageData } from "@/lib/data";
import { Navbar } from "@/components/public/Navbar";
import { Hero } from "@/components/public/Hero";
import { Services } from "@/components/public/Services";
import { Doctors } from "@/components/public/Doctors";
import { Footer } from "@/components/public/Footer";
import { EmergencyCall } from "@/components/public/EmergencyCall";
import { ScrollingTicker } from "@/components/public/ScrollingTicker";

const BookingForm = dynamic(
  () => import("@/components/public/BookingForm").then((m) => m.BookingForm)
);
const Reviews = dynamic(
  () => import("@/components/public/Reviews").then((m) => m.Reviews)
);
const Gallery = dynamic(
  () => import("@/components/public/Gallery").then((m) => m.Gallery)
);
const FAQComponent = dynamic(
  () => import("@/components/public/FAQ").then((m) => m.FAQ)
);
const Blog = dynamic(
  () => import("@/components/public/Blog").then((m) => m.Blog)
);
const Contact = dynamic(
  () => import("@/components/public/Contact").then((m) => m.Contact)
);
const ChatBot = dynamic(
  () => import("@/components/public/ChatBot").then((m) => m.ChatBot)
);

export const revalidate = 60;

export default async function Home() {
  const { settings, doctors, services, faqs, reviews, posts, gallery } =
    await getHomePageData();

  const safeSettings = settings ?? {};

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar settings={safeSettings} />

      <main className="flex-grow">
        <Hero settings={safeSettings} doctors={doctors} />
        <ScrollingTicker />
        <Services services={services} />
        <Doctors doctors={doctors} />
        <BookingForm doctors={doctors} />
        <Reviews reviews={reviews} />
        <Gallery images={gallery} />
        <FAQComponent faqs={faqs} />
        <Blog posts={posts} />
        <Contact settings={safeSettings} />
      </main>

      <Footer settings={safeSettings} />
      <EmergencyCall settings={safeSettings} />
      <ChatBot settings={safeSettings} doctors={doctors} />
    </div>
  );
}
