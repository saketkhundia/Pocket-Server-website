import type { ReactNode } from "react";

/**
 * A realistic desktop browser receiving content from the phone.
 * Quiet chrome, correct proportions, soft realistic shadow.
 */
export function ProductBrowser({
  url = "http://192.168.1.20:8080",
  children,
  caption,
}: {
  url?: string;
  children: ReactNode;
  caption?: string;
}) {
  return (
    <figure className="relative min-w-0">
      <div
        aria-hidden="true"
        className="absolute -inset-5 rounded-[28px] bg-[radial-gradient(closest-side,rgba(255,255,255,0.045),transparent)] blur-2xl"
      />
      <div className="panel relative overflow-hidden rounded-[20px] shadow-[0_32px_72px_rgba(0,0,0,0.4)]">
        {/* chrome */}
        <div className="hairline-b flex items-center gap-3 px-4 py-3">
          <span className="flex shrink-0 gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#D1D1D6] dark:bg-[#3a3a3e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#D1D1D6] dark:bg-[#3a3a3e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#D1D1D6] dark:bg-[#3a3a3e]" />
          </span>
          <span className="mono-tech flex min-w-0 flex-1 items-center gap-2 truncate rounded-lg bg-black/[0.04] px-3 py-1.5 text-[11.5px] text-[#5B5F68] dark:bg-white/[0.05] dark:text-[#A1A1AA]">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#34D399]" />
            <span className="min-w-0 truncate">{url}</span>
          </span>
        </div>
        <div className="relative">{children}</div>
      </div>
      {caption ? (
        <figcaption className="mono-tech mt-4 text-center text-[10px] uppercase tracking-[0.22em] text-[#8E8E93] dark:text-[#6E6E73]">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
