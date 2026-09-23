"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";

const ADDRESS = "http://192.168.1.20:8080";

type Phase = "offline" | "starting" | "running";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * ACT 03 — the product reveal.
 * OFFLINE → STARTING… → ● SERVER RUNNING + address.
 * Plays once when scrolled into view, then stays calm.
 */
export function ServerActivation() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>(() => {
    try {
      return typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? ("running" as Phase)
        : ("offline" as Phase);
    } catch {
      return "offline";
    }
  });
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const played = useRef(false);

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const run = () => {
      if (played.current) return;
      played.current = true;
      setPhase("starting");
      setTimeout(() => setPhase("running"), 900);
    };
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            run();
            io.disconnect();
          }
        },
        { threshold: 0.4 }
      );
      io.observe(el);
      return () => io.disconnect();
    }
    run();
  }, [reduce]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(ADDRESS);
    } catch {
      /* clipboard unavailable — still show feedback */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <section
      aria-label="Server activation"
      className="relative wrap py-24 sm:py-32"
    >
      <div ref={ref} className="relative mx-auto max-w-3xl text-center">
        <p className="mono-tech text-[11px] uppercase tracking-[0.28em] text-[#8E8E93] dark:text-[#6E6E73]">
          Activation
        </p>
        <h2 className="display mx-auto mt-4 max-w-[18ch] text-[clamp(2rem,4.5vw,3.25rem)]">
          One tap. Your phone starts serving.
        </h2>

        {/* the moment */}
        <div className="relative mx-auto mt-12 max-w-xl">
          {/* single soft illumination on activation — fires once */}
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute left-1/2 top-1/2 h-[280px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(52,211,153,0.1),transparent)] blur-3xl transition-opacity duration-[2000ms] ${
              phase === "running" ? "opacity-100" : "opacity-0"
            }`}
          />
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="panel relative overflow-hidden rounded-[20px] px-6 py-10 sm:px-10 sm:py-12"
          >
            <div className="flex justify-center">
              <Logo size={40} />
            </div>

            <p
              className={`mono-tech mt-6 flex items-center justify-center gap-2.5 text-[13px] font-semibold tracking-[0.22em] transition-colors duration-500 ${
                phase === "running"
                  ? "text-[#34D399]"
                  : phase === "starting"
                    ? "text-[#A1A1AA]"
                    : "text-[#8E8E93] dark:text-[#6E6E73]"
              }`}
              role="status"
              aria-live="polite"
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  phase === "running"
                    ? "bg-[#34D399] run-dot animate-pulse-dot"
                    : phase === "starting"
                      ? "animate-pulse bg-[#A1A1AA]"
                      : "bg-zinc-500"
                }`}
              />
              {phase === "running"
                ? "SERVER RUNNING"
                : phase === "starting"
                  ? "SERVER STARTING…"
                  : "SERVER OFFLINE"}
            </p>

            <button
              onClick={copy}
              aria-label="Copy server address"
              className="group mx-auto mt-5 flex w-full max-w-sm items-center gap-3 rounded-2xl border border-black/10 bg-black/[0.03] px-4 py-3.5 text-left transition hover:border-black/20 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-white/20"
            >
              <span className="mono-tech min-w-0 flex-1 truncate text-center text-[15px] font-medium sm:text-base">
                {phase === "offline" ? "— : —" : ADDRESS}
              </span>
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[10px] border border-black/10 transition group-hover:bg-black/[0.05] dark:border-white/10 dark:group-hover:bg-white/[0.07]">
                {copied ? (
                  <Check size={14} className="text-[#34D399]" />
                ) : (
                  <Copy size={14} />
                )}
              </span>
            </button>
            <p className="mono-tech mt-2 h-4 text-[11px] text-[#34D399]">
              {copied ? "copied to clipboard" : ""}
            </p>

            <div className="mono-tech mt-4 flex flex-wrap items-center justify-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#8E8E93] dark:text-[#6E6E73]">
              {["Local", "LAN", "Port 8080"].map((t) => (
                <span
                  key={t}
                  className={`rounded-lg border px-2.5 py-1.5 transition-colors duration-700 ${
                    phase === "running"
                      ? "border-black/10 dark:border-white/10"
                      : "border-black/[0.07] opacity-60 dark:border-white/[0.07]"
                  }`}
                >
                  {t}
                </span>
              ))}
              <span
                className={`rounded-lg border px-2.5 py-1.5 transition-colors duration-700 ${
                  phase === "running"
                    ? "border-[#34D399]/30 text-[#34D399]"
                    : "border-black/[0.07] opacity-60 dark:border-white/[0.07]"
                }`}
              >
                {phase === "running" ? "● Connected" : "○ Standby"}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
