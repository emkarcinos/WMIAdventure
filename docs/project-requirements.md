# Dokument wymagań projektowych dla WMI Adventure

## Autorzy: Dawid Korybalski, Mateusz Tylka, Michał Czekański, Marcin Kostrzewski

## Data: 01/04/2021
Ostatnia modyfikacja: 01/04/2021 18:19 - Stworzenie dokumentu na bazie szablonu

# Elementy składowe projektu

## Semestr I
- Testowy serwer z aktualnym stanem aplikacji (04.05.2021)
- Testowa baza danych (04.05.2021)
- Domena z aplikacją w stanie testowym (20.06.2021)

### Elementy nieprogramistyczne
- Prototyp w narzędziu Figma (16.04.2021)
- Pełen prototyp designu interfejsu w Figmie (30.06.2021)
- Informacje o strukturze programistycznej projektu na GitHub Wiki (30.05.2021)
- Zawartość stworzona w Edytorze Kart (20.06.2021)
- Otwarta dokumentacja do Trybu Battle i Edytora Historii na Github Wiki (30.06.2021)
- Raporty z testów użyteczności modułów (30.06.2021):
    * Edytor Kart (30.06.2021)
    * Tryb Battle (30.06.2021)
## Semestr II

### Elementy programistyczne
- Aplikacja webowa (PWA) we frameworku React (20.11.2021)
- Serwer backendowy Django (25.12.2021)
- Baza danych PostgreSQL (25.12.2021)

### Elementy nieprogramistyczne
- Otwarta dokumentacja do całości systemu dostępna w Github Wiki (30.01.2022)
- Zawartość stworzona w Edytorze Historii i Pytań (30.01.2022)
- Raporty z testów użyteczności modułów (30.01.2022):
    * Edytor Historii (30.10.2021)
    * Tryb Adventure (30.10.2021)
    * Edytor Pytań (20.01.2022)
    * Minigry (20.01.2022)
    * Całość Aplikacji (30.01.2022)
- Samouczek dla użytkownika aplikacji (20.12.2021)
- Landing page projektu (20.01.2022)

# Granice projektu

## In / Out

Topic | In | Out | Opt | Komentarz
| :--- | :---: | :---: | :---: | :---:
Konta administratora | In | - | - | -
Aplikacja webowa | In | - | - | -
Aplikacja natywna na systemy iOS/Android | - | Out | - | Aplikacja webowa zapewnia łatwy dostęp dla każdej platformy, a natywne aplikacje nie dają żadnych realistycznych korzyści, są bardzo czasowo kosztowne.
Przechowywanie studenckich danych na serwerze | - | - | Opt | Niebezpieczeństwo związane z poufnością danych - systemowi wystarczą dane z zewnętrznych serwisów, ale nie wiemy na ile będziemy w stanie osiągnąc tą niezależnośc.
Limit walk na dzień | In | - | - | -
Wpływ ocen na karty | In | - | - | -
Zależność od obecności na wydziale | - | - | Opt | Duże ryzyko związane z ograniczeniami technologicznymi, niepewne dalsze studia stacjonarne
Rozbudowane animacje postaci | - | Out | - | Zbyt kosztowne czasowo, trudne technologicznie w stosunku do realnych korzyści
Elementy 3D | - | Out | - | Zbyt kosztowne czasowo, trudne technologicznie w stosunku do realnych korzyści. Nie pasują do stylistyki i prostoty aplikacji.
Aktywny udział podczas walki | - | Out | - | Zbyt kosztowne czasowo, aktualny model zakłada automatyczną walkę. Implementacja spowodowałaby duże utrudnienie w pracy nad systemem i duże ilości błędów.
Odrzucanie / akceptowanie pojedynków | - | Out | - | Wymaga powiązania sieciowego między dwoma fizycznymi urządzeniami - zbyt kosztowne czasowo. Implementacja spowodowałaby duże utrudnienie w pracy nad systemem i potencjalne ryzyko powstawania błędów.
Powiadomienia systemowe o ataku | - | Out | - | Wymaga powiązania sieciowego między dwoma fizycznymi urządzeniami - zbyt kosztowne czasowo. Implementacja spowodowałaby duże utrudnienie w pracy nad systemem i potencjalne ryzyko powstawania błędów.
Wizualizacja przebiegu walki podczas ataku | In | - | -
Historia walk | In | - | -
Czat | - | Out | - | Docelowa grupa odbiorców preferuje korzystanie z wybranych przez siebie komunikatorów. Aplikacja byłaby przeładowana zbyt szerokimi funkcjami.
System znajomości | - | Out | - | Przeładowanie aplikacji i duży koszt czasowy.
Serwer produkcyjny | In | - | - |
Serwer testowy | In | - | - |
Automatyczna weryfikcja treści | - | Out | - | Zbyt duża złożoność rozwiązania - łatwiej będzie moderować treści przez osoby fizyczne
"Patroni" kart / kasty / grupy | - | - | Opt | Rozwiązanie może powodować duże utrudnienia w balansowaniu kart i bardzo komplikuje implementację efektów kart. Jest to jednak ciekawy pomysł i być może będzie wprowadzony.
Interaktywność z kodami QR | - | - | Opt | Ciekawy pomysł na zaangażowanie studentów w aktywność na wydziale, może przyciągać nowych użytkowników, ale łatwo jest je "exploitować" poprzez np. wysłanie komuś zdjęcia, co może całkowicie zepsuć tą funkcjonalność.
System drzew dialogowych w Adventure | - | Out | - | Zbyt duża złożoność czasowa rozwiązania, duże utrudnienia w kreatorze historii
Wymiana / trading / marketplace kart | - | Out | - | Zbyt duży koszt. Karty powinny być nagrodami za aktywność w aplikacji i oznaczać pewne postępy, a wymiana kart odebrałaby ten czynnik.
Wyróżnienie kont dla prowadzących | - | - | Opt |


# Lista wymagań funkcjonalnych

## User Stories

W każdym story pomijamy aktora, jest napisane w nagłówku kto nim jest. Dodatkowo historie podzielone są na sekcję będące częściami systemu.

### 1. Użytkownik: Student

#### 1. Tryb Battle

1. Chcę w głównym widoku wejść w Tryb Battle i zobaczyć listę graczy, których mogę wyzwać na pojedynek oraz tych których nie mogę i chce wiedzieć dlaczego nie mogę.
2. Chcę mieć możliwość wyboru przeciwnika, aby mieć kontrolę nad tym, z kim będę walczył.
3. Po przejściu w Tryb Battle chcę móc wyszukać użytkowników po nazwie, aby stoczyć pojedynek z konkretnym studentem.
4. Oprócz wyszukiwania przeciwników, chcę aby aplikacja pokazała mi kilku sugerowanych użytkowników do walki, abym nie musiał za każdym razem wyszukiwać konkretnych graczy.
5. Po wyborze przeciwnika chciałbym zobaczyć jego profil, żeby móc przygotować się do walki.
6. W widoku profilu przeciwnika chciałbym dowiedzieć się o jego procencie wygranych, punktach zdobytych w aplikacji, pozycji w rankingach, aktualnym semestrze, żeby móc ocenić swoje szanse na wygraną.
7. Po wyborze przeciwnika chcę mieć możliwość powrotu i wyboru innego przeciwnika, aby uniknąć nieprzemyślanych decyzji i ewentualnych missclicków.
8. Chcę widzieć przebieg walki, żeby czerpać z niej satysfakcję i zobaczyć jak działają moje karty.
9. Przed rozpoczęciem i w trakcie walki chcę mieć możliwość fast-forwardu, czyli automatycznego rozegrania pojedynku bez wizualizacji, żeby szybko dowiedzieć się o jej wyniku i nie tracić czasu.
10. Po wygranej lub przegranej walce chcę zobaczyć skutki pojedynku, żeby wiedzieć co się stało i ile zdobyłem/straciłem punktów.
11. Chcę, aby przebieg walki, czyli między innymi karty moje i przeciwnika, został zapisany. Chcę móc mieć dostęp do kilku ostatnich historycznych pojedynków, żeby ocenić dobór swoich kart i przygotować się lepiej do przyszłych walk.
12. Nie chcę, żeby jeden przeciwnik atakował mnie cały czas znając moją talię, aby uniknąć masowych strat punktów.
13. Przed każdą walką chcę mieć dodatkowo możliwość łatwego przejścia do mojej talii kart, aby dostosować ją do konkretnej walki bez konieczności powrotów do poprzednich menu.
14. Po przejściu w Tryb Battle w pierwszym widoku chcę zobaczyć moje statystyki z tego trybu, takie jak punkty, stoczone walki, wygrane walki razem z procentem wygranych, aby po każdej walce widzieć, jak zmienia się moja pozycja w rankingu bez potrzeby przechodzenia do innych widoków.
15. Po przejściu w Tryb Battle w pierwszym widoku chcę zobaczyć moją talię oraz mieć możliwość przejścia do zmiany talii, by móc zweryfikować jej skład i ewentualnie zmienić ją przed pojedynkami.
16. Po skończonej walce chcę mieć możliwość powrotu do Trybu Battle, żeby nie musieć przeklikiwać przez całą aplikację.
17. Chcę aby system walki kartami był zbalansowany i atraktyjny, żebym cieszył się z gry i nie czuł, że wygrywanie jest zbyt łatwe, lub zbyt trudne posiadając daną ilość kart i bedąc na X semestrze.
18. Chcę żeby tylko osoby o podobnym poziomie bitewnym co mój mogły mnie wyzywać na pojedynki, abym nie mógł łatwo wygrywać ciągle z tą samą osobą, lub jakaś mocniejsza osoba nie mogła w kółko nabijać sobie na mnie punktów.
19. Chcę aby konkretne karty były atrakcyjne, miały informatyczny przekaz i sensowne działanie, żeby cieszyć się z pojedynkowania, układania talii oraz kolekcjonowania kart.
22. Chcę, aby było jaśnie określone, czy karty mogą mi się przydać do czegoś więcej niż tylko do Trybu Battle i mieć jasny przekaz do czego jeszcze mogę ich użyć lub jakie dają korzyści, żeby wiedzieć co mogę z nimi zrobić i cieszyć się z aplikacji.


#### 2. Tryb Adventure

1. Chcę w głównym widoku wejść w Tryb Adventure i zobaczyć wszystkie historie wyróżnione na te dostępne do przejścia, te które przeszedłem i te które nie są jeszcze dostępne.
2. Chcę móc "przyśpieszyć" wyświetlanie napisów dialogowych, bo mogę czytać je szybciej i nie chcę tracić niepotrzebnie czasu.
3. Chcę mieć możliwość powrotu do historii, które już przeszedłem, aby jeszcze raz je sobie przypomnieć.
4. W dowolnym momencie chcę móc wyjść z trybu, żeby móc skupić się na innej rzeczy, którą w danej chwili chcę zrobić.
5. Po wyjściu z historii chcę mieć możliwość powrotu do konkretnego momentu, w którym skończyłem, żeby nie musieć oglądać dwa razy tego samego.
6. Jeżeli zdobędę nową kartę, chcę być o tym wyraźnie powiadomionym, zobaczyć czym ta karta jest, żeby dowiedzieć się, że w mojej talii pojawiła się nowa bez konieczności wychodzenia z trybu.
7. Chcę wyraźnie widzieć, która postać mówi aktualny dialog, żeby nie gubić się w treści.
8. Chcę cały czas widzieć pasek postępu w historii, którą przechodzę, żeby móc ocenić ilość czasu jaką muszę poświęcić na ukończenie jej.
9. Chcę mieć możliwość pokonywania kluczowych postaci w Trybie Adventure, żeby czerpać satysfakcję z progresowania w aplikacji.
10. Przed walką z bossem chcę mieć możliwość zmiany mojej talii, żeby nie musieć wychodzić z Trybu Adventure w celu dostosowania mojej talii pod bossa.
11. Po skończonej walce z bossem nie chcę być wyrzucany z Trybu Adventure, żeby móc dalej kontynuować historię.
12. Jeżeli pokonanie bossa wiążę się ze zdobyciem nowej karty, to przed walką chcę się o tym dowiedzieć, żeby mieć większą chęć do walki.

#### 3. Rankingi

1. Chcę mieć możliwość wyboru kategorii rankingowych, żeby w jednym momencie widzieć tylko tą, która mnie interesuje.
2. Chcę, żeby kilku najlepszych graczy było wyraźnie zaznaczonych, aby czerpać większą satysfakcję jeżeli to ja będę wśród nich.
3. Przy każdym użytkowniku w rankingu chcę widzieć jego pozycję i wynik, aby łatwo odczytać informację o nich.
4. Chcę móc kliknąć na dowolnego użytkownika żeby wyświetlić jego profil w celu pozyskania informacji o nim.
5. Po wyświetleniu wybranego profilu chcę mieć możliwość stoczenia z nim pojedynku, żeby nie musieć zapamiętywać jego nazwy do późniejszego wyszukiwania w Trybie Battle.
6. Chcę wyszukiwać użytkowników po nazwie, żeby zobaczyć ich pozycję w rankingu, ich profil.
7. Chcę zawsze widzieć swoją pozycję i wynik w kategorii, którą aktualnie wyświetlam, żeby mieć do niej łatwy dostęp i nie musieć przechodzi do swojego profilu.

#### 4. Profil użytkownika

1. Chcę widzieć swoją nazwę i statystyki, żeby analizować swoje postępy w aplikacji.
2. Chcę móc łatwo edytować swoją talię kart, żeby próbować różne kombinację bez konieczności wchodzenia w tryb Battle.
3. Przy dostosowaniu talii chcę widzieć wszystkie dostępne karty, aby mieć możliwość łatwej zmiany talii.
4. Chcę zobaczyć informację o karcie którą wybiorę, żeby dowiedzieć się co ona robi i zdecydować czy chcę coś z nią zrobić.
5. Chcę mieć wgląd na wszystkie karty jakie posiadam, żeby cieszyć się swoją kolekcją.
6. W edytorze talii chcę, aby nowo zdobyte karty były jakoś oznaczone, aby nie musieć ich wyszukiwać wśród wszystkich innych.
7. Chcę widzieć poziomy swoich kart, żeby łatwiej dostosowywać talię.
8. Chcę zawsze widzieć ilość punktów Skilli, żeby łatwiej podejmować decyzję ulepszania kart.
9. W każdej chwili chcę mieć możliwość podjęcia się rozwiązania quizu, żeby otrzymać nowe punkty Skilli.
10. Chcę mieć dostępne dwie talie kart - do obrony i do ataku, aby odpowiednio przygotować się na nadchodzące pojedynki

#### 6. Quizy

1. Chcę mieć dostęp do widoku ze wszystkimi pytaniami podzielone na kategorie, na które do tej pory udzieliłem poprawnej odpowiedzi w quizach, aby móc je sobie przypomnieć.

#### 7. Pozostałe

1. Chcę mieć możliwość wyłączenia efektów dźwiękowych w aplikacji, aby nie musieć ich słyszeć gdy tego nie potrzebuję.
2. Chcę mieć możliwość zgłoszenia błędu w treściach aplikacji, żeby dać informację zwrotną twórcom, aby poprawili błąd.
3. Po wejściu do aplikacji chcę dowiedzieć się, czy trwa obecnie event losowy, aby zdobywać nowe karty, punkty PU i utrzymywać codzienną aktywność w grze.
4. Jeżeli nie mogę dołączyć do eventu losowego, chcę znać powód, aby dostosować się do jego wymagań i wziąć w nim udział.
5. Chcę dostawać powiadomienia informujące mnie o nowej zawartości w aplikacji, żebym mógł ją sprawdzić.
6. Chcę, aby opis do czego służy ta aplikacja i co można w niej robić nie był zbyt długi i znajdował się na jej stronie głównej bez potrzeby rejestracji, ani logowania, żeby łatwo się dowiedzieć, czy będę zainteresowany używaniem tej aplikacji.

### 2. Użytkownik: Twórca

#### 1. Kreator Historii

1. Chcę móc dodawać swoje obrazy, aby potem wykorzystać je w historiach.
2. Chcę obsługę przezroczystości, żeby postacie dobrze wyświetlały się na tłach.
3. Chcę mieć możliwość symulacji historii, żeby zobaczyć jak będzie wyświetlana użytkownikom i poprawić ewentualne błędy.
4. Chcę móc dostosować parametry historii, aby wyświetlały się konkretnym studentom na danym semestrze z danym przedmiotem.
5. Chcę dodawać wiele emocji dla postaci i móc je wywoływać w konkretnych dialogach, aby tworzyć bardziej dynamiczne historie.
6. Chcę ustawić kiedy i jaką kartę użytkownik zdobędzie, żeby tworzyć historię, po których użytkownik zdobywa nowe karty.
7. Chcę móc wywoływać proste animacje, żeby historie lepiej wyglądały.
8. Chcę móc usuwać swoje dodane obrazy jeśli jednak zdecyduje się na inny wygląd sceny, aby historia była zaprezentowana według mojej wizji.
9. Chcę dostać powiadomienie czy wysłana przeze mnie historia została wysłana pomyślnie, aby wysłać ją jeszcze raz w razie potrzeby.
10. Chcę móc wybierać i usuwać grafiki już znajdujące się w bazie danych aplikacji aby je wykorzystywać do swojej historii.

#### 2. Kreator Kart

1. Chcę móc dodawać swoje obrazy, aby tworzyć unikalne karty.
2. Chcę wybierać efekty z listy, żeby tworzyć dynamiczne karty.
3. Chce móc dostosować parametry karty, żeby miały konkretne efekty w trybie Battle.
4. Chcę zdecydować w jaki sposób karta będzie ulepszana przez punkty Skilli.
5. Chcę móc tworzyć karty wszelkiego rodzaju, aby przyczynić się do rozwoju treści w aplikacji.
6. Chcę, aby karta zawierała tytuł, przedmiot i krótki opis, aby móc charakteryzować karty i dzielić je na kategorie.
7. Chcę móc nadać karcie więcej niż jeden efekt, aby karty były bardziej różnorodne.
8. Chcę mieć możliwość tworzenia kart dających mocne benefity, ale też pewne kary dla posiadacza, żeby karty były urozmaicone.
9. Chcę tworzyć karty, które na różnych poziomach będą miały różne efekty, żeby same karty i ich ulepszanie na wyższe poziomy było ciekawsze.
10. Chcę mieć możliwość dołączenia dodatkowych uwag w formie tekstowej do mojego zgłoszenia nowej karty, żeby przekazać administratorom informacje inne niż te udostępnione przez Kreator Kart.

#### 3. Kreator Quizów

1. Chcę mieć możliwość wyboru z listy wszystkich dostępnych przedmiotu, żeby przypisać pytanie Quizowe do danego przedmiotu.
2. Chcę mieć możliwość wyboru trybu pytania spośród prawda/fałsz, abc, itd., żeby dostosować Quiz do swoich potrzeb.
3. Chcę mieć możliwość wyboru poprawnych i złych odpowiedzi, żeby pytania Quizowe były pełne.
4. Chcę dostać powiadomienie czy wysłane przeze mnie pytanie zostało wysłane pomyślnie, aby wysłać je jeszcze raz w razie potrzeby.

#### 4. Wszyscy kreatorzy

1. Chcę dostać powiadomienie o zaakceptowaniu mojej stworzonej treści, żeby wiedzieć, czy stworzyć dobrą treść.
2. Chcę dostać powiadomienie o odrzuceniu mojej stworzonej treści z uzasadnieniem, żeby móc poprawić moją treść.
3. Chcę dostać jakieś benefity za nadesłanie zaakceptowanych treści, żeby czuć satysfakcję z tworzenia.
4. Chcę móc edytować wszystkie stworzone przez siebie zawartości, w tym te odrzucone, żeby móc je poprawić.

### 3. Administrator

1. Chcę mieć możliwość modyfikowania parametrów aplikacji, żeby łatwo usprawniać jej działanie.
2. Chcę widzieć statystyki aplikacji takie jak ilość aktywnych użytkowników, ilość wszystkich użytkowników, średni czas pracy, aby oceniać jak dobrze aplikacja pracuje.
3. Chcę mieć możliwość akceptowania / odrzucania propozycji nowej zawartości i dodawania komentarzy, żeby decydować co trafia do aplikacji i dawać feedback twórcom.
4. Chce mieć realistyczny podgląd proponowanych treści, żeby ocenić czy je zaakceptować.
5. Chcę móc tworzyć konta testowe, aby swobodnie sprawdzać działanie aplikacji jako użytkownik.
6. Chcę móc usuwać zawartości już dodane, aby pozbyć się ewentualnych błędów lub złego contentu.
7. Chcę otrzymywać informację o zgłoszeniach nowego contentu, aby nie musieć za każdym razem sprawdzać listy.
8. Chcę otrzymywać powiadomienia o zgłoszonych błędach, żeby je poprawiać.


# Lista wymagań niefunkcjonalnych

1. Aplikacja powinna w pełni działać na urządzeniach mobilnych.
2. Integracja z systemem USOS.
3. Aplikacja powinna być na tyle wydajna, że 100 osób może użytkować z niej na raz.
4. 60% kodu pokryta testami jednostkowymi.
5. Każdy przyrost powinien być poddawany testom użytecznościowym przez grupę odbiorców.
6. Po każdym przyroście powinna być przeprowadzana ankieta na grupie odbiorców testującej system.
7. System ma umożliwiać administracji weryfikację treści pod kątem ich poprawności np. politycznej, moralnej, nie powinny nikogo oczerniać.
8. Projekt powinien mieć odpowiednią dokumentację, jako projekt *Open Source*.
9. Projekt powinien być tak napisany, że może być udostępniony jako *Open Source*.

# Mierzalne wskaźniki wdrożeniowe

- System zostanie zasilony treściami stworzonymi przez studentów i członków projektu:
    * 60 Kart
    * 100 Pytań do Quizów
    * 50 Historii Adventure
- Gałąź testowa systemu zostanie udostępniona pod domeną (http://wmiadventure.westeurope.cloudapp.azure.com) i będzie reagowała na wszystkie zmiany na tej gałęzi.
- Gałąź produkcyjna systemu zostanie udostępniona pod domeną (wmi-adventure.pl).
- W systemie zostanie utworzonych 70 kont użytkowników.
- W testach użyteczności całej aplikacji przez studentów system uzyska ocenę ogólną 7.5/10
- Studenci przeprowadzą 25 walk w trybie Battle.
- 50% historii Adventure zostanie stworzonych przez studentów.

# Kryteria akceptacji projektu dla I semestru prac

## Wymagane
- 20 Kart stworzonych w edytorze (US. 1.1.19)
- Edytor Kart (US. 2.2.1 - 2.2.9, 2.4.4)
- Serwer produkcyjny dla grupy odbiorców testującej produkt
- Wybór gracza do pojedynku (US. 1.2.2)

## Oczekiwane
- Pojedynek między dwoma graczami - symulator (US. 1.1.9)
- Zgłaszanie błędów / feedback (US. 1.7.2)
- Dokumentacja deweloperska na GitHub Wiki obejmująca dotychczasowe prace (Niefunkc. 8, 9)

## Planowane
- Testy użyteczności trybu Battle i Edytora Kart
- Pokrycie kodu testami jednostkowymi (Niefunkc. 4)
- Administracja treściami zgłaszanych przez użytkowników (US. 2.2.10, 3.3, 3.4, 2.4.1, 2.4.2, 1.7.5)
- Historia Pojedynków (US. 1.1.11)

# Kryteria akceptacji projektu dla II semestru prac

## Wymagane
- Pojedynek między dwoma graczami (US. 1.1.8)
- Talia Kart (US. 1.1.13, 1.4.2 - 1.4.5, 1.4.7, 1.1.15)
- Profil Użytkownika (US. 1.4.1, 1.1.5)
- UI/UX (US 1.1.1, 1.1.3, 1.1.7, 1.1.16, 1.7.1)

## Oczekiwane
- Podstawowy Balans Battle (US 1.1.12)
- Integracja z USOS (US 2.1.4)
- Walki z bossami w trybie adventure (US 1.2.1, 1.2.3, 1.2.9 - 1.2.11)
- Samouczek dla nowych użytkowników
- Edytor Adventure w formie tworzenia bossów i tekstów prowadzących do walki (US 2.1.4)


## Planowane
- Zdobywanie kart (US 1.2.6, 1.2.12)
- Edytor Adventure uzupełiony o dostosowywanie zdobywanych kart przy historii (US 2.1.6)
- System punktów umożliwiający ulepszanie kart (US 1.4.7, 1.4.8)
- Balans Battle (US 1.1.17 - 1.1.18)
- Dwie talie kart (US 1.4.10)

## Dawid
- Historia Pojedynków (US 1.1.11)
- Podstawowe Rankingi (US 1.3.2 - 1.3.5, 1.3.7, 1.1.6, 1.1.14)

# Organizacja pracy zespołu

## Zakres prac członków zespołu

### Michał Czekański
- Tworzenie kodu w backend, mocna znajomość wykorzystywanego frameworka Django
- Zarządzanie Continuous Deployment
- Design API

### Dawid Korybalski
Dawid dysponuje ograniczoną ilością czasu ze względów prywatnych.
- Tworzenie kodu w frontend, mocna znajomość wykorzystywanego frameworka React
- Utrzymywanie kontenera w Dockerze dla frontendu
- Kontakt z klientem, organizacja spotkań
- Marketing / SEO
- Design UI/UX

### Marcin Kostrzewski
- Tworzenie kodu w backend
- Utrzymywanie kontenera w Dockerze dla frontentu i całego obrazu Dockera
- Zarządzanie Continuous Integration
- Design API
- DevOps / Scrum Master

### Mateusz Tylka
- Tworzenie kodu w frontend
- Pomysłodawca / Product Owner
- Główny twórca treści w systemie

## Role programistyczne

### Backend (Python, Django, DjangoRestFramework)
- Michał Czekański
- Marcin Kostrzewski
### Frontend (HTML, CSS, React)
- Dawid Korybalski
- Mateusz Tylka

## Repozytorium kodu

Kod i historia zmian organizowana jest przez Git. Repozytorium online znajduje się na [GitHubie](https://github.com/emkarcinos/WMIAdventure) i na tą chwilę jego widoczność jest niepubliczna.
## Metodyka pracy
Zespół implementuje nieco zmienioną wersję metodyki **Scrum**. Dostosowaliśmy go do mniej codziennej pracy.


### Role

Product Owner: Mateusz Tylka
Scrum Master: Marcin Kostrzewski

### Sprinty

Każdy sprint będzie trwał dwa tygodnie, zakończony retrospektywą na ostatnim Daily. Nowy sprint rozpoczyna pierwszy Daily zaraz po retrospektywie.

### Daily

Podczas Daily omawiamy pracę wykonaną podczas realizacji zadań zabranych po poprzednim Daily; omówienie naszych sukcesów, problemów, przedstawieniem naszych planów na następne dni.

Wyróżniamy trzy spotkania Daily o określonych godzinach:
- Poniedziałek godz. 19:00
- Czwartek godz. 20:00
- Sobota godz. 12:00

Poza daily dodatkowo będziemy spotykać się online całością lub częścią zespołu na wspólną pracę.

### Retrospektywa

Retrospektywa odbywa się na ostatnim Daily trwającego Sprintu. Polegać będzie na:
- Przedstawieniu kamieni milowych, które udało nam się zrealizować podczas poprzedniego sprintu
- Przedyskutowaniu metodyki pracy

### Tworzenie i aktualizacja Backloga

Podczas przerwy między retrospektywą a Daily rozpoczynającym kolejny Sprint tworzymy Backlog; Wybieramy cele na nowy Sprint, rozdzielamy User Stories na podzadania i implementujemy zmiany w organizacji zaproponowane podczas Retrospektywy

## Narzędzia wspomagające

### Organizacja pracy
Do organizacji i koordynowania pracy korzystamy z GitHub Projects hostowanego razem z repozytorium kodu (https://github.com/emkarcinos/WMIAdventure/projects)

### Issues
Dostępne w GitHubie *Issues* wykorzystujemy jako User Stories. Dodatkowo posłużą do zgłaszania błędów i identyfikowania zadań spoza User Stories lub zadań będących ich częścią. W każdym Issue tworzona jest lista podzadań, przy których zaznaczamy, kto je realizuje.

### Milestones
Milestone tłumaczymy jako Epic i podpinamy pod niego wszystkie Issues dotyczące tego Epica.

### Projects
Jeden Project będzie stanowił jeden Sprint.

### Pull Requests
Pull Requesty będą służyły nam jako narzędzie do Code Review, który będziemy przeprowadzać sobie nawzajem. Po upublicznieniu repozytorium będziemy też oceniać zmiany w kodzie realizowane przez Contributorów, czyli ludzi chcących rozwijać ten projekt.

### Commity
Każdy commit jest oznaczony numerem Issue, który mu odpowiada.

### Branche
Przy realizowaniu danego zadania tworzymy na niego osobny branch, który zostanie zmergowany dopiero po zaakceptowaniu Pull Requesta stworzonego na ten branch.

### Continuous Integration
Continous Integration zapewnia nam GitHub Actions. Dla każdego commita realizowane są testy i taki commit oznaczany jest odpowiednio, w zależności od tego, czy pomyślnie przeszedł te testy.

Packaging zapewniony jest przez Dockera; korzystamy z *docker-compose* do tworzenia obrazu wielokontenerowego, gdzie w naszym przypadku są to kontenery osobno z backendem i frontendem. Taki obraz jest przekazywany do narzędzia odpowiadającego za Continuous Deployment. Kontener z frontendem nie jest jeszcze przygotowany.

### Continous Deployment
Obraz Dockera wysyłany jest na zewnętrzny serwer w usłudzie *Microsoft Azure Virtual Machine*. Obecnie gałąź główna repozytorium hostowana jest pod adresem (http://wmiadventure.westeurope.cloudapp.azure.com:8000). Na razie znajdziemy tutaj tylko backend.


# Ryzyka projektowe

# Balans kart
Treści w projekcie będą dynamicznie rozwijane. Karty mogą być tworzone i modyfikowane przez użytkowników, co sprawia, że efekty tych kart mogą być niezbalansowane, tj. jedna karta może być bardzo słaba i nie wnosić wiele do wyniku pojedynku, a inna zbyt mocna i drastycznie zwiększać szansę na wygraną. Optymalny balans oznaczałby, że dla każdej karty stosunek wygranych do przegranych pojedynków z jej użyciem wynosi 1:1. Osiągnięcie, a nawet zbliżenie się do takiego wyniku jest bardzo trudne, a nieprawidłowy balans przyczyni się do gorszej jakości rozgrywek. Szansa zaistnienia tego ryzyka jest **absolutnie pewna** - od razu powinniśmy myśleć o stworzeniu narzędzi, które mogą pomóc w balansowaniu kart.

# Utrzymanie zainteresowania grupy odbiorców
Aplikacja ma przeznaczenie rozrywkowe, jej sukces zależy od tego jaką przyjemność będzie sprawiać codzienna aktywność. Grupa odbiorców jest dość szeroka i ciągłe utrzymanie jej zainteresowania jest wymagające, w projekcie musi znaleźć się dużo treści, które powinny być dynamicznie rozwijane, oraz treści te powinny być dla nich interesujące. Próbujemy zachęcić studentów możliwością dodawania własnych treści do aplikacji, oraz jej open-source'owym charakterze, ale nie możemy liczyć na 100% powodzenia tej taktyki. Całkowity brak zainteresowania jest raczej mało prawdopodobny ze względu na plany zaangażowania odbiorców w rozwój aplikacji jeszcze przed jej wdrożeniem, ale jest duża szansa, że aplikacja straci zainteresowanie kilka miesięcy po wdrożeniu.

# Brak profesjonalnych umiejętności UI/UX
W składzie zespołu brakuje osoby posiadającej doświadczenie i wiedzę w zakresie designu interfejsu i user experience. Polegamy tutaj w większości na pracy z zewnątrz, która sama w sobie wnosi ryzyko. Dodatkowo prace frontendowe mogą się opóźniać przez brak projektów z designem. Te opóźnienia pojawiły się już przy implementacji pierwszych funkcjonalności.

# Integracja z systemem USOS
Co prawda aplikacja nie zakłada pełnej zależności od tego systemu, tj. awaria USOS'a nie wpłynie na działanie systemu, to jednak mimo wszystko jest to całkiem ryzykowne ze względu na dane jakich będziemy potrzebować od tego systemu. Nie wiemy jeszcze dokładnie czego będziemy potrzebować. Jeżeli okaże się, że USOS nie udostępni nam oczekiwanych danych, to realizacja niektórych funkcji może być utrudniona i jest to całkiem możliwe, dlatego ilość takich funkcji jest minimalna i nie kluczowa dla działania systemu.

# Ilość i jakość zawartości treści w ostatecznym terminie prezentacji projektu
Jakość aplikacji jest w dużej mierze uzależniona od treści, jakie będą w niej występować. Są to historie, karty, quizy. Stworzenie dużej ilości takich treści jest bardzo wymagająca czasowo i wymaga kreatywnych umiejętności. Dodatkowo treści te muszą być atrakcyjne i zrozumiałe dla grupy odbiorców. Historie mogą okazać się nudne, karty, które nie wyróżniają się z tłumu i quizy powodujące atmosferę 'egzaminu' czy 'kolokwium'. Wystąpienie takich treści w aplikacji może skutkować szybkim spadkiem zainteresowania u grupy odbiorców. Szansa wystąpienia tego ryzyka jest **umiarkowanie wysoka** - już na etapie analizy staramy się zminimalizować to ryzyko zachęcając samą grupę odbiorców do tworzenia tych treści.

# Wydajność uczelnianego serwera produkcyjnego
Do wdrożenia części produkcyjnej systemu planujemy wykorzystać uczelniany serwer z maszynami wirtualnymi. Mimo tego, że aplikacja nie wykonuje zbyt dużych ilości obliczeń, to jednak nie jesteśmy w stanie przewidzieć jak system będzie zachowywał się przy nagłych skokach w ilości aktywnych użytkowników na przykład podczas przerw między zajęciami. Będą zatem wymagane kompleksowe testy obciążeniowe żeby zbadać to ryzyko. Jeżeli to rozwiązanie okaże się być zbyt mało wydajne do potrzeb projektu, będziemy musieli pomyśleć nad płatną alternatywą. Szansa wystąpienia tego ryzyka jest **średnia**, bo mimo wszystko aplikacja nie będzie wykonywała zbyt dużych obliczeń.

# Złożoność obliczeniowa narzędzia do testowania kart
Badając ryzyko związane z balansem kart planujemy stworzenie prostego narzędzia weryfikujące ten balans. Takie narzędzie może być bardzo wymagające jeżeli chodzi o obliczenia. Może okazać się, że obliczenia będą musiały być wykonywane na płatnej maszynie o dużej wydajności. Ryzyko wystąpienia tego scenariusza jest **wysokie** i przy wystąpieniu może wymagać innego podejścia do weryfikacji balansu.

# System rankingowy
Podczas pierwszego spotkania z grupy odbiorców padało wiele pytań i sugestii co do systemu rankingowego w trybie Battle. Z kim użytkownik będzie mógł walczyć? W jaki sposób będzie wynagradzany za wygrany pojedynek? Odpowiedzi na te pytania będą zmieniały się wraz z rozwojem systemu. W przypadku stworzenia kiepskiego systemu rankingowego pojedynki mogą okazać się mało satysfakcjonujące, co zmniejszy zainteresowanie grupy odbiorców. Szansa wystąpienia tego ryzyka jest **wysoka** - wiele współczesnych gier opartych na rywalizacji ma z tym wiele problemów.

# Przejrzystość rozwiązań na backendzie w kontekście Open Source
Niektóre elementy systemu mogą mieć skomplikowną strukturę i szeroką logikę biznesową. Żeby utrzymać projekt w charakterze Open-source, musimy udostępnić otwartą dokumentację deweloperską. Żaden z członków zespołu nie ma zbyt dużego doświadczenia w pisaniu tego typu dokumentacji. W przypadku wystąpienia tego ryzyka potencjalni deweloperzy chcący rozwijać tą aplikację mogą się łatwo zniechęcić, gdyż repozytorium i kod okażą się przytłaczające. Szansa wystąpienia tego ryzka jest **niska**.

# Kamienie milowe

## Tryb Battle
Planowana data zrealizowania: 10.12.2021

Skład z terminami ukończenia:
- Edytor Kart - narzędzie do tworzenia / edytowania kart (12.10.2021)
- Funkcje Kart - co mogą robić karty (15.05.2021 / 29.05.2021)
- Zawartość: Stworzenie 20 kart (29.05.2021)
- Symulacja Pojedynku - walka między dwoma graczami (05.11.2021)
- Talia kart u gracza - możliwość wyboru kart do walki spośród wszystkich dostępnych (03.12.2021)
- Interfejs całego trybu (12.11.2021)
- Upublicznienie Edytora Kart do testów przez studentów (05.11.2021)
- Upublicznienie całego trybu do testów przez studentów (10.12.2021)

## Tryb Adventure
Planowana data zrealizowania: 24.12.2021

Skład:
- Edytor Historii - narzędzie do tworzenia / edytowania historii (24.12.2021)
- Zawartość: 20 Historii / Bossów (03.01.2022)
- Interfejs całego trybu (24.12.2021)
- Zdobywanie kart (12.01.2022)

## Integracja z USOS
Planowana data zrealizowania: 03.12.2021

Skład:
- Zarządzanie kontami użytkowników (03.12.2021)
- Połączenie konta USOS z kontem w aplikacji (03.12.2021)
- Dostępność historii w zależności od przedmiotów studenta  (24.12.2021)

## Panel Administratora
Planowana data zrealizowania: 24.12.2021

Skład:
- Administracja treściami zgłaszanymi przez Twórców (24.12.2021)
