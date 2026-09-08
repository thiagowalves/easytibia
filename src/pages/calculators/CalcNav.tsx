import { useRouter, type RouteId } from "../../state/router";

const TABS: { id: RouteId; label: string }[] = [
  { id: "calc-level", label: "Nível" },
  { id: "calc-skill", label: "Skill" },
  { id: "calc-magic", label: "Magic Level" },
  { id: "calc-death", label: "Bênçãos & Morte" },
  { id: "calc-exercise", label: "Exercise Weapons" },
  { id: "calc-lootsplit", label: "Loot Split" },
  { id: "calc-hunt", label: "Análise de Hunt" },
  { id: "calc-imbue", label: "Imbuements" },
];

/** Abas para alternar entre as três calculadoras. */
export function CalcNav() {
  const { route, navigate } = useRouter();
  return (
    <div className="mb-5 mt-4 flex gap-1.5">
      {TABS.map((t) => {
        const active = route === t.id;
        return (
          <button
            key={t.id}
            onClick={() => navigate(t.id)}
            className={
              "rounded-[3px] border px-3.5 py-1.5 text-[12.5px] font-medium transition-colors " +
              (active
                ? "border-brass bg-[rgba(224,138,60,0.16)] text-[#f2dcab]"
                : "border-oak-line text-cream-dim hover:border-[#5c4630] hover:text-cream")
            }
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
