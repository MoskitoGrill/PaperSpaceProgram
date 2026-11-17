# Registr rozhodnutí a změn

Datum založení: 8. 11. 2026.

## Pravidla

- Schválený záměr čerpat z GDD, technické návrhy nesmějí automaticky měnit jeho status.
- Každá zásadní volba má ID, datum, stav, kontext, alternativy a důsledky. Stavy: navrženo / schváleno / odmítnuto / nahrazeno.
- Schválení zaznamenat až po výslovném rozhodnutí uživatele; u změny uvést původní rozhodnutí a důvod. Implementace sama o sobě není schválením produktu.
- Při přijetí zásadní volby vytvořit `docs/adr/NNNN-nazev.md` se zmíněnými poli, doplnit tento index a podle potřeby GDD/roadmapu.
- Po experimentu ukládat parametry, postup reprodukce, výsledky a závěr do `docs/experiments/`; vytvořit až při skutečném experimentu.

## Návrhy k prvnímu projednání

Konkrétní technické návrhy P001–P005 nebyly automaticky schváleny přijetím pracovního postupu. P001 byl následně přijat pro první kostru v chatu 01 (ADR 0003). P003 odpovídá přijatému obecnému směru brzkého ověřování rizik; konkrétní experiment se projedná na začátku práce.

| ID | Stav | Návrh a alternativa | Důsledky |
| --- | --- | --- | --- |
| P001 | Schváleno pro kostru | TS/Vite, Canvas 2D, HTML UI; viz ADR 0003 | Přesné verze při implementaci; pozdější renderer/UI lze znovu posoudit |
| P002 | Navrženo | Čisté vlastní hybridní jádro; alternativa fyzikální engine jako hlavní autorita | Nutnost numerických referencí, bez zbytečné kontaktní složitosti |
| P003 | Navrženo | Experiment historie před editorem; alternativa původní pořadí §12 | Dřívější ověření největšího rizika, pozdější viditelný editor |
| P004 | Navrženo | Při konfliktu zastavit svět a zneplatnit dotčené pokračování; alternativa ihned automaticky přeplánovávat | Konzervativní, vysvětlitelné chování; automatické opravy odložené |
| P005 | Navrženo | IndexedDB + verzovaný JSON export a atomické revize | Nutná validace, obsluha kvót a kompatibility historie |

## Schválená navazující rozhodnutí

| ID | Datum | Rozhodnutí |
| --- | --- | --- |
| [ADR 0001](adr/0001-workflow-and-modes.md) | 16. 11. 2026 | Malé chaty s úvodní domluvou, tester a návody, předávání v souborech; režimy 2D a 2D/3D bez převodu světů, sdílené základy/vizuální podklady, technický přechod planet před finálním vzhledem |
| [ADR 0002](adr/0002-angle-view-editor.md) | 16. 11. 2026 | Samostatný interní editor úhlových pohledů A01 těsně před finálním vzhledem; autorova digitální kresba jako vstup, metoda a úhly se domluví v etapě |

## Navržená struktura po schválení

Nové rozhodnutí: [ADR 0003](adr/0003-first-web-shell.md), 16. 11. 2026 – rozsah chatu 02, tester s návody a skutečným ovládáním, build ID/stav funkcí, desktop a GitHub Pages. Přesné zadání: [CHAT_02.md](CHAT_02.md).

```text
SPACE_PROGRAM_GDD.md
README.md
docs/
  TECHNICAL_PLAN.md
  ROADMAP.md
  DECISIONS.md
  PROJECT_STATE.md     # aktuální stručný stav
  HANDOFF.md           # historie předání
  TEST_SCENARIOS.md    # dostupné i plánované scénáře, jasně rozlišené
  VISUAL_IDENTITY.md   # zachování schválené výtvarné vize
  adr/                 # až s prvními rozhodnutími
  experiments/         # reprodukovatelné podklady a výsledky
src/
  domain/
  sim/                 # frames, orbit, forces, scheduler, contacts
  session/
  timeline/
  prediction/
  content/
  persistence/
  render/
  editor/
  ui/
  devtools/            # izolovaný tester, až s první kostrou
tests/
  fixtures/
  sim/
  timeline/
  persistence/
  e2e/
public/                # provizorní assety
```

Zdrojové adresáře, package.json, CI a závislosti budou založeny v T01 v potřebném rozsahu. K 16. 11. je Git nainstalovaný, ale složka není repozitář. Chat 02 zkontroluje dostupný cílový repozitář a připraví Git/Pages workflow; nyní se nic nepublikuje. Starší vyloučení vzdáleného hostingu upřesňuje ADR 0003: počáteční hosting bude GitHub Pages.

## Změnový log

### 8. 11. 2026 – návrh technického plánu

- Přidány README, technický plán, roadmapa a registr rozhodnutí.
- Navrženo dřívější ověření více lodí, ukládání a historie; rozděleny první práce do T00–T11 a E01–E07.
- **Status:** pouze doporučení k projednání; žádná nová produktová nebo technologická volba nebyla prohlášena za schválenou.
- Původní GDD a jeho DOCX kopie nezměněny; hra ani nástroje nebyly implementovány.

### 16. 11. 2026 – pracovní postup, režimy a výtvarná návaznost

- Zaznamenány výslovné požadavky uživatele v ADR 0001 a dodatku Markdown GDD; původní výtvarná kapitola zachována. DOCX zůstává archivní verze 1.0 a není synchronizovaný s dodatkem.
- Přidány pravidla pro chaty, aktuální stav, předání, katalog scénářů a kontrolní přehled vzhledu. Doplněny README, roadmapa a technický plán.
- Do první kostry zařazen tester; do prostorové fáze samostatný D04 pro technický přechod planet před finální grafikou. V chaty explicitně pokrývají finální díly, soustavu a UI.
- **Status:** workflow a cíle upřesněny uživatelem; stack, numerika a konkrétní grafická metoda zůstávají doporučené/otevřené. Hra ani tester zatím nejsou implementovány.

### 16. 11. 2026 – zařazení editoru úhlových pohledů

- Schválená etapa A01 zaznamenána v ADR 0002, GDD §17.4 a roadmapě před V01–V02.
- Upraven výtvarný přehled: interní generátor již není jen neurčitá možnost; veřejný modderský nástroj nadále odložen.
- Přidán plánovaný ANGLE-001 a aktualizovány aktuální stav a předání. Žádný nástroj ani grafické assety zatím nevznikly.

## 16. 11. 2026 — chat 02: upřesnění menu a zveřejnění (schváleno uživatelem)

Volba 2D zůstává neaktivní bez štítku Připravujeme; u 2D/3D může štítek zůstat. Nedostupné volby nic nespouštějí. Uživatel výslovně odložil zveřejnění minimálně do funkčního 2D a chce počkat i na kompletní vzhled. To nahrazuje dřívější očekávání počátečního zveřejnění kostry na Pages: nyní pouze lokální build, kontroly a CI bez deploy. GitHub Pages může zůstat budoucím cílem; žádná vzdálená URL ani termín vydání nejsou určeny. Rozsah SYS-001 a technický základ ADR 0003 se nemění.

## 16. 11. 2026 — veřejný tester na Pages (schváleno)

Uživatel výslovně přijal veřejnou testovací verzi a poskytl repozitář https://github.com/MoskitoGrill/PaperSpaceProgram. To nahrazuje odložení veškerého zveřejnění: oddělený build:pages smí obsahovat tester SYS-001 a nasazovat se z main. Běžný produkční build zůstává bez testeru, vydání hotové hry se tím neprohlašuje. Žádné přihlašování, backend nebo herní mechaniky navíc.

## 16. 11. 2026 — chat 03: schválený orbitální model

Uživatel po projednání výslovně schválil analytický Keplerův pohyb, ruční intervaly, parametry reference, ORB-001/002 a numerické meze. Viz [ADR 0004](adr/0004-orbit-motion.md). Nejde o schválení finální soustavy ani budoucího režimu s tahem.
