import type { ReactNode } from "react";
import { VocationPicker } from "./VocationPicker";

/** Barra superior: trilha de navegação à esquerda, seletor de vocação à direita. */
export function Topbar({ crumb }: { crumb: ReactNode }) {
  return (
    <header className="tibia-bezel m-[18px_22px_0] flex h-[58px] shrink-0 items-center justify-between px-5">
      <div className="font-display text-[14.5px] tracking-[0.3px] text-cream-dim [text-shadow:0_1px_0_rgba(0,0,0,0.4)]">
        {crumb}
      </div>
      <VocationPicker />
    </header>
  );
}

/** Separador ">" usado dentro da trilha. */
export function Crumb({ path, current }: { path?: string; current: string }) {
  return (
    <>
      {path && <span className="mx-1.5 text-cream-faint">{path} ›</span>}
      <b className="font-semibold text-cream">{current}</b>
    </>
  );
}
