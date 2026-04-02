import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "ACADEMIA — English Edutech Hub",
  description:
    "Master English with Arindam Dutta. AI-powered learning for WBCS, BANK, SSC, CGL, CBSE, ICSE & State Boards (Class V-XII).",
  keywords: [
    "English coaching",
    "WBCS English",
    "SSC English",
    "CBSE English",
    "ICSE English",
    "Arindam Dutta",
    "ACADEMIA",
  ],
  openGraph: {
    title: "ACADEMIA — English Edutech Hub",
    description:
      "AI-powered English learning platform for competitive exams and school boards.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-surface font-body text-on-surface selection:bg-primary-container selection:text-on-primary-container antialiased">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
