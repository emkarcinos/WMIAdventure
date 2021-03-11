# Jak powinien wyglądać nasz projekt inżynierski?

## Opis produktu
Celem projektu *WMI Adventure* jest dostarczenie odbiorcom rozrywki w postaci aplikacji, która *opowie* historię, którą sami przeżyliśmy podczas swoich studenckich lat, pozwoli na rywalizację między studentami i zachęci do aktywnego udziału w studiowaniu. Przy postępowaniu w historii użytkownicy będą otrzymywać nagrody, które później będą wykorzystywać w pojedynkach między sobą, kolekcjonować je. Dobre wyniki w nauce będą skutkowały dodatkowymi benefitami.

## Dwa tryby
W aplikacji pojawią się dwa główne tryby (Nazwy do uzgodnienia):

*  *Adventure*
*  *Battle*

Oba te tryby mają stanowić osobne moduły, niezależne od siebie pakiety które mogą być rozwijane bez kolizji ze sobą.

### Tryb Adventure

#### Cel
Celem tego trybu jest przeżycie opowiadanej przez nas historii i zdobywanie kart-nagród, które będą później używane w aplikacji.
Historia będzie opowiadana na wzór *visual novel*, czyli obrazkowej historii z dialogami. Treść takiej historii miałaby charakter uniwersalny i przygodowy. W grę nie wchodzą żadne żarty z informatycznym żargonem, tylko po prostu historia. Budowanie całego uniwersum WMI w taki sposób, aby tworzyły zwięzłą całość i bieg fabularny. Opowieść ma odtworzyć klimat i atmosferę panującą na wydziale, pokazać postacie pracowników w ciekawych sytuacjach. W tym trybie znajdą się również zdarzenia losowe, o nich później.

#### Podział
Historia jest podzielona na semestry. Pod koniec każdego semestru przeznaczony będzie segment zakańczającu dany semestr, oznaczony jako *zaliczenie*. W późniejszych semestrach wydarzenia muszą współgrać w przedmiotami, na które zapisane jest użytkownik, aby historia dopasowała się do aktualnego planu nauczania takiego studenta.

#### Aplikacja dorasta razem z użytkownikiem
Wspomniany podział na semestry ma na celu podział użytkowników - zaczynając studia, nie ma możliwości przeżycia historii z lat wyżej. Student kończący dany etap studiów przechodzi do kolejnego semestru, tak samo dzieje się w aplikacji. Z biegiem studiów kolejne semestry są dostępne.

#### Nagrody, czyli *karty*
Po przejściu historii zaliczeniowych w danym semestrze, użytkownik otrzyma kartę z każdego przedmiotu, który ukończył. Karty stanowią główny składnik w trybie *Battle*, oraz stanowią aspekt kolekcjonerski. W zależności od ocen z przedmiotów ze świada rzeczywistego, karty stają się lepsze.

#### Zdarzenia losowe, czyli *minigry*
Podczas przechodzenia przez historię użytkownicy mają szansę na pojawienie się zdarzenia losowego. Takie zdarzenia będą miały charakter rozrywkowy i będą ściśle zwiazane ze zdarzeniami, które faktycznie mają miejsce na naszym wydziale, ukończenie takiej gry będzie nagradzało użytkownika nową kartą. W post-covidowym świecie, zdarzenia losowe będą zdarzały się tylko gdy użytkownik będzie znajdował się na terenie wydziału. Takich gier nie będzie wiele, dwie, trzy w zupełności wystarczą. Do każdego zdarzenia gracz będzie miał tylko jedno podejście, natomiast jedno zdarzenie może pojawiać się wielokrotnie.

#### Estetyka
Jak wspomniałem wcześniej, historia będzie w postaci *visual novel* - treść będzie akompaniowana przez ilustrację. Aspekt wizualny będzie składał się z postaci i tła. W pierwszej grupie znajdzie się postać gracza i pracownicy WMI. Postaci nie może być zbyt wiele, ze względu na ograniczoną ilość czasu na stworzenie setek grafik. Tła będą pokazywały ikoniczne miejsca na wydziale. Mogą być jako zdjęcia przetworzone na styl rysunkowy.

### Tryb Battle

#### Cel
W trybie battle gracze rywalizują ze sobą w oparciu o zdobyte wcześniej karty. Wynikiem każdej walki jest zdobycie pewnej ilości punktów, które sumują się na koncie użytkownika. Taki tryb pozwoli wyłonić najlepszych studentów, którzy wyświetlą się na tablicy rankingów.

#### Przygotowanie do potyczki
Każdy z użytkowników wybiera pewną ilość kart, które ustawia w wybranej przez siebie kolejności. Taki zestaw kart jest widoczny tylko dla gracza, inni, którzy chcą z nim realizować nie mogą mieć do niego dostępu. Ważne jest, że studenci nie wybierają kart przed pojedynkami, tylko globalnie wybierają swój zestaw, który później będzie służył w dalszych potyczkach. Gracz atakujący wybiera studenta, z którym chce realizować i walka odbywa się automatycznie. Z założenia, drugi gracz nie bierze udziału w walce. Wynik walki zależy wyłącznie od zestawu kart obu użytkowników.

#### Przebieg
Po obu stronach rozkładane są karty według zestawu graczy. Gra rozpoczyna się. Pierwsza karta atakującego wykonuje się z jakimś skutkiem (Więcej w sekcji *Karty*). Następnie wykonuje się pierwsza karta atakowanego, i tak dalej. Gra kończy się po iluś turach (do ustalenia kiedy). Wynik walki to punkty zdobyte przez obu graczy. Te są dodawane do wszystkich punktów zdobytych przez danego użytkownika.

## Karty
W trybie *Adventure* użytkownicy zdobywają karty w ramach postępowania przez historię. Każda karta odpowiada jednemu z przedmiotów zaliczonych przez studenta, opisuje ciekawy aspekt z tej dziedziny i ma do siebie przypisaną unikalna akcję, która wykonuje się w walkach w trybie *Battle*. Niektóre z kart mogą mieć dodatkowe modyfikatory w postaci konkretnych tematów z danego przedmiotu, na przykład *język* z przedmiotu *"Wstęp do programowania"*. Takie modyfikatory mają działanie kontrujące inne karty (sekcja niżej). Moc, wartość kart będzie też modyfikowana w zależności o ocenę, jaką dany student zdobył w świecie rzeczywistym.

### Karty-osiągnięcia
Dodatkowe karty stanowiące pewnego rodzaju osiągnięcia będą również dostępne do zdobycia. Takie karty będą miały aspekt wyłącznie kolekcjonerski. Karty takie będą trudne do zdobycia, tak, aby niewielka ilość graczy posiadała bonusowe karty (na przyklad, karta nagradzająca pierwszego studenta, który ukończy dany etap, karta dla studenta z najlepszą średnią, etc.). O aspekcie kolekcjonerskim później.

### Karty za zdarzenia losowe
Jak wspomniałem wcześniej, za ukończenie minigry ze zdarzenia losowego również możemy otrzymać kartę. Użytkownik otrzyma taką kartę gdy osiągnie wynikp przekraczający pewien próg. Podobnie jak karty z przedmiotów, będą zawierały dodatkowe akcje.

### Akcje
Akcją danej karty nazwijmy unikalny efekt jaki posiada ta karta. W trybie *Battle* wspomniałem o tym, że wykonanie się danej karty przynosi pewien skutek - to właśnie jest akcja. Akcja będzie szerokim pojęciem, bowiem każda karta może mieć zupełnie unikalną akcję. Może przynieść dodatkowe punkty, zmienić kolejność wykonywania kart przeciwnika, wykonać dwie karty pod rząd, itp. Akcje mogą być trudne do zbalansowania, dlatego nie możemy pozwolić sobie na tworzenie zbyt dużej ilości kart. 

### Moc kart
Karty z przedmiotów mogą mieć różną moc w zależności od ocen studenta. Ten temat jest otwarty do dyskusji - warto, aby karta poza większą wagą w trybie Battle miała też jakiś dodatkowy aspekt kolekcjonerski, jak np kolor ramki.

## Tablice rankingowe
Celem takich tablic jest wyłonienie najlepszych spośród wszystkich graczy. Nadaje to sens rozgrywce w trybie Battle i kolekcjonowaniu kart-osiągnięć. Będziemy mieć zatem dwie tablice:
Tablica Kolekcjonerska i Tablica Bitewna (Nazwy do ustalenia)

### Tablica kolekcjonerska
Tutaj nazwa mówi sama za siebie - rankingi będą wyświetlone według punktów kolekcjonerskich danych użytkowników. Każda karta będzie mieć swój atrybut z wartością kolekcjonerską. Wynikiem kolekcjonerskim każdego gracza będzie zatem suma wszystkich wartości kolekcjonerskich kart. Warto bardziej docenić graczy z większą ilością kart-osiągnieć nadając im większe wagi niż karty przedmiotowe.

### Tablica bitewna
Rankingi na tej tablicy rozpisane będą według wyniku wszystkich bitew odbytych przez graczy.

## Trudności projektowe
* Inegracja z USOS - pobieranie danych o aktualnym semestrze użytkowników, oceny, identyfikacja
* Balans kart
* Dostarczenie historii w uniwersalny sposób
* Ilość artworku i treści
* Zdarzenia losowe i minigry
* Sensowne wyliczanie punktów
