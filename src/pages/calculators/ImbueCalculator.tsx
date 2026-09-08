import { useMemo, useState } from "react";
import { Page } from "../../components/Page";
import { Crumb } from "../../components/Topbar";
import { CalcNav } from "./CalcNav";
import {
  Card,
  Field,
  PageSub,
  PageTitle,
  ResultBig,
  ResultRow,
  SectionCap,
  TextInput,
} from "../../components/ui";
import {
  IMBUEMENTS,
  IMBUE_HOURS,
  IMBUE_TIER_LABEL,
  feeFor,
  materialsFor,
  type ImbueTier,
} from "../../lib/tibia/imbuements";
import { fmtDuration, fmtInt, parseNumber } from "../../lib/format";

const TIERS: ImbueTier[] = ["basic", "intricate", "powerful"];

export function ImbueCalculator() {
  const [name, setName] = useState("Vampirism");
  const [tier, setTier] = useState<ImbueTier>("powerful");
  const [count, setCount] = useState("1");

  const imbue = IMBUEMENTS.find((i) => i.name === name) ?? IMBUEMENTS[0];
  const qty = Math.max(1, Math.floor(parseNumber(count) || 1));

  const r = useMemo(() => {
    const mats = materialsFor(imbue, tier).map((m) => ({
      item: m.item,
      qty: m.qty * qty,
    }));
    const fee = feeFor(tier) * qty;
    const hours = IMBUE_HOURS * qty;
    return { mats, fee, hours, feePerHour: feeFor(tier) / IMBUE_HOURS };
  }, [imbue, tier, qty]);

  return (
    <Page crumb={<Crumb path="Calculadoras" current="Imbuements" />}>
      <PageTitle>Imbuements</PageTitle>
      <div className="mt-1.5">
        <PageSub>
          Materiais e taxa em gold para cada encantamento e nível. Um nível exige os materiais dos
          anteriores mais os novos.
        </PageSub>
      </div>

      <CalcNav />

      <div className="grid grid-cols-[minmax(0,416px)_minmax(0,1fr)] items-start gap-[22px]">
        <Card className="flex flex-col gap-[15px] p-5">
          <Field label="Encantamento">
            <select
              className="field-input"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            >
              {(["Skill", "Dano", "Proteção", "Suporte"] as const).map((cat) => (
                <optgroup key={cat} label={cat}>
                  {IMBUEMENTS.filter((i) => i.category === cat).map((i) => (
                    <option key={i.name} value={i.name}>
                      {i.name} — {i.effect}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </Field>

          <Field label="Nível">
            <select
              className="field-input"
              value={tier}
              onChange={(e) => setTier(e.currentTarget.value as ImbueTier)}
            >
              {TIERS.map((t) => (
                <option key={t} value={t}>
                  {IMBUE_TIER_LABEL[t]}
                  {t !== "basic" ? " (Premium)" : ""}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Quantas vezes" hint="(imbues a planejar)">
            <TextInput value={count} onChange={setCount} />
          </Field>

          <p className="mt-0.5 text-[11px] leading-relaxed text-ink-faint">
            Duração de 20 h por imbue, contando só com o item equipado e fora de PZ. Desde o Update de
            Verão 2025 o sucesso é garantido.
          </p>
        </Card>

        <div className="flex flex-col gap-[22px]">
          <Card className="p-[22px]">
            <SectionCap tone="ink">
              {imbue.name} {IMBUE_TIER_LABEL[tier]} · {imbue.effect}
            </SectionCap>
            <ResultBig value={`${fmtInt(r.fee)}`} unit="gp de taxa" />
            <ResultRow first label="Duração total" value={fmtDuration(r.hours)} />
            <ResultRow
              label="Custo da taxa por hora"
              value={`${fmtInt(r.feePerHour)} gp/h`}
              tone="muted"
            />
            <p className="mt-3 text-[11px] leading-relaxed text-ink-faint">
              A taxa é fixa. Os materiais você consegue como drop, comprando no Market, ou (só para
              Strike, Vampirism e Void) trocando Gold Tokens com a NPC Yana.
            </p>
          </Card>

          <Card className="p-[16px_18px]">
            <SectionCap tone="ink" className="mb-2.5">
              Materiais {qty > 1 ? `(× ${qty})` : ""}
            </SectionCap>
            <table className="w-full border-collapse text-[12.5px]">
              <thead>
                <tr className="text-ink-faint">
                  {["Qtd.", "Item"].map((h) => (
                    <th
                      key={h}
                      className="border-b-2 border-[#c6b489] px-2.5 py-[9px] text-left text-[10px] font-bold uppercase tracking-[0.08em] first:pl-0.5"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {r.mats.map((m) => (
                  <tr key={m.item} className="hover:bg-[rgba(90,66,33,0.06)]">
                    <td className="w-16 border-b border-parch-line py-[9px] pl-0.5 pr-2.5 font-mono text-ink">
                      {fmtInt(m.qty)}
                    </td>
                    <td className="border-b border-parch-line px-2.5 py-[9px] text-ink">{m.item}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      </div>
    </Page>
  );
}
