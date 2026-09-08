import { useMemo, useState } from "react";
import { Page } from "../../components/Page";
import { Crumb } from "../../components/Topbar";
import {
  Card,
  Field,
  PageSub,
  PageTitle,
  ProvisionalNote,
  ResultBig,
  ResultRow,
  SectionCap,
  TextInput,
  Toggle,
} from "../../components/ui";
import {
  manaBetweenMagicLevels,
  totalManaForMagicLevel,
} from "../../lib/tibia/skills";
import { fmtDuration, fmtInt, parseNumber } from "../../lib/format";
import { useVocation } from "../../state/vocation";
import type { VocationId } from "../../lib/tibia/vocations";

const STRONG_MANA_POTION = 500;

const TRAINING_SPELLS: Partial<Record<VocationId, { name: string; words: string; mana: string; note: string }[]>> = {
  sorcerer: [
    { name: "Light Healing", words: "exura", mana: "20 mana", note: "A mais barata. Cure-se em loop no lugar seguro." },
    { name: "Find Person", words: "exiva", mana: "20 mana", note: "Sem reagente e cooldown curto — ótima para spam contínuo." },
    { name: "Antidote", words: "exana pox", mana: "30 mana", note: "Alternativa quando a regeneração de mana está sobrando." },
  ],
  druid: [
    { name: "Light Healing", words: "exura", mana: "20 mana", note: "A mais barata. Cure-se em loop no lugar seguro." },
    { name: "Find Person", words: "exiva", mana: "20 mana", note: "Sem reagente e cooldown curto — ótima para spam contínuo." },
    { name: "Antidote", words: "exana pox", mana: "30 mana", note: "Alternativa quando a regeneração de mana está sobrando." },
  ],
  paladin: [
    { name: "Find Person", words: "exiva", mana: "20 mana", note: "Barata e sem reagente." },
    { name: "Light Healing", words: "exura", mana: "20 mana", note: "Cura leve para loop de treino." },
    { name: "Conjure Arrow", words: "exevo con", mana: "100 mana", note: "Aproveita o treino gerando flechas." },
  ],
};

export function MagicCalculator() {
  const { vocation } = useVocation();

  const [current, setCurrent] = useState("30");
  const [progress, setProgress] = useState("45");
  const [target, setTarget] = useState("40");
  const [manaPerHour, setManaPerHour] = useState("180.000");
  const [doubleEvent, setDoubleEvent] = useState(false);

  const factor = vocation.factors.magic;

  const r = useMemo(() => {
    const from = Math.max(0, Math.floor(parseNumber(current) || 0));
    const to = Math.max(0, Math.floor(parseNumber(target) || 0));
    const pct = Math.min(100, Math.max(0, parseNumber(progress) || 0)) / 100;
    const rate = parseNumber(manaPerHour);
    const eventMult = doubleEvent ? 0.5 : 1;

    const totalToTarget = totalManaForMagicLevel(to, factor);
    const totalAtCurrent = totalManaForMagicLevel(from, factor);
    const oneLevel = manaBetweenMagicLevels(from, from + 1, factor);
    const alreadyDone = oneLevel * pct;
    const remaining = Math.max(0, (totalToTarget - totalAtCurrent - alreadyDone) * eventMult);

    const hours = Number.isFinite(rate) && rate > 0 ? remaining / rate : NaN;
    const potions = Math.ceil(remaining / STRONG_MANA_POTION);

    return {
      from,
      to,
      totalToTarget,
      totalAtCurrent,
      alreadyDone,
      remaining,
      hours,
      potions,
      reachable: to > from,
    };
  }, [current, progress, target, manaPerHour, doubleEvent, factor]);

  const spells = TRAINING_SPELLS[vocation.id];

  return (
    <Page crumb={<Crumb path="Calculadoras" current="Magic Level" />}>
      <PageTitle>Calculadora de Magic Level</PageTitle>
      <div className="mt-1.5">
        <PageSub>
          Quanta mana falta gastar para o seu próximo magic level — e o que usar para treinar.
        </PageSub>
      </div>

      <div className="mt-[22px] grid grid-cols-[minmax(0,416px)_minmax(0,1fr)] items-start gap-[22px]">
        <Card className="flex flex-col gap-[15px] p-5">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Magic level atual">
              <TextInput value={current} onChange={setCurrent} />
            </Field>
            <Field label="Progresso" hint="(%)">
              <TextInput value={progress} onChange={setProgress} />
            </Field>
          </div>
          <Field label="Magic level alvo">
            <TextInput value={target} onChange={setTarget} />
          </Field>
          <Field label="Mana por hora" hint="(regen + poções)">
            <TextInput value={manaPerHour} onChange={setManaPerHour} mono />
          </Field>
          <Toggle
            checked={doubleEvent}
            onChange={setDoubleEvent}
            title="Evento de Double Skill ativo"
            description="Reduz a mana necessária pela metade"
          />
          <p className="mt-0.5 text-[11px] leading-relaxed text-ink-faint">
            {vocation.name} usa fator {factor.toLocaleString("pt-BR")}. Trocar a vocação no topo
            recalcula tudo.
          </p>
          {vocation.provisional && (
            <ProvisionalNote>
              O fator de magic level da vocação {vocation.name} ainda não foi confirmado.
            </ProvisionalNote>
          )}
        </Card>

        <Card className="p-[22px]">
          <SectionCap tone="ink">
            Magic level {r.from} → {r.to} · {vocation.name}
          </SectionCap>
          <ResultBig value={fmtInt(r.remaining)} unit="mana" />

          <ResultRow first label={`Mana total para o ML ${r.to}`} value={fmtInt(r.totalToTarget)} />
          <ResultRow label={`Mana já investida (ML ${r.from})`} value={fmtInt(r.totalAtCurrent)} />
          <ResultRow
            label="Progresso atual"
            value={`−${fmtInt(r.alreadyDone)}`}
            tone="muted"
          />
          <ResultRow label="Restante" value={fmtInt(r.remaining)} tone="positive" />

          <div className="my-[18px] h-px bg-parch-line" />
          <SectionCap tone="ink">Estimativa</SectionCap>
          {Number.isFinite(r.hours) ? (
            <ResultRow first label="Tempo de spam" value={fmtDuration(r.hours)} tone="positive" />
          ) : (
            <ResultRow first label="Tempo de spam" value="informe a mana/h" tone="muted" />
          )}
          <ResultRow
            label={`Strong Mana Potions (${STRONG_MANA_POTION})`}
            value={`≈ ${fmtInt(r.potions)}`}
          />

          {!r.reachable && (
            <p className="mt-3.5 text-[12px] text-ink-dim">Defina um ML alvo acima do atual.</p>
          )}
        </Card>
      </div>

      {spells && (
        <Card className="mt-1 p-[16px_18px]">
          <SectionCap tone="ink" className="mb-3">
            Spells baratas para treinar — {vocation.name}
          </SectionCap>
          <div className="grid grid-cols-3 gap-3">
            {spells.map((s) => (
              <div
                key={s.name}
                className="rounded-[3px] border border-parch-line bg-parch-2 p-[13px]"
              >
                <div className="mb-1.5 flex items-baseline gap-2">
                  <b className="text-[13.5px] font-bold text-ink">{s.name}</b>
                  <i className="font-mono text-[11.5px] not-italic text-num">{s.words}</i>
                  <span className="ml-auto whitespace-nowrap text-[10.5px] text-ink-faint">
                    {s.mana}
                  </span>
                </div>
                <p className="m-0 text-[11.5px] leading-[1.5] text-ink-dim">{s.note}</p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </Page>
  );
}
