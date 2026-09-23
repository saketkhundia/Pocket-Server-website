import type { Metadata } from "next";
import { OpenSource } from "@/components/OpenSource";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Open Source — PocketServer",
  description:
    "PocketServer is open source. Explore the code, report issues, and contribute on GitHub.",
};

export default function OpenSourcePage() {
  return (
    <main id="main" className="relative z-10 pt-28 sm:pt-32">
      <OpenSource />
      <FinalCTA />
      <Footer />
    </main>
  );
}
