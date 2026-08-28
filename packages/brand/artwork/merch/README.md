# Merch-motiv

Tryck- och broderifärdiga motiv för keps, t-shirt och märken. Allt är enfärgat vitt på transparent bakgrund, avsett för svart plagg.

## Filer

| Motiv | Beskrivning | Bäst för |
|-------|-------------|----------|
| `cap-hat-wordmark-wide` | Kaptensmössan med FLYKTEN i båge över | Kepsfront (vald för kepsen) |
| `cap-hat-wordmark-stacked` | Samma mössa men stående, med rak logotyp | T-shirt, patch, ryggtryck |
| `hands-hat-wordmark` | Två händer lyfter mössan, tomt under | T-shirt, patch, tryck |
| `cap-owl-wordmark-wide` | Ugglan med FLYKTEN i båge över | Kepsfront |
| `emblem-owl-eyes` | Ugglans ringögon och näbb, utan huvudkontur | Litet broderi (sida, bak, pin) |
| `cap-skull-wordmark-wide` | Dödskallen i kaptensmössa med FLYKTEN i båge över | Kepsfront |
| `cap-skull-wordmark-stacked` | Samma motiv men stående, som EP-omslaget | T-shirt, tryck, patch |
| `skull-captain` | Endast dödskallen | Fristående märke, ryggtryck |
| `wordmark-drip` | Endast logotypen med droppar | Kepsfront, ärm, rakt textbroderi |
| `emblem-sun-rose` | Sol med ros, från mössmärket | Litet broderi (sida, bak, pin) |

Varje motiv finns som `.svg` (vektor, skicka den till tryckeriet) och `.png` (4096 px bred, för mockups och webb). `source/` innehåller originalbilderna i 1024 px som SVG:erna traserats från.

Både ugglan och kaptensmössan kommer från det självbetitlade omslaget (`apps/web/public/covers/flykten.jpg`) – ugglan svävar i dimman, mössan bärs av figuren nere till vänster. Motiven här är tydligare och mer grafiska eftersom de ska läsa i tråd och tryck.

## Produktion

- **Färg:** vit eller off-white (`#f5f5f0`) tråd/tryck på svart. Off-white ger den varmare, mer vintage-tonen.
- **Slitage:** motiven är rena med flit – nött look spricker sönder i vektorisering och löses i tryckteknik.
- **Kepsfront:** motivet ryms inom ca 10 × 6 cm. Håll minsta detalj kring 1,5–2 mm så den klarar satinsöm.
- **Broderi:** `cap-hat-wordmark-wide` är mössan i ren kontur, alltså få stygn och billig att brodera – men solmärkets taggar behöver förenklas eller köras något större. `emblem-owl-eyes` är minst känslig och klarar litet format. På ugglan i bred version behöver de yttre fjädertopparna trubbas av, och på dödskallen behöver hårstråna tjockas upp och glesas ut.
- **Marginaler:** `emblem-owl-eyes` har stor tom yta runt motivet eftersom källbilden är kvadratisk. Tryckeriet får beskära till motivet.
- **Tryck (DTF/screen):** motiven fungerar som de är, ingen justering behövs.

## Regenerera

`scripts/vectorize-artwork.sh` traserar allt i `source/` till SVG och renderar PNG. Kräver `brew install potrace librsvg`.
