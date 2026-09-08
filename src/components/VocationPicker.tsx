import { VOCATION_LIST } from "../lib/tibia/vocations";
import { useVocation } from "../state/vocation";
import { VOCATION_FIGURE } from "./icons";

export function VocationPicker() {
  const { vocationId, vocation, setVocation } = useVocation();

  return (
    <div className="flex items-center gap-2.5">
      <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-cream-faint">
        Vocação
      </span>

      <div className="flex gap-[7px]">
        {VOCATION_LIST.map((v) => {
          const Figure = VOCATION_FIGURE[v.id];
          const active = v.id === vocationId;
          return (
            <button
              key={v.id}
              type="button"
              title={v.name}
              onClick={() => setVocation(v.id)}
              className={
                "flex h-9 w-9 items-center justify-center rounded-full border-2 bg-[radial-gradient(circle_at_36%_30%,#6a4d2f,#2b2013)] transition-shadow [&_svg]:h-[21px] [&_svg]:w-[21px] " +
                (active
                  ? "border-brass text-[#f6e9c8] shadow-[0_0_0_2px_rgba(194,137,43,0.4),0_0_15px_rgba(224,138,60,0.45),inset_0_1px_1px_rgba(255,224,170,0.22)]"
                  : "border-[#17100a] text-[#c9b489] shadow-[inset_0_1px_1px_rgba(255,224,170,0.18),0_2px_3px_rgba(0,0,0,0.45)] hover:text-[#efe0bd]")
              }
            >
              <Figure />
            </button>
          );
        })}
      </div>

      <span className="pl-0.5 font-display text-[15px] tracking-[0.3px] text-brass-hi">
        {vocation.name}
      </span>
    </div>
  );
}
