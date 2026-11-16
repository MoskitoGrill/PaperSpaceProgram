# SPACE PROGRAM — hlavní návrhový dokument (GDD)

**Verze:** 1.0 — předání do projektu Codex  
**Datum:** 6. listopadu 2026  
**Stav:** pracovní specifikace založená na dosavadních rozhodnutích  
**Pracovní název:** 2D Space Program (není finální)  
**Platforma:** hra spustitelná v moderním webovém prohlížeči  

> **Pokyn pro Codex:** Tento dokument je zdrojem pravdy o schválené vizi a dosavadních rozhodnutích. Nezaměňovat doporučení za závazné požadavky. Před programováním navrhnout architekturu, etapy, rizika, datové modely a konkrétní první úkoly. Nezačínat plnohodnotnou 3D verzí, kariérou ani finální grafikou. Neimplementovat všechny nápady naráz. U nevyřešených bodů navrhnout varianty a zeptat se v projektu, až budou relevantní.

## 1. Stručné zadání a designové zásady

Vyvinout plnohodnotný **2D vesmírný sandbox inspirovaný Kerbal Space Program (KSP)**, se stavbou raket z modulárních dílů, věrohodnou orbitální mechanikou, lety mezi planetami, dokováním, stanicemi, správou více plavidel, dlouhodobými misemi a možností vracet celý svět k vybraným časovým bodům, aby hráč mohl odehrávat souběžné mise v jiném pořadí. Výchozí soustava je zmenšená a herně přístupná jako KSP; později další soustavy a reálné měřítko. Hra musí běžet v prohlížeči. Pozdější 2.5D/3D rozšíření se připravuje architekturou, **nikoli předčasnou implementací 3D**.

**Zásady (schváleno):**

- Hratelnost, přehlednost a stabilita mají přednost před výpočtem fyzikálních detailů bez významu pro hráče. Fyzika zůstane konzistentní tam, kde ovlivňuje výsledek mise.
- Nejprve **funkční plnohodnotný 2D sandbox**, pak experimenty s 2.5D/3D a až poté náhrada provizorní grafiky finálním ručně kresleným stylem. Postupný stylový prototyp je možný, ale nesmí blokovat mechaniky.
- Vizuální styl nesmí omezovat čitelnost ani ovládání. Hráč může vypnout či zjednodušit dekorativní animace.
- Kariéra/výzkumný režim, multiplayer, rozsáhlé mody a další soustavy jsou rozšíření, ne podmínka prvního dokončeného sandboxu.
- Každý systém navrhovat rozšiřitelně, ale nedělat komplexní „framework pro všechno“ bez aktuální potřeby.

### Význam štítků

- **SCHVÁLENO** = výslovně potvrzený směr nebo funkce.
- **DOPORUČENO** = pracovní technické řešení asistenta, musí projít plánováním/ověřením.
- **OTEVŘENO** = zatím neurčeno, nelze vydávat za rozhodnuté.
- **POZDĚJI** = plánovaný nebo možný obsah, mimo první implementaci.
- **NEPLÁNOVAT** = uživatel daný koncept odmítl nebo označil za nepřínosný.

## 2. Rozsah a cílový herní zážitek

**SCHVÁLENO:** Hráč sestaví vícestupňovou raketu, nastaví stupně a akční skupiny, odstartuje, dostane se na orbitu, naplánuje manévr, zamíří k měsíci/planetě, přistane, vrátí se, případně spojí lodě a postaví stanici. Ve světě může mít řadu souběžných družic, lodí a stanic. Výchozí režim je sandbox s dostupnými díly; finanční náklady a postup výzkumu až později. Není cílem bez omezení simulovat všechny trosky a každý nepodstatný proces.

**Cílové schopnosti plné 2D hry:**

1. Modulární konstrukce raket a lodí s rozsáhlým katalogem součástek.
2. Staging, palivo, tah, rotace, atmosféra, gravitace, kolize, přistávání.
3. Vlastní planetární soustava s hvězdou, planetami a měsíci.
4. Orbitální mapa a manévrovací uzly po vzoru KSP, plus užitečná vylepšení.
5. Rendezvous, dokování, stavba orbitálních stanic a samostatné odhazované stupně.
6. Více plavidel v jednom světě, časová akcelerace a úsporná simulace pozadí.
7. Návraty celého světa na vybrané časové body a přehrávání dříve pilotovaných misí.
8. Základní elektrické, komunikační a vědecké systémy (rozsah se ještě upřesní).
9. Spolehlivé ukládání, import/export světů a přenositelné návrhy raket.
10. Přehledné ovládání, vysvětlivky a výpočty delta-v/TWR.

## 3. Gravitace, orbitální mechanika a výkon

### 3.1 Gravitační model

**SCHVÁLENO:**

- **První etapa:** SOI / patched conics podobně jako KSP (gravitačně dominuje jedno těleso).
- **Druhá etapa:** volitelná **omezená N-body** gravitace pro lodě (působí několik planet/měsíců současně, ale tělesa soustavy mají předem určené dráhy).
- **NEPLÁNOVAT:** plné N-body, kde na sebe vzájemně působí všechna tělesa a lodě; náročnost nepřináší dostatečný herní zisk.
- Lodě **nepůsobí vzájemně významnou gravitací** a neovlivňují dráhy planet.
- Planety zpočátku na předem daných drahách; v omezeném N-body to může zůstat trvale. Jiná varianta pouze pokud vznikne konkrétní herní důvod.
- Pokud ve hře přibude více fyzikálních modelů, měly by být volitelné ve světových nastaveních. Přepínání během rozehrané hry je **OTEVŘENO** (pozor na kontinuitu a predikce).

**SCHVÁLENO:** Výpočet neaktivních lodí nemá běžet v plném detailu pořád. Na klidných drahách analytická/úsporná propagace; při zážehu, atmosférickém vstupu, interakci a hrozícím důležitém výsledku (např. pádu) podrobnější výpočet. I neaktivní objekt musí správně dospět k významné události. Když loď A letí k Marsu a B k Venuši a nijak neinteragují, nepotřebujeme simulovat jejich konstrukční detaily v každém kroku.

**OTEVŘENO/NA POZDĚJI:** přesné metody integrace, toleranční prahy, gravitační anomálie, vlivy nesférické planety (J2) jen pokud mají viditelný účinek v 2D a nepůsobí komplikace. Není nutné zahrnout všechny efekty reality.

### 3.2 Atmosféra a aerodynamika

**SCHVÁLENO:** Hustota atmosféry **postupně klesá** s výškou, bez náhlého herního přepínače. Nízké orbity mohou kvůli řídké atmosféře dlouhodobě ztrácet výšku, jako ISS. Atmosférický odpor, zahřívání při návratu, padáky, tepelný štít, přistávání, vliv tlaku na motory a (v odpovídající etapě) vztlak/aerodynamické plochy. Přesnost přiměřená hratelnosti a výkonu. Extrémně malý odpor lze pod prahem zanedbat bez viditelné skokové změny.

**POZDĚJI:** složitější vítr, počasí, turbulence a detailní aerotermodynamika. V čistém 2D nezavádět 3D aerodynamické jevy bez herní potřeby.

### 3.3 Konstrukce, poškození a trosky

**SCHVÁLENO:** Začít **tuhou sestavou**. Do budoucna lze přidat pružnost/slabá místa a rozpojování, nikoliv nutně jemnou simulaci deformace každé nádrže. Dva standardně spojené kompatibilní válcové díly mají typicky velmi pevný spoj; slabší spojení jako radiální uchycení, tenké nosníky, dokovací porty mohou být citlivější. Destrukce a deformace mají jít **v sandboxu vypnout**; první nastavení shovívavé jako KSP, časem případně zpřísnit.

**SCHVÁLENO:** Zničený díl **zmizí ze simulace**. Drobné úlomky se trvale nepočítají. Pozdější papírový vzhled dovolí efekty sloupnutí, zmačkání, roztržení či shoření. Odlišit zničený díl od úmyslně odděleného **funkčního stupně**, který má zůstat samostatným ovladatelným plavidlem (např. pro návrat a přistání).

## 4. Stavba raket a díly

### 4.1 Editor – chování

**SCHVÁLENO:**

- Konstrukce podobně jako v KSP: připojovací **body/plochy**, radiální připojování tam, kde je to přípustné.
- Volitelná mřížka, symetrie/zrcadlení vhodné pro 2D, kopírování dílů a podsestav, Undo/Redo.
- Staging s uspořádáním podobným KSP; později vizuálně jako **žluté štítky/samolepky** řazené pod sebe.
- Akční skupiny, podsestavy, ukládání konstrukcí a opětovné použití.
- Archiv návrhů jako **knížka/složka se zacvaknutými papíry** s nakreslenými raketami (vizuální cíl, ne první priorita).
- **Žádný samostatný povinný režim testovacího letu v editoru**: jako KSP lze vrátit start a upravit konstrukci; před přijetím výsledku lze let považovat za test.
- Výpočty v editoru: hmotnost, suchá/mokrá hmotnost, delta-v a TWR jednotlivých stupňů, těžiště, odhad stability, palivové a elektrické údaje.

### 4.2 Parametry dílů

**SCHVÁLENO:**

- Pevně určené rozměry a parametry **konkrétního dílu**, ne volné zvětšování/zmenšování hráčem.
- Jeden typ motoru má konkrétní rozměry/výkon; dostupné budou **různé typy motorů** včetně podobně vypadajících variant jiných rozměrů.
- Ze začátku jednoduché kategorie paliv: **tuhé, raketové (kapalinové), manévrovací (RCS)**; složitější chemie až později.
- Pevnost spoje určuje hra, **ne hráčský posuvník**.
- Žádný základní systém skládání nového funkčního dílu z mikrosoučástek.
- Jeden díl **může mít více funkcí** (např. kabina + baterie + anténa).
- Později barevné/skinnovací úpravy, variace vzhledu, případně volitelné naplnění nádrží; v kariéře to může ovlivňovat náklady.
- Katalog součástek má být velký, ale rozumně členěný. Zajistit datovou definici pro přidávání nových součástek a budoucí komunitní vzhledy.

**DOPORUČENO – kategorie:** řídicí kabiny a sondová jádra, nádrže, kapalinové a tuhé motory, RCS, reakční kola, konstrukce/adaptéry/oddělovače, kryty, aerodynamika, padáky, tepelné štíty, přistávací nohy/kola, baterie/panely/generátory, antény, dokovací porty, vědecké díly, světla, náklad, mechanické části. Rozsah konkrétních kusů bude plánován postupně.

**POZDĚJI:** jako výtvarný detail lepení dílů **izolepou**. Grafická animace nesmí určovat pevnost fyzikálního spoje.

## 5. Planetární soustavy a měřítko

### 5.1 Princip

**SCHVÁLENO:** Výchozí vlastní soustava je **konstantní, ručně vypiplaná a herně zmenšená podobně jako KSP**. Zmenšení znamená přiměřeně menší velikosti, hmotnosti i vzdálenosti; fyzikální zákony zůstávají stejné. Reálná soustava může používat reálné rozměry, hmotnosti, gravitace a vzdálenosti. Nejde o „zvětšit obrázek planety“ bez změny parametrů.

**SCHVÁLENO:** Začít jednou vlastní soustavou, rozšíření a další presetové soustavy **později**; v základním systému má být možnost budoucí výměny konfigurace světa. U již rozehraného světa **nepovolovat svévolnou změnu soustavy**, která by rozbila historii.

### 5.2 Výhled předvoleb (schválený záměr, ne pořadí implementace)

1. **Výchozí** – naše menší propracovaná soustava.
2. **Výchozí rozšířená** – více vzdálených planet/měsíců za prvním plynným obrem.
3. **Reálná Sluneční soustava** – reálné či přibližně reálné parametry.
4. **Náhodná vyvážená** – pravidla zaručí dobrou hratelnost.
5. **Náhodná chaotická** – mimořádné či neobvyklé konfigurace, které nemusejí být vyvážené.
6. **Vlastní** – sestavení soustavy a nastavení parametrů.

**DOPORUČENO:** První cílový výchozí systém: jedna hvězda, domovská planeta se dvěma měsíci, další kamenné světy a alespoň jeden plynný obr s několika měsíci. Konkrétní počty, názvy, parametry a grafika **OTEVŘENO**. Nepředstavovat navržený počet těles jako hotové rozhodnutí.

### 5.3 Povrchy a průzkum

**SCHVÁLENO:** Základ bude **2D povrch**, vhodná kombinace procedurálních výškových profilů, předpřipravených prvků a kreslených dekorací. Není nutné fyzikálně generovat každý kámen nebo prach. Ručně dotvořené povrchy a složitější biomy později. Asteroidy ano, případně po základním planetárním systému. Objevitelné/tajné objekty ano jako dlouhodobý nápad.

**OTEVŘENO:** oceány, složení biomů, podrobnosti terénu a klimatických vlivů; upřesnit při projektování konkrétních misí.

## 6. Let, mapa a navigace

**SCHVÁLENO:** Vycházet z dobře fungujících principů KSP, inovovat zejména ergonomii, informativnost a případná zjednodušení. Neimplementovat od základu jinou navigační filozofii jen pro originalitu.

- Ruční natáčení v **jedné rovině**, ovládání tahu, vypínání/zapínání motorů, stupňování, RCS, SAS, akční skupiny, přepínání lodí a time warp.
- Zaměřování prograde/retrograde a ostatních směrů, které dávají smysl v 2D; normal/antinormal až se skutečnou 3D mechanikou.
- Orbitální mapa s apoapsidou/periapsidou, výpočtem dráhy, manévrovacími uzly, delta-v, setkáními, cíli, barevným odlišením **skutečné a plánované** trajektorie jako v KSP.
- Plánování více manévrů a přesné zadávání hodnot; případný autopilot/automatické provedení manévru jako pozdější zlepšení.
- Ostatní vzdálené lodě zobrazit ikonou/názvem, při přiblížení skutečným modelem z dílů (pro rendezvous a dokování).
- Čitelný a nastavitelný HUD; delta-v, TWR, palivo, energie, orientace, rychlost, výška, přetížení, čas do manévru.

**VIZUÁLNÍ CÍL:** orbitální trajektorie vypadají jako **barevné bavlněné provázky**, ale fyzikálně jde o přesné křivky bez simulace provázkové dynamiky. Lze vypnout dekorativní textury pro čistý technický pohled.

## 7. Čas: paralelní mise a návrat celého světa

### 7.1 Hlavní herní inovace (SCHVÁLENO)

Hráč může nejdříve odehrát dlouhý let (např. dvouletou marsovskou misi), pak se vrátit k předchozímu bodu, **veškeré prostředí obnovit do stavu v onom čase** a během stejného období provádět jiné mise. Původní dříve pilotovaná mise se znovu vykonává podle zaznamenaného průběhu. Hráč tak řídí **souběžné mise bez nutnosti prožívat je chronologicky v jediném průchodu**.

Výslovně zvolena **varianta B — předběžná / dynamicky měnitelná historie**, ne zcela neměnná videonahrávka. Nově odehrané mise mohou ovlivnit původní (dodat palivo, dokovat, změnit trajektorii, způsobit kolizi).

**Důležité hranice (SCHVÁLENO):**

- Návrat **jen k uloženým nebo automatickým bodům** (typicky před startem/důležitou událostí), ne posuvník libovolně po celé historii.
- **Omezený časový dosah i počet bodů**, aby hra neřešila motýlí efekt 25 let zpátky. Přesné limity OTEVŘENO, nastavit při testování.
- Návratový bod znamená **stav celého světa v daném čase**: planety na správných pozicích; lodě, posádka, zdroje, technologie, finance (až budou) ve svém tehdejším stavu. **Záznamy budoucích misí** musí být uložené odděleně, aby nezmizely při obnově světa.
- Základní funkce se má hrát přirozeně a přehledně; časová osa je přidaná mechanika, **nikoliv složitý simulátor multivesmíru**.
- Po konfliktu se podle možností znovu počítá dotčený průběh. Pokud nelze pokračovat podle původní mise, její dřívější úspěch může být považován za **test/simulaci**, nikoli za platnou historii. **Není požadováno ukládat trvale všechny alternativní vesmíry či kompletní neplatné lety**. Deník může mít záznam, ale hra se má řídit aktuálním skutečným průběhem.
- Záznam misí má být úsporný: důležité události + nezbytné kontrolní stavy/řízení. **Úplný záznam průběhu pouze na vyžádání**, pokud to půjde. Přesná implementace až ve vývoji.
- Neaktivní daleké mise přehrávat/předpovídat úsporně. Při významném přiblížení/interakci přejít na odpovídající výpočet.

### 7.2 Příklad chování

1. Rok 0: start lodi A na Mars.
2. Rok 2: A doletí; hráč ji úspěšně řídil a přijme výsledek.
3. Hráč se vrátí k uloženému bodu v roce 0: **celý svět je v roce 0**.
4. Nově startuje loď B. A zároveň přehrává svůj zaznamenaný odlet a cestu.
5. B se může A vyhnout, setkat se s ní nebo dodat palivo. Při zásahu už pokračování A nemusí odpovídat původnímu záznamu.
6. Pokud se A od původního průběhu významně odchýlí, hra přeruší automatické pokračování / vyžádá převzetí řízení či opětovný výpočet; podle výsledku bývalý úspěšný let není platnou historií.

### 7.3 Zásady konzistence

- **Posádka není duplicitní.** Astronaut současně na dvou misích není přípustný.
- **Raketa nebo již použité zařízení nemůže být dodatečně upraveno jako dosud neodstartované**, pokud nešlo o vrácený testovací/neplatný pokus. Jinak je požadavek na změnu zakázán či vede k neuskutečnění mise.
- V budoucí kariéře musí být respektováno využití financí a technologií v daném čase. Technologie neexistující v době startu nelze zpětně použít.
- Přesné řešení dokování, přepočtu závislostí a střetů určit při implementaci s prototypem, ne předem složitým pravidlovým systémem.

**DOPORUČENÁ ARCHITEKTURA:** deterministický simulační čas, časované události, záznam důležitých vstupů a kontrolních stavů, odlišné uložení běžného stavu světa a budoucího plánovaného/zaznamenaného průběhu. Testovat obnovu, opakování a konflikty dříve než velký obsah.

**OTEVŘENO:** přesný limit návratů, co se stane při konfliktu během automatického přehrávání, návaznost na dokování, komprese/reprodukce záznamu, politika chybných misí. Neprezentovat tyto implementační volby jako schválené.

## 8. Ukládání, knihovna a sdílení

**SCHVÁLENO:**

- Každý svět má svůj stav a historii; ruční i automatické ukládání.
- Export a import světů; možnost záloh.
- Ukládat hlavně **důležité události**, ne trvale celý let po snímcích. Výjimka: záznam na výslovnou žádost.
- Počet lodí přizpůsobit výkonu, **ne pevně arbitrárně omezit**.
- Sdílení návrhů raket ano; sdílení kompletních misí zatím spíše ne.
- Správce objemu uložených dat až podle potřeby.

**DOPORUČENO:** IndexedDB pro lokální webovou verzi, verzované souborové exporty (např. JSON + assety/komprese) a migrační strategie formátu. Dát pozor na konzistenci globálních stavů a časových bodů. Konečný formát OTEVŘENO.

## 9. Výtvarná identita — závazná vize, pozdější produkce

### 9.1 Příběhový rámec

**SCHVÁLENO:** Svět je v **představivosti dítěte**, které si vytváří svůj vesmírný program a hraje si s vlastnoručně vytvořenými modely. Fyzika může být věrohodná, i když vzhled je záměrně nedokonalý, papírový, kartonový, ručně nakreslený. Celá hra sdílí jednotný styl. Nevyžaduje plně zobrazený pokoj.

### 9.2 Orbitální mapa

**SCHVÁLENO:** Zachovat **planety a měsíce zavěšené na provázcích** jako mobil pod stropem. Pozadím je **černá ručně načmáraná hvězdná obloha**; nahoře může být **malý proužek omítky/stropu**, ze kterého provázky visí, nebo hlavní provaz mizí do tmy. **NE** kompletní interiér pokoje jako povinná součást mapy. Pokoj možná až vzdálenější rozšíření. Planety visí, herní dráhy jsou pro přesnost zobrazované jako barevné provázkové křivky. Při přesném plánování má UI zůstat velmi čitelné.

### 9.3 Raketové součástky a 2.5D

**SCHVÁLENO:** Každý díl se v budoucnu ručně nakreslí (např. na tabletu) jako papírová/kartonová vystřihovánka. **Nechceme obrázek pro každý mikroskopický úhel.** V čistě 2D při rotaci v rovině stačí hlavní sprite otáčet matematicky. Pro budoucí prostorový pohyb užít **jen několik diskrétních pohledů** podle charakteru dílu, výkonu a pozorovací vzdálenosti.

- Pro opačnou stranu použít často zrcadlení nebo zrcadlení s drobnými úpravami; asymetrické díly podle potřeby jinak.
- Zhora, zdola a v hranových pohledech záměrně zobrazovat **tloušťku kartonu**, dva papíry spojené vlnitou „harmonikou“ jako v lepenkovém kartonu; klidně jen barva/načrtnuté detaily.
- V dálce ještě méně detailů a méně úhlových variant (LOD).
- **POZDĚJI:** interní nástroj na automatické generování úhlových variant ze zdrojového obrázku a základní geometrie. Mohl by být zpřístupněn modderům, kteří chtějí vlastní skiny/modely. Z jednoho obrázku nelze spolehlivě rekonstruovat neviditelné strany — bude třeba geometrická šablona nebo doplňkové podklady.
- Finální implementace může renderovat diskrétní 2D pohledy; **není rozhodnuto**, že skutečný 3D renderer je nutný nebo zakázaný. V projektu porovnat výkon, grafiku a pracnost na několika prototypech.

### 9.4 Planety a měsíce v obraze

**SCHVÁLENO:** Z velké dálky jednoduchá málo detailní **2D kresba**. Při přiblížení detailnější kresba. Zblízka přechod k dojmu **pomalované fyzické koule**, povrch dál ručně kreslený. Budoucí efektní animace, kdy se planetární obrázek „vyloupne“, nafoukne či zhmotní do koule, je **POZDĚJI**, není nutná pro fyzikální hru. Nejde primárně o realistické stínování; jde o větší kreslený detail a zhmotnění modelu.

### 9.5 Rozhraní jako dětské pomůcky

**SCHVÁLENO jako výtvarný cíl:**

- **Editor na pracovním stole** s technickým blueprintem.
- **Kategorie dílů na arších vystřihovánek**; díl se vycvakne z papíru, arch se může zasunout do přihrádky, takže opakované načtení dílu nepůsobí podivně.
- Smazaný díl se může **zmačkat a spadnout do koše/pod stůl**; krátké, rychlé, volitelné animace.
- Spojování dílů může mít dekorativní efekt **lepení izolepou**.
- Staging jako přeskládávané žluté štítky/nálepky.
- **Knihovna raket jako složka/šanón s papírovými návrhy**.
- **Encyklopedie jako dětská kniha/omalovánka**, která se postupně vybarvuje a doplňuje poznámkami podle získaných znalostí o planetě.
- **Časová osa jako whiteboard nebo nástěnka** s poznámkami; finální forma OTEVŘENO.
- Ručně kreslené efekty motorů, kouře, exploze, roztržení papíru.
- Typografie: technické popisky čitelným fontem inspirovaným tiskem na krabicích; dekorativní texty ručně kresleným/psaným písmem. Nikdy neobětovat čitelnost.

**Vývojový postup grafiky (SCHVÁLENO):** nejdříve jednoduché provizorní geometrické tvary a UI, až s hotovou kvalitní 2D hrou experimenty s několika stylovými vzorky a 2.5D, poté teprve pracná ruční náhrada textur. Žádné kreslení stovek finálních dílů před ověřením pipeline.

## 10. Rozšíření a zbývající otevřené domény

### 10.1 Obsah plného sandboxu – detail ještě projít

**K PROBRÁNÍ:** astronauti a EVA (jména, posádky, opravy, jetpack), elektřina (panely, baterie, spotřeba), komunikace (antény, dosah, zákryty a retranslace), vědecké experimenty, přesun paliva, dokování, terénní rovery, základny. Základní verze těchto oblastí jsou zamýšlené pro plný sandbox, **ale detaily nebyly schváleny**. Nesmí se implementovat podle domnělých specifikací.

### 10.2 POZDĚJI – zvažované rozšíření

- Vědecký režim a kariéra: technologický strom, výzkum, finance, kontrakty, reputace, infrastruktura.
- Detailnější pohonné látky, reálné chemické kombinace, kryogenní odpar; iontové/jaderné motory; částečné naplnění nádrží.
- Složitější pružnost, slabá místa spojů, pokročilá destrukce a přísnější fyzikální předvolby.
- Omezené N-body, nesférická gravitace, pokročilá atmosféra a počasí.
- Autopilot, uložené startovní profily, skriptovatelné sondy, automatické zásobování/udržování orbit.
- Náhodně generované, rozšířené, skutečné a vlastní soustavy; asteroidy a skrytá tělesa.
- Věda, komunikace, energetika, EVA a dlouhodobé zdroje ve větší hloubce.
- Povrchové základny, těžba, výroba, logistika, modulární vesmírné stanice a rovery.
- Mody, komunitní katalog/skins a nástroj na generování grafických variant.
- Reálný 3D orbitální pohyb, 3D mapa a případně 3D fyzika orientace, ale stále papírový styl z dílů; diskretní úhlové obrázky a/nebo extruze do kartonu.
- Multiplayer **spíše ne**, leda pokud se objeví velmi dobrý důvod; komplikuje jednotný čas, nahrané mise a synchronizaci. Není schválen pro vývojový plán.

### 10.3 Výslovně odložené otázky

- Detaily záznamu časových větví, přesné konfliktní stavy, přesná metoda rekonstruování odehraných trajektorií.
- Systém rozpoznání interakcí dvou neaktivních lodí a limit návratových bodů.
- Konkrétní obsah katalogu součástek, název systému, počty planet, názvy planet.
- Podrobná EVA, posádka, věda, komunikace, životní podpora, pokročilá energetika.
- Detailní parametry atmosfér, konstrukčních spojů, jednotlivých motorů.
- Výběr knihoven, vykreslovací technologie, ukládacího formátu, integrátoru.
- Mobilní a dotykové ovládání; možná později, hlavní start na desktopovém prohlížeči.

## 11. Technické zásady pro budoucí rozšiřování

**SCHVÁLENO jako cíl:** Umožnit pozdější 3D, ale netvořit ho v první fázi. Oddělit datový model, fyziku, grafiku, ovládání, UI, obsah, ukládání a časovou osu. Díly a jejich připojovací body navrhnout tak, aby šly v budoucnu přiřadit prostorové tvary. Tah a síly nemít „natvrdo“ svázané s kresleným spritem. Kamera a vykreslování nesmějí být zdrojem fyzikální pravdy.

**DOPORUČENÁ architektura pro návrhovou diskusi s Codexem:**

- TypeScript, výpočty přes oddělený simulační modul; Canvas 2D nebo WebGL podle prototypů.
- Pevný simulační krok pro aktivní fyziku; analytická/událostní propagace neaktivních drah. Pozor na determinismus a přepínání vysoké časové akcelerace.
- Násobné souřadnicové rámce pro planety a lokální konstrukce; vysoká číselná přesnost.
- Definice dílů a těles datově, se stabilními ID a verzemi.
- Editor/flight/map jako oddělené obrazovky nad stejným stavem světa.
- Pozdější Web Worker/WebAssembly jen podle měření skutečných výkonových limitů.
- Základy automatických testů: orbitální energie, kruhová a eliptická dráha, delta-v, oddělování stupňů, save/load, reprodukovatelnost časových návratů.

**Neschváleno jako konkrétní technologie:** žádný závazek pro konkrétní fyzikální engine či frontend framework. Codex má navrhnout alternativy a zdůvodnit volbu.

## 12. Navržený plán etap vývoje (schválit a zpřesnit v prvním chatu Codexu)

> Důležité: Jde o **doporučené pořadí**, nikoliv závazný harmonogram ani termíny. Každou etapu ukončit testovatelným funkčním výsledkem, který funguje v prohlížeči. Nepřeskakovat z experimentu rovnou na stovky dílů.

### ETAPA 0 — plán projektu a technický základ

**Cíl:** potvrdit technický stack, strukturu projektu, standardy, první testovací scénáře, dokumentaci a definici hotového výsledku.

- Projít toto GDD, označit schválené/otevřené položky.
- Vybrat simulaci vs. vykreslování, model času, reprezentaci objektů a ukládání.
- Rozdělit práci do malých milestone/tasků; vytvořit repo, lint, testy, jednoduchou webovou kostru.
- Připravit malý test konzistence gravitace a času.

**Hotovo, když:** existuje spustitelná kostra, automatické testy a jasný plán prototypu.

### ETAPA 1 — 2D fyzikální letový prototyp

**Cíl:** jedna planeta, jednoduchá loď, stabilní gravitační fyzika, tah a orbitální pohyb.

- 2D poloha/rychlost/orientace, SOI, jednoduchá rotace planety a kamerový zoom.
- Tah motoru, palivo, hmotnost a změna těžiště alespoň v základním modelu.
- Fyzikální krok, základní time warp, stabilní kruhové a eliptické dráhy.
- Základní HUD a grafika placeholderů.

**Hotovo, když:** hráč může odstartovat jednoduchou raketu, dosáhnout orbity a let reprodukovat; testy kontrolují numerickou stabilitu.

### ETAPA 2 — první modulární stavební editor

**Cíl:** z jednotlivých dílů postavit několikastupňovou raketu.

- Připojovací uzly, nádrže, motory, kabina/sonda, oddělovače.
- Staging, symetrie, mřížka, kopírování, Undo/Redo.
- Delta-v/TWR, základní editorové kontroly, ukládání návrhů.
- Vrácení ke startu a úprava konstrukce.

**Hotovo, když:** hráč sestaví, uloží a zalétá několik různých raket včetně oddělovaných stupňů.

### ETAPA 3 — orbitální mapa a planetární základ

**Cíl:** navigace mezi tělesy, plánování a návrat.

- Hvězda, domovská planeta, měsíc(e), stabilní SOI přechody.
- Orbitální mapa, apoapsida/periapsida, manévrovací uzly, plánovaný/skutečný let.
- Atmosféra, odpor, zahřívání a základní přistání (v rozsahu navazujícím na fyzikální prototyp).
- Kamerové úrovně zobrazení, přehledný HUD.

**Hotovo, když:** mise domovská planeta → měsíc → přistání → návrat funguje, včetně uložení.

### ETAPA 4 — více lodí, časová akcelerace a ukládání světa

**Cíl:** jeden trvale pokračující svět s více nezávislými misemi.

- Více lodí v jednom světě, přepínání, separované stupně.
- Analytické pokračování neaktivních orbit a aktivace při událostech.
- Ruční/automatické uložené body; import/export.
- Atmosférická degradace nízkých drah i pro neaktivní objekty.

**Hotovo, když:** současně fungují více lodí a družic bez destruktivních výkonových problémů, save/load neporušuje stav.

### ETAPA 5 — prototyp nahraných paralelních misí a návratů

**Cíl:** ověřit nejrizikovější vlastní mechaniku ještě před plnou produkcí.

- Celosvětové body návratu, oddělené ukládání budoucích záznamů.
- Přehrání původně řízené mise při novém průchodu časem.
- Interakční test: druhá loď původní mine / setká se / změní průběh.
- Jednoduchá pravidla zamítnutí duplicitní posádky/již použitých zdrojů.
- Úsporný záznam vstupů/událostí/kontrolních stavů, prototyp přerušení neplatné historie.

**Hotovo, když:** lze odehrát misi A, vrátit svět, spustit misi B a správně zachovat či přerušit průběh A. Není nutný plný generátor alternativních větví.

### ETAPA 6 — rendezvous, dokování, konstrukční a provozní systémy

**Cíl:** orbitální program se stanicemi.

- Relativní navigace, RCS/SAS, dokovací porty, spojování/oddělování konstrukcí.
- Přenos paliva a důsledky pro časovou historii.
- Přidání základní energetiky a komunikace v rozsahu schváleném během vývoje.
- Rozšířený katalog dílů, tepelná ochrana, přistávací systémy.

**Hotovo, když:** dvě nezávisle postavené lodě se mohou setkat, zadokovat, přepustit palivo a opět oddělit.

### ETAPA 7 — dokončení plnohodnotného 2D sandboxu

**Cíl:** kompletní ucelená hra, nikoliv demonstrace.

- Kompletní vlastní výchozí soustava s rozdílnými světy.
- Dostatečně bohatý katalog dílů a funkční úpravy staveb.
- Rozpracované elektro/komunikační/vědecké a případně posádkové systémy podle další dohody.
- Hranice výkonu, testy dlouhých misí, návod, ovládání, nastavení, stabilní ukládání.
- Ucelené herní scénáře: orbit, měsíční přistání/návrat, meziplanetární přelet, dokování, stanice, paralelní mise.

**Hotovo, když:** lze dlouhodobě provozovat vesmírný program a absolvovat všechny uvedené scénáře bez vývojářských zásahů.

### ETAPA 8 — grafické experimenty a základní papírová stylizace

**Cíl:** zkoušky na pár dílech a planetách, nikoliv předělávání celé hry naráz.

- Jeden či několik prototypů ručně kreslených dílů; kartonová hrana, zrcadlení a několik pohledů.
- Blueprint/worktable editor, papírové štítky/staging, provázková mapa se zavěšenými planetami a načmáranými hvězdami.
- Výtvarný LOD planet: jednoduchá kresba → detailnější kresba → maketa koule.
- Test automatického generování úhlových variant; porovnat sprite metodu s jednoduchou prostorovou geometrií.
- Ověřit čitelnost a výkon. Potom teprve finální kreslení celého katalogu.

**Hotovo, když:** omezený vizuální vertikální řez dokazuje funkční pipeline a nezhoršuje ovládání.

### ETAPA 9 — pokročilá rozšíření mimo původní 2D sandbox

**Dle priorit, nikoliv všechno současně:** rozšířené/realistické/náhodné soustavy, omezené N-body, kariéra a výzkum, náročnější automatizace, modding a komunitní vzhledy, detailnější fyzika a zdroje, EVA/rovery/základny.

### ETAPA 10 — 2.5D / 3D experimentální větev

**Cíl:** až po dokončení 2D hry připravit prostorovou navigaci a kreslené prostorové vnímání.

- Samostatný prototyp 3D polohy a orbit, prostorové orientace, navball/SAS a kamerového pohledu.
- Srovnat více diskrétních 2D pohledů s jednoduchým 3D kartonovým tvarem a hand-painted texturami.
- Nevnucovat všem hráčům 3D; zachovat čistý 2D režim.
- Teprve po ověření volitelně rozšiřovat hlavní hru.

## 13. Akceptační scénáře — ověřování kvality

- **S1:** několikastupňová raketa postavená v editoru, správně pracující staging a palivo.
- **S2:** stabilní oběžná dráha a úspěšná změna apoapsidy/periapsidy podle manévrovacího uzlu.
- **S3:** návrat atmosférou, padák/tepelný štít, přistání; nízká orbita dlouhodobě degraduje.
- **S4:** přepnutí na jinou loď zachová pozici, zdroje a orbitu první.
- **S5:** záměrně odhozený funkční stupeň může zůstat ovladatelný; zničený díl mizí.
- **S6:** dva objekty se potkají, zadokují, přepustí palivo a oddělí se.
- **S7:** odehraná dvouletá mise A se po návratu celého světa na uložený bod opakuje, zatímco hráč pilotuje B; bez interakce zůstane přijatý průběh A konzistentní.
- **S8:** mise B ovlivní A a hra bezpečně přeruší/nebo přepočítá starý průběh bez duplicitní posádky a bez zničení savů.
- **S9:** svět po uložení a načtení zachová časové body, stav lodí a probíhající mise.
- **S10:** zakázání destrukce v sandboxu funguje podle definovaných pravidel.

## 14. Rizika, která má Codex výslovně vyhodnotit

1. **Time rewind + měnitelná historie** je výrazně náročnější než obyčejný KSP quicksave; nejprve samostatný malý prototyp.
2. Při SOI je analytická propagace dobře proveditelná; **atmosférický odpor, konečné zážehy, dokování a kolize** vyžadují hybridní režim.
3. Při změně minulosti nemusí být možné zachovat budoucí záznam původní mise. Pravidla přerušení musí být jednoduchá, transparentní a nemazat hráči save.
4. Změna parametrů světa a fyzikálního modelu může znehodnotit dřívější výpočty; nastavení světa pro danou kariéru většinou fixovat.
5. Čisté 2D má zásadní limit: prostorové naklonění orbit neexistuje. Neklamat uživatele, že jde o plně 3D orbital mechanics.
6. Ruční úhlové sprite varianty nejsou „3D fyzika“; grafiku a simulaci oddělit, vyhodnotit varianty teprve na prototypu.
7. Podpora modů a multiplayeru se snadno může stát bezedným rozsahem; především stabilní data a export, nikoli celý ekosystém hned.

## 15. Co má Codex udělat v prvním projektovém chatu

Nezačínat kódovat stovky součástek. Zpracovat tento dokument a navrhnout:

1. Stručnou rekapitulaci závazných rozhodnutí, odložených nápadů a skutečně otevřených otázek.
2. Doporučený technologický stack pro prohlížeč s konkrétními alternativami a důvody volby.
3. Minimální datové modely: svět/čas, nebeské těleso, loď/díly, spoj, zdroje, události, bod návratu, záznam mise.
4. Návrh simulačního času a deterministického přehrávání jako **hlavní technické riziko**; přednostně malý funkční experiment.
5. Úpravy doporučených etap, rozdělení etapy 0–2 do zvládnutelných úkolů s testy a definicí hotovo.
6. Strukturu dokumentace a repozitáře; mechanismus změnového logu a rozhodnutí (ADR).
7. Jen ty otázky, bez jejichž odpovědi se opravdu nedá bezpečně začít; ostatní otevřené položky nechat pro příslušnou etapu.

**Navržený první prompt do Codexu:**

> Zakládám projekt prohlížečové 2D vesmírné hry inspirované KSP. Přiložený soubor `SPACE_PROGRAM_GDD.md` je kompletní zadání a souhrn rozhodnutí. Nejprve ho celý přečti. Chci společně naplánovat architekturu a vývoj po malých testovatelných etapách, nikoli hned implementovat celý projekt. Odděl schválené požadavky od doporučení a otevřených otázek. Zvlášť detailně navrhni malý technický prototyp 2D orbitální fyziky, ukládání celého světa a časových návratů/paralelních přehrávaných misí. Navrhni technologický stack, strukturu repozitáře, první milestone a testy. Zeptej se jen na skutečně blokující rozhodnutí. Po schválení plánu začneme etapou 0 a 1.

## 16. Stav tohoto dokumentu a pravidla změn

Tento dokument rekonstruuje rozhodnutí z celé návrhové konverzace ke dni 6. 11. 2026. **Záměrně nerozšiřuje nepotvrzené návrhy na povinné funkce.** Některé pozdější uživatelské opravy mají přednost před staršími asistentskými představami: zejména provázky zůstávají i na načmárané hvězdné mapě, alternativní historie se nemají trvale archivovat jako celé multivesmíry, trosky nezůstávají fyzikálně aktivní a 2D hra se dokončuje před grafickým 2.5D/3D experimentováním.

Každé zásadní nové rozhodnutí přidat s datem do změnového logu a označit, zda mění schválený požadavek, doporučení nebo etapu. Tento GDD je živý dokument — implementační detaily se mají upřesňovat postupně.

## 17. Schválená upřesnění z projektového chatu – 16. 11. 2026

Tento dodatek upřesňuje původní verzi 1.0 podle následných výslovných požadavků uživatele. Původní kapitoly zůstávají jako záznam návrhu. DOCX je archivní kopie verze 1.0 bez tohoto dodatku; pro další práci používat aktuální Markdown.

### 17.1 Režimy a sdílení základů – SCHVÁLENO

Nejprve dokončit samostatnou 2D hru a v ní ověřovat základy pro pozdější prostorový režim. Cílové hlavní menu nabídne 2D a 2D/3D. Převod uložených světů mezi režimy není požadován. Sdílet vhodné systémové základy, definice a vizuální podklady včetně dílů raket. Zachovat možnost pozdější mobilní 2D verze; prostorový režim může cílit jen na počítače. Mobilní podporu, dotykové ovládání ani konkrétní renderer tím předčasně neimplementovat.

### 17.2 Vývojový tester a návaznost chatů – SCHVÁLENO

Autor bude mít vývojový tester pro přímé spuštění připravených scénářů bez hraní předchozích částí hry. Každý implementační chat dodá relevantní scénáře a číslované postupy s očekávanými výsledky. Tester vzniká od první kostry a nesmí přepisovat běžné světy. Nejde o povinný testovací let v editoru odmítnutý v §4.1.

Na začátku každé etapy chat představí očekávaný výsledek a proběhne domluva o rozsahu/chování, pokud je uživatel již výslovně neschválil. Na konci uvede skutečné změny, ověření a kroky ručního testování. Pravidla jsou v AGENTS.md, aktuální stav v docs/PROJECT_STATE.md, předání v docs/HANDOFF.md. Dokumentace nesmí předstírat dokončené funkce nebo testy.

### 17.3 Technický přechod planet před finálním vzhledem – SCHVÁLENO jako cíl

V průběhu vývoje 2D/3D věnovat samostatný chat funkčnímu přechodu vzdálené jednoduché 2D kresby planety/měsíce přes detailnější zobrazení do blízké prostorové pomalované makety a zpět. Ověřit s provizorní grafikou před finální výtvarnou produkcí. Vizuální přechod nemění skutečné fyzikální těleso. Dekorativní nafouknutí/vyloupnutí z §9.4 zůstává pozdější volitelnou animací; přesná metoda renderování není schválena.

Finální vzhled raket, soustavy, mapy, editoru a ostatního UI má vlastní následné chaty po ověření pipeline. Kontrolní přehled celé doložené vizuální vize a otevřených detailů je v docs/VISUAL_IDENTITY.md; podrobné pořadí v docs/ROADMAP.md. Tato změna přesouvá funkční ověření přechodu z obecné grafické etapy do technické prostorové fáze, nikoli před dokončení 2D hry.

### 17.4 Interní editor úhlových pohledů – SCHVÁLENO jako etapa a účel

Upřesnění z 16. 11. 2026: těsně před finální vzhledovou fází zařadit samostatnou etapu A01. Autor vytvoří digitální kresbu dílu tužkou nebo fixou, importuje ji do interního editoru a ten z podkladu připraví několik potřebných úhlových pohledů. Do té doby nástroj není potřeba a funkční vývoj používá provizorní assety. Tím se původní pozdější možnost z §9.3 konkretizuje na plánovanou interní produkční etapu; veřejné zpřístupnění modderům zůstává odložené.

Pracovní návrh je umístit kresbu na jednoduchý prostorový tvar, otáčet jej či kameru a „fotit“ ve stanovených úhlech. Přesná metoda, geometrie, úhly a export se dohodnou v dané etapě. Jediná kresba sama spolehlivě neurčí neviditelné strany; jejich řešení patří do domluvy. Cílem je využít ruční podklad a zachovat papírovou/kartonovou identitu, nikoli předem vyžadovat konkrétní renderer nebo AI generování.

### 17.5 Chat 01 – konkrétní první kostra, 16. 11. 2026

Schválený rozsah a technický základ chatu 02 zaznamenává `docs/adr/0003-first-web-shell.md`, přesné zadání `docs/CHAT_02.md`. Jednoduché menu bude uvádět build a pravdivý stav funkcí. Vývojový tester nabízí relevantní scénáře s názvem, popisem a číslovaným návodem před spuštěním; používá skutečné ovládání ověřované mechaniky. První SYS-001 ověří izolovanou session, ruční tick a reset, bez fyziky. Ve finální veřejné hře vývojový tester nebude. První hosting GitHub Pages, primárně testování na počítači; veřejný produkční build bez soukromého testeru.

Možný budoucí tréninkový/scénářový režim s připravenými raketami je námět k pozdějšímu projednání. Další soustavy a vlastní konfigurace navazují na §5; uživatel chce při jejich návrhu projednat odvozování hmotnosti od velikosti planety, ale žádný konkrétní vztah zatím schválen není. První testovací těleso ani pozdější fixture měsíc neurčují konečné složení výchozí soustavy. Tato aktualizace neschvaluje zbylé numerické, ukládací ani konfliktní návrhy technického plánu. DOCX nadále archivní 1.0.

### 17.6 Chat 02 — menu a odložení zveřejnění, 16. 11. 2026

SCHVÁLENO uživatelem: nedostupné 2D tlačítko bez označení Připravujeme, u 2D/3D může označení zůstat. Obě volby jsou do implementace neaktivní. Veřejné vydání odložit minimálně do funkčního 2D a počkat i na kompletní vzhled. Kostra je nyní lokální, CI nic nenasazuje; předchozí počáteční hosting Pages neurčuje vydání této kostry. Ostatní rozsah ADR 0003 zůstává zachovaný.

### 17.7 Veřejná testovací verze na Pages — 16. 11. 2026

SCHVÁLENO uživatelem: veřejná pracovní verze s testerem pro pohodlné testování přes odkaz. Samostatný Pages build, běžný produkční build stále bez testeru. Nahrazuje odložení zveřejnění pracovní kostry v §17.6, nikoli požadavek dokončit funkční 2D a vzhled pro hotové vydání. Repozitář MoskitoGrill/PaperSpaceProgram, automatické nasazení po kontrolách main.
