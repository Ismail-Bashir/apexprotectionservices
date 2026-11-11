import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

export function Container({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Eyebrow({ children, tone = "dark" }: { children: ReactNode; tone?: "dark" | "light" }) {
  const color = tone === "dark" ? "text-gold" : "text-gold-dark";
  const line = tone === "dark" ? "bg-gold" : "bg-gold-dark";
  return (
    <p className={`inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] ${color}`}>
      <span className={`h-px w-8 ${line}`} aria-hidden />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  tone = "dark",
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  tone?: "dark" | "light";
  align?: "left" | "center";
}) {
  const titleColor = tone === "dark" ? "text-white" : "text-ink";
  const leadColor = tone === "dark" ? "text-mist" : "text-muted";
  const alignment = align === "center" ? "mx-auto text-center items-center" : "";
  return (
    <div className={`flex max-w-2xl flex-col gap-4 ${alignment}`} data-reveal>
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <h2 className={`font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1] ${titleColor}`}>
        {title}
      </h2>
      {lead ? <p className={`text-lg leading-relaxed text-pretty ${leadColor}`}>{lead}</p> : null}
    </div>
  );
}

type ButtonVariant = "primary" | "secondary" | "dark" | "outline-dark";

const buttonStyles: Record<ButtonVariant, string> = {
  primary: "bg-gold text-ink hover:bg-gold-light shadow-[0_8px_30px_-8px_rgb(246_178_60/0.55)]",
  secondary: "border border-white/20 text-white hover:border-white/40 hover:bg-white/5",
  dark: "bg-ink text-white hover:bg-navy",
  "outline-dark": "border border-ink/20 text-ink hover:border-ink/40 hover:bg-ink/5",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  arrow = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  arrow?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-all duration-200 ${buttonStyles[variant]} ${className}`}
    >
      {children}
      {arrow ? <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden /> : null}
    </Link>
  );
}
