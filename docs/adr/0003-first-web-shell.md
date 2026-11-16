# ADR 0003 – první webová kostra a tester

Datum: 16. 11. 2026. Stav: **schválený rozsah v chatu 01**, s níže oddělenými technickými doporučeními a odloženými volbami.

## Kontext a rozhodnutí

Chat 01 je dokumentační příprava; chat 02 teprve implementuje kostru. Rozsah chatu 02: jednoduché české menu, připravované režimy 2D a 2D/3D bez falešného spuštění hry, vývojový tester a SYS-001. Dole zobrazit identifikaci buildu a stručný pravdivý seznam hotových/připravovaných částí; nevypočítávat procento celé hry z proměnlivé roadmapy.

Tester postupně shromáždí všechny relevantní funkční scénáře. Každý nabídne název, popis, číslovaný postup a očekávané výsledky před tlačítkem Spustit. Ovládání ověřované funkce musí být stejné jako ve hře. Příprava světa, reset a diagnostické krokování jsou nástroje testeru, nikoli náhrada herních pravidel. Běžné menu a jeho vzhled se kontrolují přímo, ne samostatným herním scénářem.

SYS-001 ověřuje izolovanou session, ruční krok času a úplný reset. Jedno referenční těleso a nehybná značka lodě, počáteční tick 0, bez gravitace, tahu, orbity, automatického běhu a ukládání. Jeden krok posune tick o 1; technické nastavení 60 ticků/s dává po třech krocích 0,05 s. Renderer pouze čte stav. Reset a nové spuštění vytvářejí čistý stav bez sdílených měnitelných referencí. Vše pouze v paměti.

Začít jedním testovacím světem/tělesem, měsíc a další obsah přidávat podle potřeb etap. Nejde o schválení konečné konfigurace soustavy. Více předvoleb a vlastní soustava zůstávají pozdější cíle z GDD.

Primárním testovacím prostředím je počítač. Počáteční hosting je GitHub Pages, bez backendu. Soukromý tester zůstává lokálně ve vývojové sestavě a není součástí veřejného produkčního artefaktu. Skryté tlačítko není omezení přístupu.

## Technické řešení pro chat 02

Přijat navržený základ: TypeScript strict, Vite, npm/lockfile, HTML/CSS a Canvas 2D; Vitest, samostatný typecheck, ESLint a Playwright pro základní průchod. Konkrétní kompatibilní verze a podporovaný Node runtime vybrat a zaznamenat při realizaci. Přesná struktura modulů, interval 1/60 s a formát build ID jsou technické volby, nikoli nové herní požadavky. Doporučení: verze balíčku + krátké commit ID (lokálně fallback dev), stav funkcí jako malý explicitní seznam.

Alternativy React/Svelte a PixiJS nyní zvyšují rozsah bez potřeby; znovu vyhodnotit před bohatým editorem/větší scénou. Obecný fyzikální engine, worker a WASM nejsou součást kostry.

## Odložené a neschválené podrobnosti

- Budoucí hráčský tréninkový/scénářový režim s připravenými raketami je námět uživatele, nikoli objednávka implementace. Vývojový tester ve finální hře nebude; případný trénink potřebuje vlastní specifikaci.
- Při editoru vlastní soustavy chce uživatel projednat odvození hmotnosti od velikosti planety. Žádný vztah, hustota, rozsah ani ovládání zatím nejsou schválené.
- Integrátor, analytická propagace, limity historie, konflikty, IndexedDB a formát save zůstávají návrhy pro příslušné etapy. Přijetí kostry neschvaluje celý technický plán ani M1 do detailu.

## Důsledky a ověření

T01 přebírá z T02 minimální stav a explicitní krok času. Automatický čas podle FPS, stabilní řazení příkazů a warp se tím neprohlašují za hotové. Git/CI připravit v chatu 02; cílový GitHub repozitář dosud není známý. Dne 16. 11. je Git nainstalovaný, tato složka však není repozitář. Nyní se nic nepublikuje.

GitHub Pages vyžaduje správné Vite base pro cílovou URL a build/deploy workflow: [oficiální postup Vite](https://vite.dev/guide/static-deploy). V chatu 02 připravit workflow a dokumentaci; vzdálené připojení a nasazení dokončit podle dostupnosti cílového repozitáře. Lokální výsledek na něm nezávisí.

## Upřesnění po úvodní domluvě chatu 02 — 16. 11. 2026

Uživatel schválil implementaci: 2D je neaktivní bez Připravujeme, u 2D/3D označení zůstává. Zveřejnění je odložené až na funkční 2D a kompletní vzhled. Aktuálně se připravuje pouze lokální produkční sestava a CI kontrol, bez deploy workflow. Toto novější rozhodnutí upřesňuje výše uvedený počáteční hosting, nikoli izolaci testeru nebo rozsah mechanik.
