"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Download, Menu, Moon, Sun, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { APK_DOWNLOAD_URL, GITHUB_URL, isApkUrlConfigured } from "@/lib/config";
import { Logo } from "./Logo";
import { useTheme } from "./ThemeProvider";
import { downloadApk } from "./download-toast";
import { GithubIcon } from "./GithubIcon";

const LINKS = [
  { label: "Features", href: "/features", index: "01", section: "features" },
  { label: "How It Works", href: "/how-it-works", index: "02", section: "how-it-works" },
  { label: "Open Source", href: "/open-source", index: "03", section: "open-source" },
  { label: "FAQ", href: "/faq", index: "04", section: "faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [spot, setSpot] = useState("");
  const pathname = usePathname();
  const active = pathname === "/" ? spot : pathname;
  const { theme, toggle } = useTheme();

  /* logo: scroll to top when already home, otherwise go home */
  const goTop = (e: React.MouseEvent) => {
    if (pathname !== "/") return;
    e.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* mobile menu: lock scroll, close on Escape */
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  /* homepage scroll-spot fallback — route pages use the pathname directly */
  useEffect(() => {
    if (pathname !== "/") return;
    const ids = LINKS.map((l) => l.section);
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.4;
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) {
          const link = LINKS.find((l) => l.section === id);
          if (link) current = link.href;
        }
      }
      setSpot(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)]">
      <div
        className={`mx-auto flex max-w-[1200px] items-center justify-between gap-3 px-4 transition-all duration-300 sm:px-8 ${
          scrolled
            ? "mt-3 rounded-2xl border border-black/10 bg-white/80 py-2.5 shadow-[0_12px_40px_rgba(0,0,0,0.12)] backdrop-blur-xl dark:border-white/[0.07] dark:bg-[#0A0A0C]/80 dark:shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
            : "border border-transparent bg-transparent py-4"
        }`}
      >
        <Link href="/" onClick={goTop} className="flex items-center gap-3" aria-label="PocketServer home">
          <Logo size={30} />
          <span className="leading-none">
            <span className="block text-[15.5px] font-semibold tracking-tight">
              PocketServer
            </span>
            <span className="mono-tech mt-1 block text-[9.5px] tracking-[0.24em] text-[#8E8E93] dark:text-[#6E6E73]">
              v1 — ANDROID
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1.5 md:flex" aria-label="Primary">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={active === l.href ? "true" : undefined}
              className={`group flex items-center gap-2 rounded-lg px-3.5 py-2 text-[13px] font-medium tracking-wide text-[#5B5F68] transition hover:text-black dark:text-[#A1A1AA]/80 dark:hover:text-white ${
                active === l.href ? "nav-active" : ""
              }`}
            >
              <span className="nav-tick h-1 w-1 rounded-full bg-current opacity-30 transition" />
              <span className="mono-tech text-[10px] opacity-70">{l.index}</span>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <button
            onClick={toggle}
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            className="btn-ghost grid h-10 w-10 place-items-center rounded-xl text-[#5B5F68] dark:text-[#A1A1AA]"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="View PocketServer on GitHub"
            className="btn-ghost group grid h-10 w-10 place-items-center rounded-xl text-[#5B5F68] dark:text-[#A1A1AA]"
          >
            <GithubIcon size={16} className="transition-transform duration-200 group-hover:-translate-y-[1px]" />
          </a>
          <button
            onClick={() => downloadApk()}
            className="btn-primary group inline-flex h-10 items-center gap-1.5 rounded-xl px-4 text-[13.5px] font-semibold"
          >
            <Download size={15} className="transition group-hover:translate-y-[1px]" />
            Download
          </button>
          <span className="sr-only">{APK_DOWNLOAD_URL}{String(isApkUrlConfigured())}</span>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="btn-ghost grid h-10 w-10 place-items-center rounded-xl"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="btn-ghost grid h-10 w-10 place-items-center rounded-xl"
          >
            {open ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="mx-3 mt-2 rounded-2xl border border-black/10 bg-white/95 p-3 shadow-2xl backdrop-blur-xl md:hidden dark:border-white/10 dark:bg-black/95"
            aria-label="Mobile"
          >
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] font-medium transition hover:bg-black/[0.05] dark:hover:bg-white/[0.06]"
              >
                <span className="mono-tech text-[11px] text-[#8E8E93] dark:text-[#6E6E73]">{l.index}</span>
                {l.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-2 border-t border-black/10 pt-3 dark:border-white/10">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl text-sm font-medium"
              >
                <GithubIcon size={16} /> GitHub
              </a>
              <button
                onClick={() => {
                  setOpen(false);
                  downloadApk();
                }}
                className="btn-primary inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl text-sm font-semibold"
              >
                <Download size={16} /> Download
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
