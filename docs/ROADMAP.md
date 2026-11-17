# Etapy a ověřitelné úkoly

Datum: 8. 11. 2026. **DOPORUČENO – čeká na schválení**. Nenahrazuje schválenou vizi GDD. Bez termínového slibu.

Aktualizace 16. 11. 2026: uživatel přijal směr malých chatů, tester a předávání informací; viz [ADR 0001](adr/0001-workflow-and-modes.md). Konkrétní technické detaily a rozsah každého implementačního chatu se projednají na jeho začátku. Následující seznam určuje návaznosti, není seznamem kopírovatelných zadání.

## Změny proti GDD §12

Původní etapy mají dobrý cílový rozsah, ale historii testují příliš pozdě. Více lodí je potřeba už pro odhozený stupeň, ukládání pro ověření determinismu. Skutečné SOI přechody nelze ověřit na jedné planetě; přesunout jejich první test k malému druhému tělesu. Včas oddělit startovní základ od kompletního tepelného a atmosférického modelu.

Původní etapu 0 rozdělit na plánování a následnou technickou kostru. Malý experiment původních etap 4–5 vložit před editor; jejich plný uživatelský rozsah se dokončí později. Nejde o implementaci celé časové osy před první hratelností.

## Navržené pořadí

| Etapa | Výsledek v prohlížeči a brána dokončení | Vazba na GDD |
| --- | --- | --- |
| 0A – plán | Projednané dokumenty, schválený první milník a rozhodnutí v registru | 0, nynější fáze |
| 0B – kostra | Jedna jednoduchá stránka s vývojovým testerem, izolovaným scénářem a resetem; build, typy, lint a jeden smysluplný test jádra | 0 po domluvě rozsahu |
| 1A – fyzika | Jedna planeta, předdefinovaná loď, tah/palivo/orientace, kruhová i eliptická orbita; měření chyb | 1 |
| 1B – svět a historie | Dvě předdefinované lodě, checkpoint celého světa, replay A při řízení B, bezpečný konflikt, export/import | Malý výřez 4–5 posunutý vpřed |
| 2 – editor a startovní smyčka | Malý katalog, připojení, staging, funkční odhozené stupně, save blueprintu, Undo/Redo, start a návrat | 2 a část 1 |
| 3 – let k měsíci a zpět | Druhé těleso a SOI, mapa a manévry, atmosféra/teplo/padák/terén; měsíční přistání a návrat s uložením | 3 |
| 4 – trvalý program a historie | Více lodí, pozadí včetně odporu a setkání, warp, omezené body a srozumitelná časová osa; opakované S7–S9 | Dokončení 4–5 |
| 5 – rendezvous a stanice | Relativní navigace, RCS/SAS, porty, spojení/rozdělení a palivo; konflikt historie přes dokování | 6 |
| 6 – úplný 2D sandbox | Výchozí soustava, meziplanetární let, katalog, dohodnuté základní systémy, návod, stabilita a dlouhé scénáře | 7 |
| Po 2D – prostorový a vizuální experiment | Malé stylové vzorky a prostorové základy; samostatně funkční přechod planet kresba/koule před finálním vzhledem | 8 a 10, upřesněno 16. 11. |
| Později – nezávislá rozšíření | Jen postupně schválené balíky, žádná povinnost realizovat vše | 9 |

Energetika, komunikace, věda a posádka mají vlastní návrhovou bránu před implementací v etapách 5–6. EVA/rovery/základny jsou v GDD na více místech s rozdílnou mírou závaznosti; rozsah výslovně rozhodnout před deklarací hotového sandboxu. Nevydávat je nyní ani za povinnou první implementaci, ani za definitivně odmítnuté.

## První milník M1: důkaz fyziky a měnitelné historie

Upřesnění chatu 01 dne 16. 11. 2026: [ADR 0003](adr/0003-first-web-shell.md) schvaluje konkrétní kostru, nikoli všechny podrobnosti M1. [Zadání chatu 02](CHAT_02.md) má přednost v rozsahu T01: zahrnuje minimální stav a explicitní krok ticku z T02, bez automatického běhu, fyziky a řazení budoucích příkazů. Chat 03 na tento základ naváže orbitálním pohybem; chat 05 zůstává pro reálný čas a warp. T01 zahrne build ID/stav funkcí a přípravu GitHub Pages, produkční build bez testeru.

Zahrnuje 0B, 1A, 1B. Žádný editor, finální grafika, kariéra, posádkový systém, velká soustava ani obecný autopilot. Scénáře se spouštějí z vývojového testeru nad předdefinovanými loděmi a mají reset i návody. Podklady experimentu a naměřené výsledky se mají uložit do `docs/experiments/` při jeho realizaci.

| Úkol | Závisí na | Konkrétní výstup / hotovo, když |
| --- | --- | --- |
| T00 | Schválení plánu | Zapsaná přijatá rozhodnutí, rozsah M1 a případné změny; žádný předpokládaný souhlas |
| T01 | T00 | Vite/TS kostra, lockfile, build/typecheck/lint/test; tester spustí izolovaný svět SYS-001, ukáže stav a umožní reset |
| T02 | T01 | Jednotky, ID, čistý WorldState, čas a stabilní řazení příkazů; 30/60/144 FPS vede ke stejnému počtu kroků a výsledku |
| T03 | T02 | Keplerův referenční pohyb, kruhová/eliptická dráha a měření energie/periody; renderer pouze čte stav |
| T04 | T03 | Tah, palivo, rotace a měnící se hmotnost; vakuový zážeh odpovídá Ciolkovského rovnici v dohodnuté toleranci |
| T05 | T04 | Přepínání analytický/numerický režim a bezpečný warp; žádný skok souřadnic, nejbližší událost se nepřeskočí |
| T06 | T02, T05 | Dvě nezávislé lodě a přepínání hráče; průběh A se nezmění pouhým přepnutím na B |
| T07 | T06 | Snapshot + oddělený MissionRecord, validovaný export/import; save/load uprostřed zážehu i před událostí pokračuje správně |
| T08 | T07 | Zaznamenat A, přijmout výsledek, obnovit celý svět a létat B; A znovu odstartuje právě jednou a zopakuje let |
| T09 | T08 | B zasáhne A změnou rychlosti nebo kontaktem; starý zbytek A se neprovede, svět se pozastaví s příčinou; původní save zůstane použitelný |
| T10 | T09 | Jedinečné zařízení nelze spotřebovat dvakrát; opakovaný návrat A+B+C nespouští duplicitní události; neplatný záznam se nesmí znovu aktivovat |
| T11 | T10 | Test dvou neaktivních lodí protínajících kontaktní oblast, dvouletého klidného letu, 100 klidných lodí a velikosti save; výsledek a doporučení pokračovat/upravit návrh |

První syntetický impuls T09 ověřuje invalidaci bez čekání na dokování. T11 již musí ověřit skutečnou detekci setkání po intervalu, nikoli jen ruční vyvolání konfliktu. M1 ověřuje princip; plné S6 a kontaktní fyzika se tím neprohlašují za dokončené.

### Návrh numerických akceptačních mezí M1

- Bezsilový kruhový analytický let po 100 periodách: relativní chyba poloměru a specifické energie nejvýše 10⁻⁸ proti počáteční referenci; ověřit i fázi, nikoli jen tvar dráhy.
- Numerický bezsilový referenční let po 10 periodách: relativní chyba energie nejvýše 10⁻⁵, porovnání při dt a dt/2 musí ukázat konvergenci. Pokud nevyhoví, upravit metodu/krok před další etapou.
- Vakuový zážeh bez gravitace: chyba delta-v vůči analytické raketové rovnici nejvýše 0,1 %, palivo nikdy záporné.
- Replay ve stejném prostředí/verzi: stejné diskrétní události a kanonický hash autoritativního stavu. Odlišný hash vyšetřit; neodstranit problém pouhým zvětšením tolerance.
- Napříč prohlížeči: stejné výsledné události, navrženě rozdíl nejvýše 1 m a 1 mm/s v malém testovacím systému po jednom dni; dvouletý scénář vyhodnotit zvlášť s explicitním rozpočtem chyby před přijetím dlouhých misí.
- Checkpoint round-trip: přesná shoda serializovaných autoritativních hodnot, následné pokračování stejnými příkazy vede ke shodnému výsledku.
- Konflikt: žádná další neplatná událost, duplicita ID nebo ztráta bezpečné revize save. Testovat obě pořadí současných událostí podle definovaných pravidel.

Tyto meze je nutné vztáhnout k uvedeným fixture parametrům a uložit s experimentem. Dvouletý scénář obsahuje dlouhé analytické úseky a krátké aktivní úseky; nesimuluje dva roky 60× za sekundu.

## Etapa 2: malé úkoly pro editor

| Úkol | Ověření / hotovo, když |
| --- | --- |
| E01 – malý katalog a validace | Sonda/kabina, nádrž, motor, oddělovač, základní konstrukce; pevné parametry a více modulů v dílu, chybné reference odmítnuty |
| E02 – připojovací body | Připojit, odebrat a zrcadlit díl; nekompatibilní uzel nevytvoří neplatnou sestavu |
| E03 – úpravy návrhu | Mřížka, kopie/podsestava, Undo/Redo a uložení/načtení; vrácení úpravy obnoví celý návrh včetně stagingu |
| E04 – výpočty sestavy | Mokrá/suchá hmotnost, těžiště, moment setrvačnosti, TWR a delta-v jednoduchých stupňů porovnány s ruční referencí; složitý crossfeed zatím nepředstírat |
| E05 – staging a separace | Více stupňů, oddělení grafu na lodě, správné zdroje a zachování hybnosti; ovladatelný stupeň zůstane v témže světě |
| E06 – akční skupiny a start | Příkazy mají stabilní cíle; spuštěná loď nepřebírá pozdější změny blueprintu; návrat na předstartovní bod umožní upravit testovací návrh |
| E07 – celé ověření | Sestavit a uložit dvě různé rakety, odstartovat, oddělit a přepnout stupeň; zopakovat s návratem světa a načtením save |

Etapa 3 začne omezeným fixture systémem planeta + měsíc pro SOI; teprve potom rozšiřuje mapu a obsah. Každý úkol končí prohlédnutelným výsledkem, příslušnou referencí/testem a zápisem případné změny rozhodnutí.

## Definice hotového 2D sandboxu

Splněné scénáře GDD S1–S10, měsíční i meziplanetární návrat, stanice a dlouhé paralelní mise, dohodnuté provozní systémy, import/export a obnova bez vývojářského zásahu. Přehledné ovládání, návod, nastavení včetně destrukce, měřený výkon a doložené limity. Samotný úspěch M1 ani jednoduchý editor tuto definici nesplňuje.

## Návaznost pracovních chatů

Každý chat začíná domluvou očekávání a končí ověřením, scénáři s kroky a aktualizací předání podle [AGENTS.md](../AGENTS.md). Rozsah lze po domluvě rozdělit; neúspěšná brána znamená opravný chat před další závislou funkcí. ID označuje úkol, nikoli pořadí skutečně otevřených chatů.

| Chat | Jeden očekávaný výsledek |
| --- | --- |
| 01 | Potvrdit konkrétní rozsah první implementace a zbývající technické volby; využít již založené dokumenty |
| 02 | Webová kostra, jednoduché menu a tester se scénářem/resetem |
| 03 | Ověřený kruhový a eliptický orbitální pohyb |
| 04 | Tah, palivo, hmotnost, orientace a základní HUD |
| 05 | Simulační čas a bezpečný warp |
| 06 | Dvě lodě a přepínání řízení |
| 07 | Checkpoint celého světa, obnova a první export/import |
| 08 | Záznam A a opakování při řízení B |
| 09 | Konflikty měnitelné historie a opakované návraty |
| 10 | Vyhodnocení dlouhých letů, setkání, přesnosti, výkonu a velikosti dat |
| 11 | Malý datový katalog dílů |
| 12 | Editor a připojovací uzly |
| 13 | Kopie, zrcadlení, mřížka, Undo/Redo |
| 14 | Ukládání a sdílení návrhů |
| 15 | Hmotnost, těžiště, setrvačnost, TWR a delta-v |
| 16 | Staging a samostatné funkční odhozené stupně |
| 17 | Kompletní editor → let → návrat testu |
| 18 | Povrch, základní kontakt a přistání |
| 19 | Atmosféra, odpor a tlakový vliv na motor |
| 20 | Zahřívání, štít, padák a nastavení destrukce |
| 21 | Měsíc a ověřené přechody SOI |
| 22 | Orbitální mapa a přehled lodí |
| 23 | První manévrovací uzel |
| 24 | Navazující manévry a predikce setkání |
| 25 | Ověřená měsíční mise a návrat |
| 26 | Odpor a významné události neaktivních lodí |
| 27 | Uživatelská časová osa a konfliktní hlášení |
| 28 | Odolné autosave, import a obsluha chyb |
| 29 | RCS/SAS a relativní navigace |
| 30 | Dokování a oddokování |
| 31 | Přenos paliva a důsledky pro historii |
| 32 | Ověření stanice a více souběžných misí |
| 33 | Dohodnutý konečný obsah prvního 2D vydání |

Po 33 následují samostatné chaty pro jednotlivé schválené provozní systémy, rozšíření soustavy, katalog, ergonomii/návod, výkon a akceptaci S1–S10. Počet se určí podle skutečného rozsahu, nikoli slibem dokončení všeho v jednom chatu. Mobilní 2D je pozdější samostatná sada úkolů.

## Prostorová fáze a finální vzhled

Začíná po dokončení funkčního 2D sandboxu. Základní režim 2D zůstává zachován, převod jeho světů se neplánuje. Malý vizuální vzorek lze zkoušet průběžně v této fázi; hromadná tvorba finálních assetů čeká na ověření pipeline.

| Chat | Cíl a brána |
| --- | --- |
| D01 | Samostatný 3D orbitální experiment, prostorová poloha a nakloněné dráhy |
| D02 | Prostorová orientace, řízení a kamera s provizorní grafikou |
| D03 | Porovnat diskrétní pohledy dílů a jednoduchou kartonovou geometrii na několika společných podkladech; VIS-PART-001 |
| **D04** | **Funkční přechod planety/měsíce: vzdálená kresba → detailnější kresba → prostorová maketa a zpět.** Samostatný chat, provizorní assety, žádná změna fyzikálního poloměru. VIS-PLANET-001 ověří návaznost povrchu, opakovaný zoom a výkon. Před finálním vzhledem. |
| D05 | Prostorová mapa a manévry včetně sklonu dráhy |
| D06 | Prostorové konstrukce a kontakty; odděleně navrhnout návaznost planetární koule na přistávací povrch |
| D07 | Prostorové rendezvous, dokování a rozdělování |
| D08 | Znovu ověřit ukládání, historii a konflikty v prostoru |
| D09 | Hratelný prostorový scénář a cílové menu s oběma skutečně dostupnými režimy; izolovaný tester pro každý |
| A01 | Interní editor úhlových pohledů: import autorovy digitální kresby tužkou/fixou, příprava několika potřebných pohledů, náhled a export pro hru. Samostatný chat těsně před vzhledovou fází; metodu a úhly domluvit při zahájení. Ověřit přes ANGLE-001. |
| V01 | Schválit jednotný styl a společnou asset pipeline na malé sadě dílů, planetě a UI |
| V02 | Finální vzhled dílů po malých skupinách; zachovat identitu mezi režimy |
| V03 | Vzhled soustavy a povrchů, kreslené textury a dokončení již fungujícího přechodu planet |
| V04 | Provázková mapa a zavěšená tělesa; přesná technická čitelnost |
| V05 | Pracovní stůl, archy dílů, žlutý staging a knihovna návrhů |
| V06 | Menu, HUD, časová nástěnka a vzhled encyklopedie v rozsahu dohodnutých funkcí |
| V07 | Ručně kreslené efekty, volitelné animace, typografie a vizuální kontrola obou režimů |

Pokud je produkce katalogu/povrchů příliš velká, rozdělit příslušný V chat na menší skupiny. Podrobný kontrolní seznam vzhledu, včetně zatím otevřených detailů, je ve [VISUAL_IDENTITY.md](VISUAL_IDENTITY.md).

### A01 – editor úhlových pohledů před finálním vzhledem

**SCHVÁLENO jako etapa a účel:** autor vytvoří v počítači kresbu dílu tužkou nebo fixou a vloží ji do interního editoru. Editor z podkladu připraví několik potřebných pohledů pro prostorový režim a vhodný základní pohled pro 2D. Nástroj není potřeba pro předchozí funkční prototypy; vznikne po D09 a před V01–V02, aby se ověřil dříve než začne produkce finálních dílů. Při větším rozsahu rozdělit na navazující chaty.

**DOPORUČENÁ pracovní varianta k projednání:** vložit kresbu na jednoduchou prostorovou/kartonovou šablonu, otáčet díl nebo kameru a pořídit snímky ve stanovených úhlech. Konkrétní geometrie, úhly, počet pohledů, doplnění neviditelných stran, průhlednost, měřítko, pivot a exportní formát se dohodnou na začátku A01 podle výsledků D03. Nejde o slíbenou automatickou rekonstrukci celého dílu z jediné kresby.

**Hotovo, když:** autor na jednoduchém i asymetrickém vzorku importuje kresbu, zkontroluje/upraví její usazení, vygeneruje domluvenou sadu pohledů a export načte do herního náhledu. Pohledy drží společné měřítko a pivot, respektují asymetrii a kartonovou hranu. Tester ANGLE-001 poskytne připravené podklady, reset a krokový návod pro import → náhled → generování → export → herní kontrolu. Zpřístupnění veřejnosti/modderům zůstává pozdější možností.

## Aktualizace chatu 02 — 16. 11. 2026

Kostra T01 je implementována: menu, build ID, izolovaný SYS-001 s ručním krokem a resetem. Skutečné kontroly viz PROJECT_STATE/HANDOFF. Automatický čas a fyzika zůstávají další etapou. Novější pokyn odkládá veřejné vydání do funkčního 2D a kompletního vzhledu; CI obsahuje pouze kontroly, žádný deploy. Následuje domluva kruhové/eliptické orbity v chatu 03.

## Chat 03 — 16. 11. 2026

T03 v rozsahu kruhu/elipsy dokončen lokálně: Keplerovo jádro, ORB-001/002, ruční intervaly a nezávislá numerická akceptace včetně fáze a periody. Viz ADR 0004 a experiments/orbit-03.md. Nejde o celý T02 (FPS/reálný čas) ani T05; následuje domluva T04, nikoli předčasný warp. Aktuální hosting určuje PROJECT_STATE, starší odklady výše byly nahrazeny schválenou veřejnou testovací sestavou.
