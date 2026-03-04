# Flykten – AI Agent Guide

Det här dokumentet ger AI-agenter (t.ex. Cursor) kontext om projektet så att förslag och ändringar följer visionen och specifikationerna.

## Vad är projektet?

**Flykten** är ett statiskt publiceringssystem för bandet Flykten: en enkel bandhemsida och ett långsiktigt arkiv. Det är **inte** ett CMS, en SaaS eller en marknadsföringsplattform. Allt innehåll ägs av bandet och ligger i repot. Ingen databas, ingen backend, ingen extern tjänst krävs.

- **Känsla:** Rå, direkt, personlig – 90-tals bandsida med moderna verktyg under huven.
- **Mål:** Lätt att förstå, lätt att uppdatera, fritt från onödig komplexitet.

## Kiro-specifikationer

Projektet är specificerat med [Kiro](https://kiro.dev) i `.kiro/specs/flykten-band-website-monorepo/`. Använd dessa som källa till sanning:

| Fil | Innehåll |
|-----|----------|
| `requirements.md` | Formella krav (User Stories + Acceptance Criteria). Krav 1–16 täcker monorepo, content, webb, design, sidor, tillgänglighet, build, MCP m.m. |
| `design.md` | Teknisk design: stack, mappstruktur, content-format, layout, styling, vad projektet **inte** är. |
| `tasks.md` | Implementation plan med checkboxar. Visar vad som är klart (t.ex. Setup, Content, BaseLayout) och vad som återstår (Sidor, Styling, A11y, Build, MCP). |

**Vid osäkerhet:** Läs relevant del av `requirements.md` eller `design.md` och följ den. Undvik lösningar som kräver databas, runtime, extern CMS eller onödig abstraktion.

## Monorepo-struktur

```
flykten/
  apps/web/          # Astro-webbapp (statisk SSG)
  packages/content/  # Markdown: bio, releases, gigs, contact
  packages/brand/    # tokens.css, retro-styling
  tools/mcp-flykten/ # Valfri MCP-server för AI-assisterad content
```

- **Build:** pnpm workspaces. `pnpm dev` startar webben, `pnpm build` bygger statiskt.
- **Content:** Allt i `packages/content/` – press/bio.*.md, releases/[slug]/release.md, gigs/gigs.md, contact.md. Astro Content Collections läser innehållet; ingen custom loader.
- **Styling:** Endast `packages/brand` (CSS custom properties + eventuellt retro.css). Ingen Tailwind, ingen CSS-processor.

## Teknisk stack

- **Framework:** Astro (endast statisk generering).
- **Språk:** TypeScript där det används; sidor/layouts i `.astro`.
- **Styling:** Vanilla CSS + CSS custom properties från `brand/tokens.css`.
- **Content:** Markdown med frontmatter; schema i `apps/web/src/content/config.ts`.

## Designprinciper (från design.md)

1. Bygg så lite som möjligt.
2. Använd ramverkets inbyggda lösningar; undvik speciallösningar.
3. Content först, design sekundärt.
4. Undvik abstraktioner som inte ger direkt värde.
5. Om något känns "enterprise" är det troligen fel.

Tillgänglighet krävs: semantisk HTML, alt-texter, heading-hierarki, skip-to-content, tangentbordsnavigering, tillräcklig kontrast.

## Cursor-regler

Regler i `.cursor/rules/` förtydligar:

- Projektkontext och vad som gäller överallt (inkl. svenska som UI-språk där det är relevant).
- Astro: sidor, layout, content collections, ingen onödig JS.
- Content: format, frontmatter, var saker ska ligga.
- Brand/CSS: tokens, retro-look, ingen Tailwind/processor.

Läs och följ dessa regler vid kodändringar.

## Nästa steg (enligt tasks.md)

- **Task 4:** Implementera sidor (/, /music, /live, /press, /releases/[slug]) med Content Collections.
- **Task 5:** Styling (tokens.css, retro.css, tabell-layout på startsidan, aktiv sida i nav).
- **Task 6:** Accessibility-pass.
- **Task 7:** Production build och verifiering.
- **Task 8 (optional):** MCP-server i tools/mcp-flykten.

## Sammanfattning för agenten

- **Läs Kiro-specarna** i `.kiro/specs/` vid krav- eller designfrågor.
- **Håll dig till Astro + markdown + brand-CSS.** Inga nya ramverk eller databaser.
- **Förenkla.** Om du funderar på att lägga till något, kolla om det står i requirements/design; om inte, föreslå den enklaste lösningen som uppfyller kraven.
