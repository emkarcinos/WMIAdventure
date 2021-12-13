# System punktów

## Wersja 0.1

### Historia zmian

| Data | Wersja | Opis | Autor |
| ---  | ---    | ---  | ---   |
| 13.12.2021 | 0.1 | Stworzenie dokumentu | Michał Czekański |

## Wstęp

Ten dokument zawiera formuły które będą użyte do wyliczania zdobywanych przez gracza punktów za różne akcje. Określi także jak wyliczać poziom danego gracza na podstawie jego liczby punktów.

Z czasem system punktów będzie ewoluował i ten dokument będzie aktualizowany.

## Ogólne zasady

Nie ma maksymalnego poziomu.

Punkty zdobywamy za:

- walkę

- tworzenie nowych bądź edytowanie istniejących kart w Edytorze Kart, które dodatkowo muszą zostać zaakceptowane przez administratorów.


## Zdobywanie punktów

### Walka

`w(rezultat, lvl1, lvl2)` - liczba punktów zdobyta za walkę w zależności od `rezultatu` walki, gdzie `lvl1` - nasz poziom, `lvl2` - poziom przeciwnika.

| `rezultat` | Zdobyte punkty |
| --- | --- |
| WYGRANA | `c + round(sqrt(lvl1)) + lvl2` |
| REMIS | `floor(lvl2)` |
| PRZEGRANA | `0` |

`c` to parametr, który będziemy dostrajać tak, by wygrana dawała odpowiednią liczbę punktów. Aktualnie `c = 6`.

#### Perspektywa początkującego gracza

Dla początkującego gracza głównie znaczenie będzie miał parametr `c`.

#### Perspektywa zaawansowanego gracza

Na wysokim poziomie nie będzie zbyt łatwo, ponieważ poziom `lvl1` jest pierwiastkowany. Dla takiego zaawansowanego gracza najważniejszy będzie poziom przeciwnika `lvl2`, dzięki czemu gracze na wysokich poziomach nie będą mogli zbyt łatwo zdobywać wyższych poziomów poprzez atakowanie tych o niższym poziomie.

### Edytor Kart

- stworzenie karty, która została zaakceptowana - `100` punktów

- edycja karty, która została zaakceptowana - `50` punktów

## Liczba punktów na dany poziom


Formuła `f(level)` - ile punktów musi mieć gracz, by osiągnąć dany `level`

| `level` | Liczba punktów |
| --- | --- |
| `1` | 0 |
| `2` | 10 |
| `3` | 20 |
| `4 <= level <= 11` | `f(level - 1) + f(level - 2)` |
| `level >= 12` | `((level - 1) ^ 2) * 10`


### Tabelka wyliczonych poziomów

| Poziom | Liczba punktów |
| --- | --- |
| 1 | 0 |
| 2 | 10 |
| 3 | 20 |
| 4 | 30 |
| 5 | 50 |
| 6 | 80 |
| 7 | 130 |
| 8 | 210 |
| 9 | 340 |
| 10 | 550 |
| 11 | 890 |
| 12 | 1210 |
| 13 | 1440 |
| 14 | 1690 |
| 15 | 1960 |
| 16 | 2250 |
| 17 | 2560 |
| 18 | 2890 |
| 19 | 3240 |
| 20 | 3610 |
| ... | ... |


Formuła daje dość zrównoważoną ścieżkę rozwoju. Na początku wymagane jest mało punktów, z czasem zdobywanie kolejnych poziomów jest coraz cięższe, ale nie zbyt ciężkie.

Aby zdobyć 10 poziom należałoby wygrać około 40 pojedynków (w zależności od tego kogo atakujemy).

Załóżmy, że jesteśmy na 19 poziomie. Musielibyśmy wygrać 13 pojedynków atakując graczy na 19 poziomie, aby zdobyć level 20.
