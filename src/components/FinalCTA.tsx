"use client";

import { ArrowRight, Download } from "lucide-react";
import { GITHUB_URL } from "@/lib/config";
import { Reveal } from "./Reveal";
import { downloadApk } from "./download-toast";
import { GithubIcon } from "./GithubIcon";
import { Logo } from "./Logo";

export function FinalCTA() {
  return (
    <section className="relative px-5 pb-8 sm:px-8">
      <Reveal className="grain relative mx-auto max-w-[1200px] overflow-hidden rounded-[24px] bg-[#050506] text-white">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          {/* single quiet light field — product lighting, not decoration */}
          <div className="absolute left-1/2 top-[30%] h-[320px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.06),transparent)] blur-2xl" />
          <svg viewBox="0 0 800 420" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full opacity-40" fill="none">
            <g stroke="rgba(255,255,255,0.07)" strokeWidth="1">
              <line x1="400" y1="160" x2="170" y2="90" />
              <line x1="400" y1="160" x2="630" y2="90" />
              <line x1="400" y1="160" x2="170" y2="330" />
              <line x1="400" y1="160" x2="630" y2="330" />
            </g>
            <g fill="rgba(255,255,255,0.28)">
              <circle cx="170" cy="90" r="2" />
              <circle cx="630" cy="90" r="2" />
              <circle cx="170" cy="330" r="2" />
              <circle cx="630" cy="330" r="2" />
            </g>
          </svg>
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
        </div>

        <div className="relative mx-auto max-w-2xl px-6 py-24 text-center sm:py-32">
          <div className="flex justify-center">
            <Logo size={48} />
          </div>
          <h2 className="display mx-auto mt-8 max-w-[16ch] text-balance text-[clamp(2.25rem,5.5vw,3.5rem)]">
            Your phone. Your server.
          </h2>
          <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-zinc-400">
            Install PocketServer and turn your Android into your own personal server.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              onClick={() => downloadApk()}
              className="btn-primary group inline-flex h-[52px] items-center justify-center gap-2 rounded-[14px] px-8 text-[15px] font-semibold"
            >
              <Download size={18} className="transition group-hover:translate-y-[1px]" />
              Download APK
              <ArrowRight size={15} className="opacity-60 transition-transform duration-200 group-hover:translate-x-[3px]" />
            </button>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex h-[52px] items-center justify-center gap-2 rounded-[14px] border border-white/15 bg-white/[0.04] px-8 text-[15px] font-semibold text-white transition hover:-translate-y-[1px] hover:bg-white/[0.09]"
            >
              <GithubIcon size={17} className="transition-transform duration-200 group-hover:-translate-y-[1px]" /> View on GitHub
            </a>
          </div>
          <p className="mono-tech mt-8 text-[10.5px] uppercase tracking-[0.28em] text-zinc-500">
            Free • Open Source • Android
          </p>
        </div>
      </Reveal>
    </section>
  );
}
