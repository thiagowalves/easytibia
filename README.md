# EasyTibia

Companion para quem está começando no Tibia: guia passo a passo do personagem
recém-criado até o nível 50, lista de quests, tracker de tasks do Grizzly Adams,
spots de caça por nível e calculadoras.

**Site:** https://thiagowalves.github.io/easytibia/

## Rodando localmente

```bash
npm install
npm run dev        # abre em http://localhost:1420
```

Build web estático:

```bash
npm run build      # gera dist/
```

App desktop (Windows, via Tauri):

```bash
npm run tauri dev
npm run tauri build   # instalador .exe em src-tauri/target/release/bundle/nsis/
```

## Créditos de dados

- Textos e sprites: [TibiaWiki BR](https://www.tibiawiki.com.br/) (CC BY-SA)
- Mapas de região: [Tibia Official Library](https://www.tibia.com/library/) (CipSoft)
- Tiles do mapa comentado: [TibiaMaps.io](https://tibiamaps.io/) (dados CC0)

Tibia é marca registrada da CipSoft GmbH. Este é um projeto de fã, sem vínculo
oficial.
