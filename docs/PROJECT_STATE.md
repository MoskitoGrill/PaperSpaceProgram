# Aktuální stav projektu

Aktualizováno: 16. 11. 2026. Fáze: chat 02 — lokální webová kostra implementována.

## Skutečně dokončeno

- TypeScript strict / Vite / HTML/CSS / Canvas 2D, npm lockfile a příkazy dev, build, preview, typecheck, lint, test, test:e2e.
- České menu s neaktivním 2D bez štítku a 2D/3D s Připravujeme, build ID a pravdivým přehledem funkcí.
- Lokální tester: SYS-001 s návodem před spuštěním i během testu, izolovaná session v paměti, těleso a nehybná značka lodě, ruční tick / 60 a úplný reset.
- Odděleny domain, čistý krok sim, session, renderer a vývojová fixture/UI. Žádné prázdné moduly budoucích systémů.
- Produkční artefakt vylučuje tester včetně jeho modulů. Relativní base a navigace bez serverových rout.
- Lokální Git inicializován, bez prvního commitu a bez remote. Git ignore a GitHub Actions pouze pro kontroly; nic se nepublikovalo.

## Ověření

Node 24.22.1, pomocné npm 12.2.2; Vite 8.3.8, TypeScript 6.0.3, Vitest 5.1.0, ESLint 10.15.0, typescript-eslint 8.72.2, Playwright 1.65.1. Přesný graf závislostí v package-lock.json. Node byl dostupný bez npm; ignorovaná `.tools/package` obsahuje lokální pomocné npm. README uvádí standardní i zdejší způsob spuštění.

- typecheck: prošel.
- lint: prošel.
- Vitest: 3/3 prošly (tick/čas, izolace/reset, bezpečný rozsah ticku).
- build: prošel; produkční kontrola obsahu: prošla, tester ani fixture nejsou v dist.
- Chromium 159: 2/2 E2E prošly (celý životní cyklus SYS-001, statická produkce na Pages podcestě bez testeru). Snímek testeru vizuálně zkontrolován: čitelné popisky/návod/ovládání, žádné překryvy.
- Firefox 159: oba E2E pokusy skončily před spuštěním prohlížeče, Playwright hlásí chybějící `mozglue.dll`. Funkčnost ve Firefoxu není ověřena; knihovna na disku existuje, příčina hostitelské validace nebyla vyřešena.
- Relativní Markdown odkazy: prošly. `git diff --check`: prošel, ale nový repozitář má soubory dosud untracked, proto nejde o úplnou kontrolu nových souborů.
- npm audit: 7 moderate ve vývojovém ESLint řetězci přes minimatch; žádné produkční závislosti. Nebyl použit vynucený downgrade navrhovaný auditem.

## Co neexistuje a omezení

Žádná gravitace, orbity, letové řízení, automatický čas/warp, editor, ukládání nebo herní historie. Tester nemění localStorage/IndexedDB. Finální vzhled, mobilní ovládání a 3D nejsou implementované. DOCX je archivní GDD 1.0; aktuální pravidla jsou v Markdownu.

Zveřejnění je na novější pokyn uživatele odloženo až na funkční 2D a kompletní vzhled. GitHub Pages zůstává možný budoucí hosting, není připojený remote ani deploy. CI nebylo spuštěno na GitHubu. Safari a mobilní prostředí nejsou ověřeny.

## Následující krok

Ručně ověřit SYS-001 podle README / TEST_SCENARIOS. Pak v novém chatu 03 nejprve domluvit kruhový a eliptický orbitální pohyb s přímým scénářem ORB-001 a numerickými kritérii. Rozsah numerických metod a tolerancí není schválen touto implementací. Reálný čas a warp patří do další etapy.
