"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { APK_DOWNLOAD_URL, isApkUrlConfigured } from "@/lib/config";

type Toast = { id: number; title: string; body: string };

let pushToast: ((t: Omit<Toast, "id">) => void) | null = null;

export function downloadApk() {
  const configured = isApkUrlConfigured();
  if (configured) {
    // Trigger a real direct download without navigating away.
    const a = document.createElement("a");
    a.href = APK_DOWNLOAD_URL;
    a.setAttribute("download", "PocketServer.apk");
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    a.remove();
    pushToast?.({
      title: "Download started",
      body: "PocketServer APK is downloading. Android may ask you to allow installation from this source.",
    });
  } else {
    pushToast?.({
      title: "APK URL not configured",
      body: "Set NEXT_PUBLIC_APK_DOWNLOAD_URL to your release APK URL to enable downloads.",
    });
  }
}

export function useDownloadHandler() {
  return useCallback(() => downloadApk(), []);
}

export function DownloadToasts() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    pushToast = (t) => {
      const id = ++idRef.current;
      setToasts((prev) => [...prev.slice(-2), { ...t, id }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((x) => x.id !== id));
      }, 5200);
    };
    return () => {
      pushToast = null;
    };
  }, []);

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed bottom-5 left-1/2 z-[60] flex w-[min(92vw,420px)] -translate-x-1/2 flex-col gap-2 pb-[env(safe-area-inset-bottom)]"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          className="panel pointer-events-auto rounded-2xl p-4 shadow-[0_16px_50px_rgba(0,0,0,0.35)]"
        >
          <p className="flex items-center gap-2 text-sm font-semibold">
            <span className="h-2 w-2 animate-pulse-dot rounded-full bg-[#34D399]" />
            {t.title}
          </p>
          <p className="mono-tech mt-1 text-[12px] leading-relaxed text-[#5B5F68] dark:text-[#A1A1AA]">
            {t.body}
          </p>
        </div>
      ))}
    </div>
  );
}
