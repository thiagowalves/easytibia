/**
 * Divisão de loot de party hunt.
 *
 * Lê o texto do "Party Hunt Analyser" do cliente oficial (botão de copiar),
 * soma o balance de cada participante e calcula quem transfere quanto para
 * quem, de modo que todos fiquem com o mesmo lucro (ou prejuízo).
 */

export interface HuntMember {
  name: string;
  loot: number;
  supplies: number;
  balance: number;
  damage?: number;
  healing?: number;
}

export interface HuntSession {
  sessionLength?: string;
  lootType?: string;
  totalLoot: number;
  totalSupplies: number;
  totalBalance: number;
  members: HuntMember[];
}

/** "1.234.567" ou "1,234,567" ou "-12,345" → número. */
function toNumber(raw: string): number {
  const cleaned = raw.replace(/[^\d-]/g, "");
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : 0;
}

const FIELD = /^\s*(Loot|Supplies|Balance|Damage|Healing)\s*:\s*(-?[\d.,]+)/i;

/**
 * Faz o parse do texto do analyser. Retorna `null` se não achar nenhum
 * participante com Balance.
 */
export function parseHuntSession(text: string): HuntSession | null {
  const lines = text.split(/\r?\n/);

  let sessionLength: string | undefined;
  let lootType: string | undefined;
  const header: Record<string, number> = {};
  const members: HuntMember[] = [];
  let current: HuntMember | null = null;
  let seenHeaderBalance = false;

  for (const line of lines) {
    const sess = line.match(/^\s*Session\s*:\s*(.+)$/i);
    if (sess) {
      sessionLength = sess[1].trim();
      continue;
    }
    const lt = line.match(/^\s*Loot Type\s*:\s*(.+)$/i);
    if (lt) {
      lootType = lt[1].trim();
      continue;
    }

    const field = line.match(FIELD);
    if (field) {
      const key = field[1].toLowerCase();
      const value = toNumber(field[2]);
      if (!seenHeaderBalance && !current) {
        header[key] = value;
        if (key === "balance") seenHeaderBalance = true;
      } else if (current) {
        if (key === "loot") current.loot = value;
        else if (key === "supplies") current.supplies = value;
        else if (key === "balance") current.balance = value;
        else if (key === "damage") current.damage = value;
        else if (key === "healing") current.healing = value;
      }
      continue;
    }

    // Linha de nome: sem ":" no fim, não vazia, não começa com "Session data"
    const name = line.trim();
    if (
      name &&
      !name.includes(":") &&
      !/^session data/i.test(name) &&
      !/^to \d{4}-/i.test(name) &&
      !/^\d/.test(name)
    ) {
      current = { name, loot: 0, supplies: 0, balance: 0 };
      members.push(current);
    }
  }

  const withBalance = members.filter(
    (m) => m.loot !== 0 || m.supplies !== 0 || m.balance !== 0,
  );
  if (withBalance.length === 0) return null;

  return {
    sessionLength,
    lootType,
    totalLoot: header.loot ?? withBalance.reduce((s, m) => s + m.loot, 0),
    totalSupplies: header.supplies ?? withBalance.reduce((s, m) => s + m.supplies, 0),
    totalBalance: header.balance ?? withBalance.reduce((s, m) => s + m.balance, 0),
    members: withBalance,
  };
}

export interface Transfer {
  from: string;
  to: string;
  amount: number;
}

export interface SplitResult {
  /** Lucro/prejuízo por pessoa (pode ser negativo). */
  perPerson: number;
  rows: { name: string; balance: number; diff: number }[];
  transfers: Transfer[];
}

/**
 * Divide o balance total igualmente. `diff` positivo = a pessoa recebe;
 * negativo = a pessoa paga.
 */
export function computeSplit(members: HuntMember[]): SplitResult {
  const n = members.length;
  const total = members.reduce((s, m) => s + m.balance, 0);
  const perPerson = Math.round(total / n);

  const rows = members.map((m) => ({
    name: m.name,
    balance: m.balance,
    diff: perPerson - m.balance,
  }));

  // Quem paga (diff < 0) transfere para quem recebe (diff > 0).
  const payers = rows
    .filter((r) => r.diff < 0)
    .map((r) => ({ name: r.name, amount: -r.diff }))
    .sort((a, b) => b.amount - a.amount);
  const receivers = rows
    .filter((r) => r.diff > 0)
    .map((r) => ({ name: r.name, amount: r.diff }))
    .sort((a, b) => b.amount - a.amount);

  const transfers: Transfer[] = [];
  let i = 0;
  let j = 0;
  while (i < payers.length && j < receivers.length) {
    const amount = Math.min(payers[i].amount, receivers[j].amount);
    if (amount > 0) {
      transfers.push({ from: payers[i].name, to: receivers[j].name, amount });
    }
    payers[i].amount -= amount;
    receivers[j].amount -= amount;
    if (payers[i].amount <= 0) i++;
    if (receivers[j].amount <= 0) j++;
  }

  return { perPerson, rows, transfers };
}
