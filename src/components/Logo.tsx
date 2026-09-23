export function Logo({ size = 30 }: { size?: number }) {
  return (
    <span className="inline-grid shrink-0 place-items-center" style={{ width: size, height: size }}>
      <span
        aria-hidden="true"
        className="relative grid place-items-center rounded-[10px] bg-[#0A0A0C] text-white shadow-[0_0_18px_rgba(0,0,0,0.25)] dark:bg-[#F5F5F7] dark:text-black dark:shadow-[0_0_22px_rgba(255,255,255,0.18)]"
        style={{ width: size, height: size }}
      >
        <svg
          width={size * 0.62}
          height={size * 0.62}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.1}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="4" width="18" height="6.2" rx="1.8" />
          <rect x="3" y="13.8" width="18" height="6.2" rx="1.8" />
          <circle cx="7" cy="7.1" r="0.7" fill="currentColor" stroke="none" />
          <circle cx="7" cy="16.9" r="0.7" fill="#34D399" stroke="none" />
          <path d="M11 7.1h6M11 16.9h6" strokeOpacity={0.85} />
        </svg>
      </span>
    </span>
  );
}
