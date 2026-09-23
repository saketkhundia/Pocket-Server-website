import { Download, Play, Wifi } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";

const STEPS = [
  {
    n: "01",
    icon: Download,
    title: "Install PocketServer",
    body: "Download and install the Android application.",
    code: "PocketServer.apk",
  },
  {
    n: "02",
    icon: Play,
    title: "Start Your Server",
    body: "Open PocketServer and tap Start Server.",
    code: "[ Start Server ]",
  },
  {
    n: "03",
    icon: Wifi,
    title: "Connect",
    body: "Open the provided local address on your laptop, desktop, or another device.",
    code: "http://192.168.1.20:8080",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative mx-auto max-w-[1200px] scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading
        eyebrow="How it works"
        title={<>From phone to server in seconds.</>}
        sub="Three steps. No terminal, no config files, no port-forwarding."
      />
      <div className="relative mt-14">
        <div aria-hidden="true" className="absolute left-[60px] top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-black/15 to-transparent lg:block dark:via-white/15" />
        <div className="space-y-4">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <div className="panel group relative grid gap-5 overflow-hidden rounded-[20px] p-6 transition-colors hover:border-black/20 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-8 sm:p-7 dark:hover:border-white/20">
                <div className="flex items-center gap-5">
                  <span className="mono-tech text-[13px] text-[#8E8E93] dark:text-[#6E6E73]">{s.n}</span>
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-black text-white dark:bg-white dark:text-black">
                    <s.icon size={20} strokeWidth={1.9} />
                  </span>
                </div>
                <div>
                  <h3 className="text-[16.5px] font-semibold tracking-tight">{s.title}</h3>
                  <p className="mt-1 text-[13.5px] leading-relaxed text-[#5B5F68] dark:text-[#A1A1AA]">{s.body}</p>
                </div>
                <p className="mono-tech truncate rounded-xl border border-black/10 bg-black/[0.03] px-4 py-3 text-[12px] sm:max-w-[260px] dark:border-white/10 dark:bg-white/[0.03]">
                  {s.code}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
