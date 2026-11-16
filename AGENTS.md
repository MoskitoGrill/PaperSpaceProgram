# Pravidla práce na PaperSpaceProgram

## Povinný kontext při zahájení chatu

Přečti celý `SPACE_PROGRAM_GDD.md`, potom `docs/PROJECT_STATE.md`, nejnovější relevantní zápisy `docs/HANDOFF.md`, `docs/DECISIONS.md` a zadání aktuálního úkolu. Podle práce přečti `docs/ROADMAP.md`, `docs/TECHNICAL_PLAN.md`, `docs/TEST_SCENARIOS.md` a při práci na vzhledu celý `docs/VISUAL_IDENTITY.md`. Nevydávej návrhy za schválená rozhodnutí.

Aktuální výslovné pokyny uživatele mají přednost. Novější rozhodnutí zapsaná s datem upřesňují starší GDD. Při skutečném rozporu bez jasné priority požádej o upřesnění a nezačínej závislou implementaci.

## Jeden chat = jeden ověřitelný výsledek

- Na začátku nové etapy popiš česky očekávaný výsledek, rozsah, co půjde vyzkoušet a jaké konkrétní chování navrhuješ. Dej uživateli prostor to projednat před implementací. Pokud už aktuální zadání výslovně schvaluje konkrétní práci, neptej se na stejný souhlas znovu.
- Pracuj pouze na dohodnutém úkolu. Dlouhý úkol rozděl na navazující chaty s použitelným předáním; další etapy neimplementuj předčasně.
- Nejprve dokončený funkční 2D sandbox. V něm ověřuj a odděluj základy využitelné později v 2D/3D; prostorovou fyziku předčasně nevytvářej.
- Samostatné světy obou režimů, bez požadavku na převod 2D save do 3D. Společné definice, výtvarné zdroje a vhodná infrastruktura; žádný univerzální framework bez potřeby.

## Tester a ověřování

- Každý implementační chat přidá nebo aktualizuje přímo spustitelné scénáře své funkce v soukromém vývojovém testeru a jejich postupy v `docs/TEST_SCENARIOS.md`.
- Tester založ s první webovou kostrou. Scénáře připravují izolovaný svět i potřebnou historii, mají reset a nevyžadují odehrát předchozí misi. Nesmějí přepsat běžné světy ani jejich uložené body.
- Používej produkční simulaci a pravidla; testovací příprava může nastavit počáteční svět, nesmí nahrazovat ověřovanou mechaniku falešným výsledkem.
- Každý scénář má stabilní ID, stav dostupnosti, režim, účel, přesnou cestu v testeru, výchozí stav, číslované kroky a pozorovatelný očekávaný výsledek. Viz šablona v katalogu.
- Automatické testy doplňují ruční scénáře. Zaznamenej skutečně spuštěné kontroly a výsledky; neprovedené ověření jasně přiznej. Čistě dokumentační chat nemá vytvářet fiktivní spustitelný scénář.
- Při změně ovládání aktualizuj návody scénářů. Nevydávej plánované scénáře za dostupné.

## Předání při ukončení

Aktualizuj `docs/PROJECT_STATE.md` (stručná aktuální pravda), přidej zápis do `docs/HANDOFF.md` (historie práce) a podle změn aktualizuj rozhodnutí, GDD, roadmapu a scénáře. Technická implementace sama neschvaluje otevřený produktový požadavek.

Závěrečná odpověď musí být česky a obsahovat:

1. Co bylo skutečně dokončeno, které soubory se změnily a proč.
2. Co se automaticky ověřilo a s jakým výsledkem.
3. Jak aplikaci otevřít/spustit a které scénáře má uživatel vyzkoušet, každý s číslovaným postupem a očekávaným výsledkem. Postup musí být i v odpovědi, nestačí odkaz na dokument.
4. Známé problémy, vedlejší dopady a neověřené části.
5. Doporučený následující úkol; při nedokončení přesné pokračování místo falešného „hotovo“.

Pokud se měnila pouze dokumentace, uveď co má uživatel zkontrolovat v dokumentech; nepožaduj spuštění neexistující hry.
