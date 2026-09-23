"use client";

import { ArrowUpRight, FileCode2, Folder } from "lucide-react";
import { GITHUB_URL } from "@/lib/config";
import { Reveal } from "./Reveal";
import { GithubIcon } from "./GithubIcon";

const TREE = [
  { n: "PocketServer/", dir: true, depth: 0 },
  { n: "app/", dir: true, depth: 1 },
  { n: "server/", dir: true, depth: 1 },
  { n: "network/", dir: true, depth: 1 },
  { n: "storage/", dir: true, depth: 1 },
  { n: "ui/", dir: true, depth: 1 },
  { n: "HttpServerManager.kt", dir: false, depth: 2, active: true },
  { n: "StorageManager.kt", dir: false, depth: 2 },
  { n: "README.md", dir: false, depth: 0 },
];

/**
 * Open source as a place, not a badge.
 * Repository tree + real code, honest numbers nowhere invented.
 */
export function OpenSource() {
  return (
    <section
      id="open-source"
      className="mx-auto max-w-[1200px] scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32"
    >
      <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/[0.03] px-4 py-1.5 dark:border-white/10 dark:bg-white/[0.04]">
            <GithubIcon size={13} />
            <span className="eyebrow">Open Source</span>
          </span>
          <h2 className="display mt-5 max-w-[12ch] text-[clamp(2rem,4.5vw,3.25rem)]">
            Built in the open.
          </h2>
          <p className="mt-4 max-w-md text-[15px] leading-[1.65] text-[#5B5F68] dark:text-[#A1A1AA]">
            PocketServer is open source. Explore the code, report issues,
            suggest improvements, or contribute to the project.
          </p>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="btn-primary group mt-7 inline-flex h-[50px] items-center gap-2 rounded-[14px] px-7 text-[14.5px] font-semibold"
          >
            View source
            <ArrowUpRight
              size={17}
              className="opacity-60 transition-transform duration-200 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
            />
          </a>
          <p className="mono-tech mt-6 text-[10.5px] uppercase tracking-[0.22em] text-[#8E8E93] dark:text-[#6E6E73]">
            MIT · Kotlin · Android
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="panel overflow-hidden rounded-[20px] shadow-[0_32px_72px_rgba(0,0,0,0.35)]">
            <div className="hairline-b flex items-center gap-2 px-4 py-3">
              <span className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#D1D1D6] dark:bg-[#3a3a3e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#D1D1D6] dark:bg-[#3a3a3e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#D1D1D6] dark:bg-[#3a3a3e]" />
              </span>
              <span className="mono-tech ml-2 truncate text-[11.5px] text-[#8E8E93] dark:text-[#6E6E73]">
                Pocket-Server — repository
              </span>
              <span className="mono-tech ml-auto hidden items-center gap-1.5 rounded-md bg-[#34D399]/10 px-2 py-1 text-[10.5px] font-medium text-[#0d7a52] sm:inline-flex dark:text-[#34D399]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#34D399]" />
                main
              </span>
            </div>
            <div className="grid sm:grid-cols-[190px_1fr]">
              <div className="hidden border-r border-black/[0.07] p-3 sm:block dark:border-white/[0.07]">
                {TREE.map((t) => (
                  <p
                    key={t.n}
                    style={{ paddingLeft: `${t.depth * 12 + 8}px` }}
                    className={`mono-tech flex items-center gap-1.5 rounded-lg px-2 py-[5px] text-[11.5px] ${
                      t.active
                        ? "bg-black text-white dark:bg-white dark:text-black"
                        : "text-[#5B5F68] dark:text-[#A1A1AA]"
                    }`}
                  >
                    {t.dir ? <Folder size={11} /> : <FileCode2 size={11} />}
                    <span className="truncate">{t.n}</span>
                  </p>
                ))}
              </div>
              <pre className="overflow-x-auto p-5 font-mono text-[12.5px] leading-relaxed">
                <code>
                  <span className="text-[#8E8E93] dark:text-[#6E6E73]">
                    {"// your phone, your server"}
                  </span>
                  {"\n"}
                  <span className="opacity-70">fun </span>
                  <span className="font-semibold">main</span>
                  <span className="opacity-70">() {"{"}</span>
                  {"\n"}
                  {"  "}
                  <span className="font-semibold">PocketServer</span>
                  <span className="opacity-70">.start {"{"}</span>
                  {"\n"}
                  {"    "}
                  <span className="opacity-70">port = </span>8080{"\n"}
                  {"    "}
                  <span className="opacity-70">host(</span>
                  <span className="text-[#0d7a52] dark:text-[#34D399]">
                    &quot;0.0.0.0&quot;
                  </span>
                  <span className="opacity-70">)</span>
                  {"\n"}
                  {"    "}
                  <span className="opacity-70">
                    serve(files + media + web)
                  </span>
                  {"\n"}
                  {"  "}
                  <span className="opacity-70">{"}"}</span>
                  {"\n"}
                  <span className="opacity-70">{"}"}</span>
                  <span className="ml-1 inline-block h-[13px] w-[7px] translate-y-[2px] animate-blink bg-current" />
                </code>
              </pre>
            </div>
            <div className="flex flex-wrap items-center gap-2 border-t border-black/[0.07] px-4 py-3 dark:border-white/[0.07]">
              {["Kotlin", "Ktor", "Jetpack Compose"].map((t) => (
                <span
                  key={t}
                  className="mono-tech rounded-md border border-black/10 px-2 py-1 text-[10.5px] text-[#5B5F68] dark:border-white/10 dark:text-[#A1A1AA]"
                >
                  {t}
                </span>
              ))}
              <span className="mono-tech ml-auto hidden text-[10.5px] text-[#8E8E93] sm:inline dark:text-[#6E6E73]">
                no telemetry · no lock-in
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
