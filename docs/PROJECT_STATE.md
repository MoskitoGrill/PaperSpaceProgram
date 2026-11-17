# Aktuální stav projektu

Aktualizováno 17. 11. 2026: chat 03 dokončen; uživatel potvrdil úspěšné ruční otestování ORB-001 i ORB-002. Orbitální pohyb a ORB-001/002 jsou dostupné v dev a v sestaveném dist-pages; tato změna dosud nebyla odeslána ani nasazena.

## Dostupné funkce

Menu, build ID, původní SYS-001 a izolované ORB-001 (kruh), ORB-002 (elipsa). Produkční analytický Keplerův modul počítá polohu a rychlost v SI od epochy, session jako jediný zapisovatel, renderer pouze čte. Ruční tick 1/60 s, +60 s a zadaný kladný interval zaokrouhlený na ticky; reset celého scénáře, žádné webové úložiště. Návody jsou před spuštěním i během běhu. Režimy hry zůstávají neaktivní. Bez tahu, atmosféry, automatického času, warpu, editoru a ukládání.

## Ověření

Typecheck a lint prošly; Vitest 9/9. Nezávislé kartézské RK4 řešení, jeho konvergence, sin/cos kruh, fáze i perioda po 100 obězích vyhověly schváleným mezím. Největší rozdíl polohy 0,000165 m, rychlosti 4,657e-7 m/s, fáze 2,347e-10 rad. Podrobnosti a reprodukce: [experiment](experiments/orbit-03.md), rozhodnutí [ADR 0004](adr/0004-orbit-motion.md).

Oba buildy a kontrola produkce bez testeru prošly. Chromium E2E 7/7: SYS-001, oba orbitální scénáře v dev i statické Pages podcestě a produkce bez testeru. E2E servery vyžadují spuštění mimo sandbox (uvnitř se nerozběhly). Finální kontrola po drobné úpravě resetu viz HANDOFF. Vizuálně prohlédnut screenshot ORB-002: texty a ovládání čitelné, bez překryvů.

## Hosting a omezení

Stávající veřejná verze: https://moskitogrill.github.io/PaperSpaceProgram/, dříve ověřený build 7ab95de pouze se SYS-001; uživatel potvrdil funkčnost v chatu 02. Workflow nasazuje dist-pages po push na main, v tomto chatu push neproveden. Běžný build dist je bez testeru.

Lokální Firefox měl v předchozí etapě problém validace mozglue.dll; nové orbity v něm nejsou ověřeny. Předchozí Linux CI ověřovalo pouze tehdejší SYS-001, nikoli aktuální orbity. Safari/mobil neověřeny. Dřívější audit: 7 moderate v dev ESLint/minimatch; závislosti se neměnily. Přesnost platí pro doložené konfigurace, nikoli všechny elipsy. Testovací planeta neurčuje finální soustavu.

## Další krok

Uživatel 17. 11. 2026 potvrdil, že oba orbitální scénáře prošly a jsou otestované. Jde o souhrnnou ruční akceptaci bez údaje o prohlížeči nebo výsledku jednotlivých kroků; nové ruční ověření SYS-001 tím nedokládáme. Žádný nový problém nehlásí. Další samostatný chat: projednat tah, palivo, hmotnost, orientaci a HUD (chat 04); nepřidávat předčasně warp ani editor.
