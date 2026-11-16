# Výtvarná identita a kontrola zachování vize

Aktualizováno: 16. 11. 2026. Zdroj: celý GDD, především §4, §6 a §9, a pozdější upřesnění uživatele v projektovém chatu. Toto je kontrolní přehled, nikoli náhrada GDD nebo důkaz shody s nezdokumentovanými představami. Není stanovena finální paleta, konkrétní obrazová reference ani přesné kompozice všech obrazovek.

## Schválené výtvarné cíle

| Oblast | Co musí zůstat zachované | Zdroj |
| --- | --- | --- |
| Identita světa | Představivost dítěte a vlastnoručně vytvořený vesmírný program. Papír, karton, ruční kresba a záměrná nedokonalost, ale věrohodná fyzika. Jednotný styl celé hry. | GDD §9.1 |
| Orbitální mapa | Planety a měsíce zavěšené na provázcích jako mobil pod stropem. Černá ručně načmáraná hvězdná obloha. Přípustný malý proužek stropu/omítky nebo provaz mizející do tmy. Celý pokoj není povinnou scénou. | §9.2 |
| Trajektorie | Barevné bavlněné provázkové křivky kopírují přesnou dráhu, bez fyziky provázku. Skutečná a plánovaná dráha jsou odlišitelné; čistý technický pohled může vypnout dekorace. | §6, §9.2 |
| Raketové díly | Ručně kreslené papírové/kartonové vystřihovánky. V 2D matematicky otáčený hlavní sprite. V prostoru několik diskrétních pohledů podle dílu a vzdálenosti, nikoli obrázek pro každý malý úhel. | §9.3 |
| Strany a hrany dílů | Zrcadlení tam, kde funguje, asymetrie podle potřeby. Shora, zdola a na hranách viditelná tloušťka kartonu, dva papíry a vlnitá harmonika; může být jednoduchá. V dálce méně detailu a pohledů. | §9.3 |
| Planety a měsíce | Z dálky jednoduchá 2D kresba, blíž detailnější, zblízka pomalovaná fyzická koule s ručně kresleným povrchem. Výsledkem má být dojem makety, ne přechod do fotorealistické planety. | §9.4 |
| Editor | Pracovní stůl s technickým blueprintem. Kategorie na arších vystřihovánek; vycvaknutí dílu a možnost zasunutí archu do přihrádky. | §9.5 |
| Manipulace | Volitelné krátké zmačkání smazaného dílu do koše/pod stůl a dekorativní izolepa při spojování. Izolepa neurčuje pevnost spoje. | §4.2, §9.5 |
| Staging | Přeskládávané žluté štítky/samolepky. | §4.1, §9.5 |
| Knihovna | Složka/šanón, zacvaknuté papíry s nakreslenými raketami. | §4.1, §9.5 |
| Encyklopedie | Dětská kniha/omalovánka, postupné vybarvování a poznámky podle znalostí; propojení s herním poznáváním navrhnout zvlášť. | §9.5 |
| Časová osa | Whiteboard nebo nástěnka s poznámkami; přesná forma zůstává otevřená. | §9.5 |
| Efekty | Ručně kreslené motory, kouř, exploze a trhání papíru; později také sloupnutí, zmačkání nebo shoření. Zničené drobky nemají trvalou simulaci. | §3.3, §9.5 |
| Typografie a čitelnost | Technické texty čitelným písmem inspirovaným tiskem na krabicích, dekorativní ruční písmo. Vypínatelné/zjednodušitelné animace; vzhled neomezuje ovládání. | §1, §9.5 |
| Povrchy | Herní 2D profil kombinuje procedurální výšky, připravené prvky a kreslené dekorace; fyzika každého kamene není potřeba. Prostorová povrchová geometrie vyžaduje vlastní návrh. | §5.3 |

## Upřesnění z 16. 11. 2026

**SCHVÁLENO uživatelem:** 2D a prostorový režim jsou volby cílového hlavního menu, se samostatnými světy bez převodu uložených světů. Sdílejí vhodné základy, definice dílů a vizuální podklady. 2D má zachovat možnost pozdějšího využití na mobilu; desktopová prostorová verze nemusí mít mobilní podporu. Mobilní ovládání se tím ještě neimplementuje.

**SCHVÁLENO jako funkční cíl:** přechod vzdáleného 2D zobrazení planet/měsíců na blízkou prostorovou maketu ověřit v samostatném technickém chatu během vývoje 2D/3D, před finální výtvarnou produkcí. Může používat provizorní texturu a geometrii. Dekorativní „nafouknutí/vyloupnutí“ zůstává volitelný pozdější efekt, nikoli nutná metoda přechodu.

**DOPORUČENO pro technický chat D04:** zachovat střed, orientační referenci, návaznost kreslených povrchových znaků a zdánlivý poloměr tělesa; přiblížení mění reprezentaci, ne fyzický poloměr či gravitaci. Přechod musí fungovat v obou směrech, bez blikání při opakovaném zoomování a bez změny místa přistání. Vyzkoušet různé velikosti obrazovky i více těles. Změřit výkon a paměť; ověřit zjednodušené efekty. Hystereze, prolínání, prahy LOD a způsob mapování textury jsou návrhy k vyhodnocení, ne schválená technologie.

## Co sdílet mezi režimy

Sdílet zdrojové kresby, materiálové motivy, paletu po jejím schválení, identitu dílu a vhodné textury/UI. 2D může používat z těchto zdrojů jednodušší variantu. Nemusí čekat na celý prostorový renderer a nesmí kvůli sdílení nést zbytečnou grafickou zátěž. Společné podklady neznamenají totožný soubor pro každý pohled a zařízení. Z jednoho obrázku se spolehlivě nedopočítají neviditelné strany.

Finální technologii reprezentace dílů (diskrétní sprity, kartonová geometrie nebo kombinace) zvolit až po srovnání. **Upřesnění uživatele 16. 11. 2026:** interní editor/generátor úhlových pohledů má vlastní etapu A01 těsně před finálním vzhledem. Autor do něj vloží digitální kresbu tužkou nebo fixou; editor připraví několik potřebných pohledů. Promítnutí na jednoduchý 3D tvar a snímání z domluvených úhlů je pracovní návrh, který se konkretizuje v A01. Doplňkové podklady pro neviditelné strany mohou být potřeba. Veřejný modderský nástroj zůstává pozdější možností; v prvním 2D prototypu editor nevzniká.

## Pořadí a kontrolní brány

1. Funkční 2D hra s jednoduchou grafikou a oddělenými daty/vzhledem.
2. Malé stylové vzorky a prostorové technické experimenty s provizorními assety.
3. Samostatný chat D04 pro fungující přechod kresba → prostorová maketa → kresba, se scénářem VIS-PLANET-001.
4. Po prostorových experimentech zařadit samostatný A01 – editor úhlových pohledů z autorovy kresby; ověřit export v herním náhledu. Potom schválit pipeline na několika dílech, planetě a UI. Teprve potom produkovat celý katalog.
5. Samostatné chaty pro díly, soustavu/povrchy, mapu a UI, efekty a závěrečnou vizuální konzistenci obou režimů.

## Co není rozhodnuto a nesmí se domýšlet

Finální paleta a fonty, přesné rozvržení menu a HUD, míra stylizace osvětlení, přechod mapy do letového pohledu a chování závěsných provázků při přechodu na blízkou kouli, geometrie prostorových povrchů, konkrétní prahy detailu a formáty assetů. Tyto otázky předložit s malým vzorkem v příslušném chatu. Povinný celý pokoj, fotorealismus nebo stovky ručně kreslených úhlů nejsou součástí vize.
