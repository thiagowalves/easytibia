const numberFormat = new Intl.NumberFormat("pt-BR");

/** Inteiro com separador de milhar pt-BR. Aceita string "1.234" ou número. */
export function fmtInt(value: number): string {
  if (!Number.isFinite(value)) return "—";
  return numberFormat.format(Math.round(value));
}

/** Converte "1.450.000" / "1450000" / "1,5" para número. Retorna NaN se vazio. */
export function parseNumber(raw: string): number {
  const cleaned = raw.trim().replace(/\./g, "").replace(/\s/g, "").replace(",", ".");
  if (cleaned === "") return NaN;
  return Number(cleaned);
}

/** Duração em horas → "5 h 10 min". */
export function fmtDuration(hours: number): string {
  if (!Number.isFinite(hours) || hours <= 0) return "—";
  const totalMinutes = Math.round(hours * 60);
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  if (h === 0) return `${m} min`;
  if (m === 0) return `${h} h`;
  return `${h} h ${m} min`;
}
