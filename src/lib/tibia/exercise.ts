/**
 * Exercise Weapons — cargas, preço e tempo.
 * Referência: TibiaWiki BR — "Exercise Weapons" e páginas de cada arma.
 *
 * 1 carga = 1 acerto a cada 2 segundos.
 * O custo por carga é o MESMO nas três versões (≈ 694 gp ou 0,05 Tibia Coin):
 * a versão maior só evita ficar trocando de arma.
 */

export const SECONDS_PER_CHARGE = 2;

export interface ExerciseTier {
  id: "regular" | "durable" | "lasting";
  label: string;
  charges: number;
  tibiaCoins: number;
  /** Preço em gold com NPC Comerciante de Armas. */
  gold: number;
}

export const EXERCISE_TIERS: ExerciseTier[] = [
  { id: "regular", label: "Exercise", charges: 500, tibiaCoins: 25, gold: 347_222 },
  { id: "durable", label: "Durable", charges: 1_800, tibiaCoins: 90, gold: 1_250_000 },
  { id: "lasting", label: "Lasting", charges: 14_400, tibiaCoins: 720, gold: 10_000_000 },
];

export interface ExercisePlan {
  count: number;
  charges: number;
  tibiaCoins: number;
  gold: number;
  /** Horas de treino (cargas usadas * 2s), já com o bônus de dummy aplicado. */
  hours: number;
}

/**
 * Plano para cobrir `chargesNeeded` cargas usando uma única versão de arma.
 * `dummyBonus` (ex.: 0.1 para +10%) reduz o tempo, não a quantidade de cargas.
 */
export function exercisePlan(
  chargesNeeded: number,
  tier: ExerciseTier,
  dummyBonus = 0,
): ExercisePlan {
  const need = Math.max(0, chargesNeeded);
  const count = Math.ceil(need / tier.charges);
  const hours = (need * SECONDS_PER_CHARGE) / (1 + dummyBonus) / 3600;
  return {
    count,
    charges: count * tier.charges,
    tibiaCoins: count * tier.tibiaCoins,
    gold: count * tier.gold,
    hours,
  };
}
