# ADR 0004 — ověřený orbitální pohyb, chat 03

- Datum: 16. 11. 2026. Stav: schváleno uživatelem („ok, implementuj prosím“ po předložení návrhu).
- Kontext: jedna planeta a předdefinovaná loď; stávající SYS-001 a izolace session zůstávají.
- Rozhodnutí: analytická eliptická Keplerova propagace z periapsidy v epoše 0, SI, double, poloha i rychlost tělesově relativní. Kruhová dráha je e=0. Bez univerzálního propagátoru a hybridního přepínání v této etapě.
- Čas: celočíselný tick/60; jeden tick, +60 s, libovolný kladný interval zaokrouhlený na ticky. Neplatný/neudržitelný posun odmítnout beze změny světa. Žádný reálný čas, warp ani tah.
- Testovací konfigurace: μ=3,6e12 m³/s², poloměr 600000 m, a=1000000 m, e=0 a 0,3. Není to rozhodnutí o finální soustavě.
- Akceptace po 100 periodách a v mezilehlých časech: poloha ≤0,01 m, rychlost ≤1e-5 m/s, fáze ≤1e-8 rad; relativní odchylky energie/momentu hybnosti ≤1e-8, perioda ≤1e-8. Apsidy/poloměr ≤0,01 m. Reference nejméně desetkrát jemnější podle měřené změny při zjemnění.
- Alternativy: numerická produkční integrace (nyní zbytečný drift a náklady), univerzální proměnná pro všechny kuželosečky (odloženo do potřeby úniku).
- Důsledky: renderer pouze čte; izolované ORB-001/002 nad produkčním jádrem. Newtonova ODE s RK4 pouze v testech, konvergence a perioda ověřené nezávisle. Parametry i výsledky viz [experiment](../experiments/orbit-03.md).
- Omezení: eliptické nekolizní dráhy; hyperboly, kontakty, SOI, atmosféra, tah i ukládání mimo rozsah. Platnost přesnosti doložena pro testované konfigurace, nikoli všechny e<1.
