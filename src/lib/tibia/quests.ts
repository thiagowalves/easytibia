/**
 * Quests que valem a pena no começo (nível 0–50), com foco na mainland.
 * Referência: TibiaWiki BR — "Quests".
 *
 * `minLevel` 0 = sem requisito de nível. `premium` segue a coluna da wiki;
 * mesmo quests "free" podem exigir viagem paga para chegar. Para o passo a
 * passo, use o link de cada uma.
 */

export interface Quest {
  name: string;
  minLevel: number;
  premium: boolean;
  region: string;
  reward: string;
  /** Por que fazer / o que essa quest destrava. */
  note?: string;
  wikiSlug: string;
}

export const QUESTS: Quest[] = [
  // Rookgaard (só para quem escolheu o começo antigo)
  { name: "The Rookie Guard", minLevel: 2, premium: false, region: "Rookgaard", reward: "Kit inicial completo: escudo, armadura, arma, potions, anel, exp", note: "A linha de missões que guia o novato dentro de Rookgaard.", wikiSlug: "The_Rookie_Guard_Quest" },
  { name: "Bear Room", minLevel: 2, premium: false, region: "Rookgaard", reward: "Chain Armor, Brass Helmet, 12 Arrows, 40 gp", note: "Ensina como funcionam os baús de quest (uma vez por personagem).", wikiSlug: "Bear_Room_Quest" },
  { name: "Katana", minLevel: 2, premium: false, region: "Rookgaard", reward: "Katana, Viking Helmet", wikiSlug: "Katana_Quest" },

  // Mainland — sem requisito de nível
  { name: "The Postman Missions", minLevel: 0, premium: true, region: "Vários", reward: "Mailboxes pelo Tibia, desconto em parcels/cartas/barcos, Post Officer's Hat", note: "Uma das primeiras quests de utilidade: caixas de correio e viagem mais barata.", wikiSlug: "The_Postman_Missions_Quest" },
  { name: "The Explorer Society", minLevel: 0, premium: false, region: "Vários", reward: "Atalhos de teleporte, acesso a áreas, Ice Pick, pérolas, achievements", note: "Missões espalhadas que abrem passagens úteis pelo mapa.", wikiSlug: "The_Explorer_Society_Quest" },
  { name: "The Scatterbrained Sorcerer", minLevel: 0, premium: false, region: "Vários", reward: "5.350 gp + 10.750 exp + achievement", note: "Boa injeção de exp e dinheiro cedo.", wikiSlug: "The_Scatterbrained_Sorcerer_Quest" },
  { name: "The Beginning", minLevel: 0, premium: false, region: "Zao Steppe", reward: "Acesso a Zao, exp, tomes", note: "Porta de entrada para o continente de Zao.", wikiSlug: "The_Beginning_Quest" },
  { name: "Citizen Outfits", minLevel: 0, premium: false, region: "Thais", reward: "Primeiro outfit + addons + achievement", note: "O outfit mais fácil do jogo.", wikiSlug: "Citizen_Outfits_Quest" },
  { name: "Hunter Outfits", minLevel: 0, premium: false, region: "Thais / Liberty Bay", reward: "Hunter Outfit + addons", note: "Requer matar contagens de bichos comuns — combina com hunt normal.", wikiSlug: "Hunter_Outfits_Quest" },
  { name: "Dark Helmet", minLevel: 0, premium: false, region: "Folda", reward: "Dark Helmet, 4 Throwing Knives, chaves", wikiSlug: "Dark_Helmet_Quest" },
  { name: "Dark Pyramid", minLevel: 0, premium: false, region: "Kha'labal (deserto)", reward: "Stealth Ring, Protection Amulet", wikiSlug: "Dark_Pyramid_Quest" },
  { name: "Iron Helmet", minLevel: 0, premium: false, region: "Plains of Havoc", reward: "Iron Helmet, runa Sudden Death, Leather Armor", wikiSlug: "Iron_Helmet_Quest" },
  { name: "Goblin Merchant", minLevel: 0, premium: false, region: "Marshland (Venore)", reward: "1.100 gp + 5.200 exp + achievement", wikiSlug: "Goblin_Merchant_Quest" },
  { name: "Waterfall", minLevel: 0, premium: false, region: "Tiquanda", reward: "Pirate Backpack, Pirate Hat, Dwarven Ring, Rum Flask", wikiSlug: "Waterfall_Quest" },
  { name: "The White Raven Monastery", minLevel: 0, premium: false, region: "Carlin", reward: "Blessed Ankh, Family Brooch, acesso à Isle of the Kings", wikiSlug: "The_White_Raven_Monastery_Quest" },
  { name: "Children of the Revolution", minLevel: 0, premium: false, region: "Zao Steppe", reward: "10.000 exp, Serpent Crest, 1º addon Warmaster, Tome of Knowledge", wikiSlug: "Children_of_the_Revolution_Quest" },

  // Mainland — com requisito de nível
  { name: "Jack to the Future", minLevel: 8, premium: false, region: "Edron", reward: "6.000 exp, achievements", wikiSlug: "Jack_to_the_Future_Quest" },
  { name: "The Shattered Isles", minLevel: 20, premium: false, region: "Liberty Bay", reward: "Acesso a Meriana, Goroma, Nargor e Laguna; pirate outfit", note: "Abre as ilhas do sul e caças de piratas/tartarugas.", wikiSlug: "The_Shattered_Isles_Quest" },
  { name: "Draconia", minLevel: 25, premium: false, region: "Draconia", reward: "Ice Rapier, Serpent Sword, Stone Skin Amulet, Energy Ring, chaves", wikiSlug: "Draconia_Quest" },
  { name: "A Father's Burden", minLevel: 25, premium: false, region: "Vários", reward: "28.000 exp + 8.000 gp + Old Cape", note: "Ótima recompensa de exp para a faixa.", wikiSlug: "A_Father%27s_Burden_Quest" },
  { name: "Circle Room", minLevel: 32, premium: false, region: "Kazordoon (minas)", reward: "Dwarven Axe, War Hammer", wikiSlug: "Circle_Room_Quest" },
  { name: "Crusader Helmet", minLevel: 35, premium: false, region: "Kazordoon (minas)", reward: "Crusader Helmet", wikiSlug: "Crusader_Helmet_Quest" },
  { name: "Sam's Old Backpack", minLevel: 35, premium: false, region: "Thais", reward: "Dwarven Armor + achievement", wikiSlug: "Sam%27s_Old_Backpack_Quest" },
  { name: "The Isle of Evil", minLevel: 35, premium: false, region: "Vários", reward: "6.666 exp, Mechanical Fishing Rod, item aleatório de boss", wikiSlug: "The_Isle_of_Evil_Quest" },
  { name: "Into The Bone Pit", minLevel: 35, premium: false, region: "Thais", reward: "Death Ring", wikiSlug: "Into_The_Bone_Pit_Quest" },
  { name: "Thais Quest", minLevel: 40, premium: false, region: "Thais", reward: "Crown Helmet, Noble Armor, Naginata, Bow, potions, gems", note: "Baú clássico de Thais com bastante equipamento.", wikiSlug: "Thais_Quest" },
  { name: "Orc Fortress", minLevel: 40, premium: false, region: "Ulderek's Rock", reward: "Knight Armor, Knight Axe, Fire Sword", wikiSlug: "Orc_Fortress_Quest" },
  { name: "The Djinn War", minLevel: 40, premium: false, region: "Ankrahmun / desertos", reward: "Knight Armor, Knight Axe, Fire Sword + acesso a djinns e negociações", note: "Escolha entre Efreet (azul) e Marid (verde).", wikiSlug: "The_Djinn_War_Quest" },
  { name: "Koshei The Deathless", minLevel: 40, premium: false, region: "Kha'labal / pirâmide", reward: "Koshei's Ancient Amulet ou Blue Legs, 50 Platinum Coins", wikiSlug: "Koshei_The_Deathless_Quest" },
  { name: "What a Foolish Quest", minLevel: 40, premium: false, region: "Vários", reward: "Jester Outfit + addons", wikiSlug: "What_a_Foolish_Quest" },
  { name: "Against the Spider Cult", minLevel: 40, premium: false, region: "Edron Orc Lands", reward: "Dark Armor, Scimitar, Terra Amulet, runas", wikiSlug: "Against_the_Spider_Cult_Quest" },
  { name: "In Service of Yalahar", minLevel: 80, premium: true, region: "Vários", reward: "Acesso a Yalahar, Yalaharian Outfit, escolha de armadura", note: "Grande quest que abre a cidade de Yalahar (um pouco além do começo).", wikiSlug: "In_Service_of_Yalahar_Quest" },
];
