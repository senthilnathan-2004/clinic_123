import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Script from "next/script";
import { PageLoader } from "@/components/public/PageLoader";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Sugam Child & Gastro Care Clinic - Pediatric & Gastro Specialist",
  description:
    "Premium healthcare services for pediatric care, neonatology, gastroenterology, and liver care.",
  keywords: "pediatrician, gastro care, child health, liver care",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${outfit.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        <div id="splash-screen" aria-hidden="true">
          <div className="splash-logo">Sugam Clinic</div>
          <div className="splash-ring" />
          <div className="splash-dots">
            <div className="splash-dot" />
            <div className="splash-dot" />
            <div className="splash-dot" />
          </div>
        </div>

        <Providers>
          <PageLoader />
          {children}
        </Providers>

        <Script id="splash-hide" strategy="beforeInteractive">
          {`
            (function() {
              function hideSplash() {
                var el = document.getElementById('splash-screen');
                if (!el || el.classList.contains('hide')) return;
                el.classList.add('hide');
                setTimeout(function() { el.style.display = 'none'; }, 300);
              }
              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', hideSplash);
              } else {
                hideSplash();
              }
              setTimeout(hideSplash, 800);
            })();
          `}
        </Script>

        <div id="google_translate_element" style={{ display: "none" }} />
      </body>
    </html>
  );
}
