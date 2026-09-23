"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GITHUB_URL } from "@/lib/config";
import { Logo } from "./Logo";
import { GithubIcon } from "./GithubIcon";

const LINKS = [
  { label: "Features", href: "/features" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Open Source", href: "/open-source" },
  { label: "FAQ", href: "/faq" },
  { label: "GitHub", href: GITHUB_URL, external: true },
  { label: "Download", href: "/download" },
];

export function Footer() {
  const pathname = usePathname();

  /* logo: scroll to top when already home, otherwise go home */
  const goTop = (e: React.MouseEvent) => {
    if (pathname !== "/") return;
    e.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <footer className="relative z-10 border-t border-black/[0.08] dark:border-white/[0.07]">
      <div className="mx-auto max-w-[1200px] px-5 py-12 sm:px-8">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-start">
          <div className="max-w-xs">
            <Link href="/" onClick={goTop} className="flex items-center gap-3" aria-label="PocketServer home">
              <Logo size={30} />
              <span className="leading-none">
                <span className="block text-[15.5px] font-semibold tracking-tight">PocketServer</span>
                <span className="mono-tech mt-1 block text-[9.5px] tracking-[0.24em] text-[#8E8E93] dark:text-[#6E6E73]">
                  v1 — ANDROID
                </span>
              </span>
            </Link>
            <p className="mt-4 text-[13.5px] leading-relaxed text-[#5B5F68] dark:text-[#A1A1AA]">
              Your phone. Your server.
            </p>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="PocketServer on GitHub"
              className="btn-ghost group mt-5 inline-grid h-9 w-9 place-items-center rounded-xl"
            >
              <GithubIcon size={16} className="transition-transform duration-200 group-hover:-translate-y-[1px]" />
            </a>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap gap-x-10 gap-y-3">
            {LINKS.map((l) =>
              l.external ? (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-fit text-[13.5px] text-[#5B5F68] transition hover:text-black dark:text-[#A1A1AA] dark:hover:text-white"
                >
                  {l.label}
                </a>
              ) : (
                <Link
                  key={l.label}
                  href={l.href}
                  className="w-fit text-[13.5px] text-[#5B5F68] transition hover:text-black dark:text-[#A1A1AA] dark:hover:text-white"
                >
                  {l.label}
                </Link>
              )
            )}
          </nav>
        </div>
        <div className="mono-tech mt-12 flex flex-col items-start justify-between gap-2 border-t border-black/[0.08] pt-6 text-[10.5px] uppercase tracking-[0.22em] text-[#8E8E93] sm:flex-row sm:items-center dark:border-white/[0.07] dark:text-[#6E6E73]">
          <p>© 2026 PocketServer. Open source software.</p>
          <p>Open Source • Android • Local Server</p>
        </div>
      </div>
    </footer>
  );
}
