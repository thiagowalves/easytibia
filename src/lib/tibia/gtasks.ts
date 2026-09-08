/**
 * Tasks de "Killing in the Name of..." (Grizzly Adams e afins).
 * Referência: TibiaWiki (Fandom) — "Killing in the Name of... Quest/Spoiler".
 *
 * Os pontos ("Paw & Fur Points") só contam quando a task é feita dentro da
 * faixa de nível dela. As tasks do Daniel Steelsoul (Edron) dão exp e gold,
 * mas não dão pontos para o rank do Grizzly Adams.
 */

export interface GTask {
  id: string;
  creature: string;
  count: number;
  /** [min, max] de nível para render pontos. */
  level: [number, number];
  points: number;
  exp: number;
  boss?: string;
  giver: "Grizzly Adams" | "Daniel Steelsoul";
}

export interface Rank {
  name: string;
  points: number;
  minLevel: number;
}

export const RANKS: Rank[] = [
  { name: "Huntsman", points: 10, minLevel: 6 },
  { name: "Ranger", points: 20, minLevel: 6 },
  { name: "Big Game Hunter", points: 40, minLevel: 50 },
  { name: "Trophy Hunter", points: 70, minLevel: 70 },
  { name: "Elite Hunter", points: 100, minLevel: 100 },
];

export const GTASKS: GTask[] = [
  // Edron — Daniel Steelsoul (sem pontos de rank)
  { id: "trolls", creature: "Trolls (+ Champions)", count: 100, level: [6, 19], points: 0, exp: 200, giver: "Daniel Steelsoul" },
  { id: "goblins-edron", creature: "Goblins (+ Assassins, Scavengers)", count: 150, level: [6, 19], points: 0, exp: 300, giver: "Daniel Steelsoul" },
  { id: "rotworms-edron", creature: "Rotworms (+ Carrion Worms)", count: 300, level: [20, 39], points: 0, exp: 1000, giver: "Daniel Steelsoul" },
  { id: "cyclopes-edron", creature: "Cyclopes (+ Drones, Smiths)", count: 500, level: [40, 59], points: 0, exp: 3000, giver: "Daniel Steelsoul" },

  // Grizzly Adams — faixa 6–49
  { id: "crocodiles", creature: "Crocodiles", count: 300, level: [6, 49], points: 1, exp: 800, boss: "The Snapper", giver: "Grizzly Adams" },
  { id: "badgers", creature: "Badgers", count: 300, level: [6, 49], points: 1, exp: 500, giver: "Grizzly Adams" },
  { id: "tarantulas", creature: "Tarantulas", count: 300, level: [6, 49], points: 2, exp: 1500, boss: "Hide", giver: "Grizzly Adams" },
  { id: "gnarlhounds", creature: "Gnarlhounds", count: 300, level: [6, 49], points: 2, exp: 1000, giver: "Grizzly Adams" },
  { id: "terramites", creature: "Terramites", count: 300, level: [6, 49], points: 2, exp: 2500, giver: "Grizzly Adams" },
  { id: "apes", creature: "Kongras / Sibangs / Merlkins", count: 300, level: [6, 49], points: 2, exp: 1000, giver: "Grizzly Adams" },
  { id: "thornback", creature: "Thornback Tortoises", count: 300, level: [6, 49], points: 2, exp: 1500, giver: "Grizzly Adams" },
  { id: "gargoyles", creature: "Gargoyles", count: 200, level: [6, 49], points: 2, exp: 1500, giver: "Grizzly Adams" },
  { id: "stonegolems", creature: "Stone Golems", count: 200, level: [6, 49], points: 3, exp: 2000, giver: "Grizzly Adams" },
  { id: "mammoths", creature: "Mammoths", count: 300, level: [6, 49], points: 3, exp: 5000, boss: "The Bloodtusk", giver: "Grizzly Adams" },
  { id: "carniphilas", creature: "Carniphilas", count: 150, level: [6, 49], points: 3, exp: 2500, boss: "Deathbine", giver: "Grizzly Adams" },

  // Grizzly Adams — faixa 50–79
  { id: "icegolems", creature: "Ice Golems", count: 300, level: [50, 79], points: 2, exp: 12000, boss: "Shardhead", giver: "Grizzly Adams" },
  { id: "quarascouts", creature: "Quara Scouts", count: 400, level: [50, 79], points: 2, exp: 10000, giver: "Grizzly Adams" },
  { id: "mutatedrats", creature: "Mutated Rats", count: 400, level: [50, 79], points: 2, exp: 10000, boss: "Esmeralda", giver: "Grizzly Adams" },
  { id: "ancientscarabs", creature: "Ancient Scarabs", count: 250, level: [50, 79], points: 2, exp: 15000, boss: "Fleshcrawler", giver: "Grizzly Adams" },
  { id: "wyverns", creature: "Wyverns", count: 300, level: [50, 79], points: 2, exp: 12000, giver: "Grizzly Adams" },
  { id: "lancerbeetles", creature: "Lancer Beetles", count: 300, level: [50, 79], points: 2, exp: 8000, giver: "Grizzly Adams" },
  { id: "wailingwidows", creature: "Wailing Widows", count: 400, level: [50, 79], points: 3, exp: 12000, giver: "Grizzly Adams" },
  { id: "killercaimans", creature: "Killer Caimans", count: 250, level: [50, 79], points: 2, exp: 10000, giver: "Grizzly Adams" },
  { id: "bonebeasts", creature: "Bonebeasts", count: 300, level: [50, 79], points: 2, exp: 12000, boss: "Ribstride", giver: "Grizzly Adams" },
  { id: "crystalspiders", creature: "Crystal Spiders", count: 300, level: [50, 79], points: 3, exp: 15000, boss: "The Bloodweb", giver: "Grizzly Adams" },
  { id: "mutatedtigers", creature: "Mutated Tigers", count: 250, level: [50, 79], points: 3, exp: 12000, giver: "Grizzly Adams" },
];

export function rankForPoints(points: number): { current: Rank | null; next: Rank | null } {
  let current: Rank | null = null;
  let next: Rank | null = null;
  for (const r of RANKS) {
    if (points >= r.points) current = r;
    else {
      next = r;
      break;
    }
  }
  return { current, next };
}
