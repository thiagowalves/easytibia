/**
 * Spots de caça por faixa de nível, com XP/h e lucro/h APROXIMADOS.
 * Referência: TibiaVault (Hunting Spots) + conhecimento da comunidade.
 *
 * Os números variam MUITO com vocação, skills, equipamento e o mercado do
 * seu mundo. Trate como ponto de partida e confirme com a aba de análise do
 * cliente. "kk" = milhão.
 */

export type Voc = "K" | "P" | "S" | "D" | "M";

export interface HuntSpot {
  name: string;
  region: string;
  level: [number, number];
  /** Vocações que se dão bem. Vazio = todas. */
  voc: Voc[];
  xph: string;
  profith: string;
  note?: string;
}

export const HUNT_SPOTS: HuntSpot[] = [
  // 8–20
  { name: "Larvae + Ancient Scarabs", region: "Tumbas de Ankrahmun", level: [8, 20], voc: [], xph: "15k–40k", profith: "0–10k", note: "Loot de small gems. Sem água — cuidado com o calor." },
  { name: "Cyclopolis", region: "Edron", level: [10, 30], voc: ["K", "P"], xph: "20k–50k", profith: "quase nada", note: "HP alto, bom físico. Task de 500 cabe aqui." },
  { name: "Rotworms", region: "Darashia / sul de Edron", level: [15, 30], voc: [], xph: "15k–35k", profith: "~0", note: "Corda e pá. Task do Daniel Steelsoul." },
  { name: "Minotaurs", region: "Mintwallin (Thais)", level: [15, 40], voc: [], xph: "20k–80k", profith: "5k–20k" },

  // 20–40
  { name: "Amazon Camp", region: "Venore", level: [20, 50], voc: [], xph: "30k–100k", profith: "10k–30k", note: "Amazon, Valkyrie, Witch — variado." },
  { name: "Darashia Pyramid", region: "Darashia", level: [15, 40], voc: [], xph: "15k–50k", profith: "5k–20k", note: "Minotaur + Mummy." },
  { name: "Coryms", region: "Green Claw Swamp e cavernas de Corym", level: [25, 45], voc: [], xph: "40k–90k", profith: "10k–25k", note: "Spawn enorme, XP boa, loot fraco." },
  { name: "Apes (Kongra/Sibang/Merlkin)", region: "Banuta, norte de Port Hope", level: [35, 55], voc: [], xph: "40k–90k", profith: "10k–25k", note: "Melhor task da faixa 6–49." },
  { name: "Dwarves / Dwarf Guards", region: "Minas de Kazordoon", level: [30, 45], voc: ["K", "P"], xph: "25k–70k", profith: "5k–20k", note: "Iron Ore vende bem." },

  // 40–60
  { name: "Water Elementals", region: "Port Hope / Yalahar", level: [38, 60], voc: ["S", "D"], xph: "60k–120k", profith: "15k–40k", note: "Fracos a energy. Leve muita mana." },
  { name: "Giant Spider Cave", region: "Port Hope", level: [50, 80], voc: [], xph: "80k–200k", profith: "20k–60k" },
  { name: "Upper Spike (Wyverns / Coryms)", region: "Kazordoon", level: [50, 80], voc: ["K", "D"], xph: "200k–350k", profith: "30k–60k" },

  // 60–100
  { name: "Krailos Steppe (Ogres)", region: "Krailos", level: [60, 100], voc: ["K", "P", "D"], xph: "350k–600k", profith: "40k–100k" },
  { name: "Edron Hero Cave", region: "Edron", level: [60, 100], voc: ["K", "P"], xph: "300k–500k", profith: "50k–120k" },
  { name: "Werecreatures (Grimvale)", region: "Grimvale", level: [80, 150], voc: [], xph: "300k–600k", profith: "40k–100k", note: "Só na fase de lua cheia (evento Grimvale)." },

  // 150–250
  { name: "Glooth Bandits", region: "Oramond", level: [150, 250], voc: [], xph: "1kk–2kk", profith: "300k–700k" },
  { name: "Asura Palace", region: "Ankrahmun", level: [150, 250], voc: [], xph: "1.5kk–3kk", profith: "200k–600k" },
  { name: "Carnivora Caves", region: "Port Hope", level: [150, 250], voc: [], xph: "1.5kk–3kk", profith: "200k–600k" },

  // 200+
  { name: "Oramond Minotaurs", region: "Oramond", level: [200, 350], voc: [], xph: "3kk–6kk", profith: "500k–1.5kk" },
  { name: "Secret Library", region: "Edron", level: [250, 400], voc: [], xph: "8kk–15kk", profith: "200k–600k" },
  { name: "Soul War (Zarganash)", region: "Netherworld", level: [300, 999], voc: [], xph: "10kk–20kk", profith: "500k–2kk" },
];

export const VOC_LABEL: Record<Voc, string> = {
  K: "Knight",
  P: "Paladin",
  S: "Sorcerer",
  D: "Druid",
  M: "Monk",
};
