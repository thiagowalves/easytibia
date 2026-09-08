# EasyTibia

App desktop para ajudar jogadores **novatos de Tibia** — guias, builds, hunts,
tasks, quests e calculadoras de nível, skill e magic level para todas as vocações
(Cavaleiro, Paladino, Sorcerer, Druida e Monge). Interface em português do Brasil.

## Stack

- **Tauri v2** (binário desktop, usa o WebView2 do Windows)
- **React 19 + Vite + TypeScript**
- **Tailwind CSS v4**

## Rodando localmente

Pré-requisitos: Node.js LTS, Rust (stable-msvc) e o "Desktop development with C++"
do Visual Studio Build Tools.

```bash
npm install
npm run tauri dev      # app desktop com hot-reload
npm run build          # só o frontend (typecheck + bundle)
npm run tauri build    # gera o instalador
```

## Estrutura

```
src/
  lib/tibia/      Motor de fórmulas: experiência, skill points, magic level
  state/          Router leve + vocação global (contexts)
  components/     Shell (sidebar, topo, seletor de vocação) e UI compartilhada
  pages/          Home + calculadoras (Nível, Skill, Magic Level)
src-tauri/        Backend Rust do Tauri
design/           Mockups de design das telas (.dc.html)
```

## Status

MVP em construção — as três calculadoras já funcionam. As constantes de skill e
magic level por vocação ainda precisam ser conferidas contra a TibiaWiki; a
vocação Monge está marcada como provisória no código.
