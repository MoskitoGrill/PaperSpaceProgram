# Experiment orbitální přesnosti — chat 03

16. 11. 2026, Node 24.22.1, Windows x64, JS double, Vitest; produkční a referenční výpočet ve stejném runtime. Spustit: `node node_modules/vitest/vitest.mjs run --reporter=verbose --disableConsoleIntercept`.

Parametry a meze: [ADR 0004](../adr/0004-orbit-motion.md). Produkce řeší M=E−e sin E pomocí ohraničeného Newtonova postupu s bisekční zálohou. Čas vždy od epochy, nikoli akumulace malých přírůstků stavu. Matematický podklad: [NASA/JPL, Fundamentals of Orbital Mechanics](https://spsweb.fltops.jpl.nasa.gov/portaldataops/mpg/MPG_Docs/MPG%20Book/Release/Chapter7-OrbitalMechanics.pdf).

Nezávislá reference v tests/unit/orbit.test.ts integruje kartézskou Newtonovu rovnici r''=−μr/|r|³ metodou RK4. Nesdílí produkční propagátor, konverzi elementů ani funkci periody. Výchozí periapsidová rychlost je odvozena zvlášť. Kroky T/8192 a T/16384; rozdíl je empirický odhad nejistoty, nikoli rigorózní matematická horní mez. Konvergence RK4 navíc ověřena při 512/1024/2048 krocích za periodu: poměr změn 16,636 (očekávání kolem 16). Kruh má navíc přímou sin/cos referenci.

Testované časy: 0,123; 0,25; 0,5; 0,789; 1; 10,37; 100 a 100,123 periody. e=0/0,3, úhel 0 se směrem +1 a úhel 0,7 rad se směrem −1. Apsidy ověřeny zvlášť. Produkční perioda také měřena bisekcí směrového průletu; nezávislá numerická perioda elipsy bisekcí průletu RK4 v okolí jednoho oběhu. Neověřuje se jen hlášená hodnota T.

Skutečná maxima běhu:

| Metrika | Výsledek | Mez |
| --- | --- | --- |
| Poloha proti jemné RK4 | 0,000164281 m | 0,01 m |
| Rychlost proti jemné RK4 | 4,65613e-7 m/s | 1e-5 m/s |
| Fáze | 2,34686e-10 rad | 1e-8 rad |
| Změna reference polohy při zjemnění | 0,000224257 m | 0,001 m |
| Změna reference rychlosti při zjemnění | 5,19060e-7 m/s | 1e-6 m/s |
| Relativní energie / moment (maximum obou) | 7,76103e-16 | 1e-8 |
| Relativní perioda produkčního průletu | 1,37323e-16 | 1e-8 |
| Relativní perioda nezávislého RK4 průletu | 1,45507e-12 | 1e-8 |

Perioda konfigurací je 3311,529421932 s. Ruční intervaly se zaokrouhlují na tick: nejvýše 1/120 s rozdílu proti zadání; toto není chyba propagátoru. Numerická akceptace se hodnotí ve skutečném simulačním čase. Nevyvozovat centimetrový návrat po zadání zaokrouhlené periody v UI.

Výsledek: všechny dohodnuté meze prošly. 9/9 unit testů včetně zachovaného SYS-001. Determinismus stejného stavu při jednom velkém posunu a 3600 malých krocích, izolace snapshotu, reset a odmítnutí neplatných vstupů ověřeny. Nejde o ověření budoucího numerického režimu s tahem ani všech excentricit či různých prohlížečových matematických knihoven.
