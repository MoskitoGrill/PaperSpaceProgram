# ADR 0001 – režimy, pracovní chaty a tester

Datum: 16. 11. 2026. Stav: **schválený směr uživatelem** v navazující projektové konverzaci; konkrétní implementační technologie zůstávají otevřené.

## Kontext

Vývoj proběhne po malých chatech. 2D má být plnohodnotná hra a ověřovací základ pro pozdější prostorový režim. Uživatel potřebuje přímé testování bez opakovaného hraní dlouhých misí a spolehlivé předání kontextu.

## Rozhodnutí

- Cílové menu nabídne 2D a 2D/3D, vývojová sestava navíc autorův tester. Dokud režim neexistuje, nesmí menu předstírat jeho dostupnost.
- Převod uložených světů z 2D do prostorového režimu není požadován. Sdílet vhodné definice, infrastrukturu a výtvarné zdroje.
- Možnost budoucího 2D na mobilu zohlednit oddělením vstupů a prezentace; mobilní podpora nyní není rozsah první implementace.
- Na začátku etapy proběhne představení a domluva očekávání. Každý implementační chat dodá scénáře s přímým spuštěním a kroky testování, na konci předá skutečný stav v souborech.
- V průběhu prostorového vývoje samostatně funkčně ověřit přechod planet/měsíců z kresby na prostorovou maketu, před finálním vzhledem.

## Zvažované alternativy

Převod starých světů není potřebný a zvyšoval by rozsah. Ruční příprava každého testu dlouhým hraním je pro uživatele nevhodná. Pouze závěrečná vizuální práce by odhalila problémy přechodu planet příliš pozdě.

## Důsledky

Tester vzniká s první kostrou a postupně roste, používá izolované světy a skutečné herní systémy. Dokumentace musí rozlišovat dostupné a plánované scénáře. Nejprve 2D, poté prostorové technické experimenty a finální grafika po ověření pipeline. Nejde o souhlas s konkrétním rendererem, integrátorem či automatickým řešením konfliktů historie.
