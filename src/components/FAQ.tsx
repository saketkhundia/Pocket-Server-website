"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { GITHUB_URL } from "@/lib/config";
import { Reveal, SectionHeading } from "./Reveal";

const FAQS = [
  {
    q: "What is PocketServer?",
    a: "PocketServer turns your Android phone into a local server that can be accessed by other devices on your network — for files, web services, and media.",
  },
  {
    q: "How does it work?",
    a: "Install the app, tap Start Server, then open the displayed local address (for example http://192.168.1.20:8080) from another device on the same network. No separate hardware or hosting account needed.",
  },
  {
    q: "Does it require internet?",
    a: "PocketServer is designed for local-network access, so your phone and your other devices talk directly over your local network. A working local Wi-Fi connection is required; features that inherently need the public internet will depend on your network.",
  },
  {
    q: "How do I connect?",
    a: "Start the server in the app, then open the displayed local network address from a laptop, desktop, or tablet connected to the same network.",
  },
  {
    q: "Is it open source?",
    a: "Yes. The code is developed in the open — you can explore it, report issues, and contribute.",
    link: true,
  },
  {
    q: "How do I install the APK?",
    a: "Download the APK, open it on your Android device, and allow installation from this source when Android asks. Then open PocketServer and tap Start Server.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="wrap-narrow scroll-mt-24 py-24">
      <SectionHeading
        eyebrow="FAQ"
        title={<>Questions, answered.</>}
      />
      <div className="mt-10">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={f.q} delay={i * 0.03}>
              <div className="border-b border-black/10 dark:border-white/10">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  className="group flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="flex items-baseline gap-4">
                    <span className="mono-tech hidden text-[11px] text-[#8E8E93] sm:inline dark:text-[#6E6E73]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[15.5px] font-semibold tracking-tight">{f.q}</span>
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.22 }}
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-colors ${
                      isOpen
                        ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                        : "border-black/15 dark:border-white/15"
                    }`}
                  >
                    <Plus size={15} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.21, 0.6, 0.16, 1] }}
                    >
                      <p className="max-w-xl pb-6 pl-0 text-[14px] leading-relaxed text-[#5B5F68] sm:pl-10 dark:text-[#A1A1AA]">
                        {f.a}{" "}
                        {f.link && (
                          <a
                            href={GITHUB_URL}
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium text-current underline underline-offset-4"
                          >
                            View the repository.
                          </a>
                        )}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
