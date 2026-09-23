import type { Metadata } from "next";
import { DownloadSection } from "@/components/Download";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Download — PocketServer",
  description:
    "Download the PocketServer APK and turn your Android phone into your own personal server. Free and open source.",
};

export default function DownloadPage() {
  return (
    <main id="main" className="relative z-10 pt-28 sm:pt-32">
      <DownloadSection />
      <FAQ />
      <Footer />
    </main>
  );
}
