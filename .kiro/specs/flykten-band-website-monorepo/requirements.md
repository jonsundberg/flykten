# Requirements Document

## Introduction

Flykten-monorepo är ett enkelt, självständigt publiceringssystem för bandet Flykten.

Syftet är inte marknadsföring eller optimering, utan att bevara och publicera bandets uttryck på ett konsekvent och hållbart sätt. Systemet ska vara lätt att förstå, lätt att uppdatera och fritt från onödig komplexitet.

Webbplatsen ska kännas rå, direkt och personlig – som en 90-tals bandsida, men byggd med moderna, stabila verktyg under huven.

All content ska ägas av bandet och lagras i repo:t. Ingen extern CMS, ingen databas, ingen beroendestruktur som skapar inlåsning.

Målet är ett långsiktigt arkiv lika mycket som en hemsida.

---

## Glossary

- **Monorepo**: Ett repository som innehåller flera relaterade projekt/paket
- **Web_App**: Astro-baserad statisk hemsida för bandet
- **Content_Package**: Markdown-baserad content-källa med bio, releases, gigs och kontaktinfo
- **Brand_Package**: Paket med färger, typografi, CSS och visuella riktlinjer
- **MCP_Server**: Model Context Protocol server för AI-assisterad content-hantering
- **Build_System**: pnpm workspaces-baserat byggsystem för monorepo
- **Release**: En musikutgåva (album, EP, singel) med metadata och tracklist
- **Gig**: En spelning/konsert med datum, plats och information
- **Press_Kit**: Samling av bio-texter, pressbilder och kontaktinfo för media
- **Retro_Layout**: 90-tals inspirerad design med tabell-layout och minimal JavaScript

---

## Requirement 1: Monorepo Structure

**User Story:** Som bandmedlem vill jag ha alla projekt i ett repository, så att jag enkelt kan hantera hemsida, content och verktyg på ett ställe.

### Acceptance Criteria

1. THE Build_System SHALL organize code into workspaces: apps/web, packages/content, packages/brand, and tools/mcp-flykten
2. WHEN a developer runs "pnpm install", THE Build_System SHALL install all dependencies for all workspaces
3. WHEN a developer runs "pnpm dev", THE Build_System SHALL start the development server for Web_App
4. THE Build_System SHALL enable workspace dependencies between packages
5. THE Build_System SHALL support running commands across all workspaces

---

## Requirement 2: Content Management

**User Story:** Som bandmedlem vill jag skriva content i enkla markdown-filer, så att jag kan uppdatera hemsidan utan att röra kod.

### Acceptance Criteria

1. THE Content_Package SHALL store bio texts in three variants:
   - press/bio.short.md  
   - press/bio.medium.md  
   - press/bio.long.md
2. THE Content_Package SHALL store releases in releases/[slug]/release.md
3. THE Content_Package SHALL store gig information in gigs/gigs.json or gigs.md
4. THE Content_Package SHALL store contact information in contact.md
5. WHEN content files are modified, THE Web_App SHALL reflect changes after rebuild
6. THE Content_Package SHALL use consistent frontmatter structure across all markdown files
7. ALL markdown files SHALL use UTF-8 encoding

---

## Requirement 3: Static Website Generation

**User Story:** Som bandmedlem vill jag ha en snabb statisk hemsida, så att besökare får en stabil och enkel upplevelse utan serverkostnader.

### Acceptance Criteria

1. THE Web_App SHALL use Astro framework for static site generation
2. WHEN a developer runs "pnpm build", THE Web_App SHALL generate static HTML, CSS, and minimal JavaScript
3. THE Web_App SHALL render content from Content_Package without duplication
4. THE Web_App SHALL be deployable to any static hosting service
5. THE Web_App SHALL generate semantic HTML with proper heading hierarchy
6. THE Web_App SHALL not require any backend runtime

---

## Requirement 4: Retro Design System

**User Story:** Som bandmedlem vill jag ha en 90-tals inspirerad design, så att hemsidan känns autentisk och unik för vårt band.

### Acceptance Criteria

1. THE Brand_Package SHALL define color tokens for the retro theme
2. THE Brand_Package SHALL define typography tokens including font families and sizes
3. THE Brand_Package SHALL provide CSS with table-based layout patterns
4. THE Brand_Package SHALL include guidelines for logo and font usage
5. THE Web_App SHALL use Brand_Package tokens for all styling
6. THE Web_App SHALL implement responsive design while maintaining retro aesthetics
7. THE Web_App SHALL use minimal JavaScript (only when necessary)

---

## Requirement 5: Homepage

**User Story:** Som besökare vill jag se bandets viktigaste information på startsidan, så att jag snabbt kan hitta musik och kontakt.

### Acceptance Criteria

1. WHEN a user visits "/", THE Web_App SHALL display band logo or name
2. THE Web_App SHALL display a short introduction text
3. THE Web_App SHALL display the latest release
4. THE Web_App SHALL display links to Spotify, Bandcamp, and YouTube
5. THE Web_App SHALL display contact information or link
6. THE Web_App SHALL implement homepage using table-based retro layout

---

## Requirement 6: Music Page

**User Story:** Som besökare vill jag se all musik på ett ställe, så att jag kan utforska bandets diskografi.

### Acceptance Criteria

1. WHEN a user visits "/music", THE Web_App SHALL display all releases
2. THE Web_App SHALL provide streaming platform links for each release
3. WHERE embeds are available, THE Web_App SHALL display embedded players
4. WHEN a user clicks a release, THE Web_App SHALL navigate to the release detail page

---

## Requirement 7: Live Page

**User Story:** Som besökare vill jag se kommande spelningar, så att jag kan komma och se bandet live.

### Acceptance Criteria

1. THE Web_App SHALL display upcoming gigs
2. THE Web_App SHALL display past gigs in chronological order
3. IF no upcoming gigs exist, THEN THE Web_App SHALL display a clear message
4. EACH gig SHALL display date, venue, city, and optional ticket link

---

## Requirement 8: Press Page

**User Story:** Som journalist eller booker vill jag hitta press-material, så att jag kan skriva om bandet eller boka dem.

### Acceptance Criteria

1. THE Web_App SHALL display all three bio variants
2. THE Web_App SHALL provide links to press images or placeholders
3. THE Web_App SHALL display booking and contact information
4. Bio texts SHALL be easily selectable and copyable

---

## Requirement 9: Release Detail Pages

**User Story:** Som besökare vill jag läsa mer om varje release.

### Acceptance Criteria

1. THE Web_App SHALL generate routes for all releases
2. THE Web_App SHALL display tracklist
3. THE Web_App SHALL display credits and release text
4. IF metadata exists, THEN release date and format SHALL be shown

---

## Requirement 10: Navigation

**User Story:** Som besökare vill jag enkelt navigera mellan sidor.

### Acceptance Criteria

1. THE Web_App SHALL display global navigation on all pages
2. Navigation SHALL include: home, music, live, press
3. THE current page SHALL be visually indicated
4. Navigation SHALL use simple HTML links (no JS routing)

---

## Requirement 11: Accessibility

**User Story:** Som besökare med funktionsnedsättning vill jag kunna använda hemsidan.

### Acceptance Criteria

1. THE Web_App SHALL use semantic HTML elements
2. ALL images SHALL include alt text
3. Proper heading hierarchy SHALL be maintained
4. Sufficient color contrast SHALL be ensured
5. Site SHALL be navigable by keyboard
6. A skip-to-content link SHALL exist

---

## Requirement 12: MCP Server Preparation

**User Story:** Som bandmedlem vill jag förbereda för AI-assisterad content-hantering i framtiden.

### Acceptance Criteria

1. THE Monorepo SHALL include tools/mcp-flykten directory
2. THE MCP_Server SHALL be optional
3. IF implemented, MCP_Server SHALL read from Content_Package
4. IF implemented, MCP_Server SHALL write content following existing structure
5. MCP_Server SHALL validate frontmatter before writing

---

## Requirement 13: Markdown Parsing

**User Story:** Som utvecklare vill jag att markdown renderas stabilt.

### Acceptance Criteria

1. THE Web_App SHALL use Astro's standard markdown pipeline
2. IF frontmatter is invalid, THEN build SHALL fail with clear error
3. Frontmatter metadata SHALL be preserved during rendering
4. Custom parsing logic SHALL NOT be introduced unless strictly necessary

---

## Requirement 14: Build and Deployment

**User Story:** Som bandmedlem vill jag enkelt kunna deploya hemsidan.

### Acceptance Criteria

1. "pnpm build" SHALL create production-ready static files
2. Build artifacts SHALL output to a standard dist directory
3. All routes SHALL be generated at build time
4. Content SHALL be validated during build
5. IF validation fails, THEN build SHALL stop with error
6. Deployment SHALL be possible by uploading dist directory

---

## Requirement 15: Development Experience

**User Story:** Som utvecklare vill jag ha en smidig utvecklingsmiljö.

### Acceptance Criteria

1. "pnpm dev" SHALL start with hot reload
2. Content changes SHALL trigger reload
3. Code changes SHALL trigger rebuild
4. Errors SHALL be clearly displayed
5. Dev server SHALL start quickly (<5 seconds on normal machine)

---

## Requirement 16: Design Philosophy

**User Story:** Som band vill vi att hemsidan speglar vår identitet.

### Acceptance Criteria

1. THE Web_App SHALL avoid marketing-oriented language
2. THE Web_App SHALL avoid modern startup aesthetics
3. THE Web_App SHALL prioritize readability over polish
4. Animations SHALL be minimal and purposeful
5. The site SHALL feel handcrafted rather than corporate
6. Simplicity SHALL be preserved even if new features are added
7. Content SHALL always be primary, design secondary