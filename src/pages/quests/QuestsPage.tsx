import { useMemo, useState } from "react";
import { Page } from "../../components/Page";
import { Crumb } from "../../components/Topbar";
import { Field, PageSub, PageTitle, TextInput, Toggle } from "../../components/ui";
import { QUESTS, type Quest } from "../../lib/tibia/quests";
import { parseNumber } from "../../lib/format";

const WIKI = "https://www.tibiawiki.com.br/wiki/";

export function QuestsPage() {
  const [level, setLevel] = useState("");
  const [freeOnly, setFreeOnly] = useState(false);
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    const lvl = parseNumber(level);
    const hasLvl = Number.isFinite(lvl);
    const term = q.trim().toLowerCase();
    return QUESTS.filter((quest) => {
      if (hasLvl && quest.minLevel > lvl) return false;
      if (freeOnly && quest.premium) return false;
      if (
        term &&
        !quest.name.toLowerCase().includes(term) &&
        !quest.region.toLowerCase().includes(term) &&
        !quest.reward.toLowerCase().includes(term)
      )
        return false;
      return true;
    }).sort((a, b) => a.minLevel - b.minLevel || a.name.localeCompare(b.name));
  }, [level, freeOnly, q]);

  return (
    <Page crumb={<Crumb current="Quests" />}>
      <PageTitle>Quests que valem a pena</PageTitle>
      <div className="mt-1.5">
        <PageSub>
          Uma seleção de quests boas para os primeiros níveis. Filtre pelo seu nível e abra o passo a
          passo na TibiaWiki.
        </PageSub>
      </div>

      <div className="mb-5 mt-[22px] grid grid-cols-[160px_minmax(0,1fr)_auto] items-end gap-4">
        <Field label="Meu nível" hint="(opcional)">
          <TextInput value={level} onChange={setLevel} />
        </Field>
        <Field label="Buscar" hint="(nome, região, recompensa)">
          <TextInput value={q} onChange={setQ} inputMode="text" />
        </Field>
        <Toggle checked={freeOnly} onChange={setFreeOnly} title="Só free account" />
      </div>

      <div className="overflow-x-auto rounded-[4px] border border-[#15100a] bg-parch p-[6px_18px_14px] shadow-[0_2px_6px_rgba(0,0,0,0.4)]">
        <table className="w-full border-collapse text-[12.5px]">
          <thead>
            <tr className="text-ink-faint">
              {["Quest", "Nível", "Região", "Recompensa", ""].map((h) => (
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
            {list.map((quest) => (
              <QuestRow key={quest.name} quest={quest} />
            ))}
            {list.length === 0 && (
              <tr>
                <td colSpan={5} className="py-6 text-center text-[12px] text-ink-dim">
                  Nenhuma quest com esses filtros.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-[11px] text-ink-faint">
        {list.length} de {QUESTS.length} quests · dados da{" "}
        <a
          href="https://www.tibiawiki.com.br/wiki/Quests"
          target="_blank"
          rel="noreferrer"
          className="text-num underline decoration-dotted underline-offset-2 hover:text-seal"
        >
          TibiaWiki BR
        </a>
      </p>
    </Page>
  );
}

function QuestRow({ quest }: { quest: Quest }) {
  return (
    <tr className="align-top hover:bg-[rgba(90,66,33,0.06)]">
      <td className="border-b border-parch-line py-[10px] pl-0.5 pr-2.5">
        <b className="font-semibold text-ink">{quest.name}</b>
        {quest.premium && (
          <span className="ml-1.5 rounded-[3px] border border-[#b7a071] px-[4px] py-px text-[9px] text-ink-faint">
            Premium
          </span>
        )}
        {quest.note && (
          <span className="mt-0.5 block text-[11px] leading-[1.4] text-ink-dim">{quest.note}</span>
        )}
      </td>
      <td className="border-b border-parch-line px-2.5 py-[10px] font-mono text-ink">
        {quest.minLevel === 0 ? "—" : quest.minLevel}
      </td>
      <td className="border-b border-parch-line px-2.5 py-[10px] text-ink-dim">{quest.region}</td>
      <td className="border-b border-parch-line px-2.5 py-[10px] leading-[1.45] text-ink-dim">
        {quest.reward}
      </td>
      <td className="border-b border-parch-line px-2.5 py-[10px] whitespace-nowrap">
        <a
          href={WIKI + quest.wikiSlug}
          target="_blank"
          rel="noreferrer"
          className="text-[11px] text-num underline decoration-dotted underline-offset-2 hover:text-seal"
        >
          wiki ↗
        </a>
      </td>
    </tr>
  );
}
