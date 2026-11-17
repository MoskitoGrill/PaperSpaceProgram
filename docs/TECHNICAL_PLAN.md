# Technický plán

Datum: 8. 11. 2026. Stav: **DOPORUČENO – čeká na schválení**.

Aktualizace 16. 11. 2026: pracovní postup, tester, samostatné režimy bez převodu světů a pořadí technického přechodu planet upřesňuje schválené [ADR 0001](adr/0001-workflow-and-modes.md). Konkrétní stack a numerické metody níže zůstávají návrhy.

Tento dokument byl sestaven po přečtení celého GDD 1.0. Neprokazuje funkčnost navržené fyziky ani historie; tu musí ověřit experimenty z roadmapy. Číselné tolerance níže jsou návrhy akceptačních mezí, nikoli naměřené výsledky.

Upřesnění po chatu 01, 16. 11. 2026: pro kostru je přijat stack TS strict/Vite/npm, HTML/CSS, Canvas 2D a kontroly Vitest/ESLint/Playwright, viz [ADR 0003](adr/0003-first-web-shell.md). Konkrétní verze/runtime při implementaci. První hosting GitHub Pages; lokální vývojový tester se do veřejného artefaktu nezahrnuje. Minimální stav a ruční tick v chatu 02 nepředstavují hotové řízení reálného času. Ostatní doporučení níže nemění status. Přesný rozsah je v [CHAT_02.md](CHAT_02.md).

## 1. Co je závazné a co ještě není

**SCHVÁLENO v GDD:** plnohodnotný 2D sandbox v prohlížeči, modulární díly s pevnými parametry, nejprve tuhá sestava, staging, orbitální mapa a manévry, vlastní zmenšená soustava, více lodí, dokování a stanice. Nejprve SOI/patched conics. Atmosféra plynule řídne, relevantní odpor se projevuje i u neaktivních lodí. Funkční odhozený stupeň zůstává lodí, zničený díl mizí. Destrukci lze vypnout.

**SCHVÁLENO v GDD:** návrat celého světa pouze do uložených bodů, omezený dosah i počet bodů, dynamicky měnitelná historie B, možnost zásahu do přehrávané mise. Záznamy budoucích misí přežijí obnovu světa. Žádné duplicitní posádky, žádné povinné uchovávání všech alternativních světů. UI, grafika a simulace mají být oddělené.

**DOPORUČENO zde:** konkrétní stack, struktura modulů, numerické metody, pravidla pozastavení konfliktu, datový formát a upravené pořadí etap.

**OTEVŘENO:** podrobnosti posádky/EVA, komunikace, vědy, energetiky, roverů a základen; obsah soustavy a katalogu; limity návratů; definitivní přesnost, výkonové cíle a politika kompatibility historie. Jejich pouhá zmínka v GDD nezakládá hotovou specifikaci.

**POZDĚJI:** omezené N-body, kariéra, další soustavy, pokročilá automatizace, mody, 3D a ručně kreslený katalog. Plné vzájemné N-body a povinný testovací režim editoru neplánovat; multiplayer není schválen pro plán.

## 2. Doporučené technologie a alternativy

| Oblast | Doporučení | Alternativa a důvod odložení |
| --- | --- | --- |
| Jazyk a build | TypeScript strict, Vite, npm, jedna aplikace | JavaScript zhoršuje kontrolu modelů; monorepo nyní nepřidává hodnotu |
| První renderer | Nativní Canvas 2D pro geometrický experiment | PixiJS/WebGL po měření větší scény; Three.js až pro případný 3D experiment |
| Rozhraní | HTML/CSS a malé TS moduly pro prototyp | React nebo Svelte vyhodnotit před bohatým editorem; jejich stav nesmí řídit fyziku |
| Simulace | Vlastní orbitální jádro a tuhá 2D sestava | Obecný rigid-body engine může později řešit lokální kontakty; nenahradí orbitální propagaci ani historii |
| Uložení | IndexedDB za adaptérem; verzovaný JSON export | localStorage není vhodný hlavní sklad; OPFS/komprese až podle objemu |
| Ověřování | Vitest pro jádro, Playwright pro klíčové průchody prohlížečem | Ruční ověření doplňuje testy ovládání a čitelnosti |
| Kontroly | Samostatné tsc --noEmit, ESLint, jednotný formát | Build nesmí být vydáván za kontrolu typů |
| Provoz | Statická webová aplikace bez backendu | Cloud a účty až při konkrétní potřebě |

Vite podporuje TS šablonu a statický produkční build; viz [Vite guide](https://vite.dev/guide/) a [build](https://vite.dev/guide/build). Vitest sdílí ekosystém Vite ([oficiální průvodce](https://vitest.dev/guide/)). Verze runtime a závislostí vybrat společně při založení kostry podle aktuální kompatibility, připnout lockfile; nevolit nyní naslepo čísla verzí.

Canvas 2D je záměrně malý počáteční závazek. Při přechodu na PixiJS preferovat WebGL; jeho dokumentace doporučuje WebGL pro produkci a Canvas fallback zatím nelze předpokládat ([PixiJS renderery](https://pixijs.com/8.x/guides/components/renderers)). Přechod rendereru má měnit pouze prezentační adaptér.

První cílové prostředí: desktop, klávesnice/myš, moderní Chromium a Firefox; Safari ověřit před označením širší podpory. Web Worker a WASM až pokud profilování prokáže potřebu. Rozhraní simulace nesmí vyžadovat DOM, takže ji půjde přesunout bez změny pravidel hry.

## 3. Architektura a směr závislostí

Jedna aplikace s jasnými moduly, bez pluginového frameworku a univerzálního ECS.

```text
UI/editor/ovládání -> příkazy -> session (jediný zapisovatel)
                                  |-> sim (čas, fyzika, události)
                                  |-> timeline (záznam, obnova, konflikty)
                                  |-> persistence (atomické uložení)
sim -> čtecí projekce -> renderer/HUD/mapa
content -> validované neměnné definice -> sim/editor
```

- `domain`: ID, jednotky a serializovatelné typy; žádný DOM ani renderer.
- `sim`: změna světa přes explicitní čas a příkazy. Žádné Date.now, čas snímku nebo nekontrolované náhodné hodnoty. Náhoda případně s uloženým seedem a stavem generátoru.
- `session`: koordinace reálného času, warp, převzetí řízení, bezpečná pauza, přepnutí obrazovek. Jedna autoritativní simulace světa.
- `timeline`: plánované/zaznamenané mise oddělené od aktuálního světa; kontrola předpokladů před provedením události.
- `prediction`: výpočty na kopii/čtecí projekci. Mapa využívá stejné fyzikální zákony jako simulace; manévrovací uzel není uskutečněný zážeh.
- `render`: kamera, interpolace a kreslení. Souřadnice pixelů nikdy nevstupují do fyzikálního stavu.
- `editor`: návrh konstrukce a jeho validace; spuštěná loď je samostatná instance, nikoli živý odkaz na upravitelný blueprint.
- `persistence`: validace formátu, migrace a transakce. Neobsahuje herní rozhodování.

Budoucí 3D připravujeme oddělením transformací, sil, připojovacích bodů a vzhledu. Dnes použijeme Vec2 a úhel v radiánech. Nepředstírat, že přidání třetí složky samo převede navigaci, kolize a historii do 3D. Taková změna bude novou verzí modelu.

### Režimy, sdílená data a tester

Cílové menu volí 2D nebo 2D/3D; nedostupný režim nesmí zahajovat falešně funkční hru. Každý svět má režim a odpovídající verzi fyziky. Převod světů mezi režimy se neimplementuje; migrace formátu uvnitř podporovaného režimu je samostatná potřeba. Sdílené mohou být definice a funkční moduly dílů, zdroje, knihovna vizuálních podkladů a vhodné části UI/session/persistence. Prostorové síly, orientace, navigace a kontakty vyžadují samostatné ověření. Nezaručujeme sdílení každého simulačního algoritmu.

Vstupní příkazy nezávislé na klávesnici a škálovatelné UI zachovají možnost pozdějšího mobilního 2D. Dotykové ovládání a výkon mobilu se ověří ve vlastní budoucí etapě.

Tester vznikne s kostrou: jednoduchý seznam scénářů, spuštění izolované session a reset. Postupně doplňovat scénáře se skutečnými produkčními systémy, bez přepisování běžných světů. Návrh definice scénáře: stabilní ID, režim/verze, deterministický factory počátečního světa a historie, popis ovládání a očekávané výsledky. Testovací akce a příprava nesmějí nenápadně vstupovat do normální hry. Není nutný obecný skriptovací framework. Katalog a pravidla jsou v [TEST_SCENARIOS.md](TEST_SCENARIOS.md).

Přechod vzdálené planetární kresby na blízkou kouli je prezentační mechanismus, nikoli změna fyzikálního tělesa. Samostatný chat D04 jej ověří v prostorové fázi na provizorních podkladech včetně cesty zpět a návaznosti povrchu. Detailní kritéria a otevřené volby jsou ve [VISUAL_IDENTITY.md](VISUAL_IDENTITY.md).

## 4. Minimální datové modely

Všechny identity jsou stabilní ID; definice oddělit od instancí. Hodnoty SI: m, s, kg, N, rad. Kontrolovat konečnost čísel a nezáporné zdroje. Odvozená data (např. apoapsida) neukládat jako druhou autoritu.

| Model | Minimální obsah a invariant |
| --- | --- |
| WorldConfig | ID a hash konfigurace soustavy, physicsVersion, contentVersion, sandbox nastavení; změny fyzikálních pravidel po založení nepovolit bez explicitní migrace |
| WorldState | epoch/tick, revision, lodě, stav využitých objektů, fronta událostí, generátor ID; posádka až při zavedení, potom právě jedno umístění každé osoby |
| BodyDefinition | ID, parentId, μ, poloměr, rotace, předepsaná dráha a epocha, atmosférický profil a SOI; pro start experimentu planeta bez kompletní soustavy |
| VesselState | ID, referenceFrame/bodyId, poloha/rychlost, orientace/úhlová rychlost, režim simulace, instance dílů a spoje, zdroje, řízení; hmotnost a moment setrvačnosti z dílů |
| PartDefinition / PartInstance | definice: rozměr, hmotnost, lokální porty, funkční moduly (motor/nádrž…); instance: ID, definitionId, lokální transformace, stav modulů a zdrojů |
| Connection | ID, dva díly a jejich porty, druh spoje; graf dovolí pozdější uzavřenou smyčku po dokování |
| Blueprint | samostatná verze návrhu, instance návrhových dílů, spoje, staging a skupiny; start vytvoří nové světové identity |
| Command / Event | command = záměr; event = skutečně provedený výsledek. Čas, stabilní pořadí, ID, cíl, payload, předpoklady a příčina |
| Checkpoint | ID, čas, úplný obnovitelný WorldState, verze a kontrolní součet, reference na potřebné definice; stav solveru nesmí být skryt mimo snapshot |
| MissionRecord | ID, verze simulace, počáteční předpoklady, vstupy po intervalech, události, řídké kontrolní stavy, vazby na entity a stav platnosti |
| SaveEnvelope | schemaVersion, worldConfig, aktuální svět, návratové body, potřebné mission records a metadata revize; vše konzistentní jako jedna generace |

Posádku, finance a technologie prototyp nenaprogramuje. Jejich budoucí stav ale patří do světa, nikoli do trvale rostoucího globálního profilu, který by návrat obešel. Ověření rezervace jedinečného prostředku lze v experimentu provést na startovním zařízení bez zavedení kariéry.

Při separaci se graf rozdělí na komponenty, každá dostane loď. Zajistit rychlost těžiště včetně ω × r; při nulovém separačním impulzu zachovat hmotnost a hybnost. Při dokování se mění topologie a návaznost historie, ne jen rodič vykreslených spritů.

## 5. Fyzika a čas

### Souřadnice a numerika

Používat JS number (double) a tělesově relativní stav pro dráhy; díly mají malé lokální souřadnice vůči lodi. Pro renderer odečíst polohu kamery ještě před převodem do GPU souřadnic. Planety mají předepsané efemeridy od společné epochy. Přechod SOI převede polohu i rychlost včetně pohybu rodičů, nezmění skutečný stav skokem.

Začít kruhovou a eliptickou dráhou a doplnit hyperbolický únik a téměř parabolickou mez před meziplanetárním letem. Doporučený kandidát: analytický Keplerův propagátor s univerzální proměnnou pro klidný let, RK4 pro aktivní tah/odpor. Obojí musí projít porovnáním s nezávislými referencemi; případná změna integrátoru je očekávaný výsledek experimentu. Obecný fyzikální engine neřeší přesné dlouhé orbity.

Aktivní fyzika: kandidát 60 kroků/s; čas uložit jako celočíselné tick + deterministicky určené dílčí časy událostí. Přesnost a bezpečný horizont čísla ověřit. Stejný sled příkazů musí být nezávislý na FPS. Adaptivní podkroky pro kontakt či atmosféru řídit simulačním stavem, nikoli zatížením počítače; ukládat vše nutné pro pokračování.

### Hybridní režimy

- Klidná loď mimo významný odpor a interakce: analytický pohyb mezi událostmi.
- Zážeh, atmosféra, rotace s významnými silami: numerická simulace agregované tuhé lodi.
- Blízká setkání, povrch a dokování: lokální detail a kontakt.
- Přistálá stabilní loď: poloha vůči rotujícímu povrchu, nikoli volná Keplerova dráha.

Neaktivní neznamená bez následků. Řídkou atmosféru nelze přeskočit jen proto, že loď není sledovaná; řídký numerický nebo průměrovaný model odporu musí být porovnán s podrobnou referencí. Do jeho ověření používat bezpečnější detailní výpočet a případně omezit warp.

Hustota klesá spojitě. Zanedbání velmi malého odporu odvodit z maximální kumulované chyby za plánovaný horizont, ne pouze z výškového přepínače. Atmosféru vztaženou k rotaci planety použít také pro relativní rychlost.

### Warp a události

Warp nezvětšuje bez omezení dt. Událostní plánovač skočí pouze k nejbližší bezpečné hranici: příkaz, SOI, vstup do relevantní atmosféry, povrch, možné setkání, vyčerpání zdroje. Před hranicí zpomalí nebo přejde do detailu. Stejný plánovač zpracovává všechny lodě; přepnutí hráče nemění fyzikální zákony.

SOI a možné střety hledat po intervalu s konzervativním ohraničením a zpřesněním kořene. Kontrola pouze vzdálenosti na koncích kroku může minout celou kolizi. Platí také pro dvě neaktivní lodě. Nejprve jednoduché ověřitelné párové hledání pro malý počet lodí, prostorové indexy až podle profilu. Pokud nelze interval bezpečně přeskočit, musí následovat detailní výpočet, nikoli ignorování interakce.

Kontakty zpočátku jednoduché, stabilní přistání bez pružnosti. GDD požaduje vypínat destrukci, ne nutně kolize a teplo: jejich přesnou kombinaci schválit před implementací poškození.

## 6. Návraty a paralelní mise – hlavní experiment

### Dvě vrstvy pravdy

1. **Aktuální svět:** jediný skutečný stav v čase t, včetně všech právě existujících lodí a zdrojů.
2. **Uchované záznamy:** recepty budoucích akcí, předpoklady a kontrolní stavy. Dříve přijatý výsledek platí jen tehdy, když k němu aktuální průchod opravdu konzistentně dospěje.

Obnova bodu nahradí celý WorldState, ale zachová zvlášť uložený relevantní seznam záznamů. Budoucí start A je událost v záznamu, pokud v obnoveném světě A ještě neexistovala. Před startem ověřit dostupnost blueprintu/zařízení a později posádky či prostředků. Uchovat původní verzi konstrukce; pozdější editace knihovny nemění již zaznamenaný start.

### Reprodukce

Zapisovat změny tahu, požadovaného natočení/SAS režimu, staging a dalších příkazů ve fixním čase, ne klávesové události závislé na FPS. Uložit i rozhodující světové změny a řídké kontrolní stavy. Na klidných úsecích lze znovu propagovat z počátečního stavu; při interakci se vždy počítá aktuální svět. Nepoužívat záznam pozic jako nehmotného ducha ani jím přetlačovat kolizi.

Determinismus požadovat nejprve pro stejnou verzi simulace a stejné prostředí. Bitovou shodu napříč enginy a verzemi nelze předem slíbit. Napříč podporovanými prohlížeči měřit toleranci polohy, rychlosti, zdrojů a shodu diskrétních výsledků. Kontrolní stav slouží k ověření, nikoli k teleportaci lodi přes nový zásah. Při nečekané numerické odchylce přehrávání bezpečně zastavit a zachovat data.

### Doporučené chování při konfliktu (ke schválení)

Zásah B do A (kontakt, dokování, palivo, převzetí řízení), nesplněný předpoklad nebo významná numerická odchylka označí budoucí část záznamu A za neplatnou. Při kontaktu událost nejprve fyzikálně vyřešit; při nedostupném prostředku akci neprovést. Pozastavit svět, sdělit konkrétní příčinu a nabídnout převzetí A, pokračování bez starého automatického řízení nebo návrat do bodu. Pouhé označení „konflikt“ nesmí nechat svět nekontrolovaně běžet při vysokém warpu.

Zachovat skutečný stav po události a předchozí bezpečný save. Neprovádět automatickou opravu starého úspěchu. Pro první prototyp doporučuji přerušení; automatické přeplánování po tankování či dokování teprve po ověření. To je zjednodušení implementace varianty B, nikoli návrat k neměnné historii A.

Záznam sleduje dotčené entity a příčiny. Separace mapuje původní díly na následné lodě; dokování propojí závislosti obou letů. První implementace může konzervativně zneplatnit celý dotčený zbytek mise. Jemný graf závislostí všech systémů předem nevytvářet. Ověřit i návrat znovu v situaci A+B+C; žádné zdvojené starty a staré neplatné příkazy.

Ruční převzetí přehrávané lodi zneplatní její dosud neuskutečněné řízení a vytvoří nový záznam až od tohoto bodu. Zbytek světa zůstává ve stejném čase. Dřívější alternativní svět netřeba trvale uchovávat.

### Rozsah záznamu a verzování

Události a intervaly řízení rostou s aktivními úseky, nikoli s každým snímkem dvouletého letu. Test musí měřit velikost dat; řídké kontrolní stavy nesmějí znamenat plné kopie světa každou sekundu. Úplné snímání letu zatím neimplementovat.

Verze fyziky a konfigurace patří ke každému záznamu. Při nekompatibilní změně nabídnout bezpečné načtení původních dat nebo explicitní migraci; nikdy tiše přehrávat novým solverem jako zaručeně totožný let. Podporu starých runtime verzí nebudovat v prvním prototypu, místo toho nekompatibilitu zřetelně odmítnout a zachovat export.

## 7. Ukládání a odolnost

Checkpoint + katalog relevantních záznamů + aktuální ukazatel revize uložit v jedné transakci nebo neměnných blocích s atomicky publikovaným manifestem. UI hlásí úspěch až po dokončení transakce. Neodstraňovat starou bezpečnou generaci před dokončením nové.

Import validovat do dočasného stavu: schema, verze, ID, reference, konečná čísla, limity velikosti a konzistence. Chybný import nesmí přepsat rozehraný svět. Export musí obsahovat potřebné návratové body a záznamy, nikoli pouze viditelné lodě. Odstranění starého bodu musí respektovat reference, jinak může znemožnit přehrání mise.

IndexedDB je transakční, ale nenahrazuje zálohu; existují kvóty i různé úrovně durability. Ošetřit chybu kapacity a nabídnout export. Viz [MDN transakce](https://developer.mozilla.org/en-US/docs/Web/API/IDBDatabase/transaction) a [kvóty](https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria). Export do souboru je součást bezpečnosti, cloudový účet není podmínkou.

## 8. Rizika a rozhodovací brány

| Riziko | Ověření před rozšířením | Pokud selže |
| --- | --- | --- |
| Opakování letu se rozchází | Stejný scénář při různém FPS, save/load a podporovaných prohlížečích | Zpřesnit řízení času/verzování; pozastavovat neověřený replay |
| Warp přeskočí setkání či pád | Dvě neaktivní lodě, přelet kontaktního pásma v jednom velkém intervalu | Konzervativnější kroky, omezení warpu v rizikovém úseku |
| Přepínání režimů mění dráhu | Stejná mise aktivní, neaktivní a po opakovaných přechodech | Zpřesnit propagaci a zachování stavu |
| Odpor na pozadí je drahý | Porovnání dlouhé nízké orbity s jemnou referencí | Omezit warp, později validovaný aproximovaný model |
| Dokování rozbije historii | Sledování dílů přes spojení/rozdělení a zásah do záznamu | Konzervativní invalidace, žádné přehrávání starých příkazů naslepo |
| Save nezahrne budoucí záznam | Obnova/export/import S7–S9, simulovaný neúspěšný zápis | Atomický manifest, zachování minulé generace |
| Příliš velký rozsah | Obsah až po průchodu technických bran | Nerozšiřovat katalog ani budoucí systémy |

Výkon první experiment změří pro 1 aktivní a 100 klidných lodí, včetně rychlého průchodu dvou let. Jde o benchmark, nikoli pevný herní limit počtu lodí. Zapsat hardware, prohlížeč, p95 čas simulace, délku přepočtu a velikost uložených dat. Definitivní rozpočet lze určit až podle měření a cílového zařízení.

## 9. Co nyní potřebuje schválení

Stack první kostry byl přijat v ADR 0003. Konkrétní experiment historie před editorem, doporučené přerušení při konfliktu a podrobnosti M1 projednat při příslušné etapě. Nejsou podmínkou zahájení domluveného chatu 02.

Později rozhodnout: konkrétní limity návratů (přitom musí umožnit scénář dvouleté mise), kontaktní model, UI framework před bohatým editorem, pravidla destrukce, rozsah základních provozních systémů a cílový výkon. Hodnoty v experimentu jsou testovací konfigurace, nikoli schválené herní limity.

## Aktualizace chatu 02 — 16. 11. 2026

Implementován pouze minimální domain WorldState, čistý krok ticku, Session s resetem/snapshotem, renderer Canvas a vývojový SYS-001. Stav a výsledky jsou v PROJECT_STATE/HANDOFF. Automatický čas, síly a jiné budoucí moduly nevznikly. Build base je relativní, tester importovaný jen pod `import.meta.env.DEV`; obsah dist kontroluje samostatný skript. Novější pokyn odkládá zveřejnění až na funkční 2D a kompletní vzhled, proto aktuální workflow pouze kontroluje a nemá deploy.

## Chat 03 — 16. 11. 2026

Přijat a implementován omezený analytický eliptický Keplerův solver (nikoli dosud univerzální proměnná). Domain obsahuje SI konfiguraci orbity a rychlost, sim propaguje od epochy, session postupuje po explicitních ticích, render pouze čte. RK4 je nezávislá testovací reference, ne další produkční režim. Meze, rozsah a výsledky viz ADR 0004 a experiments/orbit-03.md. Hyperboly, hybridní přepínání a numerika s tahem čekají na další etapy. Veřejný tester nyní schválen samostatným Pages buildem; starší formulace o nepřítomnosti testeru ve veřejném artefaktu platí pro běžný dist.
