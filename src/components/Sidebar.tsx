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
      <div className="flex items-center gap-[11px] px-1 pb-[14px] pt-1">
        <span className="flex h-[34px] w-[34px] items-center justify-center rounded-[6px] border border-[#000] bg-[radial-gradient(circle_at_36%_30%,#2f7a2f,#0b330c)] text-[#eaf3e2] shadow-[inset_0_1px_1px_rgba(180,230,170,0.35),inset_0_0_0_1px_rgba(120,170,110,0.25)]">
          <ShieldIcon />
        </span>
        <span className="font-display text-[21px] font-semibold leading-[0.98] tracking-[0.4px] text-cream [text-shadow:0_1px_0_rgba(0,0,0,0.5)]">
          Easy
          <br />
          Tibia
        </span>
      </div>

      <div className="tibia-titlebar rounded-b-none text-[10px] font-bold uppercase tracking-[0.16em] text-[#e6dfc4]">
        Navegar
      </div>

      <nav className="flex flex-col gap-0.5 border border-t-0 border-[#000] bg-[rgba(10,20,10,0.35)] p-1.5">
        {NAV.map((item) => {
          const Icon = NAV_ICON[item.id];
          const active = isActive(route, item.id);
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.id)}
              className={
                "flex items-center gap-[11px] rounded-[3px] border px-[11px] py-[9px] text-left text-[13.5px] font-medium transition-all " +
                (active
                  ? "border-[#000] bg-[linear-gradient(180deg,#2a6b2a,#123f12)] text-[#f4ecd2] shadow-[inset_0_1px_0_rgba(180,230,170,0.25),inset_0_-6px_10px_rgba(0,0,0,0.25)] [&_svg]:text-brass-hi"
                  : "border-transparent text-cream-dim hover:bg-[rgba(47,122,47,0.16)] hover:text-cream")
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
          <span className="rounded-[3px] border border-[#000] bg-[rgba(47,122,47,0.3)] px-[5px] py-px text-brass-hi">
            beta 0.1
          </span>
        </div>
      </div>
    </aside>
  );
}
