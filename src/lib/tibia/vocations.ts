/**
 * Dados das vocações de Tibia usados pelas calculadoras.
 *
 * As constantes de skill (`factors`) são os multiplicadores por vocação/skill
 * usados nas fórmulas de skill points e magic level.
 * Referência: TibiaWiki — "Skills" e "Magic Level".
 *
 * ⚠️ CONFERIR os valores contra a wiki antes de tratar como definitivos.
 * A vocação Monge (adicionada em 2025) está marcada como `provisional`
 * porque ainda não confirmei as constantes oficiais dela.
 */

export type VocationId = "knight" | "paladin" | "sorcerer" | "druid" | "monk";

export type SkillKind =
  | "fist"
  | "club"
  | "sword"
  | "axe"
  | "distance"
  | "shielding"
  | "magic";

export interface Vocation {
  id: VocationId;
  /** Nome em pt-BR exibido na interface. */
  name: string;
  /** Cor do medalhão da vocação (do mockup de design). */
  color: string;
  /** Ganhos por nível. */
  hpPerLevel: number;
  manaPerLevel: number;
  capPerLevel: number;
  /** Multiplicadores de crescimento por skill. */
  factors: Record<Exclude<SkillKind, never>, number>;
  /** Constantes ainda não confirmadas contra fonte oficial. */
  provisional?: boolean;
}

export const VOCATIONS: Record<VocationId, Vocation> = {
  knight: {
    id: "knight",
    name: "Cavaleiro",
    color: "#c85c52",
    hpPerLevel: 15,
    manaPerLevel: 5,
    capPerLevel: 25,
    factors: {
      fist: 1.1,
      club: 1.1,
      sword: 1.1,
      axe: 1.1,
      distance: 1.4,
      shielding: 1.1,
      magic: 3.0,
    },
  },
  paladin: {
    id: "paladin",
    name: "Paladino",
    color: "#83bb63",
    hpPerLevel: 10,
    manaPerLevel: 15,
    capPerLevel: 20,
    factors: {
      fist: 1.2,
      club: 1.2,
      sword: 1.2,
      axe: 1.2,
      distance: 1.1,
      shielding: 1.1,
      magic: 1.4,
    },
  },
  sorcerer: {
    id: "sorcerer",
    name: "Sorcerer",
    color: "#7b83db",
    hpPerLevel: 5,
    manaPerLevel: 30,
    capPerLevel: 10,
    factors: {
      fist: 1.5,
      club: 2.0,
      sword: 2.0,
      axe: 2.0,
      distance: 2.0,
      shielding: 1.5,
      magic: 1.1,
    },
  },
  druid: {
    id: "druid",
    name: "Druida",
    color: "#4fa9a2",
    hpPerLevel: 5,
    manaPerLevel: 30,
    capPerLevel: 10,
    factors: {
      fist: 1.5,
      club: 1.8,
      sword: 1.8,
      axe: 1.8,
      distance: 1.8,
      shielding: 1.5,
      magic: 1.1,
    },
  },
  monk: {
    id: "monk",
    name: "Monge",
    color: "#dd9a4f",
    // TODO(monk): confirmar ganhos por nível e fatores de skill.
    hpPerLevel: 10,
    manaPerLevel: 10,
    capPerLevel: 15,
    factors: {
      fist: 1.1,
      club: 1.2,
      sword: 1.2,
      axe: 1.2,
      distance: 1.4,
      shielding: 1.1,
      magic: 1.4,
    },
    provisional: true,
  },
};

export const VOCATION_LIST: Vocation[] = [
  VOCATIONS.knight,
  VOCATIONS.paladin,
  VOCATIONS.sorcerer,
  VOCATIONS.druid,
  VOCATIONS.monk,
];

export const WEAPON_SKILLS: { id: SkillKind; label: string }[] = [
  { id: "axe", label: "Machado" },
  { id: "club", label: "Clava" },
  { id: "sword", label: "Espada" },
  { id: "distance", label: "Distância" },
  { id: "fist", label: "Punho" },
  { id: "shielding", label: "Escudo" },
  { id: "magic", label: "Magic Level" },
];
