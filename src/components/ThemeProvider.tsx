"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useSyncExternalStore,
  type ReactNode,
} from "react";

type Theme = "dark" | "light";

const KEY = "pocketserver-theme";

function readStored(): Theme {
  try {
    return window.localStorage.getItem(KEY) === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
}

/* External-store plumbing: the server snapshot is always "dark" (matches
   the rendered <html>), so hydration never mismatches. After hydration the
   client re-reads the stored value and re-renders — by design, no error. */
let listeners: Array<() => void> = [];

function subscribe(onChange: () => void) {
  listeners = [...listeners, onChange];
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) onChange();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners = listeners.filter((l) => l !== onChange);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot(): Theme {
  return readStored();
}

function getServerSnapshot(): Theme {
  return "dark";
}

const ThemeContext = createContext<{
  theme: Theme;
  toggle: () => void;
}>({ theme: "dark", toggle: () => {} });

export function useTheme() {
  return useContext(ThemeContext);
}

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  /* layout effect: corrects the class before first paint, no flash */
  useIsomorphicLayoutEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggle = useCallback(() => {
    const next: Theme = readStored() === "dark" ? "light" : "dark";
    try {
      window.localStorage.setItem(KEY, next);
    } catch {
      /* storage unavailable — theme still applies for this session */
    }
    document.documentElement.classList.toggle("dark", next === "dark");
    listeners.forEach((l) => l());
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
