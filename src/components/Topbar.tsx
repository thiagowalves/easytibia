import type { ReactNode } from "react";
import { VocationPicker } from "./VocationPicker";

/** Barra superior: trilha de navegação à esquerda, seletor de vocação à direita. */
export function Topbar({ crumb }: { crumb: ReactNode }) {
  return (
    <header className="m-[18px_22px_0] flex h-[58px] shrink-0 items-center justify-between rounded-[5px] border-2 border-oak-line bg-[linear-gradient(180deg,#2f2216,#241a0f)] px-5">
      <div className="font-display text-[14px] tracking-[0.3px] text-cream-dim">{crumb}</div>
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
