"use client";
import type { ReactNode } from "react";

/* Small building blocks for the admin, in the site's own look. */

export const uid = () => Math.random().toString(36).slice(2, 10);

export const inputCls =
  "w-full rounded-none border border-cream/15 bg-oxblood/40 px-3 py-2.5 text-[15px] text-cream placeholder-cream/30 transition-colors focus:border-signal focus:outline-none";

export function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="flex min-w-0 flex-col gap-1.5">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone">{label}</span>
      {children}
      {hint && <span className="text-xs text-cream/40">{hint}</span>}
    </label>
  );
}

export function Text({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className={`${inputCls} ${type === "date" ? "[color-scheme:dark]" : ""}`}
    />
  );
}

export function Area({ value, onChange, rows = 4 }: { value: string; onChange: (v: string) => void; rows?: number }) {
  return (
    <textarea value={value} rows={rows} onChange={(e) => onChange(e.target.value)} className={`${inputCls} resize-y leading-relaxed`} />
  );
}

export function Btn({
  children,
  onClick,
  variant = "ghost",
  disabled,
  type = "button",
  title,
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "ghost" | "solid" | "danger";
  disabled?: boolean;
  type?: "button" | "submit";
  title?: string;
}) {
  const styles = {
    ghost: "border border-cream/20 text-cream hover:border-cream/60",
    solid: "bg-signal text-cream hover:bg-cream hover:text-ink",
    danger: "border border-signal/50 text-signal hover:bg-signal hover:text-cream",
  }[variant];
  return (
    <button
      type={type}
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex min-h-[40px] items-center justify-center gap-2 px-4 font-mono text-[11px] uppercase tracking-[0.15em] transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${styles}`}
    >
      {children}
    </button>
  );
}

export function Card({ children }: { children: ReactNode }) {
  return <div className="border border-cream/10 bg-oxblood/30 p-4 md:p-5">{children}</div>;
}

export function SectionHead({ title, desc, action }: { title: string; desc?: string; action?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 className="font-display text-4xl uppercase leading-none md:text-5xl">{title}</h2>
        {desc && <p className="mt-2 max-w-xl text-sm text-cream/50">{desc}</p>}
      </div>
      {action}
    </div>
  );
}

/** Move item i by d positions (−1 / +1) in a copy of the list. */
export function move<T>(list: T[], i: number, d: number): T[] {
  const j = i + d;
  if (j < 0 || j >= list.length) return list;
  const next = [...list];
  [next[i], next[j]] = [next[j], next[i]];
  return next;
}
