"use client";

import {
  Activity,
  BatteryMedium,
  Bell,
  Camera,
  ChevronRight,
  Database,
  Folder,
  Globe,
  House,
  Play,
  Plus,
  Search,
  Server,
  Settings as SettingsIcon,
  Signal,
  Square,
  SquarePlay,
  Wifi,
} from "lucide-react";
import { useState } from "react";

export type AppTab = "home" | "files" | "activity" | "settings";

/* ---------------- status bar ---------------- */

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-5 pb-1 pt-3 text-white">
      <span className="text-[12px] font-semibold tracking-wide">3:51</span>
      <span className="flex items-center gap-1.5">
        <Signal size={12} />
        <Wifi size={12} />
        <BatteryMedium size={15} />
      </span>
    </div>
  );
}

/* ---------------- dock ---------------- */

const TABS: { id: AppTab; label: string; icon: typeof House }[] = [
  { id: "home", label: "Home", icon: House },
  { id: "files", label: "Files", icon: Folder },
  { id: "activity", label: "Activity", icon: Activity },
  { id: "settings", label: "Settings", icon: SettingsIcon },
];

function Dock({
  active,
  onChange,
  interactive,
}: {
  active: AppTab;
  onChange?: (t: AppTab) => void;
  interactive?: boolean;
}) {
  return (
    <div className="px-3 pb-4 pt-2">
      <div className="flex rounded-[26px] border border-white/[0.08] bg-[#101013] p-1.5">
        {TABS.map((t) => {
          const isActive = t.id === active;
          const Inner = (
            <>
              <t.icon size={19} strokeWidth={isActive ? 2.2 : 1.8} className={isActive ? "text-white" : "text-zinc-500"} />
              <span className={`text-[9.5px] font-bold ${isActive ? "text-white" : "text-zinc-500"}`}>
                {t.label}
              </span>
            </>
          );
          return interactive && onChange ? (
            <button
              key={t.id}
              onClick={() => onChange(t.id)}
              aria-label={`${t.label} tab`}
              aria-current={isActive}
              className={`flex flex-1 flex-col items-center gap-1 rounded-[20px] py-2 transition-colors ${
                isActive ? "bg-[#2b2b30]" : "hover:bg-white/[0.04]"
              }`}
            >
              {Inner}
            </button>
          ) : (
            <div
              key={t.id}
              className={`flex flex-1 flex-col items-center gap-1 rounded-[20px] py-2 ${
                isActive ? "bg-[#2b2b30]" : ""
              }`}
            >
              {Inner}
            </div>
          );
        })}
      </div>
      {/* gesture bar */}
      <div className="mx-auto mt-2 h-[3px] w-24 rounded-full bg-white/80" />
    </div>
  );
}

/* ---------------- shared bits ---------------- */

function Toggle({ on, onClick }: { on: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      role="switch"
      aria-checked={on}
      className={`relative h-[26px] w-[46px] shrink-0 rounded-full transition-colors duration-200 ${
        on ? "bg-zinc-500" : "bg-[#2e2e33]"
      }`}
    >
      <span
        className={`absolute top-[3px] h-[20px] w-[20px] rounded-full bg-white shadow transition-all duration-200 ${
          on ? "left-[23px]" : "left-[3px]"
        }`}
      />
    </button>
  );
}

/* ---------------- home screen ---------------- */

const QUICK = [
  { icon: Folder, top: "Share Files", sub: "Anywhere" },
  { icon: Camera, top: "Photos", sub: "Backup" },
  { icon: SquarePlay, top: "Media", sub: "Instant" },
  { icon: Globe, top: "Web Server", sub: "Website" },
];

function HomeScreen({
  running,
  onToggle,
  assemble,
}: {
  running: boolean;
  onToggle?: () => void;
  assemble?: boolean;
}) {
  return (
    <div className="flex-1 overflow-hidden px-3">
      {/* header */}
      <div
        className={`flex items-start justify-between px-1 pt-2${
          assemble ? " assemble-block" : ""
        }`}
        style={assemble ? { animationDelay: "480ms" } : undefined}
      >
        <div>
          <h3 className="text-[26px] font-extrabold leading-none tracking-tight text-white">
            Pocket Server
          </h3>
          <p className="mt-1.5 text-[12px] font-semibold text-zinc-500">
            Your phone. Your server.
          </p>
        </div>
        <div className="flex gap-2">
          {[Bell, SettingsIcon].map((I, i) => (
            <span key={i} className="grid h-[38px] w-[38px] place-items-center rounded-full border border-white/[0.08] bg-[#101013]">
              <I size={16} className="text-zinc-300" />
            </span>
          ))}
        </div>
      </div>

      {/* status hero */}
      <div
        className={`mt-2.5 rounded-[24px] border border-white/[0.08] bg-[#131316] p-3.5${
          assemble ? " assemble-block" : ""
        }`}
        style={assemble ? { animationDelay: "600ms" } : undefined}
      >
        <div className="flex items-center justify-between">
          <span
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-bold tracking-[0.16em] transition-colors duration-500 ${
              running
                ? "border-[#34D399]/30 bg-[#34D399]/[0.07] text-zinc-200"
                : "border-white/[0.1] bg-white/[0.03] text-zinc-400"
            }`}
          >
            <span className={`h-[7px] w-[7px] rounded-full ${running ? "bg-[#34D399] animate-pulse-dot run-dot" : "bg-[#F87171]"}`} />
            {running ? "SERVER RUNNING" : "SERVER OFFLINE"}
          </span>
          <span className="grid h-[40px] w-[40px] place-items-center rounded-2xl border border-white/[0.08] bg-[#1c1c21]">
            <Server size={18} className="text-zinc-200" />
          </span>
        </div>

        <p className="mt-3 text-[20px] font-extrabold tracking-tight text-white">
          {running ? "Server running" : "Start your server"}
        </p>
        <p className="mono-tech mt-1 truncate text-[11px] text-zinc-500">
          {running ? "http://192.168.1.20:8080" : "Your phone isn't sharing anything yet."}
        </p>

        <button
          onClick={onToggle}
          className={`mt-3 grid h-[48px] w-full place-items-center rounded-2xl text-[14.5px] font-extrabold transition-all active:scale-[0.98] ${
            running
              ? "border border-[#F87171]/30 bg-[#F87171]/10 text-[#FCA5A5]"
              : "bg-[#F5F5F7] text-black"
          }`}
        >
          <span className="inline-flex items-center gap-2.5">
            {running ? <Square size={14} fill="currentColor" /> : <Play size={16} />}
            {running ? "Stop Server" : "Start Server"}
          </span>
        </button>

        <div className="my-3 h-px bg-white/[0.07]" />

        {/* quick actions */}
        <div className="grid grid-cols-4 divide-x divide-white/[0.07]">
          {QUICK.map((q) => (
            <div key={q.top} className="flex flex-col items-center px-1 text-center">
              <span className="grid h-[42px] w-[42px] place-items-center rounded-2xl border border-white/[0.08] bg-[#1c1c21]">
                <q.icon size={17} className="text-zinc-100" />
              </span>
              <span className="mt-1.5 text-[9px] font-extrabold leading-tight text-white">{q.top}</span>
              <span className="text-[8px] font-semibold text-zinc-500">{q.sub}</span>
            </div>
          ))}
        </div>
      </div>

      {/* folders + storage */}
      <div
        className={`mt-2.5 grid grid-cols-2 gap-2.5${
          assemble ? " assemble-block" : ""
        }`}
        style={assemble ? { animationDelay: "720ms" } : undefined}
      >
        <div className="rounded-[20px] border border-white/[0.08] bg-[#131316] p-3">
          <p className="flex items-center gap-1.5 text-[11px] font-extrabold text-white">
            <Folder size={12} /> Shared Folders
          </p>
          <p className="mt-1.5 text-[21px] font-extrabold leading-none text-white">0</p>
          <p className="mt-1 text-[9.5px] font-semibold text-zinc-500">No folders yet</p>
        </div>
        <div className="rounded-[20px] border border-white/[0.08] bg-[#131316] p-3">
          <p className="flex items-center gap-1.5 text-[11px] font-extrabold text-white">
            <Database size={12} /> Storage
          </p>
          <p className="mt-1.5 text-[13.5px] font-extrabold leading-none text-white">36.5 GB free</p>
          <div className="mt-2 h-[6px] overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[22%] rounded-full bg-white/85" />
          </div>
          <p className="mono-tech mt-1 text-[8px] leading-relaxed text-zinc-500">
            10.6 GB used
            <br />
            47.1 GB total
          </p>
        </div>
      </div>
    </div>
  );
}

/* ---------------- files screen ---------------- */

function FilesScreen({ assemble }: { assemble?: boolean }) {
  return (
    <div
      className={`flex-1 overflow-hidden px-3${assemble ? " assemble-block" : ""}`}
      style={assemble ? { animationDelay: "80ms" } : undefined}
    >
      <h3 className="px-1 pt-2 text-[26px] font-extrabold tracking-tight text-white">Files</h3>
      <div className="mt-3 flex items-center gap-2.5 rounded-[20px] border border-white/[0.08] bg-[#131316] px-4 py-3.5">
        <Search size={16} className="text-zinc-500" />
        <span className="text-[13.5px] font-semibold text-zinc-500">Search folders…</span>
      </div>
      <div className="mt-3 rounded-[24px] border border-white/[0.08] bg-[#131316] p-5 text-center">
        <p className="text-[16px] font-extrabold text-white">No shared folders</p>
        <p className="mx-auto mt-1.5 max-w-[210px] text-[11.5px] font-semibold leading-relaxed text-zinc-500">
          Only folders you add here are visible on the network.
        </p>
        <span className="mx-auto mt-4 grid h-[48px] w-full place-items-center rounded-2xl bg-[#F5F5F7] text-[14px] font-extrabold text-black">
          Add folder
        </span>
      </div>
      <p className="mx-auto mt-3 max-w-[230px] text-center text-[10.5px] font-semibold leading-relaxed text-zinc-500">
        Files stay on this phone and are served only while the server runs.
      </p>
      <div className="mt-3 flex justify-end pr-1">
        <span className="grid h-[46px] w-[46px] place-items-center rounded-2xl border border-white/[0.08] bg-[#1c1c21]">
          <Plus size={19} className="text-white" />
        </span>
      </div>
    </div>
  );
}

/* ---------------- activity screen ---------------- */

const EVENTS = [
  { t: "Server started", time: "14:47:02" },
  { t: "MDNS register", time: "14:47:02" },
  { t: "Server stopped", time: "14:47:24" },
];

function ActivityScreen({ assemble }: { assemble?: boolean }) {
  return (
    <div
      className={`flex-1 overflow-hidden px-3${assemble ? " assemble-block" : ""}`}
      style={assemble ? { animationDelay: "80ms" } : undefined}
    >
      <h3 className="px-1 pt-2 text-[26px] font-extrabold tracking-tight text-white">Activity</h3>
      <div className="mt-3 flex items-center gap-2.5 rounded-[20px] border border-white/[0.08] bg-[#131316] px-4 py-3.5">
        <Search size={16} className="text-zinc-500" />
        <span className="text-[13.5px] font-semibold text-zinc-500">Search activity…</span>
      </div>
      <div className="mono-tech mt-3 flex gap-2 text-[10.5px] font-bold">
        {["All", "Server", "Files"].map((c, i) => (
          <span
            key={c}
            className={`rounded-full border px-3.5 py-2 ${
              i === 0
                ? "border-white/25 bg-white/[0.07] text-white"
                : "border-white/[0.08] bg-[#131316] text-zinc-500"
            }`}
          >
            {c}
          </span>
        ))}
      </div>
      <p className="mt-3 px-1 text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-600">Today</p>
      <div className="mt-2 space-y-2.5">
        {EVENTS.map((e) => (
          <div key={e.t} className="flex items-center gap-3 rounded-[20px] border border-white/[0.08] bg-[#131316] p-3">
            <span className="grid h-[38px] w-[38px] shrink-0 place-items-center rounded-xl border border-white/[0.08] bg-[#1c1c21]">
              <Activity size={15} className="text-zinc-300" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[12.5px] font-extrabold text-white">{e.t}</span>
              <span className="mono-tech block text-[10px] text-zinc-500">{e.time}</span>
            </span>
            <ChevronRight size={14} className="ml-auto shrink-0 text-zinc-600" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- settings screen ---------------- */

function SettingsScreen({ assemble }: { assemble?: boolean }) {
  const [bg, setBg] = useState(true);
  const [auth, setAuth] = useState(true);
  const rows: { label: string; value?: string; toggle?: boolean; on?: boolean; set?: (v: boolean) => void }[] = [
    { label: "Server name", value: "Pocket Server" },
    { label: "HTTP port", value: "8080" },
    { label: "Background server", toggle: true, on: bg, set: setBg },
    { label: "Authentication", toggle: true, on: auth, set: setAuth },
    { label: "Username", value: "admin" },
    { label: "Session timeout", value: "60 min" },
  ];
  return (
    <div
      className={`flex-1 overflow-hidden px-3${assemble ? " assemble-block" : ""}`}
      style={assemble ? { animationDelay: "80ms" } : undefined}
    >
      <h3 className="px-1 pt-2 text-[26px] font-extrabold tracking-tight text-white">Settings</h3>
      <p className="mt-3 px-1 text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-600">Server</p>
      <div className="mt-1.5 space-y-2">
        {rows.slice(0, 3).map((r) => (
          <div key={r.label} className="flex items-center justify-between gap-2 rounded-[18px] border border-white/[0.08] bg-[#131316] px-4 py-3">
            <span className="text-[12.5px] font-extrabold text-white">{r.label}</span>
            {r.toggle && r.set ? (
              <Toggle on={!!r.on} onClick={() => r.set!(!r.on)} />
            ) : (
              <span className="flex items-center gap-1 text-[12px] font-bold text-zinc-500">
                {r.value} <ChevronRight size={13} className="text-zinc-600" />
              </span>
            )}
          </div>
        ))}
      </div>
      <p className="mt-3 px-1 text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-600">Security</p>
      <div className="mt-1.5 space-y-2">
        {rows.slice(3).map((r) => (
          <div key={r.label} className="flex items-center justify-between gap-2 rounded-[18px] border border-white/[0.08] bg-[#131316] px-4 py-3">
            <span className="text-[12.5px] font-extrabold text-white">{r.label}</span>
            {r.toggle && r.set ? (
              <Toggle on={!!r.on} onClick={() => r.set!(!r.on)} />
            ) : (
              <span className="flex items-center gap-1 text-[12px] font-bold text-zinc-500">
                {r.value} <ChevronRight size={13} className="text-zinc-600" />
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- phone frame ---------------- */

export function AppPhone({
  tab,
  running,
  onTabChange,
  onToggleServer,
  interactive = false,
  assemble = false,
}: {
  tab: AppTab;
  running: boolean;
  onTabChange?: (t: AppTab) => void;
  onToggleServer?: () => void;
  interactive?: boolean;
  assemble?: boolean;
}) {
  return (
    <div className="relative mx-auto w-full max-w-[min(80vw,320px)]">
      <div className="relative rounded-[2.8rem] border border-white/[0.12] bg-[#1c1c20] p-[10px] shadow-[0_40px_80px_rgba(0,0,0,0.5),0_16px_32px_rgba(0,0,0,0.35)]">
        {/* bezel light edge */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-10 top-[3px] h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        <div aria-hidden="true" className="absolute -left-[2px] top-24 h-10 w-[3px] rounded-full bg-white/15" />
        <div aria-hidden="true" className="absolute -right-[2px] top-28 h-14 w-[3px] rounded-full bg-white/15" />
        <div className="relative flex flex-col overflow-hidden rounded-[2.2rem] bg-black">
          {/* screen glare */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(115deg,rgba(255,255,255,0.055)_0%,transparent_28%)]"
          />
          <StatusBar />
          {/* fixed viewport: identical phone length on every tab */}
          <div className="relative flex h-[500px] flex-col overflow-hidden">
            {tab === "home" && <HomeScreen running={running} onToggle={interactive ? onToggleServer : undefined} assemble={assemble} />}
            {tab === "files" && <FilesScreen assemble={assemble} />}
            {tab === "activity" && <ActivityScreen assemble={assemble} />}
            {tab === "settings" && <SettingsScreen assemble={assemble} />}
            <div className="mt-auto">
              <Dock active={tab} onChange={onTabChange} interactive={interactive} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
