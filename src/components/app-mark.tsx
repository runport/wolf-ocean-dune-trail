export function AppMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      <rect x="4" y="7" width="18" height="20" rx="3" fill="currentColor" opacity="0.18" />
      <rect x="10" y="4" width="18" height="20" rx="3" fill="currentColor" opacity="0.9" />
      <path
        d="M14 10h10M14 14h10M14 18h6"
        stroke="#f6f1e8"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
