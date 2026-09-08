import { NAV_ICON, ShieldIcon } from "./icons";
import { useRouter, type RouteId } from "../state/router";

const NAV: { id: RouteId; label: string }[] = [
  { id: "home", label: "Início" },
  { id: "guides", label: "Guia do Novato" },
  { id: "quests", label: "Quests" },
  { id: "tasks", label: "Tasks" },
  { id: "hunts", label: "Hunts" },
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
    <aside className="tibia-bezel m-[18px_0_22px_20px] flex w-[236px] shrink-0 flex-col p-[18px_14px_16px]">
      <div className="flex items-center gap-[11px] border-b border-[#3a2a17] px-1 pb-[16px] pt-1">
        <span className="flex h-[34px] w-[34px] items-center justify-center rounded-[6px] border border-[#5a4023] bg-[radial-gradient(circle_at_36%_30%,#e6b45c,#8a5e26)] text-[#2a1d0e] shadow-[inset_0_1px_1px_rgba(255,240,200,0.6)]">
          <ShieldIcon />
        </span>
        <span className="font-display text-[21px] font-semibold leading-[0.98] tracking-[0.4px] text-cream [text-shadow:0_1px_0_rgba(0,0,0,0.5)]">
          Easy
          <br />
          Tibia
        </span>
      </div>

      <div className="px-[10px] pb-2 pt-3.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-cream-faint">
        Navegar
      </div>

      <nav className="flex flex-col gap-1">
        {NAV.map((item) => {
          const Icon = NAV_ICON[item.id];
          const active = isActive(route, item.id);
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.id)}
              className={
                "flex items-center gap-[11px] rounded-[4px] border border-l-2 px-[11px] py-[9px] text-left text-[13.5px] font-medium transition-all " +
                (active
                  ? "border-[#7a5a2e] border-l-brass-hi bg-[linear-gradient(180deg,rgba(224,169,74,0.22),rgba(224,138,60,0.1))] text-[#f6e4b6] shadow-[inset_0_0_12px_rgba(224,169,74,0.18),0_1px_0_rgba(0,0,0,0.35)] [&_svg]:text-brass-hi"
                  : "border-transparent text-cream-dim hover:bg-[rgba(224,138,60,0.08)] hover:text-cream")
              }
            >
              <Icon />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-2.5 pt-4">
        <div className="parch-card p-3 text-[12px] leading-[1.5] text-ink-dim">
          <b className="mb-[3px] block font-bold text-ink">Primeira vez em Tibia?</b>
          Comece pelo Guia do Novato — do zero ao nível 50.
        </div>
        <div className="flex items-center justify-between px-1 text-[10px] uppercase tracking-[0.14em] text-cream-faint">
          <span>EasyTibia</span>
          <span className="rounded-[3px] border border-[#5a4023] bg-[rgba(224,169,74,0.14)] px-[5px] py-px text-brass-hi">
            beta 0.1
          </span>
        </div>
      </div>
    </aside>
  );
}
