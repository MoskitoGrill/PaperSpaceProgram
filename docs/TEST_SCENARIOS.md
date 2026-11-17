# Katalog scénářů vývojového testeru

Stav k 16. 11. 2026: SYS-001 a ORB-001/002 jsou dostupné lokálně. Orbitální změna zatím není nasazena. Ostatní scénáře zůstávají plánované. Výsledky skutečně provedených kontrol jsou v PROJECT_STATE a HANDOFF.

## Pravidla testeru

Tester je dostupný v lokálním vývoji a v uživatelem schválené veřejné testovací sestavě Pages. Běžný produkční build jej neobsahuje. Testovací sestava nemá omezení přístupu ani přihlašování.

Každý scénář vytvoří vlastní izolovanou session s pevným seedem/verzí a stavem světa, případně vlastními body a záznamy misí. Reset obnoví celý scénář, ne jen loď či kameru. Běžné světy ani jejich autosave se nesmějí přepsat. Scénář běží nad skutečným herním jádrem a nevyžaduje ruční hraní předcházející mise. Přechod zpět do menu musí bezpečně ukončit testovací session.

## Šablona dostupného scénáře

Upřesnění z chatu 01: tester průběžně shromažďuje všechny relevantní funkční scénáře. Název, popis, číslovaný návod a očekávané výsledky jsou dostupné před tlačítkem Spustit i během scénáře. Ovládání ověřované mechaniky odpovídá hře; diagnostika/reset pouze doplňují přípravu. Menu a jeho vzhled ověřovat přímo. SYS-001 ověřuje skutečnou izolaci/reset session, nikoli vzhled úvodní stránky.

- **ID a název:** stabilní a shodné v testeru i dokumentaci.
- **Stav:** plánovaný / dostupný / vyžaduje opravu; datum a verze posledního ověření.
- **Režim:** 2D / prostorový / oba (každý ověřit zvlášť).
- **Účel, požadovaná funkce a související úkol.**
- **Spuštění:** skutečná cesta z menu, případně stabilní přímý odkaz, pokud existuje.
- **Výchozí stav:** čas, lodě, zdroje, historie, kamera, pauza/warp.
- **Postup:** číslované kroky s konkrétními tlačítky a pozorovatelným výsledkem každého důležitého kroku; při čekání uvést čas či událost.
- **Úspěch/neúspěch:** jednoznačná kritéria a případné tolerance.
- **Reset/ukončení:** jak test opakovat bez zbytků předchozího běhu.
- **Automatické kontroly a známá omezení:** pouze skutečně existující.

## Plánovaný výchozí katalog

| ID | Účel a připravený stav | Stav / vznikne při |
| --- | --- | --- |
| SYS-001 | Spuštění a reset izolovaného testovacího světa | Dostupný – lokální vývojová kostra |
| ORB-001 | Loď na kruhové orbitě, stabilita a fáze | Dostupný lokálně – chat 03 |
| ORB-002 | Loď na eliptické orbitě, rychlost, fáze a perioda | Dostupný lokálně – chat 03 |
| FLT-001 | Připravený zážeh s přesně danou zásobou paliva | Plánovaný – řízení |
| TIME-001 | Dvě lodě připravené pro přepnutí a warp | Plánovaný – více lodí |
| SAVE-001 | Stav před událostí a uprostřed zážehu | Plánovaný – ukládání |
| HIST-001 | Bod před startem A a uchovaný budoucí záznam A, B připravena | Plánovaný – replay |
| HIST-002 | A a B těsně před zásahem do přehrávané mise | Plánovaný – konflikty |
| STAGE-001 | Vícedílná raketa těsně před separací | Plánovaný – staging |
| ENTRY-001 | Kabina před vstupem do atmosféry | Plánovaný – návrat |
| DOCK-001 | Dvě lodě blízko setkání se správnou relativní rychlostí | Plánovaný – dokování |
| VIS-PLANET-001 | Kamera daleko od tělesa, předvolby vzdáleností a kontrolní bod na povrchu | Plánovaný – D04, technický přechod kresba/koule |
| VIS-PART-001 | Několik dílů, asymetrický vzorek a hrana kartonu v různých pohledech | Plánovaný – D03, vzhledová pipeline |
| ANGLE-001 | Připravená jednoduchá a asymetrická digitální kresba pro import do editoru, generování pohledů a ověření exportu v herním náhledu | Plánovaný – A01, před finálním vzhledem |

U VIS-PLANET-001 budoucí postup ověří vzdálenou kresbu, přiblížení k prostorové maketě, návrat zpět, rychlé opakované zoomování kolem přechodu, zachování referenčního bodu a nezměněnou fyziku. Konkrétní tlačítka a prahy doplní implementační chat podle skutečné aplikace.

## SYS-001 — Izolovaná session a reset

- **Stav:** dostupný, implementace 16. 11. 2026, verze aplikace 0.1.0. Skutečné výsledky ověření viz HANDOFF.
- **Režim:** 2D, systémový scénář bez fyziky.
- **Účel:** ověřit izolaci session, skutečný krok jádra a úplný reset (chat 02 / T01).
- **Cesta:** `npm run dev` → adresa vypsaná Vite → Menu → Vývojový tester → SYS-001 → Spustit.
- **Výchozí stav:** tick 0, čas 0 s, těleso `sys001-body` na (70, 0), značka `sys001-vessel` na (300, 50), pevná projekce Canvasu. Žádné zdroje, historie, automatický čas ani warp. Objekty a vnořené polohy vznikají nově při spuštění i resetu; stabilní ID neznamená sdílenou instanci.

1. Otevři Vývojový tester. Název, účel a čtyři číslované kroky jsou vidět před tlačítkem Spustit; běžící svět ještě není zobrazen.
2. Zvol Spustit. Zobrazí se těleso a značka lodě, tick 0 a čas 0 s. Návod zůstane dostupný.
3. Třikrát zvol Provést jeden krok. Očekávej tick 3 a čas 0,05 s; ID a polohy se nezmění.
4. Zvol Reset scénáře. Očekávej tick 0, čas 0 s a úplné původní zobrazení. Opakuj krok a reset několikrát: výsledek musí být stále stejný.
5. Proveď jeden krok → Zpět do menu → Vývojový tester → Spustit. Očekávej nový nezávislý stav s tickem 0 a časem 0 s.

**Úspěch:** všechny očekávané hodnoty souhlasí a předchozí běh neovlivní nové spuštění. Posun času je tick / 60, nikoli čas prohlížeče. Reset znovu vytváří celý svět; návrat do menu zahodí session. Renderer neprovádí změny světa. Scénář nic nezapisuje do běžných světů ani webového úložiště.

**Automatizace:** Vitest kontroluje tick/čas, nezměněné entity, izolaci session/snapshotů a opakovaný reset; Playwright celý průchod včetně shody Canvasu a čistého úložiště. Dostupnost prohlížečů a skutečné výsledky viz HANDOFF.

**Přímá kontrola menu a sestavy (není další herní scénář):** obě volby režimů jsou neaktivní; 2D bez štítku, 2D/3D s Připravujeme. `npm run build` a `npm run preview` zobrazí menu bez testeru. `node tests/check-production.mjs` kontroluje i obsah artefaktu. E2E načítá produkci z `/PaperSpaceProgram/` bez serverového fallbacku. Samostatný Pages build obsahuje tester; finální vzhled a funkční hra se tím neprohlašují za dokončené.


### SYS-001 ve veřejném testovacím buildu (16. 11. 2026)

Po úspěšném workflow je cesta https://moskitogrill.github.io/PaperSpaceProgram/ → Vývojový tester → Spustit. Proveď stejné číslované kroky 1–5 výše: tick 0 → 3 kroky = 0,05 s → úplný reset → nové spuštění od nuly. Menu navíc označuje Veřejná testovací sestava a build ID končí -test. Stav skutečného vzdáleného nasazení viz PROJECT_STATE/HANDOFF. Automatický E2E pro Pages build provádí celý stejný životní cyklus a kontroluje i načítání dynamického tester modulu v podadresáři, chyby stránky a čisté úložiště.

**Uživatelské ověření 16. 11. 2026:** po nasazení veřejné verze uživatel potvrdil, že funguje. Souhrnné potvrzení bez specifikace prohlížeče a jednotlivých kroků; žádný nový problém nehlásí. Automatické výsledky jsou samostatně v HANDOFF.

## ORB-001 — Kruhová dráha

- **Stav:** dostupný lokálně, 16. 11. 2026, chat 03; aktuální změna zatím nenasazena.
- **Režim / účel:** 2D; produkční Keplerův pohyb, kruhová stabilita, čas a fáze.
- **Cesta:** `npm run dev` (zde také `node .tools/package/bin/npm-cli.js run dev`) → adresa Vite → Vývojový tester → ORB-001 → Spustit. Alternativně `npm run build:pages` a `npm run preview -- --outDir dist-pages`.
- **Výchozí stav:** tick 0, planeta na (0,0), μ=3,6e12 m³/s², poloměr 600 km; loď na (1000000,0) m, rychlost (0,1897,366596) m/s, a=1000 km, e=0. Pevná kamera, pouze ruční čas, bez zdrojů/historie/uložení. Izolovaná session.

1. Vyber ORB-001 a přečti čtyři kroky před spuštěním. Canvas je skrytý. Spustit zobrazí loď vpravo a čas 0 s.
2. Provést jeden krok: tick 1, čas přibližně 0,016667 s. +60 s přidá dalších 3600 ticků. Loď postupuje proti směru hodin, vzdálenost stále 1000 km a rychlost přibližně 1897,367 m/s.
3. Reset scénáře → zadej do Posun v sekundách 1655,766 (prohlížeč může vyžadovat desetinnou tečku) → Posunout čas. Loď je vlevo, vzdálenost stále 1000 km. Čas 1655,766667 s.
4. Reset → zadej 3311,529 → Posunout čas. Loď téměř na počátku; skutečný čas 3311,533333 s se liší od periody 3311,529421932 s zaokrouhlením na tick. Není požadován centimetrový návrat z tohoto zaokrouhleného UI vstupu.
5. Zadej záporný interval → Posunout čas. Chyba je vidět a čas/poloha se nezmění. Reset obnoví svět, interval 60 a odstraní chybu.
6. Zpět do menu → Vývojový tester → ORB-001 → Spustit: nový tick 0 a stejné výchozí zobrazení. Seznam scénářů umožní přejít na SYS-001 nebo ORB-002.

**Úspěch:** popsané pohyby/hodnoty, relativní odchylky energie a momentu do 1e-8, stabilní reset bez zápisu úložiště. Automatická přesnost polohy, rychlosti, periody a fáze podle ADR 0004, nikoli podle pixelů. Automatizace: unit a Chromium E2E dev/Pages. Firefox/Safari aktuálně neověřeny. Obraz je provizorní.

## ORB-002 — Eliptická dráha

- **Stav:** dostupný lokálně, 16. 11. 2026, chat 03; aktuální změna zatím nenasazena.
- **Režim / účel:** 2D; správná proměnlivá rychlost a fáze eliptického Keplerova pohybu.
- **Cesta:** `npm run dev` → adresa Vite → Vývojový tester → ORB-002 → Spustit. Stejná lokální Pages alternativa jako ORB-001.
- **Výchozí stav:** stejné těleso a a=1000 km; e=0,3, periapsida 700 km / apoapsida 1300 km od středu. Tick 0, loď (700000,0) m, rychlost (0,2585,674822) m/s, pohyb proti směru hodin. Žádné zdroje/historie/uložení, izolovaný svět, pevná kamera, ruční čas.

1. Před spuštěním přečti návod. Spustit: loď vpravo v periapsidě, vzdálenost 700 km, rychlost přibližně 2585,675 m/s.
2. +60 s: loď se pohne nahoru, vzdálenost roste a rychlost klesá. Není to rovnoměrné objíždění nakreslené elipsy.
3. Reset → zadej 1655,766 → Posunout čas. Loď vlevo poblíž apoapsidy, vzdálenost přibližně 1300 km, rychlost přibližně 1392,286 m/s.
4. Reset → zadej 3311,529 → Posunout čas. Téměř původní poloha a rychlost; stejná perioda jako kruh. Čas zaokrouhlený na tick; platí stejné omezení ručního zadání jako u ORB-001.
5. Záporný posun odmítnut beze změny světa. Reset obnoví tick 0, periapsidu, interval 60 a odstraní chybu. Návrat do menu a nové spuštění opět začnou od nuly.

**Úspěch:** pozorované hodnoty i proměnlivá rychlost, relativní energie/moment ≤1e-8, izolace/reset. Fáze a perioda ověřeny nezávislou RK4 referencí v automatických testech; diagnostika v aplikaci samotná není nezávislým důkazem. Podrobné meze a měření: [experiment](experiments/orbit-03.md). Chromium E2E ověřuje oba buildy; další prohlížeče aktuálně neověřeny. Renderer pouze čte; žádné přepisování běžných světů.

## Uživatelská akceptace ORB-001/002 — 17. 11. 2026

Uživatel potvrdil: „oba scénáře prošli a jsou otestované“. ORB-001 a ORB-002 jsou ručně akceptované. Jde o souhrnné potvrzení obou scénářů bez určení prohlížeče nebo samostatných výsledků jednotlivých kroků. Žádný nový problém nebyl nahlášen. Automatické výsledky zůstávají odděleně doložené v HANDOFF a experimentu; potvrzení neznamená nové ověření SYS-001 ani vzdálené nasazení.
