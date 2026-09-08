/* ---------------------------------------------------------------------------
   Sprites de NPC e criatura da TibiaWiki (conteúdo CC BY-SA).

   Usadas embutidas no guia, sempre com o crédito de TIBIAWIKI_CREDIT visível
   perto da imagem. São GIFs de 64x64 servidos pela wiki.
--------------------------------------------------------------------------- */

export const TIBIAWIKI_CREDIT = {
  label: "TibiaWiki BR — CC BY-SA",
  url: "https://www.tibiawiki.com.br/",
};

const BASE = "https://www.tibiawiki.com.br/images";

/** Nome do NPC/criatura -> caminho do sprite na wiki. */
const PATHS: Record<string, string> = {
  // Newhaven — NPCs
  "Viola": "/0/08/Viola.gif",
  "Flavius": "/4/4b/Flavius.gif",
  "Gustavo, the Guard": "/4/4b/Gustavo%2C_the_Guard.gif",
  "Avriel": "/d/d9/Avriel.gif",
  "Anna": "/d/dd/Anna.gif",
  // Newhaven — criaturas
  "Muglex Clan Assassin": "/2/20/Muglex_Clan_Assassin.gif",
  "Muglex Clan Footman": "/4/43/Muglex_Clan_Footman.gif",
  "Muglex Clan Chief": "/1/16/Muglex_Clan_Chief.gif",
  "Corrupted Ghost": "/4/4c/Corrupted_Ghost.gif",
  "Corrupted Skeleton": "/d/d1/Corrupted_Skeleton.gif",
  "The Corruptor": "/e/e5/The_Corruptor.gif",

  // Targuna — NPCs
  "Adrian": "/0/0c/Adrian.gif",
  "Aurelia": "/5/5d/Aurelia.gif",
  "Camilla": "/a/ad/Camilla.gif",
  "Leonora": "/0/0a/Leonora.gif",
  "Captain Indigo": "/e/eb/Captain_Indigo.gif",
  "Lizzie": "/4/45/Lizzie.gif",
  "Sterling": "/b/b6/Sterling.gif",
  "Emiliana": "/5/5f/Emiliana.gif",
  // Targuna — criaturas
  "Lizard Henchman": "/4/4f/Lizard_Henchman.gif",
  "Lizard Swordmaster": "/6/69/Lizard_Swordmaster.gif",
  "Lizard Magician": "/c/ca/Lizard_Magician.gif",
  "Lizard Executioner": "/4/41/Lizard_Executioner.gif",
  "Lizard Commander": "/9/93/Lizard_Commander.gif",
  "Pirate Gunner": "/3/3a/Pirate_Gunner.gif",
  "Pirate Navigator": "/5/5a/Pirate_Navigator.gif",
  "Pirate Cook": "/a/ae/Pirate_Cook.gif",
  "Pirate Quartermaster": "/e/eb/Pirate_Quartermaster.gif",
  "Sea Captain": "/d/de/Sea_Captain.gif",
  "Infernoid Blob": "/e/e5/Infernoid_Blob.gif",
  "Infernoid Hound": "/8/86/Infernoid_Hound.gif",
  "Infernoid Soul": "/c/c0/Infernoid_Soul.gif",
  "Infernoid Spiritual": "/2/2c/Infernoid_Spiritual.gif",
  "Herald of Fire": "/8/8f/Herald_of_Fire.gif",

  // Thais — NPCs
  "Norf": "/0/00/Norf.gif",
  "Naji": "/b/ba/Naji.gif",
  "Gamel": "/b/bf/Gamel.gif",
  "Captain Bluebear": "/1/19/Captain_Bluebear.gif",

  // Outros
  "Grizzly Adams": "/b/b5/Grizzly_Adams.gif",
};

export function sprite(name: string): string | undefined {
  const p = PATHS[name];
  return p ? BASE + p : undefined;
}
