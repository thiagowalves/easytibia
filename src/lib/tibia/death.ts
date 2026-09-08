/**
 * Penalidade de morte do Tibia — perda de experiência e de itens.
 * Referência: TibiaWiki BR — "Morte".
 *
 * Perda de experiência / skill / mana:
 *   nível 1–23  → 10% do total acumulado
 *   nível 24+   → ((x + 50) / 100) * 50 * (x² - 5x + 8) pontos de experiência,
 *                 onde x = nível fracionário (ex.: 126,45)
 *
 * Reduções (multiplicam a perda base):
 *   promoção     −30%
 *   cada bênção  −8%   (as 7 contam; 6ª e 7ª são as melhoradas, só Premium)
 *
 * Perda de itens, por número de bênçãos:
 *   0 → recipiente 100%, cada equipamento 10%
 *   1 → 70% / 7%      2 → 45% / 4,5%     3 → 25% / 2,5%
 *   4 → 10% / 1%      5+ → 0% / 0%
 */

import { levelForExp, totalExpForLevel } from "./experience";

const ITEM_LOSS_TABLE: { container: number; equipment: number }[] = [
  { container: 100, equipment: 10 }, // 0 bênçãos
  { container: 70, equipment: 7 },
  { container: 45, equipment: 4.5 },
  { container: 25, equipment: 2.5 },
  { container: 10, equipment: 1 },
  { container: 0, equipment: 0 }, // 5+ bênçãos
];

export function itemLossChances(blessings: number): { container: number; equipment: number } {
  const i = Math.min(ITEM_LOSS_TABLE.length - 1, Math.max(0, Math.floor(blessings)));
  return ITEM_LOSS_TABLE[i];
}

/** Perda base de experiência (sem promoção nem bênçãos), dado o nível fracionário. */
export function baseDeathExpLoss(fractionalLevel: number, currentTotalExp: number): number {
  const x = fractionalLevel;
  if (x < 24) return currentTotalExp * 0.1;
  return ((x + 50) / 100) * 50 * (x * x - 5 * x + 8);
}

export interface DeathResult {
  /** Nível fracionário usado no cálculo. */
  fractionalLevel: number;
  /** Perda de XP sem nenhuma redução. */
  baseLoss: number;
  /** Fração reduzida (0–~0,86) por promoção + bênçãos. */
  reduction: number;
  /** Perda de XP de fato. */
  actualLoss: number;
  /** Nível depois de morrer (pode cair). */
  levelAfter: number;
  /** Chance de perder o recipiente (backpack) e cada equipamento, em %. */
  itemLoss: { container: number; equipment: number };
}

export function deathPenalty(params: {
  level: number;
  /** XP total atual; se ausente, assume início do nível. */
  currentExp?: number;
  /** 0 a 7. */
  blessings: number;
  promoted: boolean;
}): DeathResult {
  const level = Math.max(1, Math.floor(params.level));
  const floor = totalExpForLevel(level);
  const ceil = totalExpForLevel(level + 1);
  const currentTotalExp =
    params.currentExp != null && params.currentExp >= floor ? params.currentExp : floor;

  const fractionalLevel = level + (currentTotalExp - floor) / (ceil - floor);
  const blessings = Math.min(7, Math.max(0, Math.floor(params.blessings)));

  const baseLoss = baseDeathExpLoss(fractionalLevel, currentTotalExp);
  const reduction = Math.min(0.86, (params.promoted ? 0.3 : 0) + 0.08 * blessings);
  const actualLoss = baseLoss * (1 - reduction);
  const levelAfter = levelForExp(Math.max(0, currentTotalExp - actualLoss));

  return {
    fractionalLevel,
    baseLoss,
    reduction,
    actualLoss,
    levelAfter,
    itemLoss: itemLossChances(blessings),
  };
}
