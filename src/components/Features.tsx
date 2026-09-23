"use client";

import {
  ChevronRight,
  FileText,
  Folder,
  Image as ImageIcon,
  Music,
  Play,
  Power,
  Shield,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { ProductBrowser } from "./ProductBrowser";

/* ---------------- 01 · file manager body (lives inside the browser) ---------------- */

function FileBody() {
  const tree = [
    { icon: ImageIcon, n: "Photos", m: "248 items" },
    { icon: ImageIcon, n: "Videos", m: "36 items" },
    { icon: FileText, n: "Documents", m: "12 items" },
    { icon: Folder, n: "Projects", m: "8 items" },
    { icon: Music, n: "Downloads", m: "1.2 GB" },
  ];
  return (
    <div className="grid sm:grid-cols-[150px_1fr]">
      <div className="hidden border-r border-black/[0.07] p-3 sm:block dark:border-white/[0.07]">
        {["Home", "Files", "Photos", "Media"].map((t, i) => (
          <p
            key={t}
            className={`rounded-[10px] px-3 py-2 text-[12.5px] font-medium ${
              i === 1
                ? "bg-black text-white dark:bg-white dark:text-black"
                : "text-[#5B5F68] dark:text-[#A1A1AA]"
            }`}
          >
            {t}
          </p>
        ))}
      </div>
      <ul className="divide-y divide-black/[0.06] dark:divide-white/[0.06]">
        {tree.map((r, i) => (
          <motion.li
            key={r.n}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.45,
              delay: 0.1 + i * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="group flex cursor-default items-center gap-3 px-4 py-3 transition hover:bg-black/[0.03] dark:hover:bg-white/[0.04]"
          >
            <r.icon
              size={15}
              className="shrink-0 text-[#8E8E93] dark:text-[#6E6E73]"
            />
            <span className="min-w-0 flex-1 truncate text-[13.5px] font-medium">{r.n}</span>
            <span className="mono-tech shrink-0 text-[11px] text-[#8E8E93] dark:text-[#6E6E73]">
              {r.m}
            </span>
            <ChevronRight
              size={14}
              className="shrink-0 text-[#8E8E93] opacity-0 transition group-hover:opacity-100 dark:text-[#6E6E73]"
            />
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

/* ---------------- 02 · hosted site body ---------------- */

function WebBody() {
  return (
    <div className="p-5 sm:p-6">
      <p className="eyebrow">served from your phone</p>
      <p className="display mt-2 text-2xl">Hello, local network.</p>
      <p className="mt-2 max-w-xs text-[13px] leading-relaxed text-[#5B5F68] dark:text-[#A1A1AA]">
        A tiny site living in a folder on your Android — rendered instantly on
        any device nearby.
      </p>
      <div className="mono-tech mt-4 grid grid-cols-3 gap-2 text-[10.5px]">
        {["GET / 200", "GET /app.js 200", "42ms"].map((s, i) => (
          <motion.span
            key={s}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.45,
              delay: 0.15 + i * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="rounded-lg border border-black/10 px-2 py-1.5 text-center text-[#5B5F68] dark:border-white/[0.08] dark:text-[#A1A1AA]"
          >
            {s}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

/* ---------------- 03 · media ---------------- */

function MediaVisual() {
  const tiles: {
    badge: string;
    hover: "play" | "image" | "music";
    scene: React.ReactNode;
  }[] = [
    {
      badge: "02:41",
      hover: "play",
      scene: (
        <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
          <defs>
            <linearGradient id="m-sky1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#3b2a5e" />
              <stop offset="0.62" stopColor="#b25a3c" />
              <stop offset="1" stopColor="#e8a35c" />
            </linearGradient>
          </defs>
          <rect width="200" height="200" fill="url(#m-sky1)" />
          <circle cx="138" cy="118" r="22" fill="#f6ddab" opacity="0.95" />
          <polygon points="0,150 55,92 110,150" fill="#241c38" />
          <polygon points="70,150 135,80 200,150" fill="#1a1428" />
          <polygon points="0,150 200,150 200,200 0,200" fill="#120d1d" />
        </svg>
      ),
    },
    {
      badge: "01:17",
      hover: "play",
      scene: (
        <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
          <defs>
            <linearGradient id="m-sea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#0d3b5e" />
              <stop offset="0.6" stopColor="#14708c" />
              <stop offset="1" stopColor="#0a2a40" />
            </linearGradient>
          </defs>
          <rect width="200" height="200" fill="url(#m-sea)" />
          <circle cx="52" cy="52" r="16" fill="#f3ecd4" opacity="0.9" />
          <path d="M0 120 Q 25 108 50 120 T 100 120 T 150 120 T 200 120 V200 H0 Z" fill="#ffffff" opacity="0.16" />
          <path d="M0 142 Q 25 130 50 142 T 100 142 T 150 142 T 200 142 V200 H0 Z" fill="#ffffff" opacity="0.12" />
          <path d="M0 164 Q 25 154 50 164 T 100 164 T 150 164 T 200 164 V200 H0 Z" fill="#082433" opacity="0.55" />
        </svg>
      ),
    },
    {
      badge: "04:03",
      hover: "play",
      scene: (
        <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
          <defs>
            <linearGradient id="m-forest" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#274d3a" />
              <stop offset="1" stopColor="#0d2119" />
            </linearGradient>
          </defs>
          <rect width="200" height="200" fill="url(#m-forest)" />
          <ellipse cx="100" cy="60" rx="70" ry="26" fill="#dfe8d8" opacity="0.14" />
          <g fill="#16382a">
            <polygon points="20,150 45,90 70,150" />
            <polygon points="60,160 90,85 120,160" />
            <polygon points="105,150 135,95 165,150" />
          </g>
          <g fill="#0e271e">
            <polygon points="0,170 40,110 80,170" />
            <polygon points="120,175 160,112 200,175" />
          </g>
          <rect y="160" width="200" height="40" fill="#08130e" />
        </svg>
      ),
    },
    {
      badge: "00:58",
      hover: "play",
      scene: (
        <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
          <defs>
            <linearGradient id="m-dune" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#e9c07c" />
              <stop offset="1" stopColor="#9a6130" />
            </linearGradient>
          </defs>
          <rect width="200" height="200" fill="url(#m-dune)" />
          <circle cx="150" cy="48" r="18" fill="#faf0d2" />
          <path d="M0 110 Q 70 80 130 108 T 200 100 V200 H0 Z" fill="#b57e3e" />
          <path d="M0 140 Q 80 115 140 138 T 200 132 V200 H0 Z" fill="#7c4c24" />
          <path d="M0 170 Q 90 152 200 168 V200 H0 Z" fill="#54331a" />
        </svg>
      ),
    },
    {
      badge: "JPG",
      hover: "image",
      scene: (
        <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
          <defs>
            <linearGradient id="m-night" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#0a0f26" />
              <stop offset="1" stopColor="#232b52" />
            </linearGradient>
          </defs>
          <rect width="200" height="200" fill="url(#m-night)" />
          <circle cx="160" cy="38" r="13" fill="#e8e4d2" />
          <circle cx="30" cy="30" r="1.4" fill="#fff" opacity="0.8" />
          <circle cx="80" cy="18" r="1.2" fill="#fff" opacity="0.6" />
          <circle cx="120" cy="44" r="1.2" fill="#fff" opacity="0.7" />
          <g fill="#12172e">
            <rect x="8" y="90" width="42" height="110" />
            <rect x="58" y="66" width="48" height="134" />
            <rect x="114" y="100" width="38" height="100" />
            <rect x="158" y="80" width="36" height="120" />
          </g>
          <g fill="#f2d488" opacity="0.85">
            <rect x="14" y="98" width="8" height="6" />
            <rect x="28" y="112" width="8" height="6" />
            <rect x="64" y="76" width="9" height="7" />
            <rect x="80" y="94" width="9" height="7" />
            <rect x="120" y="110" width="8" height="6" />
            <rect x="164" y="90" width="8" height="6" />
            <rect x="164" y="108" width="8" height="6" />
          </g>
        </svg>
      ),
    },
    {
      badge: "MP3",
      hover: "music",
      scene: (
        <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" className="h-full w-full">
          <defs>
            <linearGradient id="m-audio" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#26262c" />
              <stop offset="1" stopColor="#141417" />
            </linearGradient>
          </defs>
          <rect width="200" height="200" fill="url(#m-audio)" />
          <g fill="#d4d4d8">
            {[56, 76, 64, 92, 70, 104, 82, 60, 94, 72, 86, 66, 78].map((h, i) => (
              <rect key={i} x={30 + i * 11} y={100 - h / 2} width="5" height={h} rx="2.5" opacity={i === 5 ? 1 : 0.55} className={i === 5 ? "fill-[#34D399]" : undefined} />
            ))}
          </g>
        </svg>
      ),
    },
  ];
  const hoverIcon = {
    play: <Play size={16} className="text-white" fill="currentColor" />,
    image: <ImageIcon size={16} className="text-white" />,
    music: <Music size={16} className="text-white" />,
  };
  return (
    <figure className="relative">
      <div className="panel relative overflow-hidden rounded-[20px] p-4 shadow-[0_32px_72px_rgba(0,0,0,0.4)]">
        <div className="flex items-center justify-between px-1 pb-3">
          <p className="text-[13.5px] font-semibold tracking-tight">Media</p>
          <p className="mono-tech text-[11px] text-[#8E8E93] dark:text-[#6E6E73]">
            284 files
          </p>
        </div>
        <div
          className="grid grid-cols-3 gap-2"
          role="img"
          aria-label="Sample media library: videos, a photo and an audio track"
        >
          {tiles.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.5,
                delay: 0.1 + i * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative aspect-square overflow-hidden rounded-xl bg-black/10 dark:bg-white/[0.04]"
            >
              {t.scene}
              <span className="absolute inset-0 grid place-items-center bg-black/25 opacity-0 transition group-hover:opacity-100">
                {hoverIcon[t.hover]}
              </span>
              <span className="mono-tech absolute bottom-1.5 right-1.5 rounded-md bg-black/60 px-1.5 py-0.5 text-[9.5px] text-white">
                {t.badge}
              </span>
            </motion.div>
          ))}
        </div>
        <div className="mono-tech mt-3 flex items-center gap-2 rounded-xl border border-black/10 px-3 py-2.5 text-[11px] text-[#5B5F68] dark:border-white/10 dark:text-[#A1A1AA]">
          <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-[#34D399]" />
          streaming over local network — no upload, no cloud
        </div>
      </div>
      <figcaption className="mono-tech mt-4 text-center text-[10px] uppercase tracking-[0.22em] text-[#8E8E93] dark:text-[#6E6E73]">
        streamed from 192.168.1.20:8080
      </figcaption>
    </figure>
  );
}

/* ---------------- 04 · one tap (real server control) ---------------- */

function TapVisual() {
  const [on, setOn] = useState(true);
  return (
    <figure className="relative">
      <div className="relative overflow-hidden rounded-[20px] bg-black p-5 shadow-[0_32px_72px_rgba(0,0,0,0.4)] sm:p-6">
        <div className="rounded-[22px] border border-white/[0.08] bg-[#131316] p-4 text-left">
          <div className="flex items-center justify-between">
            <span
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-bold tracking-[0.16em] transition-colors duration-300 ${
                on
                  ? "border-[#34D399]/30 bg-[#34D399]/[0.07] text-zinc-200"
                  : "border-white/[0.1] bg-white/[0.03] text-zinc-400"
              }`}
            >
              <span
                className={`h-[7px] w-[7px] rounded-full ${
                  on
                    ? "bg-[#34D399] animate-pulse-dot run-dot"
                    : "bg-[#F87171]"
                }`}
              />
              {on ? "SERVER RUNNING" : "SERVER OFFLINE"}
            </span>
            <span className="grid h-[40px] w-[40px] place-items-center rounded-2xl border border-white/[0.08] bg-[#1c1c21]">
              <Power
                size={17}
                className={on ? "text-[#34D399]" : "text-zinc-400"}
              />
            </span>
          </div>
          <p className="mt-4 text-[20px] font-extrabold tracking-tight text-white">
            {on ? "Server running" : "Start your server"}
          </p>
          <p className="mono-tech mt-1 truncate text-[11px] text-zinc-500">
            {on ? "http://192.168.1.20:8080" : "Tap below to get started."}
          </p>
          <button
            onClick={() => setOn((v) => !v)}
            aria-pressed={on}
            aria-label={on ? "Stop server" : "Start server"}
            className={`mt-4 grid h-[50px] w-full place-items-center rounded-2xl text-[14.5px] font-extrabold transition-all active:scale-[0.98] ${
              on
                ? "border border-[#F87171]/30 bg-[#F87171]/10 text-[#FCA5A5]"
                : "bg-[#F5F5F7] text-black"
            }`}
          >
            {on ? "Stop Server" : "Start Server"}
          </button>
        </div>
      </div>
      <figcaption className="mono-tech mt-4 text-center text-[10px] uppercase tracking-[0.22em] text-[#8E8E93] dark:text-[#6E6E73]">
        Live demo — tap the button
      </figcaption>
    </figure>
  );
}

/* ---------------- story row ---------------- */

function Row({
  index,
  tag,
  lede,
  title,
  body,
  visual,
  flip = false,
}: {
  index: string;
  tag: string;
  lede: string;
  title: string;
  body: string;
  visual: React.ReactNode;
  flip?: boolean;
}) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <Reveal className={flip ? "lg:order-2" : ""}>
        <p className="mono-tech text-[11px] uppercase tracking-[0.24em] text-[#8E8E93] dark:text-[#6E6E73]">
          {index} — {tag}
        </p>
        <h3 className="display mt-4 max-w-[16ch] text-[clamp(1.75rem,3vw,2.25rem)]">
          {lede}
        </h3>
        <p className="mt-4 max-w-md text-[15px] leading-[1.65] text-[#5B5F68] dark:text-[#A1A1AA]">
          <strong className="font-semibold text-black dark:text-white">
            {title}.
          </strong>{" "}
          {body}
        </p>
      </Reveal>
      <Reveal delay={0.1} className={flip ? "lg:order-1" : ""}>
        {visual}
      </Reveal>
    </div>
  );
}

export function Features() {
  return (
    <section
      id="features"
      aria-label="Features"
      className="relative wrap scroll-mt-24 py-24 sm:py-32"
    >
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="mono-tech text-[11px] uppercase tracking-[0.28em] text-[#8E8E93] dark:text-[#6E6E73]">
          Capabilities
        </p>
        <h2 className="display mx-auto mt-4 max-w-[18ch] text-[clamp(2rem,4.5vw,3.25rem)]">
          Everything runs locally.
        </h2>
        <p className="mx-auto mt-5 max-w-md text-[15px] leading-[1.65] text-[#5B5F68] dark:text-[#A1A1AA]">
          Four things your phone starts doing the moment the server runs.
        </p>
      </Reveal>

      <div className="mt-16 space-y-16 sm:mt-24 sm:space-y-24">
        <Row
          index="01"
          tag="File server"
          lede="Your files. On your network."
          title="Access your files anywhere on your network"
          body="Browse and transfer files stored on your phone directly from your laptop, desktop, or tablet."
          visual={
            <ProductBrowser
              url="192.168.1.20:8080 — PocketServer /"
              caption="served from your phone · no cloud"
            >
              <FileBody />
            </ProductBrowser>
          }
        />
        <Row
          index="02"
          tag="Web server"
          lede="Host from your pocket."
          title="Host your own web services"
          body="Run web applications and services directly from your Android device and access them through your local network."
          visual={
            <ProductBrowser
              url="http://192.168.1.20:8080"
              caption="received directly from PocketServer"
            >
              <WebBody />
            </ProductBrowser>
          }
          flip
        />
        <Row
          index="03"
          tag="Media server"
          lede="Your media. Without the cloud."
          title="Your personal media hub"
          body="Access your photos, videos, music, and other media from devices connected to your network."
          visual={<MediaVisual />}
        />
        <Row
          index="04"
          tag="One tap"
          lede="Start in seconds."
          title="One tap to start"
          body="Start and stop your server instantly with a simple, intuitive interface."
          visual={<TapVisual />}
          flip
        />
      </div>

      <div className="mt-16 grid gap-4 sm:mt-24 sm:grid-cols-2">
        {[
          {
            icon: Shield,
            title: "Your Data Stays With You",
            body: "PocketServer is designed around local network access, giving you control over where your data goes.",
          },
          {
            icon: Zap,
            title: "Lightweight by Design",
            body: "Built to run efficiently on your Android device without turning your phone into a complicated server setup.",
          },
        ].map((f, i) => (
          <Reveal key={f.title} delay={i * 0.08}>
            <div className="panel group h-full rounded-[20px] p-8 transition-colors hover:border-black/20 dark:hover:border-white/20">
              <f.icon size={19} strokeWidth={1.8} />
              <h3 className="mt-4 text-[16px] font-semibold tracking-tight">
                {f.title}
              </h3>
              <p className="mt-2 text-[14px] leading-[1.65] text-[#5B5F68] dark:text-[#A1A1AA]">
                {f.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
