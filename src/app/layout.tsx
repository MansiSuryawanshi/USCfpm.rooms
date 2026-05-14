import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://uscfpmrooms.vercel.app'),
  title: {
    default: "USC FPM Room Status Dashboard",
    template: "%s | USC FPM Room Status"
  },
  description: "Track conference room readiness, room availability, and facilities status for USC Facilities Planning and Management spaces.",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: {
      "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION as string
    }
  },
  openGraph: {
    title: "USC FPM Room Status Dashboard",
    description: "Track conference room readiness, room availability, and facilities status for USC Facilities Planning and Management spaces.",
    url: "/",
    siteName: "USC FPM Rooms",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "USC FPM Room Status Dashboard",
    description: "Track conference room readiness, room availability, and facilities status for USC Facilities Planning and Management spaces.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {/* SEO Accessibility: Skip to main content link */}
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:p-4 focus:bg-white focus:z-50 text-black">
          Skip to main content
        </a>
        
        {/* Global USC FPM Header */}
        <header className="w-full py-8 sm:py-10 bg-white border-b border-gray-100 flex flex-col items-center justify-center text-center">
          <div className="font-serif text-4xl sm:text-5xl font-bold leading-none tracking-tight mb-2">
            <span className="text-[#990000]">USC</span><span className="text-slate-900 ml-1">FPM</span>
          </div>
          <div className="font-serif text-sm font-normal text-slate-700 tracking-wide mb-4">Facilities Planning and Management</div>
          <h2 className="text-2xl font-semibold text-slate-900 mb-1">Network Services</h2>
          <p className="text-slate-500 text-sm font-medium">Daily Meeting Room Checks</p>
        </header>

        {/* Minimal Global Header for Internal Linking Strategy */}
        <nav className="sr-only sm:not-sr-only sm:flex sm:justify-center sm:gap-6 sm:py-4 sm:bg-white sm:border-b sm:border-gray-200 shadow-sm">
          <Link href="/" className="text-gray-600 hover:text-[#990000] font-medium text-sm transition-colors">
            Dashboard Home
          </Link>
          <Link href="/usc-fpm-rooms" className="text-gray-600 hover:text-[#990000] font-medium text-sm transition-colors">
            USC FPM Rooms
          </Link>
          <Link href="/conference-room-status" className="text-gray-600 hover:text-[#990000] font-medium text-sm transition-colors">
            Conference Room Status
          </Link>
          <Link href="/meeting-room-dashboard" className="text-gray-600 hover:text-[#990000] font-medium text-sm transition-colors">
            Meeting Room Dashboard
          </Link>
        </nav>
        
        <div id="main-content" className="flex-1 w-full">
          {children}
        </div>
      </body>
    </html>
  );
}
