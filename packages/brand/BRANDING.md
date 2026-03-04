# Flykten – Brandguide (Revolutionen EP)

Referens för typografi, färger och bildspråk så att hemsidan och material håller EP-stilen.

## Typografi

- **Rubriker / display:** CAPTURE IT (stencil, distressed). Fallback för webb: **Staatliches** (Google Fonts) – bold, uppercase, liknar EP-känslan.
- **Sekundär display:** STAATLICHES – bold sans, versaler.
- **Mono / tekniskt:** SPACE MONO – monospace, industriell känsla.

Rubriker ska kännas tunga och rå; body-text ska vara läsbar. Distressed/stencil-effekt på logotyp och titlar (t.ex. “FLYKTEN”, “REVOLUTIONEN”) kan åstadkommas med bild eller webbfont om CAPTURE IT används.

## Färger

| Roll            | Färg       | Användning              |
|-----------------|------------|--------------------------|
| Bakgrund        | `#0a0a0a`  | Sidbakgrund (mörk)       |
| Bakgrund sekundär | `#1a1a1a` | Kort, sektioner          |
| Text            | `#f5f5f0`  | Huvudtext (off-white)    |
| Text dämpad     | `#8a8a8a`  | Mindre viktig text       |
| Accent          | `#d71920`   | Länkar, CTA, markeringar |
| Kantlinjer      | `#333333`   | Borders, avgränsning     |

Accentfärgen ska användas sparsamt men tydligt (länkar, knappar, viktiga element).

## Bildspråk

- **Foton:** Råa svartvita bilder, gärna korniga och överexponerade.
- **Bakgrund:** Svart eller mörk med subtil grain/textur (som EP-omslaget).
- **Känsla:** Punk, DIY, rebelliskt – inte polerat eller corporate.

## Logotyp och EP-omslag

- **FLYKTEN** och **REVOLUTIONEN** i distressed, blockig vit/off-white på mörk bakgrund.
- Referensbilder för EP-stil finns i `apps/web/public/images/brand/` (t.ex. för bakgrund, typografi, logotyp).

## Användning i webben

- Importera `tokens.css` i layout; använd `var(--accent)`, `var(--font-display)` etc.
- För display-titlar: `font-family: var(--font-display);` + uppercase.
- Behåll hög kontrast (mörk bakgrund, ljus text) för läsbarhet och tillgänglighet.
