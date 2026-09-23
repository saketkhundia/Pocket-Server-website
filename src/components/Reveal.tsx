"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  y = 20,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  sub,
  align = "center",
}: {
  eyebrow?: string;
  title: ReactNode;
  sub?: string;
  align?: "center" | "left";
}) {
  const alignCls =
    align === "center" ? "items-center text-center" : "items-start text-left";
  return (
    <Reveal className={`flex flex-col gap-5 ${alignCls} mx-auto max-w-3xl`}>
      {eyebrow ? (
        <span className="inline-flex items-center gap-2.5 rounded-full border border-black/10 bg-black/[0.03] px-4 py-1.5 dark:border-white/10 dark:bg-white/[0.04]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#34D399] run-dot" />
          <span className="eyebrow">{eyebrow}</span>
        </span>
      ) : null}
      <h2 className="display text-balance text-3xl sm:text-4xl lg:text-[2.9rem]">
        {title}
      </h2>
      {sub ? (
        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-[#5B5F68] dark:text-[#A1A1AA] sm:text-base">
          {sub}
        </p>
      ) : null}
    </Reveal>
  );
}
