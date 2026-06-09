import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Script from "next/script";
import { PageLoader } from "@/components/public/PageLoader";
import { dbConnect } from "@/lib/db";
import { ClinicSettings } from "@/lib/models/schemas";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  try {
    await dbConnect();
    const settings = await ClinicSettings.findOne();
    if (settings) {
      return {
        title: settings.seoTitle || "Sugam Child & Gastro Care Clinic",
        description: settings.seoDescription || "Premium Child Care, Neonatology, Gastroenterology and Liver Care.",
        keywords: settings.seoKeywords || "pediatrician, gastro care, newborn care, liver care",
        openGraph: {
          title: settings.seoTitle,
          description: settings.seoDescription,
          images: [{ url: settings.seoOgImage || "/og-image.png" }],
        },
        icons: {
          icon: settings.faviconUrl || "/favicon.ico",
        },
      };
    }
  } catch (error) {
    console.error("Failed to generate metadata from database, using fallback:", error);
  }

  return {
    title: "Sugam Child & Gastro Care Clinic - Pediatric & Gastro Specialist",
    description: "Premium healthcare services for pediatric care, neonatology, gastroenterology, and liver care.",
    keywords: "pediatrician, gastro care, child health, liver care",
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${outfit.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">

        {/* ── Splash Screen (shows before React hydrates) ── */}
        <div id="splash-screen" aria-hidden="true">
          <div className="splash-logo">Sugam Clinic</div>
          <div className="splash-ring" />
          <div className="splash-dots">
            <div className="splash-dot" />
            <div className="splash-dot" />
            <div className="splash-dot" />
          </div>
        </div>

        {/* ── App ── */}
        <Providers>
          <PageLoader />
          {children}
        </Providers>

        {/* Hide splash once window.load fires */}
        <Script id="splash-hide" strategy="afterInteractive">
          {`
            (function() {
              function hideSplash() {
                var el = document.getElementById('splash-screen');
                if (!el) return;
                el.classList.add('hide');
                setTimeout(function() { el.style.display = 'none'; }, 450);
              }
              if (document.readyState === 'complete') {
                hideSplash();
              } else {
                window.addEventListener('load', hideSplash);
              }
            })();
          `}
        </Script>

        {/* Google Translate (hidden, for potential future use) */}
        <div id="google_translate_element" style={{ display: "none" }} />
      </body>
    </html>
  );
}
