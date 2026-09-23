import type { Metadata } from "next";
import { Features } from "@/components/Features";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Features — PocketServer",
  description:
    "File server, web server, media hub and one-tap controls. Everything PocketServer gives your Android device.",
};

export default function FeaturesPage() {
  return (
    <main id="main" className="relative z-10 pt-28 sm:pt-32">
      <Features />
      <FinalCTA />
      <Footer />
    </main>
  );
}
