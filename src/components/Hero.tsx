"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  Download,
  Globe,
  Laptop,
  Monitor,
  TabletSmartphone,
} from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { GITHUB_URL } from "@/lib/config";
import { downloadApk } from "./download-toast";
import { GithubIcon } from "./GithubIcon";
import { AppPhone, type AppTab } from "./AppPhone";

function HeroPhone({ running }: { running: boolean }) {
  const [tab, setTab] = useState<AppTab>("home");
  const [manual, setManual] = useState<boolean | null>(null);
  const live = manual ?? running;
  return (
    <AppPhone
      tab={tab}
      running={live}
      interactive
      assemble
      onTabChange={setTab}
      onToggleServer={() => setManual(!live)}
    />
  );
}

/* network originates from the phone — PHONE = SERVER.
   Lines draw once (construction). No traveling dots, no loops. */
const NODES = [
  {
    icon: Laptop,
    label: "Laptop",
    meta: "192.168.1.11",
    cls: "left-[4%] top-[8%]",
    x: 148,
    y: 96,
    path: "M400 260 C 320 220, 230 170, 148 96",
  },
  {
    icon: Monitor,
    label: "Desktop",
    meta: "192.168.1.14",
    cls: "right-[4%] top-[12%]",
    x: 652,
    y: 108,
    path: "M400 260 C 480 220, 570 170, 652 108",
  },
  {
    icon: TabletSmartphone,
    label: "Tablet",
    meta: "192.168.1.18",
    cls: "left-[2%] bottom-[10%]",
    x: 128,
    y: 412,
    path: "M400 260 C 310 300, 210 350, 128 412",
  },
  {
    icon: Globe,
    label: "Browser",
    meta: ":8080",
    cls: "right-[2%] bottom-[8%]",
    x: 672,
    y: 404,
    path: "M400 260 C 490 300, 590 350, 672 404",
  },
];

const WORDS = ["Turn", "your", "Android", "into", "a"];

const EASE = [0.22, 1, 0.36, 1] as const;

function mediaReduced() {
  try {
    return (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  } catch {
    return false;
  }
}

export function Hero() {
  const reduce = useReducedMotion();
  const [running, setRunning] = useState(mediaReduced);
  const [linesOn, setLinesOn] = useState(mediaReduced);

  /* one quiet activation: phone → server → lines → packets → devices → calm */
  useEffect(() => {
    if (reduce || mediaReduced()) return;
    const t1 = setTimeout(() => setRunning(true), 900);
    const t2 = setTimeout(() => setLinesOn(true), 1150);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [reduce]);

  /* cursor: 1–2deg tilt + faint light shift, fine pointers only */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [1.5, -1.5]), {
    stiffness: 120,
    damping: 22,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-2, 2]), {
    stiffness: 120,
    damping: 22,
  });
  const glowX = useSpring(useTransform(mx, [-0.5, 0.5], [14, -14]), {
    stiffness: 60,
    damping: 24,
  });
  const glowY = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), {
    stiffness: 60,
    damping: 24,
  });

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduce) return;
    if (
      typeof window !== "undefined" &&
      !window.matchMedia("(pointer: fine)").matches
    )
      return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const E = (d: number) =>
    reduce
      ? { duration: 0.01 }
      : { duration: 0.65, delay: d, ease: EASE };

  return (
    <section
      id="top"
      onMouseMove={onMove}
      className="relative overflow-hidden pb-16 pt-32 sm:pb-24 sm:pt-40"
    >
      {/* one connected light system — phone is the brightest object */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute left-1/2 top-[52%] h-[480px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.055),transparent)] blur-3xl dark:bg-[radial-gradient(closest-side,rgba(255,255,255,0.05),transparent)]"
          style={reduce ? undefined : { x: glowX, y: glowY }}
        />
        <div
          className={`absolute left-1/2 top-[58%] h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(52,211,153,0.08),transparent)] blur-3xl transition-opacity duration-[2200ms] ${
            running ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      <div className="relative mx-auto max-w-[1200px] px-5 sm:px-8">
        {/* ------- ACT 01 · copy ------- */}
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={E(0.05)}
          >
            <span className="inline-flex max-w-full flex-wrap items-center justify-center gap-x-3 gap-y-1.5 rounded-full border border-black/10 bg-black/[0.03] px-4 py-2 dark:border-white/10 dark:bg-white/[0.03]">
              <span className="inline-flex items-center gap-2">
                <span
                  className={`h-1.5 w-1.5 rounded-full transition-colors duration-500 ${
                    running
                      ? "bg-[#34D399] run-dot animate-pulse-dot"
                      : "bg-zinc-500"
                  }`}
                />
                <span className="mono-tech text-[10px] font-medium tracking-[0.3em]">
                  {running ? "SERVER RUNNING" : "SYSTEM READY"}
                </span>
              </span>
              <span
                aria-hidden="true"
                className="h-3 w-px bg-black/15 dark:bg-white/15"
              />
              <span className="mono-tech text-[10px] tracking-[0.3em] text-[#8E8E93] dark:text-[#6E6E73]">
                OPEN SOURCE / ANDROID
              </span>
            </span>
          </motion.div>

          <h1 className="display mx-auto mt-7 max-w-[16ch] text-[clamp(2.9rem,7.5vw,5.25rem)]">
            {WORDS.map((w, i) => (
              <Fragment key={w}>
                <motion.span
                  className="inline-block"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={
                    reduce
                      ? { duration: 0.01 }
                      : { duration: 0.6, delay: 0.15 + i * 0.07, ease: EASE }
                  }
                >
                  {w}
                </motion.span>{" "}
              </Fragment>
            ))}
            <motion.span
              className="server-word inline-block"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                reduce
                  ? { duration: 0.01 }
                  : {
                      duration: 0.6,
                      delay: 0.15 + WORDS.length * 0.07,
                      ease: EASE,
                    }
              }
            >
              server<span className="accent-dot">.</span>
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={E(0.28)}
            className="mx-auto mt-6 max-w-xl text-pretty text-[15.5px] leading-[1.65] text-[#5B5F68] dark:text-[#A1A1AA] sm:text-[17px]"
          >
            Run your own local server directly from your phone. Share files,
            host sites, stream media — any device on your Wi-Fi can reach it.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={E(0.4)}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <button
              onClick={() => downloadApk()}
              className="btn-primary group inline-flex h-[50px] w-full items-center justify-center gap-2 rounded-[13px] px-7 text-[14.5px] font-semibold sm:w-auto"
            >
              <Download
                size={17}
                className="transition group-hover:translate-y-[1px]"
              />
              Download APK
              <ArrowRight
                size={15}
                className="opacity-60 transition-transform duration-200 group-hover:translate-x-[3px]"
              />
            </button>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost group inline-flex h-[50px] w-full items-center justify-center gap-2 rounded-[13px] px-7 text-[14.5px] font-semibold sm:w-auto"
            >
              <GithubIcon
                size={17}
                className="transition-transform duration-200 group-hover:-translate-y-[1px]"
              />
              View on GitHub
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={E(0.52)}
            className="mono-tech mt-6 text-[10.5px] uppercase tracking-[0.24em] text-[#8E8E93] dark:text-[#6E6E73]"
          >
            Free • Open Source • No subscriptions
          </motion.p>
        </div>

        {/* ------- ACT 02 · phone as the source ------- */}
        <motion.div
          initial={{ opacity: 0, y: 36, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={E(0.3)}
          className="relative mx-auto mt-16 w-full max-w-[880px] sm:mt-20"
        >
          <div style={{ perspective: 1400 }}>
            {/* foundation mark — a single line draws, then yields to the phone */}
            {!reduce && (
              <motion.div
                aria-hidden="true"
                className="relative z-[4] mx-auto mb-8 h-px w-16 origin-center bg-black/25 dark:bg-white/25"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, delay: 0.1, ease: EASE }}
              />
            )}

            {/* connection layer — lines draw out of the phone, once */}
            <svg
              aria-hidden="true"
              viewBox="0 0 800 500"
              preserveAspectRatio="xMidYMid meet"
              className="absolute inset-0 hidden h-full w-full sm:block"
              fill="none"
            >
              {NODES.map((n, i) => (
                <motion.path
                  key={n.label}
                  d={n.path}
                  stroke="currentColor"
                  className="text-black/20 dark:text-white/[0.13]"
                  strokeWidth="1"
                  initial={{ opacity: 0, pathLength: 0 }}
                  animate={
                    linesOn ? { opacity: 1, pathLength: 1 } : { opacity: 0 }
                  }
                  transition={{
                    duration: 0.9,
                    delay: 0.15 + i * 0.22,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              ))}
            </svg>

            {/* devices — appear only after their line arrives */}
            {NODES.map((n, i) => (
              <motion.div
                key={n.label}
                className={`absolute ${n.cls} z-10 hidden items-center gap-2 rounded-xl border border-black/10 bg-white/85 px-3 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.12)] backdrop-blur-md sm:flex dark:border-white/[0.08] dark:bg-black/60 dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)]`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={linesOn ? { opacity: 1, scale: 1 } : { opacity: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.45 + i * 0.22,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <n.icon
                  size={13}
                  strokeWidth={1.8}
                  className="text-[#5B5F68] dark:text-zinc-400"
                />
                <span className="text-[11.5px] font-semibold tracking-tight">
                  {n.label}
                </span>
                <span className="mono-tech text-[10px] text-[#8E8E93] dark:text-[#6E6E73]">
                  {n.meta}
                </span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={linesOn ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 + i * 0.22 }}
                  className={`h-1 w-1 rounded-full ${
                    running ? "bg-[#34D399]" : "bg-zinc-500"
                  }`}
                />
              </motion.div>
            ))}

            {/* phone — tilt on outer, float on inner */}
            <motion.div
              className="relative z-[5] mx-auto w-fit"
              style={
                reduce
                  ? undefined
                  : { rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }
              }
            >
              <div className={reduce ? undefined : "animate-float"}>
                <HeroPhone running={running} />
              </div>
            </motion.div>

            <motion.p
              className="mono-tech mt-8 text-center text-[10px] uppercase tracking-[0.28em] text-[#8E8E93] dark:text-[#6E6E73]"
              initial={{ opacity: 0 }}
              animate={{ opacity: linesOn ? 1 : 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              Phone → Server → Devices
            </motion.p>
            <p className="mono-tech mt-2 text-center text-[10px] tracking-[0.14em] text-[#8E8E93]/70 dark:text-[#6E6E73]/70">
              live preview — tap the tabs &amp; the server button
            </p>

            {/* mobile: one focused path, no floating labels */}
            <div
              className="mt-6 flex max-w-full flex-wrap items-center justify-center gap-2 px-2 sm:hidden"
              aria-label="Connection path"
            >
              {[
                { icon: Laptop, label: "Laptop", meta: ".11" },
                { icon: Globe, label: "Browser", meta: ":8080" },
              ].map((n, i, arr) => (
                <span key={n.label} className="flex items-center gap-2">
                  <motion.span
                    className="inline-flex items-center gap-1.5 rounded-xl border border-black/10 bg-white/85 px-2.5 py-2 backdrop-blur-md dark:border-white/[0.08] dark:bg-black/60"
                    initial={{ opacity: 0, y: 8 }}
                    animate={linesOn ? { opacity: 1, y: 0 } : { opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.25 }}
                  >
                    <n.icon size={12} strokeWidth={1.8} />
                    <span className="text-[11px] font-semibold">
                      {n.label}
                    </span>
                    <span className="mono-tech text-[9.5px] text-[#8E8E93] dark:text-[#6E6E73]">
                      {n.meta}
                    </span>
                    <span
                      className={`h-1 w-1 rounded-full ${
                        running ? "bg-[#34D399]" : "bg-zinc-500"
                      }`}
                    />
                  </motion.span>
                  {i < arr.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="mono-tech text-[11px] text-[#8E8E93] dark:text-[#6E6E73]"
                    >
                      →
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
