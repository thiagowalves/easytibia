import { useMemo, useState } from "react";
import { Page } from "../../components/Page";
import { Crumb } from "../../components/Topbar";
import { Field, PageSub, PageTitle, TextInput } from "../../components/ui";
import { HUNT_SPOTS, VOC_LABEL, type Voc } from "../../lib/tibia/hunts";
import { parseNumber } from "../../lib/format";

const VOCS: Voc[] = ["K", "P", "S", "D", "M"];

export function HuntsPage() {
  const [level, setLevel] = useState("");
  const [voc, setVoc] = useState<Voc | "">("");

  const list = useMemo(() => {
    const lvl = parseNumber(level);
    const hasLvl = Number.isFinite(lvl);
    return HUNT_SPOTS.filter((s) => {
      if (hasLvl && (lvl < s.level[0] || lvl > s.level[1])) return false;
      if (voc && s.voc.length > 0 && !s.voc.includes(voc)) return false;
      return true;
    }).sort((a, b) => a.level[0] - b.level[0]);
  }, [level, voc]);

  return (
    <Page crumb={<Crumb current="Hunts" />}>
      <PageTitle>Melhores hunts por nível</PageTitle>
      <div className="mt-1.5">
        <PageSub>
          Spots clássicos por faixa, com XP/h e lucro/h aproximados. Filtre pelo seu nível e vocação.
        </PageSub>
      </div>

      <div className="mb-4 mt-[22px] flex flex-wrap items-end gap-4">
        <Field label="Meu nível" hint="(opcional)">
          <TextInput value={level} onChange={setLevel} />
        </Field>
        <Field label="Vocação">
          <select
            className="field-input"
            value={voc}
            onChange={(e) => setVoc(e.currentTarget.value as Voc | "")}
          >
            <option value="">Todas</option>
            {VOCS.map((v) => (
              <option key={v} value={v}>
                {VOC_LABEL[v]}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <p className="mb-4 flex gap-2 rounded-[3px] border border-[#bb8a3c] border-l-4 border-l-seal bg-[#efe1bc] px-3 py-2 text-[11.5px] leading-relaxed text-[#4a3a22]">
        Os números são aproximados e mudam muito com skills, equipamento e o mercado do seu mundo.
        Use como ponto de partida e confirme na aba de análise do cliente. "kk" = milhão.
      </p>

      <div className="overflow-x-auto rounded-[4px] border border-[#15100a] bg-parch p-[6px_18px_14px] shadow-[0_2px_6px_rgba(0,0,0,0.4)]">
        <table className="w-full border-collapse text-[12.5px]">
          <thead>
            <tr className="text-ink-faint">
              {["Spot", "Nível", "Vocação", "XP/h", "Lucro/h"].map((h) => (
                <th
                  key={h}
                  className="border-b-2 border-[#c6b489] px-2.5 py-[10px] text-left text-[10px] font-bold uppercase tracking-[0.08em] first:pl-0.5"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {list.map((s) => (
              <tr key={s.name} className="align-top hover:bg-[rgba(90,66,33,0.06)]">
                <td className="border-b border-parch-line py-[10px] pl-0.5 pr-2.5">
                  <b className="font-semibold text-ink">{s.name}</b>
                  <span className="block text-[11px] text-ink-faint">{s.region}</span>
                  {s.note && (
                    <span className="mt-0.5 block text-[11px] leading-[1.4] text-ink-dim">
                      {s.note}
                    </span>
                  )}
                </td>
                <td className="border-b border-parch-line px-2.5 py-[10px] font-mono text-ink">
                  {s.level[0]}–{s.level[1]}
                </td>
                <td className="border-b border-parch-line px-2.5 py-[10px] text-ink-dim">
                  {s.voc.length === 0 ? "Todas" : s.voc.join(" ")}
                </td>
                <td className="border-b border-parch-line px-2.5 py-[10px] font-mono text-ink">
                  {s.xph}
                </td>
                <td className="border-b border-parch-line px-2.5 py-[10px] font-mono text-herb">
                  {s.profith}
                </td>
              </tr>
            ))}
            {list.length === 0 && (
              <tr>
                <td colSpan={5} className="py-6 text-center text-[12px] text-ink-dim">
                  Nenhum spot com esses filtros.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-2 text-[11px] text-ink-faint">
        Para dados ao vivo por vocação e mundo, veja o{" "}
        <a
          href="https://www.tibiabuddy.com/tools/hunt-finder"
          target="_blank"
          rel="noreferrer"
          className="text-num underline decoration-dotted underline-offset-2 hover:text-seal"
        >
          Hunt Finder do TibiaBuddy
        </a>{" "}
        ou o{" "}
        <a
          href="https://tibiavault.com/hunting-spots/"
          target="_blank"
          rel="noreferrer"
          className="text-num underline decoration-dotted underline-offset-2 hover:text-seal"
        >
          guia do TibiaVault
        </a>
        .
      </p>
    </Page>
  );
}
