/** Coordenada do mundo de Tibia: [x, y, andar]. */
export type Coord = [number, number, number];

/**
 * Link para o mapa comentado do TibiaMaps centralizado numa coordenada.
 * Formato do hash: x,y,z:zoom (zoom 0 = mais perto).
 */
export function tibiaMapUrl(coord: Coord, zoom = 1): string {
  const [x, y, z] = coord;
  return `https://tibiamaps.io/map#${x},${y},${z}:${zoom}`;
}

export const MAP_CREDIT = {
  label: "TibiaMaps.io",
  url: "https://tibiamaps.io/",
};
