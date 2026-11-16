# Chat 03 — orbitální pohyb: zadání k úvodní domluvě

Chat 02 je dokončen. Veřejná kostra se SYS-001 je nasazena na https://moskitogrill.github.io/PaperSpaceProgram/ a uživatel 16. 11. 2026 potvrdil, že funguje. Toto zadání neznamená schválení konkrétní numerické metody nebo tolerancí.

## Kopírovatelné zadání

Pracujeme na PaperSpaceProgram, chat 03. Postupuj podle AGENTS.md, načti celý GDD, aktuální stav, relevantní předání, rozhodnutí, roadmapu, technický plán a scénáře.

Cíl k projednání: ověřit kruhový a eliptický orbitální pohyb jedné předdefinované lodě kolem jednoho referenčního tělesa a přidat izolovaný ORB-001. Nejprve představ konkrétní metodu, parametry testovacího tělesa, ovládání, způsob posunu času a měřitelná kritéria přesnosti. Dosavadní numerická doporučení nejsou automaticky schválená. Dej prostor domluvě před implementací.

Zachovej SYS-001, izolaci/reset session a rozdělení stavu, simulace a rendereru. Po domluvě používej skutečné jádro, ne animaci nahrazující výpočet. ORB-001 musí nabídnout návod před spuštěním i během testu, reset a přímou přípravu výchozí dráhy. Zaznamenej skutečné automatické a ruční kontroly, aktualizuj stav a předání.

Mimo rozsah: tah/palivo, editor raket, ukládání a historie, reálný čas podle FPS a warp, měsíce/SOI, prostorová fyzika a finální grafika. Testovací těleso neurčuje konečnou soustavu.

Veřejný pracovní tester je schválen. `npm run build:pages` obsahuje tester, `npm run build` jej vylučuje. Push na main nasazuje Pages po CI. E2E vyžaduje oba buildy. Lokálně je pomocné npm v .tools/package; CI na Linuxu ověřuje Chromium i Firefox. Lokální Firefox měl problém hostitelské validace mozglue.dll. Není potřeba znovu zakládat hosting.
