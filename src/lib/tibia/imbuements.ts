/**
 * Dados de imbuements (encantamentos).
 * Referência: TibiaWiki BR — "Imbuements".
 *
 * Cada nível exige os materiais dos níveis anteriores MAIS os novos:
 *   Basic     → itens Basic
 *   Intricate → Basic + Intricate  (só Premium)
 *   Powerful  → Basic + Intricate + Powerful  (só Premium, precisa da quest
 *               ou de um Powerful Imbuement Scroll)
 *
 * Taxa em gold paga na Imbuing Shrine, por encantamento:
 *   Basic 7 500 · Intricate 60 000 · Powerful 250 000
 *
 * Duração: 20 horas. O tempo só corre com o item equipado e fora de PZ
 * (exceto backpacks). Desde o Update de Verão 2025 não há chance de falha.
 */

export type ImbueTier = "basic" | "intricate" | "powerful";

export const IMBUE_FEE: Record<ImbueTier, number> = {
  basic: 7_500,
  intricate: 60_000,
  powerful: 250_000,
};

export const IMBUE_TIER_LABEL: Record<ImbueTier, string> = {
  basic: "Basic",
  intricate: "Intricate",
  powerful: "Powerful",
};

export const IMBUE_HOURS = 20;

export interface ImbueMaterial {
  qty: number;
  item: string;
}

export interface Imbuement {
  name: string;
  /** O que o encantamento faz, em pt-BR curto. */
  effect: string;
  category: "Skill" | "Dano" | "Proteção" | "Suporte";
  basic: ImbueMaterial;
  intricate: ImbueMaterial;
  powerful: ImbueMaterial;
}

export const IMBUEMENTS: Imbuement[] = [
  // Aumento de Skill
  { name: "Bash", effect: "Skill de Clava", category: "Skill", basic: { qty: 20, item: "Cyclops Toe" }, intricate: { qty: 15, item: "Ogre Nose Ring" }, powerful: { qty: 10, item: "Warmaster's Wristguards" } },
  { name: "Blockade", effect: "Skill de Escudo", category: "Skill", basic: { qty: 20, item: "Piece of Scarab Shell" }, intricate: { qty: 25, item: "Brimstone Shell" }, powerful: { qty: 25, item: "Frazzle Skin" } },
  { name: "Chop", effect: "Skill de Machado", category: "Skill", basic: { qty: 20, item: "Orc Tooth" }, intricate: { qty: 25, item: "Battle Stone" }, powerful: { qty: 20, item: "Moohtant Horn" } },
  { name: "Epiphany", effect: "Magic Level", category: "Skill", basic: { qty: 25, item: "Elvish Talisman" }, intricate: { qty: 15, item: "Broken Shamanic Staff" }, powerful: { qty: 15, item: "Strand of Medusa Hair" } },
  { name: "Precision", effect: "Skill de Distância", category: "Skill", basic: { qty: 25, item: "Elven Scouting Glass" }, intricate: { qty: 20, item: "Elven Hoof" }, powerful: { qty: 10, item: "Metal Spike" } },
  { name: "Punch", effect: "Skill de Punho", category: "Skill", basic: { qty: 25, item: "Tarantula Egg" }, intricate: { qty: 20, item: "Mantassin Tail" }, powerful: { qty: 15, item: "Gold-Brocaded Cloth" } },
  { name: "Slash", effect: "Skill de Espada", category: "Skill", basic: { qty: 25, item: "Lion's Mane" }, intricate: { qty: 25, item: "Mooh'tah Shell" }, powerful: { qty: 5, item: "War Crystal" } },

  // Dano Elemental
  { name: "Electrify", effect: "Dano de Energia", category: "Dano", basic: { qty: 25, item: "Rorc Feather" }, intricate: { qty: 5, item: "Peacock Feather Fan" }, powerful: { qty: 1, item: "Energy Vein" } },
  { name: "Frost", effect: "Dano de Gelo", category: "Dano", basic: { qty: 25, item: "Frosty Heart" }, intricate: { qty: 10, item: "Seacrest Hair" }, powerful: { qty: 5, item: "Polar Bear Paw" } },
  { name: "Reap", effect: "Dano de Morte", category: "Dano", basic: { qty: 25, item: "Pile of Grave Earth" }, intricate: { qty: 20, item: "Demonic Skeletal Hand" }, powerful: { qty: 5, item: "Petrified Scream" } },
  { name: "Scorch", effect: "Dano de Fogo", category: "Dano", basic: { qty: 25, item: "Fiery Heart" }, intricate: { qty: 5, item: "Green Dragon Scale" }, powerful: { qty: 5, item: "Demon Horn" } },
  { name: "Venom", effect: "Dano de Terra", category: "Dano", basic: { qty: 25, item: "Swamp Grass" }, intricate: { qty: 20, item: "Poisonous Slime" }, powerful: { qty: 2, item: "Slime Heart" } },

  // Proteção Elemental
  { name: "Cloud Fabric", effect: "Proteção de Energia", category: "Proteção", basic: { qty: 20, item: "Wyvern Talisman" }, intricate: { qty: 15, item: "Crawler Head Plating" }, powerful: { qty: 10, item: "Wyrm Scale" } },
  { name: "Demon Presence", effect: "Proteção de Sagrado", category: "Proteção", basic: { qty: 25, item: "Cultish Robe" }, intricate: { qty: 25, item: "Cultish Mask" }, powerful: { qty: 20, item: "Hellspawn Tail" } },
  { name: "Dragon Hide", effect: "Proteção de Fogo", category: "Proteção", basic: { qty: 20, item: "Green Dragon Leather" }, intricate: { qty: 10, item: "Blazing Bone" }, powerful: { qty: 5, item: "Draken Sulphur" } },
  { name: "Lich Shroud", effect: "Proteção de Morte", category: "Proteção", basic: { qty: 25, item: "Flask of Embalming Fluid" }, intricate: { qty: 20, item: "Gloom Wolf Fur" }, powerful: { qty: 5, item: "Mystical Hourglass" } },
  { name: "Quara Scale", effect: "Proteção de Gelo", category: "Proteção", basic: { qty: 25, item: "Winter Wolf Fur" }, intricate: { qty: 15, item: "Thick Fur" }, powerful: { qty: 10, item: "Deepling Warts" } },
  { name: "Snake Skin", effect: "Proteção de Terra", category: "Proteção", basic: { qty: 25, item: "Piece of Swampling Wood" }, intricate: { qty: 20, item: "Snake Skin" }, powerful: { qty: 10, item: "Brimstone Fangs" } },

  // Suporte
  { name: "Featherweight", effect: "Aumento de Capacidade", category: "Suporte", basic: { qty: 20, item: "Fairy Wings" }, intricate: { qty: 10, item: "Little Bowl of Myrrh" }, powerful: { qty: 5, item: "Goosebump Leather" } },
  { name: "Strike", effect: "Dano Crítico", category: "Suporte", basic: { qty: 20, item: "Protective Charm" }, intricate: { qty: 25, item: "Sabretooth" }, powerful: { qty: 5, item: "Vexclaw Talon" } },
  { name: "Swiftness", effect: "Velocidade", category: "Suporte", basic: { qty: 15, item: "Damselfly Wing" }, intricate: { qty: 25, item: "Compass" }, powerful: { qty: 20, item: "Waspoid Wing" } },
  { name: "Vampirism", effect: "Roubo de Vida", category: "Suporte", basic: { qty: 25, item: "Vampire Teeth" }, intricate: { qty: 15, item: "Bloody Pincers" }, powerful: { qty: 5, item: "Piece of Dead Brain" } },
  { name: "Vibrancy", effect: "Remove Paralisia", category: "Suporte", basic: { qty: 20, item: "Wereboar Hooves" }, intricate: { qty: 15, item: "Crystallized Anger" }, powerful: { qty: 5, item: "Quill" } },
  { name: "Void", effect: "Roubo de Mana", category: "Suporte", basic: { qty: 25, item: "Rope Belt" }, intricate: { qty: 25, item: "Silencer Claws" }, powerful: { qty: 5, item: "Some Grimeleech Wings" } },
];

/** Materiais acumulados para o nível pedido (Basic ⊆ Intricate ⊆ Powerful). */
export function materialsFor(imbue: Imbuement, tier: ImbueTier): ImbueMaterial[] {
  const out = [imbue.basic];
  if (tier === "intricate" || tier === "powerful") out.push(imbue.intricate);
  if (tier === "powerful") out.push(imbue.powerful);
  return out;
}

export function feeFor(tier: ImbueTier): number {
  return IMBUE_FEE[tier];
}
