/**
 * Fórmulas de skill points e magic level do Tibia.
 *
 * Skill de arma / escudo — tentativas (acertos) para ir da skill `x` para `x+1`:
 *
 *   tries(x) = A * b^(x - baseLevel)
 *
 * Total acumulado da skill `baseLevel` até `X`:
 *
 *   total(X) = A * (b^(X - baseLevel) - 1) / (b - 1)
 *
 * onde A = 50 para armas, 100 para Escudo (Shielding), e `b` é o fator da
 * vocação (ver `vocations.ts`). `baseLevel` cancela quando calculamos a
 * diferença entre duas skills, então o valor exato dele não importa aqui.
 *
 * Magic level — mana total gasta para atingir o magic level `ML`:
 *
 *   mana(ML) = 1600 * (b^ML - 1) / (b - 1)
 *
 * Verificação: Sorcerer (b = 1.1) → mana(1) = 1600, incremento ML1→2 = 1760.
 */

const WEAPON_BASE_LEVEL = 10;
const A_WEAPON = 50;
const A_SHIELDING = 100;
const MAGIC_BASE_MANA = 1600;

function weaponTotalTries(skill: number, factor: number, a: number): number {
  return (a * (factor ** (skill - WEAPON_BASE_LEVEL) - 1)) / (factor - 1);
}

/**
 * Acertos necessários para ir da skill `from` até `to`.
 * `shielding` troca a constante A de 50 para 100.
 */
export function weaponTriesBetween(
  from: number,
  to: number,
  factor: number,
  opts: { shielding?: boolean } = {},
): number {
  const a = opts.shielding ? A_SHIELDING : A_WEAPON;
  const tries = weaponTotalTries(to, factor, a) - weaponTotalTries(from, factor, a);
  return Math.max(0, tries);
}

/** Mana total para atingir o magic level `ml`. */
export function totalManaForMagicLevel(ml: number, factor: number): number {
  const m = Math.max(0, Math.floor(ml));
  return (MAGIC_BASE_MANA * (factor ** m - 1)) / (factor - 1);
}

/** Mana necessária para ir do magic level `from` até `to`. */
export function manaBetweenMagicLevels(from: number, to: number, factor: number): number {
  return Math.max(0, totalManaForMagicLevel(to, factor) - totalManaForMagicLevel(from, factor));
}
