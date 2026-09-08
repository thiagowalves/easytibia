/**
 * Fórmula oficial de experiência do Tibia.
 *
 *   exp(nível) = (50 / 3) * (n³ - 6n² + 17n - 12)
 *
 * Verificação: exp(2) = 100, exp(8) = 4 200, exp(20) = 98 800.
 */

/** Experiência total acumulada para atingir `level`. */
export function totalExpForLevel(level: number): number {
  const n = Math.max(1, Math.floor(level));
  if (n <= 1) return 0;
  return Math.round((50 * (n ** 3 - 6 * n ** 2 + 17 * n - 12)) / 3);
}

/** Experiência necessária para ir de `from` até `to` (0 se já passou). */
export function expBetweenLevels(from: number, to: number): number {
  return Math.max(0, totalExpForLevel(to) - totalExpForLevel(from));
}

/** Experiência para subir 1 nível, estando em `level`. */
export function expToNextLevel(level: number): number {
  return totalExpForLevel(level + 1) - totalExpForLevel(level);
}

/** Nível correspondente a uma quantidade de experiência acumulada. */
export function levelForExp(exp: number): number {
  if (exp <= 0) return 1;
  let level = 1;
  while (totalExpForLevel(level + 1) <= exp) level++;
  return level;
}
