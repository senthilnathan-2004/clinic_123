import React from "react";
import Link from "next/link";
import { dbConnect } from "@/lib/db";
import { Service, ClinicSettings } from "@/lib/models/schemas";
import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";
import { AllServicesGrid } from "@/components/public/AllServicesGrid";
import { EmergencyCall } from "@/components/public/EmergencyCall";

export const revalidate = 30;

export default async function ServicesPage() {
  await dbConnect();
  const services = await Service.find().lean();
  const settings = await ClinicSettings.findOne().lean();

  const safeServices = JSON.parse(JSON.stringify(services));
  const safeSettings = JSON.parse(JSON.stringify(settings || {}));

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar settings={safeSettings} compact />
      <main className="flex-grow pt-24 pb-20 bg-background bg-dot-pattern">
        <AllServicesGrid services={safeServices} />
      </main>
      <Footer settings={safeSettings} />
      <EmergencyCall settings={safeSettings} />
    </div>
  );
}
