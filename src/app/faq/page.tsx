import type { Metadata } from "next";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "FAQ — PocketServer",
  description:
    "What is PocketServer, how to connect, does it need internet, and how to install the APK.",
};

export default function FAQPage() {
  return (
    <main id="main" className="relative z-10 pt-28 sm:pt-32">
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
