# Design Document: Flykten Band Website Monorepo

## Overview

Flykten-monorepo är ett statiskt publiceringssystem för bandet Flykten.

Det är inte en plattform.
Det är inte ett CMS.
Det är inte en produkt.

Det är ett arkiv och en hemsida.

Systemet är byggt för enkelhet, läsbarhet och långsiktig stabilitet.
Allt innehåll ägs av bandet och lagras i git. Ingen databas. Ingen backend. Ingen extern tjänst krävs för att webbplatsen ska fungera.

Målet är att sidan ska kunna leva i många år utan att behöva byggas om.


## Design Philosophy

1. Bygg så lite som möjligt.
2. Undvik speciallösningar när ramverket redan löser problemet.
3. Låt content vara primärt, design sekundärt.
4. Undvik abstraktioner som inte ger direkt värde.
5. Om något känns enterprise är det troligen fel.


## Technical Stack

- Monorepo: pnpm workspaces
- Web Framework: Astro (static only)
- Content Format: Markdown
- Styling: Vanilla CSS + CSS custom properties
- Deployment: Valfri statisk hosting

Ingen custom server.
Ingen databas.
Ingen runtime.


## Monorepo Structure

flykten/
  apps/
    web/
      src/
        pages/
        layouts/
        components/
      public/
      astro.config.mjs

  packages/
    content/
      press/
      releases/
      gigs/
      contact.md

    brand/
      tokens.css
      retro.css

  tools/
    mcp-flykten/ (optional)

  pnpm-workspace.yaml
  package.json


## Content Strategy

Allt content ligger i packages/content.

Inga JSON-filer om markdown räcker.
Inga extra metadatafält om de inte används.


### Bio

press/
  bio.short.md
  bio.medium.md
  bio.long.md

Frontmatter (minimal):

title: Short Bio

Ingen wordCount.
Ingen lastUpdated.
Git hanterar historik.


### Releases

releases/
  revolutionen/
    release.md

Exempel på frontmatter:

title: Revolutionen
type: ep
releaseDate: 2025-05-01
cover: /covers/revolutionen.jpg

links:
  spotify: https://...

tracks:
  - title: Låt 1
  - title: Låt 2

Endast det som faktiskt används på sidan.


### Gigs

En enda markdown-fil räcker:

gigs/gigs.md

Exempel:

## 2026-03-10 – Debaser, Stockholm
Info om giget.

## 2025-11-02 – Under Bron, Stockholm

Sortering sker på datum i build.
Inget status-fält behövs.


### Contact

Frontmatter:

email: contact@flykten.se
booking: booking@flykten.se

Resten är markdown-body.


## Web App Design

### Routing

Astro används med filbaserad routing.

Sidor:

/
 /music
 /live
 /press
 /releases/[slug]

Alla routes genereras statiskt vid build.


## Layout Strategy

### BaseLayout.astro

- Semantisk HTML
- Global navigation
- Footer
- Importerar brand tokens

### RetroLayout (valfri)

Används på startsidan för tabell-layout.
Tabeller används som estetiskt grepp, inte som teknisk nödvändighet.


## Styling

All styling ligger i packages/brand.

tokens.css innehåller CSS custom properties som:

--bg
--text
--accent
--font-base

retro.css innehåller:

- Tabell-layout
- Borders
- Länkstilar
- Minimal hover-effekt

Ingen CSS-processor.
Ingen Tailwind.
Ingen design token pipeline.


## Content Loading

Astro Content Collections används.

Ingen custom loader.
Ingen egen parsing.
Ingen separat validation.ts.

Schema definieras där det behövs med minimal typning.
Om content är ogiltigt ska build faila.


## Build Process

1. pnpm install
2. pnpm dev
3. pnpm build
4. dist/ genereras

Det finns ingen annan pipeline.


## Accessibility

- Semantisk HTML
- Alt-texter
- Tydlig heading-hierarki
- Skip-to-content länk

Ingen komplex ARIA-arkitektur.


## MCP (Optional)

tools/mcp-flykten/ är för framtida automation.

Den får:
- Läsa markdown
- Skriva markdown
- Validera enkel struktur

Den är inte nödvändig för webbplatsen.
Om den tas bort ska allt fortfarande fungera.


## What This Project Is Not

- Det är inte ett CMS
- Det är inte en SaaS
- Det är inte en marknadsföringsplattform
- Det är inte optimerat för tillväxt
- Det är inte beroende av externa API:er


## Long-Term Maintainability

Projektet ska:

- Vara begripligt för någon som öppnar det om 5 år
- Inte kräva specialkunskap
- Inte ha dold magi
- Kunna migreras till annat statiskt system om Astro försvinner

Om något i designen bryter mot detta ska det förenklas.