import { useMemo, useState } from "react";
import { Page } from "../../components/Page";
import { Crumb } from "../../components/Topbar";
import { CalcNav } from "./CalcNav";
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
import { WEAPON_SKILLS, type SkillKind } from "../../lib/tibia/vocations";
import { manaBetweenMagicLevels, weaponTriesBetween } from "../../lib/tibia/skills";
import { fmtDuration, fmtInt, parseNumber } from "../../lib/format";
import { useVocation } from "../../state/vocation";

const EXERCISE_DUMMY_BONUS = 0.1; // dummy do QG dá +10%
const EXERCISE_WEAPON_CHARGES = 500;
const SECONDS_PER_HIT = 2;
const LOYALTY_OPTIONS = [0, 1, 2, 3, 4, 5];

export function SkillCalculator() {
  const { vocation } = useVocation();

  const [kind, setKind] = useState<SkillKind>("sword");
  const [current, setCurrent] = useState("70");
  const [progress, setProgress] = useState("30");
  const [target, setTarget] = useState("80");
  const [loyalty, setLoyalty] = useState("5");
  const [activeRate, setActiveRate] = useState("1.900");
  const [dummyBonus, setDummyBonus] = useState(true);

  const isMagic = kind === "magic";
  const factor = vocation.factors[kind];
  const skillLabel = WEAPON_SKILLS.find((s) => s.id === kind)?.label ?? kind;

  const r = useMemo(() => {
    const from = Math.max(0, Math.floor(parseNumber(current) || 0));
    const to = Math.max(0, Math.floor(parseNumber(target) || 0));
    const pct = Math.min(100, Math.max(0, parseNumber(progress) || 0)) / 100;
    const loyaltyMult = 1 + (parseNumber(loyalty) || 0) / 100;
    const rate = parseNumber(activeRate);

    const totalUnits = isMagic
      ? manaBetweenMagicLevels(from, to, factor)
      : weaponTriesBetween(from, to, factor, { shielding: kind === "shielding" });

    const oneLevel = isMagic
      ? manaBetweenMagicLevels(from, from + 1, factor)
      : weaponTriesBetween(from, from + 1, factor, { shielding: kind === "shielding" });

    const alreadyDone = oneLevel * pct;
    const remaining = Math.max(0, (totalUnits - alreadyDone) / loyaltyMult);

    const dummyHours = isMagic
      ? NaN
      : (remaining * SECONDS_PER_HIT) / (dummyBonus ? 1 + EXERCISE_DUMMY_BONUS : 1) / 3600;
    const activeHours = Number.isFinite(rate) && rate > 0 ? remaining / rate : NaN;
    const exerciseWeapons = Math.ceil(remaining / EXERCISE_WEAPON_CHARGES);

    return {
      from,
      to,
      totalUnits,
      alreadyDone,
      remaining,
      dummyHours,
      activeHours,
      exerciseWeapons,
      reachable: to > from,
    };
  }, [current, progress, target, loyalty, activeRate, dummyBonus, factor, isMagic, kind]);

  const unit = isMagic ? "mana" : "acertos";

  return (
    <Page crumb={<Crumb path="Calculadoras" current="Skill" />}>
      <PageTitle>Calculadora de Skill</PageTitle>
      <div className="mt-1.5">
        <PageSub>
          Quantos acertos faltam para a sua meta de habilidade — treinando ativo ou no boneco.
        </PageSub>
      </div>

      <CalcNav />

      <div className="grid grid-cols-[minmax(0,416px)_minmax(0,1fr)] items-start gap-[22px]">
        <Card className="flex flex-col gap-[15px] p-5">
          <Field label="Habilidade">
            <select
              className="field-input"
              value={kind}
              onChange={(e) => setKind(e.currentTarget.value as SkillKind)}
            >
              {WEAPON_SKILLS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Skill atual">
              <TextInput value={current} onChange={setCurrent} />
            </Field>
            <Field label="Progresso" hint="(%)">
              <TextInput value={progress} onChange={setProgress} />
            </Field>
          </div>

          <Field label="Skill alvo">
            <TextInput value={target} onChange={setTarget} />
          </Field>

          <Field label="Bônus de Loyalty" hint="(%)">
            <select
              className="field-input"
              value={loyalty}
              onChange={(e) => setLoyalty(e.currentTarget.value)}
            >
              {LOYALTY_OPTIONS.map((v) => (
                <option key={v} value={v}>
                  {v}%
                </option>
              ))}
            </select>
          </Field>

          {!isMagic && (
            <>
              <Field label="Acertos por hora" hint="(treino ativo)">
                <TextInput value={activeRate} onChange={setActiveRate} mono />
              </Field>
              <Toggle
                checked={dummyBonus}
                onChange={setDummyBonus}
                title="Dummy do QG (+10%)"
                description="Boneco de treino compartilhado da guildhall"
              />
            </>
          )}

          {vocation.provisional && (
            <ProvisionalNote>
              As constantes de skill da vocação {vocation.name} ainda não foram confirmadas — trate o
              resultado como aproximado.
            </ProvisionalNote>
          )}
        </Card>

        <Card className="p-[22px]">
          <SectionCap tone="ink">
            Skill {r.from} → {r.to} · {skillLabel} · {vocation.name}
          </SectionCap>
          <ResultBig value={fmtInt(r.remaining)} unit={unit} />

          <ResultRow
            first
            label={`${isMagic ? "Mana" : "Acertos"} do ${r.from} ao ${r.to}`}
            value={fmtInt(r.totalUnits)}
          />
          <ResultRow
            label="Já feito neste nível"
            value={`−${fmtInt(r.alreadyDone)}`}
            tone="muted"
          />
          <ResultRow label="Restante" value={fmtInt(r.remaining)} tone="positive" />

          {!isMagic && (
            <>
              <div className="my-[18px] h-px bg-parch-line" />
              <SectionCap tone="ink">Estimativa</SectionCap>
              <ResultRow
                first
                label={`No boneco (1 acerto / ${SECONDS_PER_HIT}s)`}
                value={fmtDuration(r.dummyHours)}
              />
              <ResultRow
                label={`Exercise Weapons (${EXERCISE_WEAPON_CHARGES} usos)`}
                value={`≈ ${fmtInt(r.exerciseWeapons)}`}
              />
              {Number.isFinite(r.activeHours) && (
                <ResultRow label="Treino ativo" value={fmtDuration(r.activeHours)} tone="positive" />
              )}
            </>
          )}

          {isMagic && (
            <p className="mt-3.5 text-[11px] leading-relaxed text-ink-faint">
              Para magic level, a Calculadora de Magic Level tem estimativa de tempo por mana/hora e
              spells recomendadas.
            </p>
          )}

          {!r.reachable && (
            <p className="mt-3.5 text-[12px] text-ink-dim">
              Defina uma skill alvo acima da atual.
            </p>
          )}
        </Card>
      </div>
    </Page>
  );
}
