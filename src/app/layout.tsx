import type { Metadata } from "next";
import { Cormorant_Garamond, Lato } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import MashujaaPopup from "@/components/MashujaaPopup";
import { site } from "@/lib/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Flowers & Event Decor at ${site.location}`,
    template: `%s | ${site.name}`,
  },
  description:
    "Bouquets, bridal flowers, wedding and event decor, and sympathy flowers from Bobo Blooms at City Market. Order on WhatsApp.",
  openGraph: {
    siteName: site.name,
    images: ["/images/og.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${lato.variable} font-sans antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingWhatsApp />
        <MashujaaPopup />
      </body>
    </html>
  );
}
