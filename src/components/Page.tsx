import type { ReactNode } from "react";
import { Topbar } from "./Topbar";

/** Estrutura de uma tela: barra superior + painel de carvalho com o conteúdo. */
export function Page({ crumb, children }: { crumb: ReactNode; children: ReactNode }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <Topbar crumb={crumb} />
      <div className="brass-corners tibia-bezel relative m-[16px_22px_22px] flex-1 overflow-y-auto p-[24px_26px_28px]">
        {children}
      </div>
    </div>
  );
}
