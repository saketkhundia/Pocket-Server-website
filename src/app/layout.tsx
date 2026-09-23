import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { DownloadToasts } from "@/components/download-toast";
import { SITE_URL } from "@/lib/config";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});
const jetmono = JetBrains_Mono({
  variable: "--font-jetmono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PocketServer — Turn Your Android Into a Server",
  description:
    "PocketServer is an open-source Android application that turns your phone into a personal server for files, web services, media, and more.",
  metadataBase: new URL(SITE_URL),
  keywords: ["PocketServer", "Android server", "personal server", "file server", "open source", "self-host", "local network"],
  authors: [{ name: "PocketServer" }],
  openGraph: {
    title: "PocketServer — Turn Your Android Into a Server",
    description:
      "PocketServer is an open-source Android application that turns your phone into a personal server for files, web services, media, and more.",
    type: "website",
    siteName: "PocketServer",
  },
  twitter: {
    card: "summary_large_image",
    title: "PocketServer — Turn Your Android Into a Server",
    description:
      "Turn your Android phone into a personal server. Share files, host services, and access your phone from any device on your local network.",
  },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${jetmono.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full bg-[#F5F5F7] text-zinc-900 dark:bg-black dark:text-zinc-100">
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded-xl focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-black"
          >
            Skip to content
          </a>
          <Navbar />
          {children}
          <DownloadToasts />
        </ThemeProvider>
      </body>
    </html>
  );
}
