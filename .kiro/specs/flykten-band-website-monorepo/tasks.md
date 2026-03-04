# Implementation Plan: Flykten Band Website Monorepo

## Overview

Implementationen följer en inkrementell strategi där vi bygger monorepo-strukturen först, sedan content-paketet, därefter web-appen med sidor, och slutligen styling och polish. MCP-servern är optional och implementeras sist.

Fokus är på enkelhet: använd Astro's inbyggda funktioner, undvik abstraktioner, och få något körbart snabbt.

## Tasks

- [x] 1. Setup
  - Skapa pnpm monorepo
  - Skapa apps/web (Astro)
  - Skapa packages/content
  - Skapa packages/brand
  - Verifiera pnpm dev fungerar
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 3.1, 3.2, 3.6_

- [x] 2. Lägg in content
  - Skapa bio.short.md, bio.medium.md, bio.long.md
  - Skapa en example release
  - Skapa gigs.md
  - Skapa contact.md
  - Kör pnpm dev och verifiera att Astro kan läsa content
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.6, 2.7, 13.1, 13.2, 13.3_

- [x] 3. Skapa grundlayout
  - Skapa BaseLayout.astro
  - Lägg till navigation
  - Lägg till skip-to-content
  - Importera tokens.css
  - Säkerställ att en tom startsida renderar
  - _Requirements: 3.5, 10.1, 10.2, 10.4, 11.1, 11.6_

- [ ] 4. Implementera sidor
  - Skapa / (startsida)
  - Skapa /music
  - Skapa /live
  - Skapa /press
  - Skapa /releases/[slug]
  - Använd Astro Content Collections, inga custom loaders
  - _Requirements: 5.1-5.6, 6.1-6.4, 7.1-7.4, 8.1-8.4, 9.1-9.4, 13.1, 13.2, 13.3_

- [ ] 5. Styling
  - Skapa tokens.css
  - Skapa retro.css
  - Applicera retro layout på startsidan
  - Lägg till enkel responsivitet
  - Markera aktiv sida i nav
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 10.3_

- [ ] 6. Accessibility pass
  - Kontrollera heading-hierarki
  - Lägg alt-texter
  - Testa keyboard navigation
  - Kontrollera färgkontrast
  - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 11.6_

- [ ] 7. Production build
  - Kör pnpm build
  - Verifiera dist/
  - Testa lokalt via preview
  - _Requirements: 14.1, 14.2, 14.3, 14.6, 15.1, 15.2, 15.3, 15.4, 15.5_

- [ ]* 8. Optional
  - Skapa tools/mcp-flykten
  - Lägg in enkel README
  - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5_

## Notes

- Tasks markerade med `*` är optional och kan skippas för snabbare MVP
- Fokus är på enkelhet: använd Astro's inbyggda funktioner där möjligt
- Content ska vara primärt, design sekundärt
- MCP-servern är helt optional och blockerar inte huvudimplementationen
- Alla content-ändringar ska reflekteras efter rebuild (hot reload i dev)
