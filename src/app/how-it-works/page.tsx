import type { Metadata } from "next";
import { HowItWorks } from "@/components/HowItWorks";
import { BuiltFor } from "@/components/BuiltFor";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "How It Works — PocketServer",
  description:
    "Install PocketServer, tap Start Server, and open the local address from any device on your network.",
};

export default function HowItWorksPage() {
  return (
    <main id="main" className="relative z-10 pt-28 sm:pt-32">
      <HowItWorks />
      <BuiltFor />
      <FinalCTA />
      <Footer />
    </main>
  );
}
