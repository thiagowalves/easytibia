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
  Toggle,
} from "../../components/ui";
import { deathPenalty } from "../../lib/tibia/death";
import {
  allCommonBlessingsCost,
  allImprovedBlessingsCost,
  commonBlessingPrice,
} from "../../lib/tibia/blessings";
import { fmtInt, parseNumber } from "../../lib/format";

const BLESS_OPTIONS = [0, 1, 2, 3, 4, 5, 6, 7];
const REFERENCE_BLESS = [0, 1, 2, 3, 5, 7];

export function DeathCalculator() {
  const [level, setLevel] = useState("40");
  const [currentExp, setCurrentExp] = useState("");
  const [blessings, setBlessings] = useState("0");
  const [promoted, setPromoted] = useState(false);

  const lvlNum = Math.max(1, Math.floor(parseNumber(level) || 0));
  const expNum = parseNumber(currentExp);
  const hasExp = Number.isFinite(expNum);
  const blessNum = Math.floor(parseNumber(blessings) || 0);

  const now = useMemo(
    () =>
      deathPenalty({
        level: lvlNum,
        currentExp: hasExp ? expNum : undefined,
        blessings: blessNum,
        promoted,
      }),
    [lvlNum, expNum, hasExp, blessNum, promoted],
  );

  const withFive = useMemo(
    () =>
      deathPenalty({
        level: lvlNum,
        currentExp: hasExp ? expNum : undefined,
        blessings: Math.max(5, blessNum),
        promoted,
      }),
    [lvlNum, expNum, hasExp, blessNum, promoted],
  );

  const priceEach = commonBlessingPrice(lvlNum);
  const fiveCost = allCommonBlessingsCost(lvlNum);
  const improvedCost = allImprovedBlessingsCost(lvlNum);
  const saved = Math.max(0, now.actualLoss - withFive.actualLoss);

  return (
    <Page crumb={<Crumb path="Calculadoras" current="Bênçãos & Morte" />}>
      <PageTitle>Bênçãos & Morte</PageTitle>
      <div className="mt-1.5">
        <PageSub>
          Quanto você perde se morrer agora — e quanto custa se proteger com bênçãos no seu nível.
        </PageSub>
      </div>

      <CalcNav />

      <div className="grid grid-cols-[minmax(0,416px)_minmax(0,1fr)] items-start gap-[22px]">
        <Card className="flex flex-col gap-[15px] p-5">
          <Field label="Nível">
            <TextInput value={level} onChange={setLevel} />
          </Field>
          <Field label="XP atual" hint="(opcional)">
            <TextInput value={currentExp} onChange={setCurrentExp} mono />
          </Field>
          <Field label="Bênçãos que você tem">
            <select
              className="field-input"
              value={blessings}
              onChange={(e) => setBlessings(e.currentTarget.value)}
            >
              {BLESS_OPTIONS.map((v) => (
                <option key={v} value={v}>
                  {v} {v >= 6 ? "(inclui melhoradas)" : ""}
                </option>
              ))}
            </select>
          </Field>
          <Toggle
            checked={promoted}
            onChange={setPromoted}
            title="Conta promovida (Premium)"
            description="Promoção reduz a perda de morte em mais 30%"
          />
          <p className="mt-0.5 text-[11px] leading-relaxed text-ink-faint">
            Até o nível 23 a perda é 10% de tudo. Do 24 em diante segue a fórmula oficial. As 2
            bênçãos melhoradas (6ª e 7ª) exigem Premium.
          </p>
        </Card>

        <div className="flex flex-col gap-[22px]">
          <Card className="p-[22px]">
            <SectionCap tone="ink">Se você morrer agora (nível {lvlNum})</SectionCap>
            <ResultBig value={fmtInt(now.actualLoss)} unit="XP perdida" />

            <ResultRow first label="Perda base (sem proteção)" value={fmtInt(now.baseLoss)} />
            <ResultRow
              label={`Redução (${blessNum} bênção${blessNum === 1 ? "" : "s"}${promoted ? " + promoção" : ""})`}
              value={`−${Math.round(now.reduction * 100)}%`}
              tone="positive"
            />
            <ResultRow
              label="Nível depois da morte"
              value={now.levelAfter}
              tone={now.levelAfter < lvlNum ? "default" : "muted"}
            />
            <ResultRow label="Chance de perder a mochila" value={`${now.itemLoss.container}%`} />
            <ResultRow
              label="Chance de perder cada equipamento"
              value={`${now.itemLoss.equipment}%`}
            />

            {saved > 0 && (
              <p className="mt-3.5 flex gap-2 rounded-[3px] border border-[#bb8a3c] border-l-4 border-l-seal bg-[#efe1bc] px-3 py-2 text-[11.5px] leading-relaxed text-[#4a3a22]">
                Com 5 bênçãos você perderia {fmtInt(withFive.actualLoss)} de XP nesta morte —{" "}
                {fmtInt(saved)} a menos do que agora.
              </p>
            )}
          </Card>

          <Card className="p-[22px]">
            <SectionCap tone="ink">Custo para se proteger (nível {lvlNum})</SectionCap>
            <ResultRow first label="Preço por bênção comum" value={`${fmtInt(priceEach)} gp`} />
            <ResultRow
              label="5 bênçãos comuns"
              value={`${fmtInt(fiveCost)} gp`}
              tone="positive"
            />
            <ResultRow
              label="+ 2 melhoradas (Premium)"
              value={`${fmtInt(improvedCost)} gp`}
              tone="muted"
            />
            <ResultRow
              label="Total das 7"
              value={`${fmtInt(fiveCost + improvedCost)} gp`}
            />
            <p className="mt-3 text-[11px] leading-relaxed text-ink-faint">
              Cada bênção comum é vendida numa cidade diferente — veja o capítulo “Chegada ao
              continente”. Abaixo do nível 24, a Pilgrimage of Ashes Quest deixa tudo mais barato.
            </p>
          </Card>
        </div>
      </div>

      <Card className="mt-1 p-[16px_18px]">
        <SectionCap tone="ink" className="mb-2.5">
          Perda nesta morte por número de bênçãos
        </SectionCap>
        <table className="w-full border-collapse text-[12.5px]">
          <thead>
            <tr className="text-ink-faint">
              {["Bênçãos", "Redução", "XP perdida", "Mochila", "Equipamento"].map((h) => (
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
            {REFERENCE_BLESS.map((b) => {
              const r = deathPenalty({
                level: lvlNum,
                currentExp: hasExp ? expNum : undefined,
                blessings: b,
                promoted,
              });
              return (
                <tr key={b} className={b === blessNum ? "bg-[rgba(90,66,33,0.09)]" : ""}>
                  <td className="border-b border-parch-line py-[9px] pl-0.5 pr-2.5 text-ink">{b}</td>
                  <td className="border-b border-parch-line px-2.5 py-[9px] font-mono text-ink">
                    −{Math.round(r.reduction * 100)}%
                  </td>
                  <td className="border-b border-parch-line px-2.5 py-[9px] font-mono text-ink">
                    {fmtInt(r.actualLoss)}
                  </td>
                  <td className="border-b border-parch-line px-2.5 py-[9px] font-mono text-ink">
                    {r.itemLoss.container}%
                  </td>
                  <td className="border-b border-parch-line px-2.5 py-[9px] font-mono text-ink">
                    {r.itemLoss.equipment}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </Page>
  );
}
