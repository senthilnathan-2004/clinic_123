import React from "react";
import { dbConnect } from "@/lib/db";
import { Service } from "@/lib/models/schemas";
import { getClinicSettings } from "@/lib/data";
import { Navbar } from "@/components/public/Navbar";
import { Footer } from "@/components/public/Footer";
import { AllServicesGrid } from "@/components/public/AllServicesGrid";
import { EmergencyCall } from "@/components/public/EmergencyCall";

export const revalidate = 60;

export default async function ServicesPage() {
  await dbConnect();

  const [services, settings] = await Promise.all([
    Service.find().lean(),
    getClinicSettings(),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar settings={settings ?? {}} compact />
      <main className="flex-grow pt-24 pb-20 bg-background bg-dot-pattern">
        <AllServicesGrid services={services} />
      </main>
      <Footer settings={settings ?? {}} />
      <EmergencyCall settings={settings ?? {}} />
    </div>
  );
}
