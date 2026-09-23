import { ArrowUpRight, Code2, Cpu, GraduationCap, Server } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";

const ROWS = [
  {
    icon: Code2,
    index: "01",
    title: "Developers",
    body: "Quickly test and host local services without setting up a traditional server.",
  },
  {
    icon: Cpu,
    index: "02",
    title: "Power Users",
    body: "Turn an Android device into a useful always-available local server.",
  },
  {
    icon: GraduationCap,
    index: "03",
    title: "Students",
    body: "Experiment with networking, servers, APIs, and web applications.",
  },
  {
    icon: Server,
    index: "04",
    title: "Self-Hosters",
    body: "Keep useful services close to you and under your control.",
  },
];

export function BuiltFor() {
  return (
    <section className="wrap py-16">
      <SectionHeading
        eyebrow="Who it's for"
        title={<>Built for people who want more from their phone.</>}
      />
      <div className="mx-auto mt-12 max-w-4xl">
        {ROWS.map((r, i) => (
          <Reveal key={r.title} delay={i * 0.05}>
            <div className="group flex cursor-default items-center gap-5 border-t border-black/10 py-6 transition-all last:border-b hover:bg-black/[0.02] sm:gap-8 sm:px-4 dark:border-white/10 dark:hover:bg-white/[0.02]">
              <span className="mono-tech text-[12px] text-[#8E8E93] dark:text-[#6E6E73]">{r.index}</span>
              <r.icon size={19} strokeWidth={1.8} className="shrink-0" />
              <div className="min-w-0 flex-1">
                <h3 className="text-[16px] font-semibold tracking-tight transition-transform duration-300 group-hover:translate-x-1">
                  {r.title}
                </h3>
                <p className="mt-0.5 text-[13.5px] leading-relaxed text-[#5B5F68] dark:text-[#A1A1AA]">
                  {r.body}
                </p>
              </div>
              <ArrowUpRight
                size={17}
                className="shrink-0 text-[#8E8E93] opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100 dark:text-[#6E6E73]"
              />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
