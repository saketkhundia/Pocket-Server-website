"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Download, FileDown, ShieldCheck, Smartphone } from "lucide-react";
import { APK_DOWNLOAD_URL, GITHUB_REPO, GITHUB_URL, isApkUrlConfigured } from "@/lib/config";
import { Reveal } from "./Reveal";
import { downloadApk } from "./download-toast";
import { GithubIcon } from "./GithubIcon";
import { Logo } from "./Logo";

export function useLatestRelease() {
  const [tag, setTag] = useState<string | null>(null);
  useEffect(() => {
    if (!GITHUB_REPO || !GITHUB_REPO.includes("/")) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(
          `https://api.github.com/repos/${GITHUB_REPO}/releases/latest`,
          {
            headers: { Accept: "application/vnd.github+json" },
          }
        );
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled && typeof data.tag_name === "string") setTag(data.tag_name);
      } catch {
        /* ignore — no fake version */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);
  return tag;
}

/**
 * ACT 06 — the launch moment.
 * The network contracts back to where it began: PocketServer.
 */
export function DownloadSection() {
  const tag = useLatestRelease();
  const configured = isApkUrlConfigured();

  return (
    <section
      id="download"
      className="mx-auto max-w-[1200px] scroll-mt-24 px-5 pb-8 sm:px-8"
    >
      <Reveal>
        <div className="panel grain relative overflow-hidden rounded-[24px] px-6 py-24 text-center sm:px-12 sm:py-32">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[280px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.05),transparent)] blur-3xl"
          />
          <div className="relative mx-auto max-w-2xl">
            <Logo size={44} />
            <p className="mono-tech mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-[#8E8E93] dark:text-[#6E6E73]">
              <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
              {tag ? `Latest release • ${tag}` : "Get PocketServer"}
            </p>
            <h2 className="display mx-auto mt-4 max-w-[14ch] text-[clamp(2.25rem,5.5vw,3.75rem)]">
              Your phone is ready.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] leading-[1.65] text-[#5B5F68] dark:text-[#A1A1AA]">
              Install PocketServer and turn your Android into your own local
              server.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                onClick={() => downloadApk()}
                className="btn-primary group inline-flex h-[52px] items-center justify-center gap-2 rounded-[14px] px-8 text-[15px] font-semibold"
              >
                <Download
                  size={18}
                  className="transition group-hover:translate-y-[1px]"
                />
                Download APK
              </button>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost group inline-flex h-[52px] items-center justify-center gap-2 rounded-[14px] px-8 text-[15px] font-semibold"
              >
                <GithubIcon
                  size={18}
                  className="transition-transform duration-200 group-hover:-translate-y-[1px]"
                />{" "}
                View on GitHub{" "}
                <ArrowUpRight size={15} className="opacity-60" />
              </a>
            </div>
            <span className="sr-only">{APK_DOWNLOAD_URL}</span>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[13px] text-[#8E8E93] dark:text-[#6E6E73]">
              <span className="inline-flex items-center gap-1.5">
                <Smartphone size={14} /> Android
              </span>
              <span className="inline-flex items-center gap-1.5">
                <FileDown size={14} /> APK Download
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck size={14} /> Free &amp; Open Source
              </span>
            </div>

            <p className="mx-auto mt-5 max-w-md text-[12.5px] leading-relaxed text-[#8E8E93] dark:text-[#6E6E73]">
              Android may ask you to allow installation from this source.
              {!configured && (
                <>
                  {" "}
                  APK link is configured via{" "}
                  <code className="mono-tech rounded bg-black/10 px-1.5 py-0.5 text-[11px] dark:bg-white/10">
                    NEXT_PUBLIC_APK_DOWNLOAD_URL
                  </code>
                  .
                </>
              )}
            </p>
            {configured && (
              <p className="mono-tech mt-2 text-[11px] text-[#8E8E93] dark:text-[#6E6E73]">
                Direct download • no account • no redirect
              </p>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
