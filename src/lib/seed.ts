import { dbConnect } from "./db";
import { ClinicSettings, Doctor, Service, FAQ, Review, BlogPost } from "./models/schemas";

export async function seedDatabase() {
  await dbConnect();

  // 1. Seed Settings
  const settingsCount = await ClinicSettings.countDocuments();
  if (settingsCount === 0) {
    await ClinicSettings.create({
      name: "Sugam Child & Gastro Care Clinic",
      tagline: "Excellence in Pediatric, Neonatal & Gastroenterology Care",
      phone: "+91 94444 56789",
      emergencyPhone: "+91 94444 99999",
      email: "contact@sugamclinic.com",
      whatsapp: "919444456789",
      address: "No. 45, First Floor, Doctors Plaza, Near Central Metro, Chennai, Tamil Nadu - 600001",
      googleMapsUrl: "https://maps.google.com",
      workingHours: "Monday - Saturday: 09:00 AM - 08:30 PM",
      facebook: "https://facebook.com/sugamclinic",
      instagram: "https://instagram.com/sugamclinic",
      youtube: "https://youtube.com/sugamclinic",
      linkedin: "https://linkedin.com/company/sugamclinic",
      seoTitle: "Sugam Child & Gastro Care Clinic - Pediatric & Gastro Specialist",
      seoDescription: "Sugam Clinic provides premium child care, newborn health services, pediatric gastroenterology, and comprehensive liver care in Chennai.",
      seoKeywords: "pediatrician Chennai, pediatric gastroenterologist, newborn care Chennai, liver specialist, Sugam Clinic",
      copyright: "© 2026 Sugam Child & Gastro Care Clinic. Developed with Care.",
    });
    console.log("Seeded clinic settings.");
  }

  // 2. Seed Doctors
  const doctorsCount = await Doctor.countDocuments();
  if (doctorsCount === 0) {
    await Doctor.create([
      {
        name: "Dr. A. Senthil Kumar",
        qualification: "MD (Peds), DNB, FIAP",
        specialization: "Senior Pediatrician & Neonatologist",
        experience: 18,
        description: "Specialist in newborn intensive care, childhood vaccinations, growth & development tracking, and pediatric asthma management.",
        consultingTime: "Mon - Sat: 09:00 AM - 01:00 PM",
        phone: "+91 94444 56789",
        photoUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400",
        availability: "Available Today",
      },
      {
        name: "Dr. Priya Senthil",
        qualification: "MD, DM (Gastro), MRCPCH (UK)",
        specialization: "Pediatric Gastroenterologist & Hepatologist",
        experience: 15,
        description: "Expert in pediatric endoscopy, liver diseases in children, chronic abdominal pain, and food allergies.",
        consultingTime: "Mon - Sat: 04:30 PM - 08:30 PM",
        phone: "+91 94444 56789",
        photoUrl: "https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=400",
        availability: "Available Today",
      }
    ]);
    console.log("Seeded doctors.");
  }

  // 3. Seed Services
  const servicesCount = await Service.countDocuments();
  if (servicesCount === 0) {
    await Service.create([
      {
        title: "Pediatric Consultation & Child Care",
        description: "Comprehensive health checkups, growth monitoring, developmental assessments, and expert care for common childhood illnesses.",
        icon: "Baby",
        imageUrl: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=400",
      },
      {
        title: "Newborn Care & Neonatology",
        description: "Specialized care for preterm babies, newborn screening, lactation counseling, and management of neonatal jaundice.",
        icon: "HeartPulse",
        imageUrl: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=400",
      },
      {
        title: "Comprehensive Vaccination",
        description: "Painless vaccination options, official immunization tracking, Catch-up vaccinations, and schedule reminders.",
        icon: "ShieldAlert",
        imageUrl: "https://images.unsplash.com/photo-1628771065518-0d82f11181d6?auto=format&fit=crop&q=80&w=400",
      },
      {
        title: "Gastroenterology & Endoscopy",
        description: "Diagnosis and therapy for chronic diarrhea, GERD, acid reflux, celiac disease, and pediatric endoscopy services.",
        icon: "Activity",
        imageUrl: "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&q=80&w=400",
      },
      {
        title: "Liver Care & Hepatology",
        description: "Management of neonatal hepatitis, metabolic liver diseases, chronic liver failure, and jaundice evaluations.",
        icon: "Stethoscope",
        imageUrl: "https://images.unsplash.com/photo-1631815541572-455b41295b9d?auto=format&fit=crop&q=80&w=400",
      },
      {
        title: "Nutritional Counselling",
        description: "Personalized dietary advice for growth issues, childhood obesity, picky eaters, and weaning support.",
        icon: "Apple",
        imageUrl: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=400",
      }
    ]);
    console.log("Seeded services.");
  }

  // 4. Seed FAQs
  const faqsCount = await FAQ.countDocuments();
  if (faqsCount === 0) {
    await FAQ.create([
      {
        question: "What are the consulting timings for pediatric care?",
        answer: "Dr. Senthil Kumar is available for pediatric consultation from Monday to Saturday, 9:00 AM to 1:00 PM. Appointments can be booked online.",
        order: 1,
      },
      {
        question: "Do you offer vaccination services daily?",
        answer: "Yes, we offer routine and specialized vaccinations for children on all working days during clinic consulting hours. Vaccine reminders can also be configured.",
        order: 2,
      },
      {
        question: "When should we consult a pediatric gastroenterologist?",
        answer: "You should seek consultation if your child suffers from chronic diarrhea, persistent vomiting, chronic abdominal pain, failure to gain weight, or unexplained jaundice.",
        order: 3,
      }
    ]);
    console.log("Seeded FAQs.");
  }

  // 5. Seed Reviews
  const reviewsCount = await Review.countDocuments();
  if (reviewsCount === 0) {
    await Review.create([
      {
        name: "Abhishek Raman",
        rating: 5,
        reviewText: "Dr. Senthil Kumar is very polite and takes time to understand the child's issues. The clinic is clean and follows high hygiene standards.",
        photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
        isApproved: true,
      },
      {
        name: "Meera Krishnan",
        rating: 5,
        reviewText: "Best gastro doctor for kids in Chennai. Dr. Priya diagnosed our son's chronic stomach pain issues accurately. Highly recommend!",
        photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150",
        isApproved: true,
      }
    ]);
    console.log("Seeded reviews.");
  }

  // 6. Seed Blogs
  const blogsCount = await BlogPost.countDocuments();
  if (blogsCount === 0) {
    await BlogPost.create([
      {
        title: "Understanding Childhood Vaccinations: A Complete Guide",
        slug: "understanding-childhood-vaccinations",
        excerpt: "Learn why staying on schedule with vaccinations protects your child and the community from preventable illness.",
        content: "<p>Staying on track with childhood vaccinations is one of the most critical decisions you make for your baby. Vaccines protect infants from life-threatening diseases like Polio, Measles, and Hepatitis before they come in contact with them. In this article, we outline the primary immunization schedule and explain catch-up options.</p>",
        imageUrl: "https://images.unsplash.com/photo-1628771065518-0d82f11181d6?auto=format&fit=crop&q=80&w=400",
        category: "Vaccination",
        author: "Dr. A. Senthil Kumar",
      },
      {
        title: "Managing Acid Reflux in Toddlers: Tips and Remedies",
        slug: "managing-acid-reflux-in-toddlers",
        excerpt: "Recognizing GERD symptoms in children early and adapting lifestyle and diet to provide quick relief.",
        content: "<p>GERD or acid reflux is not just an adult issue. Toddlers and babies can experience spit-ups, heartburn, or persistent coughing due to gastroesophageal reflux. Simple adaptations like offering smaller frequent feeds and keeping the child upright post-meals can help immensely.</p>",
        imageUrl: "https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&q=80&w=400",
        category: "Gastro Care",
        author: "Dr. Priya Senthil",
      }
    ]);
    console.log("Seeded blogs.");
  }
}
