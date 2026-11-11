export function LogoMark({ className = "size-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <path
        d="M16 1.8 28.5 6.2v9.1c0 7.7-5.3 13.2-12.5 15.2C8.8 28.5 3.5 23 3.5 15.3V6.2L16 1.8Z"
        fill="#111C33"
        stroke="#F6B23C"
        strokeWidth="1.6"
      />
      <path d="M8.6 21.2 16 9.4l7.4 11.8" fill="none" stroke="#F6B23C" strokeWidth="2.6" strokeLinejoin="miter" />
      <path d="M12.2 17.6h7.6" stroke="#F6B23C" strokeWidth="1.6" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center gap-3 ${className}`}>
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-bold tracking-[0.18em] text-white">APEX</span>
        <span className="mt-1 text-[0.6rem] font-medium uppercase tracking-[0.28em] text-mist">Protection Services</span>
      </span>
    </span>
  );
}
