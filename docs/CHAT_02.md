# Chat 02 – přesné zadání první implementace

Stav: připraveno po domluvě chatu 01 dne 16. 11. 2026. Autorita rozsahu: [ADR 0003](adr/0003-first-web-shell.md). Tento soubor není důkaz implementace.

## Kopírovatelné zadání

Pracujeme na PaperSpaceProgram, toto je chat 02. Postupuj podle AGENTS.md: přečti celý GDD, PROJECT_STATE, relevantní HANDOFF, DECISIONS, ROADMAP, TECHNICAL_PLAN a TEST_SCENARIOS, potom ADR 0003 a toto zadání. Implementuj již domluvenou první webovou kostru; neptej se znovu na stejný rozsah. Před zahájením stručně česky shrň očekávaný výsledek. Pokud budeš měnit vzhled nad jednoduché provizorní geometrické UI, přečti celý VISUAL_IDENTITY.

1. Založ jednu statickou aplikaci: TypeScript strict, Vite, npm, lockfile, HTML/CSS, Canvas 2D. Kompatibilní aktuální verze a Node runtime ověř a zapiš; nezakládej univerzální framework ani prázdné moduly budoucích systémů.
2. České menu: PaperSpaceProgram, režimy 2D a 2D/3D označené jako připravované. V lokální vývojové sestavě vstup do testeru. Dole build ID a stručný seznam skutečně hotových/připravovaných funkcí, bez procent celé hry. Produkční build neobsahuje tester ani jeho fixture moduly a spouštěcí cesty.
3. Tester nabízí SYS-001: název, účel, přesné číslované kroky, očekávané výsledky a až poté Spustit. Návod zůstává dostupný při testování. Budoucí nehotové scénáře nevydávej za dostupné. Menu samotné ověř přímo, nepřidávej mu herní scénář.
4. SYS-001 vytvoří pouze v paměti izolovanou 2D session: jedno referenční těleso, nehybná značka lodě, stabilní ID, tick 0. Odděl čistý stav a jeho změnu od session/UI a rendereru. Neimplementuj gravitaci ani jinou fyziku. Čas odvozuj z celočíselného ticku při 60 tick/s.
5. Ovládání: Provést jeden krok, Reset scénáře, Zpět do menu. Krok mění skutečný stav stejnou cestou jádra, nikoli jen text na obrazovce; reset obnoví celý scénář a nové spuštění vytvoří čisté nezávislé objekty. Nezapisuj do localStorage/IndexedDB ani běžných světů. Diagnostické krokování je zvláštní nástroj; budoucí letové ovládání musí být stejné jako ve hře.
6. Přidej příkazy dev, build, preview, typecheck, lint, test a test:e2e. Vitest ověří izolaci dvou session, opakovaný reset a skutečný postup ticků/času; Playwright průchod spuštění → 3 kroky → reset → menu → nové spuštění. Ověř též produkční build bez přístupného testeru a načítání assetů při Pages podcestě. Primárně desktop Chromium, podle dostupnosti také Firefox; přesně uveď, co se skutečně spustilo.
7. Uživatel má Git i GitHub. Nejprve zjisti skutečný stav složky a dostupné údaje o cílovém repozitáři; nepřepisuj existující historii ani nevymýšlej URL. Připrav Git ignore, lokální verzování dle stavu a GitHub Actions kontroly/build/deploy pro GitHub Pages podle oficiální dokumentace. Zajisti správné base a navigaci bez požadavku na serverové přepisování URL. Cílový repozitář není v chatu 01 známý; jeho získání a případné nastavení Pages nesmí blokovat lokální kostru. Chybějící vzdálený krok přesně přiznej. Není potřeba backend ani účty ve hře.
8. Aktualizuj README s přesnými příkazy, TEST_SCENARIOS se skutečnou cestou a ovládáním SYS-001, PROJECT_STATE a HANDOFF; roadmapu/rozhodnutí jen podle skutečné změny. Dokonči předepsané kontroly a výsledek popiš česky včetně ručních kroků a omezení.

Mimo rozsah: orbitální pohyb, tah, palivo, ovládání letu, automatický čas/warp, editor raket, save/import/export, historie misí, soustava/měsíc, tréninkový režim, mobilní ovládání a 3D. Chat 03 naváže kruhovou a eliptickou orbitou; žádnou z nich zde nepředstírej.

## Akceptace SYS-001 v chatu 02

Plánovaná cesta: Menu → Vývojový tester → SYS-001 → Spustit. Skutečnou cestu potvrď podle realizace.

1. Před spuštěním je vidět název, popis a číslovaný návod. Spusť scénář: tick 0, čas 0 s, těleso a značka lodě.
2. Třikrát zvol Provést jeden krok: tick 3, čas 0,05 s; poloha značek se nemění.
3. Zvol Reset scénáře: tick 0, čas 0 s a celý výchozí stav včetně zobrazení.
4. Proveď krok, vrať se do menu a spusť SYS-001 znovu: čistý výchozí stav, bez pokračování minulé session.
5. Produkční build otevři samostatně: vidíš menu a pravdivý stav vývoje, tester nelze spustit. Toto je kontrola sestavy, nikoli další herní scénář.

Hotovo znamená použitelnou lokální kostru, doložené kontroly, bezpečnou izolaci a předání; nikoli první hratelný let. Žádný scénář není dostupný před skutečnou implementací.
