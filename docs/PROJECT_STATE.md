# Aktuální stav projektu

Aktualizováno 16. 11. 2026: chat 02 dokončen. Kostra a SYS-001 nasazeny na Pages; uživatel potvrdil, že veřejná verze funguje.

## Dostupné funkce

České menu s neaktivními režimy 2D/2D/3D, build ID a stav funkcí. Tester SYS-001 s návodem před spuštěním i během testu, izolovanou in-memory session, skutečným ručním tickem při 60 tick/s a úplným resetem. Domain, sim krok, session a renderer jsou oddělené. Bez fyziky a ukládání. Ostatní scénáře zůstávají plánované.

## Sestavy a hosting

- `npm run dev`: lokální vývoj s testerem.
- `npm run build`: dist bez testeru; kontroluje tests/check-production.mjs.
- `npm run build:pages`: dist-pages s testerem, veřejným označením a -test v build ID. Samostatný mode, žádný Vite dev server na hostingu.
- Git main, origin https://github.com/MoskitoGrill/PaperSpaceProgram.git. Workflow Checks and test Pages kontroluje a pak nasazuje pouze main; PR nic nepublikuje. Pages Source musí být GitHub Actions (uživatel doložil nastavení).
- Cílový odkaz: https://moskitogrill.github.io/PaperSpaceProgram/. Nasazení commitu 7ab95de úspěšné: Actions run 43910626545, checks i deploy success. Přímý průchod na veřejném webu v Chromiu prošel bez page/HTTP chyb; build 0.1.0+7ab95de-test. Schválení veřejné testovací verze nahrazuje předchozí odklad zveřejnění kostry, nikoli hotové vydání hry.

## Ověření této změny

Typecheck a lint prošly, Vitest 3/3, oba buildy prošly, kontrola dist bez testeru prošla. Chromium E2E 3/3: lokální SYS-001, Pages sestava SYS-001 v podadresáři včetně dynamického importu a produkční sestava bez testeru. Příkazy spuštěny místním npm přes `node .tools/package/bin/npm-cli.js`; E2E mimo sandbox kvůli lokálním socketům. Runtime a závislosti beze změny, lockfile zachován.

Lokální Firefox dříve nešel spustit kvůli hostitelské validaci mozglue.dll; tuto změnu v něm lokálně neověřujeme. CI na Linuxu úspěšně dokončilo celou E2E sadu pro Chromium i Firefox (3 scénáře v každém). Z předchozího auditu zůstává 7 moderate nálezů v dev ESLint/minimatch, ne ve webovém artefaktu. Safari/mobil nejsou ověřeny.

## Další krok

Uživatel 16. 11. 2026 potvrdil „funguje“. Jde o souhrnné ruční potvrzení nasazené verze, nikoli doložený výpis jednotlivých kroků nebo údaj o jeho prohlížeči. Žádný nový problém nehlásí. Chat 02 je uzavřen.

Otevřít chat 03 podle [CHAT_03.md](CHAT_03.md): nejprve domluvit kruhovou/eliptickou orbitu, metodu a akceptaci ORB-001; teprve po domluvě implementovat. Bez předčasného warpu/editoru/3D. Detail stávajícího SYS-001 zůstává v README a TEST_SCENARIOS.
