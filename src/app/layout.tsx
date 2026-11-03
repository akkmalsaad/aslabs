import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Footer } from "@/components/layout/Footer";
import { NavigationProvider } from "@/components/layout/NavigationProvider";
import { NavigationShell } from "@/components/layout/NavigationShell";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { indexable, seo } from "@/lib/seo";
import { brandColors, site } from "@/lib/site";
import "./globals.css";

// next/font self-hosts these at build time: no external requests, no layout shift.
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Bevan (SIL OFL 1.1), the face for every heading (--font-heading) and the website mockup
// (--font-display). Single static weight (Regular 400): headings stay font-normal, never bold.
const bevan = localFont({
  src: "../../assets/fonts/Bevan-Regular.ttf",
  weight: "400",
  style: "normal",
  variable: "--font-bevan",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: seo.title,
    template: `%s | ${site.shortName}`,
  },
  description: seo.description,
  applicationName: site.shortName,
  authors: [{ name: "Akkmal Saad", url: site.url }],
  creator: "Akkmal Saad",
  alternates: { canonical: "/" },
  // Vercel preview deployments stay out of search results (see lib/seo.ts).
  robots: indexable ? { index: true, follow: true } : { index: false, follow: false },
  icons: {
    icon: [
      { url: "/brand/favicon/favicon.ico", sizes: "any" },
      { url: "/brand/favicon/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/brand/favicon/apple-touch-icon.png",
  },
  manifest: "/brand/favicon/site.webmanifest",
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.shortName,
    locale: "en_MY",
    title: seo.title,
    description: seo.description,
    images: [seo.ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
    images: [seo.ogImage],
  },
};

export const viewport: Viewport = {
  themeColor: brandColors.canvas,
  colorScheme: "light",
  // Lets the fixed chrome use env(safe-area-inset-*) on notched devices.
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${bevan.variable}`}
    >
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-1/2 focus:z-[100] focus:-translate-x-1/2 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <MotionProvider>
          <NavigationProvider>
            <NavigationShell />
            <main id="main">{children}</main>
            <Footer />
          </NavigationProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
