import type { Metadata } from "next";
import { Cormorant_Garamond, Lato } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import JsonLd from "@/components/JsonLd";
import MashujaaPopup from "@/components/MashujaaPopup";
import { floristSchema, pageMetadata } from "@/lib/seo";
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

const defaultTitle = `${site.name} | Florist in Nairobi for Flowers, Wedding & Event Decor`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  ...pageMetadata({
    description: `Florist at ${site.location}. Bouquets, bridal flowers, wedding and event decor, and funeral wreaths from ${site.priceFrom}, delivered anywhere in Kenya. Order on WhatsApp.`,
    path: "/",
  }),
  title: { default: defaultTitle, template: `%s | ${site.name}` },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-KE">
      <body className={`${cormorant.variable} ${lato.variable} font-sans antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingWhatsApp />
        <MashujaaPopup />
        <JsonLd data={floristSchema} />
      </body>
    </html>
  );
}
