# PaperSpaceProgram

Lokální webová kostra budoucího 2D sandboxu. Dostupné jsou menu a vývojový tester SYS-001; let, fyzika ani ukládání ještě neexistují.

## Spuštění

Vyžaduje Node.js 24 LTS s npm. V této relaci ověřeno Node 24.22.1; běžná instalace Node obsahuje npm. Z kořene projektu:

```powershell
npm ci
npm run dev
```

Otevři adresu vypsanou Vite (standardně http://127.0.0.1:5173). Server ukončíš Ctrl+C. V pracovním prostředí Codex byl dostupný pouze Node, proto je ignorovaná pomocná kopie npm v `.tools/package`; zde lze místo `npm` použít `node .tools/package/bin/npm-cli.js`. Pokud zdejší certifikáty vyžadují systémové úložiště, nastav pro tento terminál `$env:NODE_USE_SYSTEM_CA='1'`.

## Kontroly a lokální produkční sestava

```powershell
npm run typecheck
npm run lint
npm test
npm run build
node tests/check-production.mjs
npx playwright install chromium firefox
npm run test:e2e
npm run preview
```

Preview standardně běží na http://127.0.0.1:4173. Produkční sestava v `dist` neobsahuje tester, jeho přípravu světa ani spouštěcí cestu. E2E vyžaduje předchozí `npm run build` i `npm run build:pages`, spouští vlastní servery na portech 5173 a 4173 a kontroluje i podcestu `/PaperSpaceProgram/` na obyčejném statickém serveru bez přepisování URL. Tyto porty musí být volné.

Lokálně prošly typy, lint, 3 testy Vitest, build, kontrola produkčního artefaktu a 2 E2E v Chromiu 159. Firefox 159 se na tomto hostiteli nespustil: Playwright hlásí chybějící `mozglue.dll` (soubor existuje, příčina validace není vyřešena). Jen ověřenou Chromium sadu spustíš `npm run test:e2e -- --project=chromium`. V prostředí Codex vyžadovaly lokální servery/prohlížeče spuštění mimo sandbox kvůli blokovaným socketům. Audit hlásí 7 moderate nálezů ve vývojovém řetězci ESLintu přes minimatch; tyto balíčky se nebalí do webové aplikace.

Build ID má formát `0.1.0+<krátký commit>`; před prvním commitem používá `dev`. Vite base `./` umožňuje podadresářový hosting, navigace nepoužívá serverové routy. Build není kontrola typů, proto je typecheck samostatný.

## Ruční SYS-001

1. Menu → Vývojový tester. Před spuštěním přečti návod SYS-001.
2. Spustit: tick 0, čas 0 s, těleso `sys001-body` a značka `sys001-vessel`.
3. Třikrát Provést jeden krok: tick 3, čas 0,05 s, obě polohy beze změny.
4. Reset scénáře: celý výchozí stav, tick 0, čas 0 s.
5. Proveď krok → Zpět do menu → Vývojový tester → Spustit: čistý stav od nuly.
6. V produkčním preview ověř menu: obě herní volby jsou neaktivní, tester chybí. U 2D není štítek Připravujeme, u 2D/3D zůstává.

Scénář běží pouze v paměti, nic nezapisuje do localStorage/IndexedDB. Návod je viditelný před spuštěním i během testu. Úplný katalog: [TEST_SCENARIOS](docs/TEST_SCENARIOS.md).

## Verzování a vydání

Repozitář: https://github.com/MoskitoGrill/PaperSpaceProgram. Uživatel schválil veřejnou testovací verzi. Workflow `.github/workflows/checks.yml` po kontrolách nasazuje větev main na GitHub Pages. V Settings → Pages musí být Source: GitHub Actions. Ruční spuštění: Actions → Checks and test Pages → Run workflow (main). Nasazení 7ab95de bylo úspěšné a veřejný SYS-001 ověřen; podrobnosti v HANDOFF.

## Projektové podklady

- [GDD](SPACE_PROGRAM_GDD.md), [aktuální stav](docs/PROJECT_STATE.md), [předání](docs/HANDOFF.md)
- [Rozhodnutí](docs/DECISIONS.md), [rozsah kostry](docs/adr/0003-first-web-shell.md)
- [Roadmapa](docs/ROADMAP.md), [technický plán](docs/TECHNICAL_PLAN.md), [výtvarná identita](docs/VISUAL_IDENTITY.md)

Další etapa: projednat a ověřit kruhový a eliptický orbitální pohyb. Prostorová fyzika a finální výtvarná produkce patří do pozdějších etap.


## Veřejná testovací sestava na GitHub Pages

`npm run build:pages` vytvoří `dist-pages` s testerem a označením Veřejná testovací sestava. Běžný `npm run build` stále vytváří `dist` bez testeru. Pro lokální prohlídku testovacího buildu: `npm run preview -- --outDir dist-pages`.

Po úspěšném nasazení otevři https://moskitogrill.github.io/PaperSpaceProgram/ a proveď výše uvedený ruční SYS-001. Každý push na main spustí typy, lint, unit testy, oba buildy, kontrolu produkčního artefaktu a E2E. Nasazuje se pouze dist-pages, nikoli zdrojové HTML. Pokud workflow selže, předchozí web se nepřepíše. Na osobní token ani ruční npm při testování webu není potřeba; workflow používá vlastní GITHUB_TOKEN.

