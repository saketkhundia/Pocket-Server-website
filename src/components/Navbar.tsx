"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Download, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { APK_DOWNLOAD_URL, GITHUB_URL, isApkUrlConfigured } from "@/lib/config";
import { Logo } from "./Logo";
import { useTheme } from "./ThemeProvider";
import { downloadApk } from "./download-toast";
import { GithubIcon } from "./GithubIcon";

const EASE = [0.22, 1, 0.36, 1] as const;

const LINKS = [
  { label: "Features", href: "/features", index: "01", section: "features" },
  { label: "How It Works", href: "/how-it-works", index: "02", section: "how-it-works" },
  { label: "Open Source", href: "/open-source", index: "03", section: "open-source" },
  { label: "FAQ", href: "/faq", index: "04", section: "faq", wideOnly: true },
];

/* Two-line mark that folds into a close icon. Transform-only. */
function MenuButton({
  open,
  onToggle,
  btnRef,
}: {
  open: boolean;
  onToggle: () => void;
  btnRef: React.RefObject<HTMLButtonElement | null>;
}) {
  const line =
    "absolute left-0 top-1/2 h-[1.5px] bg-current transition-all duration-300";
  return (
    <button
      ref={btnRef}
      onClick={onToggle}
      aria-label={open ? "Close navigation" : "Open navigation"}
      aria-expanded={open}
      aria-controls="mobile-menu"
      className="btn-ghost grid h-11 w-11 shrink-0 place-items-center rounded-xl"
    >
      <span aria-hidden="true" className="relative block h-3 w-[18px]">
        <span
          className={`${line} w-[18px]`}
          style={{
            transform: open
              ? "translateY(-50%) rotate(45deg)"
              : "translateY(calc(-50% - 4px))",
            transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
        <span
          className={`${line} ${open ? "w-[18px]" : "w-[12px]"}`}
          style={{
            transform: open
              ? "translateY(-50%) rotate(-45deg)"
              : "translateY(calc(-50% + 4px))",
            transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
      </span>
    </button>
  );
}

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

const itemReduced = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.01 } },
};

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [spot, setSpot] = useState("");
  const pathname = usePathname();
  const active = pathname === "/" ? spot : pathname;
  const { theme, toggle } = useTheme();
  const reduce = useReducedMotion();
  const itemVariants = reduce ? itemReduced : item;
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);
  const wasOpen = useRef(false);

  /* logo: scroll to top when already home, otherwise go home */
  const goTop = (e: React.MouseEvent) => {
    if (pathname !== "/") return;
    e.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  /* one scroll listener: surface state only — the bar never hides */
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      setScrolled(window.scrollY > 16);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  /* close the menu on route change (covers back/forward; taps close directly) */
  useEffect(() => {
    const raf = requestAnimationFrame(() => setOpen(false));
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

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

  /* focus into the menu on open, back to the button on close */
  useEffect(() => {
    if (open) {
      wasOpen.current = true;
      const t = setTimeout(() => firstLinkRef.current?.focus(), reduce ? 0 : 380);
      return () => clearTimeout(t);
    }
    if (wasOpen.current) {
      wasOpen.current = false;
      btnRef.current?.focus();
    }
  }, [open, reduce]);

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
      {/* ------- full-screen menu: opens out of the navbar ------- */}
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: reduce ? 0.01 : 0.35, ease: EASE }}
            className="fixed inset-0 z-0 overflow-y-auto overflow-x-clip bg-[#F5F5F7]/95 backdrop-blur-sm lg:hidden dark:bg-black/[0.94] dark:backdrop-blur-md"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-[-20%] h-[28rem] w-[44rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(10,10,14,0.05),transparent)] blur-3xl dark:bg-[radial-gradient(closest-side,rgba(255,255,255,0.04),transparent)]"
            />
            <motion.div
              variants={list}
              initial="hidden"
              animate="show"
              exit="hidden"
              className="wrap relative flex min-h-full w-full flex-col px-4 pb-10 pt-28"
            >
              <motion.p variants={itemVariants} className="eyebrow">
                PocketServer
              </motion.p>
              <div className="mt-4 flex flex-col">
                {LINKS.map((l, i) => (
                  <Link
                    key={l.href}
                    ref={i === 0 ? firstLinkRef : undefined}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    aria-current={active === l.href ? "true" : undefined}
                    className="group block"
                  >
                    <motion.span
                      variants={itemVariants}
                      className="flex items-baseline gap-4 border-t border-black/10 py-4 transition-transform duration-200 group-active:translate-x-1 dark:border-white/10"
                    >
                      <span
                        className={`mono-tech text-[12px] transition-colors ${
                          active === l.href
                            ? "text-[#34D399]"
                            : "text-[#8E8E93] group-hover:text-[#34D399] dark:text-[#6E6E73]"
                        }`}
                      >
                        {l.index}
                      </span>
                      <span className="display text-[2rem] leading-none tracking-tight transition-transform duration-200 group-hover:translate-x-1">
                        {l.label}
                      </span>
                    </motion.span>
                  </Link>
                ))}
              </div>
              <motion.div
                variants={itemVariants}
                className="mt-6 flex gap-2 border-t border-black/10 pt-6 dark:border-white/10"
              >
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost inline-flex h-[52px] flex-1 items-center justify-center gap-2 rounded-xl text-sm font-medium"
                >
                  <GithubIcon size={16} /> GitHub
                </a>
                <button
                  onClick={() => {
                    setOpen(false);
                    downloadApk();
                  }}
                  className="btn-primary inline-flex h-[52px] flex-1 items-center justify-center gap-2 rounded-xl text-sm font-semibold"
                >
                  <Download size={16} /> Download APK
                </button>
              </motion.div>
              <motion.p
                variants={itemVariants}
                className="mono-tech mt-auto pt-10 text-[10px] uppercase tracking-[0.24em] text-[#8E8E93] dark:text-[#6E6E73]"
              >
                Open Source · Android · Local First
              </motion.p>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* ------- bar ------- */}
      <div
        className={`wrap relative z-10 flex items-center justify-between gap-3 px-4 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-5 ${
          scrolled || open
            ? "mt-3 rounded-2xl border border-black/10 bg-white/80 py-2 shadow-[0_12px_40px_rgba(0,0,0,0.12)] backdrop-blur-xl dark:border-white/[0.06] dark:bg-[#0A0A0C]/80 dark:shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
            : "border border-transparent bg-transparent py-2 lg:py-3.5"
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

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={active === l.href ? "true" : undefined}
              className={`group relative flex items-center gap-2 rounded-lg px-3 py-2 text-[13px] font-medium tracking-wide text-[#5B5F68] transition-colors duration-200 hover:text-black xl:px-3.5 dark:text-[#A1A1AA]/80 dark:hover:text-white ${
                active === l.href ? "nav-active" : ""
              } ${l.wideOnly ? "hidden min-[1200px]:flex" : ""}`}
            >
              <span className="mono-tech text-[10px] opacity-50 transition-opacity duration-200 group-hover:opacity-90">
                {l.index}
              </span>
              {l.label}
              {active === l.href && (
                <motion.span
                  layoutId="nav-underline"
                  transition={{ duration: reduce ? 0.01 : 0.35, ease: EASE }}
                  className="absolute inset-x-3 -bottom-[1px] h-px bg-[#34D399]"
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
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

        <div className="flex items-center gap-1 lg:hidden">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="btn-ghost grid h-11 w-11 place-items-center rounded-xl"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="View PocketServer on GitHub"
            className="btn-ghost hidden min-[400px]:grid h-11 w-11 place-items-center rounded-xl"
          >
            <GithubIcon size={16} />
          </a>
          <MenuButton open={open} onToggle={() => setOpen((v) => !v)} btnRef={btnRef} />
        </div>
      </div>
    </header>
  );
}
