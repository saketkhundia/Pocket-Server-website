import dynamic from "next/dynamic";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { DownloadSection } from "@/components/Download";
import { Footer } from "@/components/Footer";
import { AmbientBackground } from "@/components/AmbientBackground";

/* one continuous story: phone → server → network → devices → download */
const ServerActivation = dynamic(() =>
  import("@/components/ServerActivation").then((m) => m.ServerActivation)
);
const Flow = dynamic(() => import("@/components/Showcase").then((m) => m.Flow));
const Features = dynamic(() =>
  import("@/components/Features").then((m) => m.Features)
);
const OpenSource = dynamic(() =>
  import("@/components/OpenSource").then((m) => m.OpenSource)
);
const FAQ = dynamic(() => import("@/components/FAQ").then((m) => m.FAQ));

export default function Home() {
  return (
    <>
      <AmbientBackground />
      <main id="main" className="relative z-10">
        {/* ACT 01–02 · phone, server, network */}
        <Hero />
        {/* ACT 03 · the reveal */}
        <ServerActivation />
        {/* ACT 04 · infrastructure */}
        <Flow />
        {/* ACT 05 · everything runs locally */}
        <Features />
        <HowItWorks />
        <OpenSource />
        {/* ACT 06 · launch moment */}
        <DownloadSection />
        <FAQ />
        <Footer />
      </main>
    </>
  );
}
