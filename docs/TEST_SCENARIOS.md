# Katalog scénářů vývojového testeru

Stav k 16. 11. 2026: SYS-001 je implementovaný v lokálním vývojovém testeru. Ostatní scénáře zůstávají plánované. Výsledky skutečně provedených kontrol jsou v PROJECT_STATE a HANDOFF.

## Pravidla testeru

Tester bude dostupný ve vývojové sestavě pro autora. Veřejné zpřístupnění není požadavek; před publikací vyřešit jeho vyloučení nebo skutečné omezení přístupu. Samotné skryté tlačítko není zabezpečení. Žádný server či přihlašování se kvůli němu nyní nepřidává.

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
| ORB-001 | Loď už na kruhové orbitě, kontrola stability | Plánovaný – orbitální jádro |
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

**Přímá kontrola menu a sestavy (není další herní scénář):** obě volby režimů jsou neaktivní; 2D bez štítku, 2D/3D s Připravujeme. `npm run build` a `npm run preview` zobrazí menu bez testeru. `node tests/check-production.mjs` kontroluje i obsah artefaktu. E2E načítá produkci z `/PaperSpaceProgram/` bez serverového fallbacku. Nic není zveřejněné; finální vzhled a funkční hra se tím neprohlašují za dokončené.
