"use client";

import { motion } from "framer-motion";
import { Globe, Laptop, Monitor, TabletSmartphone } from "lucide-react";
import { Logo } from "./Logo";
import { Reveal } from "./Reveal";

const EASE = [0.22, 1, 0.36, 1] as const;

/* infrastructure view — the phone as a network citizen */
const NODES = [
  { icon: Laptop, label: "Laptop", meta: "192.168.1.11", x: 300, y: 52 },
  { icon: Monitor, label: "Desktop", meta: "192.168.1.14", x: 104, y: 258 },
  { icon: TabletSmartphone, label: "Tablet", meta: "192.168.1.18", x: 496, y: 258 },
  { icon: Globe, label: "Browser", meta: ":8080", x: 300, y: 464 },
];

function CenterNode({ on }: { on: boolean }) {
  return (
    <div className="relative mx-auto w-[180px]">
      <div
        className={`absolute -inset-8 rounded-[36px] bg-[radial-gradient(closest-side,rgba(52,211,153,0.1),transparent)] blur-2xl transition-opacity duration-[2000ms] ${
          on ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      />
      <div className="relative rounded-[1.8rem] border border-white/[0.1] bg-[#151517] p-[8px] shadow-[0_32px_64px_rgba(0,0,0,0.5)]">
        <div className="rounded-[1.3rem] bg-black px-4 pb-4 pt-3.5 text-left">
          <div className="flex items-center gap-2">
            <Logo size={22} />
            <p className="text-[11px] font-bold tracking-tight text-white">
              PocketServer
            </p>
          </div>
          <p
            className={`mono-tech mt-3 flex items-center gap-1.5 text-[9px] font-semibold tracking-[0.2em] transition-colors duration-700 ${
              on ? "text-[#34D399]" : "text-zinc-500"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                on ? "bg-[#34D399] animate-pulse-dot run-dot" : "bg-zinc-600"
              }`}
            />
            {on ? "SERVER RUNNING" : "STANDBY"}
          </p>
          <p className="mono-tech mt-1.5 truncate text-[11px] text-white">
            192.168.1.20:8080
          </p>
          <div className="mono-tech mt-2.5 grid h-8 place-items-center rounded-[10px] border border-[#F87171]/25 bg-[#F87171]/10 text-[10.5px] font-bold text-[#FCA5A5]">
            Stop
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * ACT 04 — the phone becomes infrastructure.
 * Large type, central node, four citizens, quiet labels.
 */
export function Flow() {
  return (
    <section
      aria-label="Your phone is now your server"
      className="relative wrap py-24 sm:py-32"
    >
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="mono-tech text-[11px] uppercase tracking-[0.28em] text-[#8E8E93] dark:text-[#6E6E73]">
          Infrastructure
        </p>
        <h2 className="display mx-auto mt-4 max-w-[16ch] text-[clamp(2rem,4.5vw,3.25rem)]">
          Your phone is now your server.
        </h2>
        <p className="mx-auto mt-5 max-w-md text-[15px] leading-[1.65] text-[#5B5F68] dark:text-[#A1A1AA]">
          Everything on your network reaches back to one place — the phone in
          your pocket.
        </p>
      </Reveal>

      <div className="relative mx-auto mt-16 aspect-[600/520] w-full max-w-[620px]">
        <svg
          aria-hidden="true"
          viewBox="0 0 600 520"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          fill="none"
        >
          {NODES.map((o, i) => (
            <motion.path
              key={o.label}
              d={`M300 260 L${o.x} ${o.y}`}
              className="stroke-black/20 dark:stroke-white/[0.12]"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              initial={{ opacity: 0, pathLength: 0 }}
              whileInView={{ opacity: 1, pathLength: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                delay: 0.4 + i * 0.2,
                duration: 0.7,
                ease: EASE,
              }}
            />
          ))}
        </svg>

        <motion.div
          initial={{ opacity: 0, scale: 0.97, x: "-50%", y: "-50%" }}
          whileInView={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="absolute left-1/2 top-1/2"
        >
          <CenterNode on />
        </motion.div>

        {NODES.map((o, i) => (
          <motion.div
            key={o.label}
            initial={{ opacity: 0, scale: 0.92, x: "-50%", y: "-50%" }}
            whileInView={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.65 + i * 0.2, duration: 0.5, ease: EASE }}
            className="absolute flex items-center gap-2 rounded-xl border border-black/10 bg-white/90 px-3 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.12)] backdrop-blur-md dark:border-white/[0.08] dark:bg-black/60"
            style={{
              left: `${(o.x / 600) * 100}%`,
              top: `${(o.y / 520) * 100}%`,
            }}
          >
            <o.icon size={13} strokeWidth={1.8} className="shrink-0" />
            <span className="whitespace-nowrap text-[11.5px] font-semibold">
              {o.label}
            </span>
            <span className="mono-tech hidden text-[10px] text-[#8E8E93] sm:inline dark:text-[#6E6E73]">
              {o.meta}
            </span>
            <span className="h-1 w-1 rounded-full bg-[#34D399]" />
          </motion.div>
        ))}
      </div>

      <Reveal
        delay={0.1}
        className="mono-tech mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-x-5 gap-y-2 text-center text-[10.5px] uppercase tracking-[0.22em] text-[#8E8E93] dark:text-[#6E6E73]"
      >
        <span>Local</span>
        <span aria-hidden="true" className="text-[#34D399]">
          ·
        </span>
        <span>LAN</span>
        <span aria-hidden="true" className="text-[#34D399]">
          ·
        </span>
        <span>Port 8080</span>
        <span aria-hidden="true" className="text-[#34D399]">
          ·
        </span>
        <span className="text-[#34D399]">Connected</span>
      </Reveal>
    </section>
  );
}
