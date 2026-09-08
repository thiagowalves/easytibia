import { NAV_ICON, ShieldIcon } from "./icons";
import { useRouter, type RouteId } from "../state/router";

const NAV: { id: RouteId; label: string }[] = [
  { id: "home", label: "Início" },
  { id: "guides", label: "Guia do Novato" },
  { id: "calc-level", label: "Calculadoras" },
];

/** `calc-*` compartilham o mesmo item de menu "Calculadoras". */
function isActive(current: RouteId, item: RouteId): boolean {
  if (item === "calc-level") return current.startsWith("calc-");
  return current === item;
}

export function Sidebar() {
  const { route, navigate } = useRouter();

  return (
    <aside className="m-[18px_0_22px_20px] flex w-[232px] shrink-0 flex-col rounded-[5px] border-2 border-oak-line bg-[linear-gradient(180deg,#2a1e12,#201509)] p-[20px_15px] shadow-[inset_0_1px_0_rgba(255,224,170,0.08),0_10px_30px_rgba(0,0,0,0.45)]">
      <div className="flex items-center gap-[11px] px-1 pb-[18px] pt-1">
        <span className="flex text-brass-hi">
          <ShieldIcon />
        </span>
        <span className="font-display text-[20px] font-semibold leading-[1.02] tracking-[0.4px] text-cream">
          Easy
          <br />
          Tibia
        </span>
      </div>

      <div className="px-[10px] pb-2 pt-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-cream-faint">
        Navegar
      </div>

      <nav className="flex flex-col gap-0.5">
        {NAV.map((item) => {
          const Icon = NAV_ICON[item.id];
          const active = isActive(route, item.id);
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.id)}
              className={
                "flex items-center gap-[11px] rounded-[4px] border-l-2 px-[10px] py-[9px] text-left text-[13.5px] font-medium transition-colors " +
                (active
                  ? "border-l-brass bg-[rgba(224,138,60,0.16)] text-[#f2dcab] [&_svg]:text-brass-hi"
                  : "border-l-transparent text-cream-dim hover:bg-[rgba(224,138,60,0.09)] hover:text-cream")
              }
            >
              <Icon />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto pt-[18px]">
        <div className="rounded-[4px] border border-[#15100a] bg-parch p-3 text-[12px] leading-[1.5] text-ink-dim shadow-[0_2px_5px_rgba(0,0,0,0.35)]">
          <b className="mb-[3px] block font-bold text-ink">Primeira vez em Tibia?</b>
          Comece pela Calculadora de Nível para planejar sua próxima meta.
        </div>
      </div>
    </aside>
  );
}
