import type { ReactNode } from "react";

/** Painel de pergaminho. */
export function Card({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={"parch-card text-ink " + className}>{children}</div>;
}

/** Legenda de seção em maiúsculas. `tone` muda a cor conforme o fundo. */
export function SectionCap({
  children,
  tone = "cream",
  className = "",
}: {
  children: ReactNode;
  tone?: "cream" | "ink";
  className?: string;
}) {
  const color = tone === "ink" ? "text-ink-faint" : "text-cream-faint";
  return (
    <span
      className={`block text-[10.5px] font-semibold uppercase tracking-[0.14em] ${color} ${className}`}
    >
      {children}
    </span>
  );
}

/** Título Grenze Gotisch da página. */
export function PageTitle({ children }: { children: ReactNode }) {
  return (
    <h1 className="m-0 font-display text-[28px] font-semibold tracking-[0.5px] text-[#ecdcb2] [text-shadow:0_1px_0_rgba(0,0,0,0.45)]">
      {children}
    </h1>
  );
}

export function PageSub({ children }: { children: ReactNode }) {
  return <p className="m-0 max-w-[640px] text-[13.5px] text-cream-dim">{children}</p>;
}

/** Campo de formulário: rótulo + conteúdo (input, select, etc). */
export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[12px] font-semibold text-ink-dim">
        {label} {hint && <span className="font-normal text-ink-faint">{hint}</span>}
      </span>
      {children}
    </label>
  );
}

/** Input numérico controlado (aceita texto livre e devolve string crua). */
export function TextInput({
  value,
  onChange,
  inputMode = "numeric",
  mono = false,
}: {
  value: string;
  onChange: (v: string) => void;
  inputMode?: "numeric" | "decimal" | "text";
  mono?: boolean;
}) {
  return (
    <input
      className={"field-input" + (mono ? " font-mono" : "")}
      inputMode={inputMode}
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
    />
  );
}

/** Toggle estilo interruptor de latão. */
export function Toggle({
  checked,
  onChange,
  title,
  description,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  title: string;
  description?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex items-start gap-3 pt-0.5 text-left"
    >
      <span
        className={
          "relative mt-0.5 h-5 w-[34px] shrink-0 rounded-full border transition-colors " +
          (checked ? "border-[#a9701f] bg-[#d8a24a]" : "border-[#a98f60] bg-[#c9b48a]")
        }
      >
        <span
          className={
            "absolute top-0.5 h-3.5 w-3.5 rounded-full transition-all " +
            (checked ? "left-4 bg-[#4a300f]" : "left-0.5 bg-[#8a7a58]")
          }
        />
      </span>
      <span>
        <span className="block text-[12.5px] font-semibold text-ink">{title}</span>
        {description && <span className="text-[11.5px] text-ink-dim">{description}</span>}
      </span>
    </button>
  );
}

/** Linha de resultado: rótulo à esquerda, valor à direita. */
export function ResultRow({
  label,
  value,
  tone = "default",
  first = false,
}: {
  label: string;
  value: ReactNode;
  tone?: "default" | "positive" | "muted";
  first?: boolean;
}) {
  const valueColor =
    tone === "positive" ? "text-herb" : tone === "muted" ? "text-ink-faint" : "text-ink";
  return (
    <div
      className={
        "flex items-center justify-between border-b border-parch-line py-[9px] text-[12.5px] " +
        (first ? "border-t" : "")
      }
    >
      <span className="text-ink-dim">{label}</span>
      <span className={`font-mono font-bold ${valueColor}`}>{value}</span>
    </div>
  );
}

/** Número grande de destaque do resultado. */
export function ResultBig({ value, unit }: { value: string; unit: string }) {
  return (
    <div className="my-2 mb-4 font-mono text-[33px] tracking-[0.5px] text-num">
      {value} <span className="text-[14px] text-ink-dim">{unit}</span>
    </div>
  );
}

/** Aviso de valores não confirmados. */
export function ProvisionalNote({ children }: { children: ReactNode }) {
  return (
    <p className="mt-3 flex gap-2 rounded-[3px] border border-[#bb8a3c] border-l-4 border-l-seal bg-[#efe1bc] px-3 py-2 text-[11px] leading-relaxed text-[#4a3a22]">
      {children}
    </p>
  );
}
