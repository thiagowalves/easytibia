import type { ReactElement, SVGProps } from "react";
import type { VocationId } from "../lib/tibia/vocations";
import type { RouteId } from "../state/router";

type IconProps = SVGProps<SVGSVGElement>;

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/* ---- Ícones de navegação (linha, 20px) ---- */

export function HomeIcon(p: IconProps) {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" {...stroke} {...p}>
      <path d="M3 9.2 10 3.5l7 5.7" />
      <path d="M5 8.2v8.3h10V8.2" />
    </svg>
  );
}

export function BookIcon(p: IconProps) {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" {...stroke} {...p}>
      <path d="M10 5.6C10 5.6 8.1 4.2 4.7 4.2v9c3.4 0 5.3 1.4 5.3 1.4" />
      <path d="M10 5.6c0 0 1.9-1.4 5.3-1.4v9c-3.4 0-5.3 1.4-5.3 1.4" />
    </svg>
  );
}

export function TasksIcon(p: IconProps) {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" {...stroke} {...p}>
      <path d="M8 5h8M8 10h8M8 15h8" />
      <path d="m3.2 4.6 1 1 1.8-2M3.2 10l1 1 1.8-2M3.2 15.4l1 1 1.8-2" />
    </svg>
  );
}

export function ScrollIcon(p: IconProps) {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" {...stroke} {...p}>
      <path d="M5.5 2.8v14.4" />
      <path d="M5.5 3.8h8.2l-1.8 3 1.8 3H5.5" />
    </svg>
  );
}

export function CalculatorIcon(p: IconProps) {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" {...stroke} {...p}>
      <rect x="4.6" y="2.6" width="10.8" height="14.8" rx="1.8" />
      <path d="M7 5.4h6v2.4H7z" />
      <path d="M7.4 10.8h.02M10 10.8h.02M12.6 10.8h.02M7.4 13.4h.02M10 13.4h.02M12.6 13.4h.02" />
    </svg>
  );
}

export function ShieldIcon(p: IconProps) {
  return (
    <svg viewBox="0 0 28 28" width="24" height="24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round" {...p}>
      <path d="M14 2.5 24.5 6v6.5c0 6.4-4.4 10.4-10.5 13C7.9 22.9 3.5 18.9 3.5 12.5V6z" />
      <path d="M14 7.5v11M9 12h10" />
    </svg>
  );
}

export function ArrowRightIcon(p: IconProps) {
  return (
    <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M4 10h11M10.5 5.5 15 10l-4.5 4.5" />
    </svg>
  );
}

export const NAV_ICON: Record<RouteId, (p: IconProps) => ReactElement> = {
  home: HomeIcon,
  guides: BookIcon,
  quests: ScrollIcon,
  tasks: TasksIcon,
  "calc-level": CalculatorIcon,
  "calc-skill": CalculatorIcon,
  "calc-magic": CalculatorIcon,
  "calc-death": CalculatorIcon,
  "calc-exercise": CalculatorIcon,
  "calc-lootsplit": CalculatorIcon,
  "calc-hunt": CalculatorIcon,
  "calc-imbue": CalculatorIcon,
};

/* ---- Figuras das vocações (medalhões) ---- */

function KnightFigure(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M12 3c-3.9 0-6.6 2.8-6.6 6.6V16c0 1.4 1.1 2.5 2.5 2.5h1.4V15h5.4v3.5H16c1.4 0 2.5-1.1 2.5-2.5V9.6C18.5 5.8 15.9 3 12 3z" />
      <path
        d="M8.6 9.4h6.8c.4 0 .6.4.4.7l-.8 1.2c-.2.3-.5.4-.8.4H9.8c-.3 0-.6-.1-.8-.4l-.8-1.2c-.2-.3 0-.7.4-.7z"
        fill="#241a10"
      />
    </svg>
  );
}

function PaladinFigure(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.1} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M7.5 4C11.6 7 11.6 17 7.5 20" />
      <path d="M7.5 4 19 12 7.5 20" />
      <path d="M4 12h13" />
    </svg>
  );
}

function SorcererFigure(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M12 2.6 6.5 15h11z" />
      <rect x="4.8" y="14.8" width="14.4" height="3.4" rx="1.3" />
      <path
        d="m12 6 .8 1.9 2 .2-1.5 1.3.5 2L12 11.4l-1.7 1.2.5-2-1.5-1.3 2-.2z"
        fill="#241a10"
      />
    </svg>
  );
}

function DruidFigure(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="13" r="3.1" fill="currentColor" stroke="none" />
      <path d="M9 20a3 3 0 0 1 6 0z" fill="currentColor" stroke="none" />
      <path d="M9 11C7.2 9.7 6.2 7.3 6.4 4.8M9 11c-.5-1.5-1.7-2.3-3.1-2.4M15 11c1.8-1.3 2.8-3.7 2.6-6.2M15 11c.5-1.5 1.7-2.3 3.1-2.4" />
    </svg>
  );
}

function MonkFigure(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M8.2 10.2V7.6a1.5 1.5 0 0 1 3 0v2.2h.6V6a1.5 1.5 0 0 1 3 0v3.8h.6V8a1.5 1.5 0 0 1 3 0v5.4a5.6 5.6 0 0 1-11.2 0v-2.2a1.5 1.5 0 0 1 3 0v-.8z" />
      <path d="M6.6 12.4 4.9 10.9a1.4 1.4 0 0 0-1.9 2l2.1 2z" />
    </svg>
  );
}

export const VOCATION_FIGURE: Record<VocationId, (p: IconProps) => ReactElement> = {
  knight: KnightFigure,
  paladin: PaladinFigure,
  sorcerer: SorcererFigure,
  druid: DruidFigure,
  monk: MonkFigure,
};
