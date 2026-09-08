/**
 * Preço das bênçãos (blessings), por nível do personagem.
 * Referência: TibiaWiki BR — "Bênçãos".
 *
 * Bênçãos comuns (5, disponíveis para Free — exceto Wisdom of Solitude):
 *   nível ≤ 30  → 2 000 gp por bênção
 *   30 < nível < 120 → 2 000 + 200 * (nível - 30)
 *   nível ≥ 120 → 20 000 + 75 * (nível - 120)
 *
 * Bênçãos melhoradas (2, só Premium):
 *   nível ≤ 30  → 2 600 gp
 *   30 < nível < 120 → 2 600 + 260 * (nível - 30)
 *   nível ≥ 120 → 26 000 + 100 * (nível - 120)
 */

export function commonBlessingPrice(level: number): number {
  const n = Math.max(1, Math.floor(level));
  if (n <= 30) return 2000;
  if (n < 120) return 2000 + 200 * (n - 30);
  return 20000 + 75 * (n - 120);
}

export function improvedBlessingPrice(level: number): number {
  const n = Math.max(1, Math.floor(level));
  if (n <= 30) return 2600;
  if (n < 120) return 2600 + 260 * (n - 30);
  return 26000 + 100 * (n - 120);
}

export const COMMON_BLESSING_COUNT = 5;
export const IMPROVED_BLESSING_COUNT = 2;

/** Custo das 5 bênçãos comuns no nível informado. */
export function allCommonBlessingsCost(level: number): number {
  return commonBlessingPrice(level) * COMMON_BLESSING_COUNT;
}

/** Custo das 2 bênçãos melhoradas (Premium) no nível informado. */
export function allImprovedBlessingsCost(level: number): number {
  return improvedBlessingPrice(level) * IMPROVED_BLESSING_COUNT;
}

/** As 5 bênçãos comuns e onde comprar cada uma. */
export const COMMON_BLESSINGS: { name: string; city: string; npc: string }[] = [
  { name: "The Spiritual Shielding", city: "Thais (White Flower Temple)", npc: "Norf" },
  { name: "The Embrace of Tibia", city: "Carlin", npc: "Humphrey" },
  { name: "The Fire of the Suns", city: "Ab'Dendriel", npc: "Edala" },
  { name: "The Spark of the Phoenix", city: "Kazordoon", npc: "Kawill + Pydar" },
  { name: "The Wisdom of Solitude", city: "Edron", npc: "Eremo" },
];
