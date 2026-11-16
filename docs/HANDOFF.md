# Předání mezi chaty

Tento soubor uchovává historii; aktuální stav je v `PROJECT_STATE.md`. Nové zápisy přidávat na konec, důležité opravy starých závěrů výslovně označit. Nezapisovat domnělé schválení ani testy, které neproběhly.

## Šablona zápisu

- Datum, ID úkolu a stav: dokončeno / částečně / blokováno.
- Dohodnutý cíl a schválená rozhodnutí (odkaz na registr).
- Skutečné změny a hlavní soubory.
- Provedené kontroly: příkaz nebo postup, výsledek; odděleně neprovedené kontroly.
- Scénáře: přidaná/změněná ID, dostupnost, kde jsou návody.
- Známé problémy, případné změny formátu dat a omezení.
- Přesný další krok a informace potřebné pro pokračování.

## 16. 11. 2026 – příprava pravidel a výtvarné návaznosti

**Stav:** dokumentační úkol dokončen; žádná herní implementace.

Uživatel upřesnil samostatné 2D a prostorové světy bez převodu save, sdílení základů i výtvarných podkladů, cílové menu s oběma režimy a soukromý tester. Vyžaduje úvodní domluvu každé etapy, přímé scénáře s kroky a předávání kontextu. Přechod vzdálené 2D planety na blízkou prostorovou maketu má být funkční již během prostorového vývoje před finální grafikou.

Přidány AGENTS.md, PROJECT_STATE, HANDOFF, TEST_SCENARIOS, VISUAL_IDENTITY a ADR 0001. Aktualizovány README, technický plán, roadmapa, registr rozhodnutí a Markdown GDD dodatkem z 16. 11. Původní výtvarná kapitola zůstala zachována, DOCX nezměněn. Konkrétní technologie se tím neschvalují.

Kontroly: obsahová kontrola proti GDD §9, kontrola existence relativních Markdown odkazů. Automatické herní testy neexistují; žádné scénáře nejsou spustitelné. Návrhy scénářů v katalogu jsou výslovně plánované.

Další krok: probrat s uživatelem souhrn výtvarné vize, potom připravit zadání jednotlivých chatů. Nezačínat nevyžádaně celý M1 ani generovat finální grafiku.

## 16. 11. 2026 – doplnění etapy editoru úhlových pohledů

**Stav:** dokumentační úkol dokončen. Uživatel požádal o samostatnou etapu těsně před finálním vzhledem: import digitální kresby tužkou/fixou a příprava několika úhlových pohledů. A01 je za D09 a před V01–V02. Kresba na 3D šabloně a snímání určených úhlů je pracovní varianta k dohodě v etapě, nikoli již vybraný algoritmus.

Aktualizovány ROADMAP, VISUAL_IDENTITY, TEST_SCENARIOS (plánovaný ANGLE-001), PROJECT_STATE, DECISIONS a GDD §17.4; přidáno ADR 0002. Starší formulace, že interní generátor je pouze neurčitá pozdější možnost, je tím upřesněna. Veřejná modderská verze zůstává odložená.

Ověření: kontrola návaznosti A01 před V01 a lokálních Markdown odkazů. Žádné herní testy, editor ani spustitelný scénář zatím neexistují. Další krok zůstává příprava zadání chatů po dokončení domluvy; nástroj se nyní neimplementuje.

## 16. 11. 2026 – chat 01: domluva první implementace

**Stav:** dokumentační úkol dokončen, herní implementace nezahájena. Uživatel přijal návrh kostry s upřesněním testeru: relevantní scénáře s názvem, popisem a kroky před spuštěním, skutečné ovládání herních funkcí; běžné menu ověřovat přímo. Přidán požadavek build ID a přehledu hotových funkcí. Primární desktop, počáteční hosting GitHub Pages. Přijat stack pro kostru, nikoli celý obsah staršího technického plánu. Viz ADR 0003.

Vznikly ADR 0003 a přesné kopírovatelné zadání CHAT_02.md s akceptací SYS-001. Sladěny README, PROJECT_STATE, DECISIONS, ROADMAP, TECHNICAL_PLAN, TEST_SCENARIOS a GDD §17.5. T01 zahrnuje minimální stav a ruční krok z T02; real-time/FPS/warp zůstávají pozdější. Veřejný produkční artefakt bez soukromého testeru. Možný budoucí trénink a vztah velikosti/hmotnosti planet pouze zaznamenány k pozdější domluvě.

Kontroly: celý GDD a relevantní dokumentace přečteny, obsahově porovnány. PowerShell kontrola relativních Markdown odkazů ve 14 souborech: OK, žádný chybějící cíl. `git --version`: 2.56.0.windows.1; `git rev-parse --is-inside-work-tree`: složka není repozitář (očekávané zjištění, nic inicializováno). Ověřeny oficiální podklady Vite/Vitest/Playwright a Vite Pages deploy; závislosti nebyly instalovány. Herní testy/build nelze spustit, hra neexistuje. SYS-001 je stále plánovaný; žádný nový dostupný scénář nevznikl.

Další krok: nový chat 02 podle CHAT_02.md, implementovat pouze domluvenou kostru. Git i GitHub uživatel má; URL cílového repozitáře zatím chybí. Při implementaci nejprve zjistit dostupné údaje, připravit lokální výsledek a Pages workflow. Přesné verze/runtime a nasazení nejsou ověřené. Žádný backend ani veřejný trénink se nyní nevytváří. Chat 03 teprve orbitální pohyb.

## 16. 11. 2026 — chat 02: lokální webová kostra a SYS-001

**Stav:** dohodnutá lokální kostra dokončena. Firefox neověřen kvůli hostitelskému prostředí; žádné vzdálené vydání.

Uživatel po předložení návrhu schválil implementaci s úpravou: 2D neaktivní bez Připravujeme, u 2D/3D štítek zůstává. Zveřejnění odložil do funkčního 2D a kompletního vzhledu. Toto novější rozhodnutí je zapsáno v DECISIONS, ADR 0003 a GDD §17.6; nahrazuje očekávání zveřejnění první kostry. Další mechaniky se neschvalují.

**Skutečné změny:** package.json/lockfile, index.html, Vite/TS strict/ESLint/Vitest/Playwright konfigurace; src/domain/world.ts (stav a tick/60), src/sim/step.ts (čistý krok), src/session/session.ts (izolace/snapshot/reset), src/render/world.ts (pouze čtení), src/main.ts a style.css (české menu, build ID/stav), src/devtools (SYS-001 factory a UI s návodem). Přidány unit a E2E testy, statický podadresářový server a kontrola obsahu dist. .gitignore a CI kontrol bez deploy; Git inicializován bez commitu/remote, existující obsah zachován. Aktualizovány README, TEST_SCENARIOS, PROJECT_STATE, HANDOFF, DECISIONS, ADR 0003, GDD, ROADMAP a TECHNICAL_PLAN. Žádná fyzika, ukládání, veřejný trénink ani finální grafika.

**Runtime a instalace:** Node 24.22.1 byl dostupný bez npm. Do ignorované .tools/package staženo npm 12.2.2. Příkazy níže byly skutečně spuštěny jako `node .tools/package/bin/npm-cli.js ...`; běžná instalace Node umožní standardní `npm ...`. Instalace závislostí nejprve selhávala na certifikátu, dokončena s NODE_USE_SYSTEM_CA=1. Vite 8.3.8, TS 6.0.3, Vitest 5.1.0, ESLint 10.15.0, typescript-eslint 8.72.2, Playwright 1.65.1; přesné verze v lockfile. Technické podklady ověřeny na oficiálních Vite/Vitest/Playwright stránkách.

**Skutečně provedené kontroly:**

- `npm run typecheck`: úspěch; zopakováno po úpravě cesty E2E screenshotu.
- `npm run lint`: úspěch; zopakováno po úpravě testu.
- `npm test`: 3/3 úspěch — tick/čas a nehybnost entit, izolace session/snapshotů/fixture a opakovaný reset, neplatný tick.
- `npm run build`: úspěch, Vite sestavil dist. `node tests/check-production.mjs`: úspěch, bez testeru/fixture/diagnostických ovládacích prvků v artefaktu.
- `npm run test:e2e -- --project=chromium`: 2/2 úspěch. První sandboxový pokus byl zastaven po zjištění blokovaných lokálních socketů, úspěšný běh mimo sandbox. Ověřen návod před spuštěním, 3 kroky = 0,05 s, shoda Canvasu, reset, nové spuštění a žádný zápis do localStorage/IndexedDB. Druhý test produkční menu a načtení assetů v /PaperSpaceProgram/ bez SPA fallbacku a bez testeru i při query/hash pokusu.
- Po Firefox pokusu opakován Chromium běh s `--output=test-results/chromium`: 2/2 úspěch. Screenshot sys001.png v příslušné test-results podsložce vizuálně prohlédnut; texty, značky a ovládání čitelné, bez překryvů. Výstupy jsou ignorované Gitem.
- `npm run test:e2e -- --project=firefox`: 2 chyby při launch před otevřením aplikace. Hostitelská validace hlásí mozglue.dll; soubor ve staženém Firefoxu existuje. Firefox není ověřen, není vydáván za funkční ani za aplikační regresi.
- `npm audit --json`: 7 moderate nálezů v dev závislostech ESLintu přes minimatch (GHSA-g3hv-75wg-m249). Vynucený návrh downgradu nebyl použit. Žádné runtime balíčky se do webu nepřidaly.
- PowerShell kontrola relativních Markdown odkazů: OK. `git diff --check`: bez výstupu, má omezenou výpověď před prvním commitem (soubory untracked).

**Scénáře:** SYS-001 dostupný pouze v dev, Menu → Vývojový tester → Spustit. Návod je v aplikaci, README a TEST_SCENARIOS. Ostatní ID zůstávají plánované. Reset vytváří nový celý svět, návrat do menu zahazuje session; žádné běžné světy ani body se nevytvářejí/přepisují.

**Omezení:** aplikace není hratelný let. Canvas používá jednoduché tvary a pevnou projekci; mobil/Safari nejsou ověřeny. CI workflow nebylo spuštěno na GitHubu; remote a deploy záměrně nejsou. Veřejná sestava je pouze lokální artefakt, nikoli vydání. Build ID před prvním commitem je 0.1.0+dev.

**Přesné pokračování:** uživatel ručně ověří SYS-001 podle kroků v README a katalogu. Pak nový chat 03: nejprve domluvit model a akceptaci kruhové/eliptické orbity, přidat ORB-001 nad produkční simulací. Nezačínat automatický čas/warp, editor nebo prostorovou fyziku. Před podporou Firefoxu dořešit místní hostitelskou validaci; před zveřejněním nové výslovné rozhodnutí v souladu s funkčním 2D a kompletním vzhledem.
