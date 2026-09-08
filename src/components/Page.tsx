import type { ReactNode } from "react";
import { Topbar } from "./Topbar";

/** Estrutura de uma tela: barra superior + painel de carvalho com o conteúdo. */
export function Page({ crumb, children }: { crumb: ReactNode; children: ReactNode }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <Topbar crumb={crumb} />
      <div className="brass-corners relative m-[16px_22px_22px] flex-1 overflow-y-auto rounded-[5px] border-2 border-oak-line bg-oak p-[24px_26px_28px] shadow-[inset_0_0_70px_rgba(0,0,0,0.55),0_16px_44px_rgba(0,0,0,0.5)]">
        {children}
      </div>
    </div>
  );
}
