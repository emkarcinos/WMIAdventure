## Nazwa Projektu: WMI Adventure

## Autorzy: Dawid Korybalski, Mateusz Tylka, Michał Czekański, Marcin Kostrzewski

## Data: 04/03/2021
Ostatnia modyfikacja: 30/04/2021 11:40

# Executive summary
Często studentom brakuje inspiracji do studiowania. Wielu osobom jedynie chodzi o zdobycie "papierka".

Rozwiązaniem będzie aplikacja typu *Open Source* przeznaczona dla studentów Informatyki na WMI z elementami grywalizacji w klimacie wydziału, przekazująca inspirujące historie w postaci *visual-novel*.

Taki projekt ma potencjał, aby bardziej zintegrować społeczność na wydziale WMI, urozmaicić studiowanie Informatyki i poprzez otwartość kodu na zmiany, dostępność otwartych narzędzi do rozwoju treści zachęcić do pracy nad wspólnymi projektami w charakterze *Open Source*.

Potencjalnym ryzykiem projektowym będą problemy z dotarciem do grupy odbiorców i trudności w utrzymaniu ich uwagi przez dłuższy czas.

## Słownik
Hasło | Definicja
| :--- | :---:
| WMI | Wydział Matematyki i Informatyki Uniwersytetu im. Adama Mickiewicza w Poznaniu
| Punkty umiejętności | Jednostka reprezentowania osiągnięcia studenta w aplikacji i wiedzę w zakresie Informatyki i życia na wydziale WMI
| Minigra | Krótka humorystyczna gierka
| Quiz | Krótki zestaw pytań
| Karty | Wirtualne przedmioty kolekcjonowane przez użytkowników używane do pojedynków.

# Cel i Grupa Docelowa

### **Problem**
Wielu osobom studiującym Informatykę na WMI brakuje motywacji do lepszej nauki. Studenci często traktują studia jako "proces zdobywania papierków", nie angażują się w życie wydziału. Potrzebują natchnienia, które w ferworze walki z zaliczeniami może być znikome. Brakuje klubów, grupowych aktywności, zaangażowania w projekty uczelniane.

### **Rozwiązanie**
Aplikacja open-source typu "Level Up Life" wyprofilowana pod kierunek Informatyka na WMI

- Wizualizacja wyników i wiedzy studenta
- Nagradzanie studentów za oceny z przedmiotów i wiedzę poprzez możliwość lepszego rozwoju postaci w naszej aplikacji
- Grywalizacja, oparta o oceny, oraz wiedzę o studiowaniu informatyki na WMI
- Przedstawienie studenckich przeżyć, które pomagają wczuć się w życie na wydziale oraz inspirować do aktywnego studiowania
- Możliwość zapisania swoich studenckich przeżyć, aby upamiętnić swoje wspomnienia i udostępnić je pozostałym użytkownikom
- Dostarczanie rozgrywki w postaci gier, które są związane bezpośrednio z realnym życiem na WMI
- Aplikacja o charakterze Open Source, otwarta na rozwój dla pasjonatów programowania na WMI

Przechowywanie kodu w postaci open-source i otwarty charakter platformy na nowe treści ma zachęcić wszystkich studentów do włożenia własnego udziału w rozwój projektu. Ma to stanowić przykład dla przyszłych projektów, które mogą być dalej utrzymywane przez innych studentów.

### **Grupa odbiorców**
Studenci kierunku Informatyka na WMI, którzy otrzymując oceny za przedmioty nie czują z nich wystarczającej satysfakcji, brakuje im motywacji do nauki. Wielu studentów nie widzi sensu wkładania większego wysiłku w naukę, nie dałoby im to niczego poza lepszymi ocenami, które nie są dla nich stymulujące. Studentom brakuje satysfakcji po zaliczeniu ciężkiego przedmiotu, szczególnie z wysokim wynikiem.

Studenci, którzy chcą lepiej poznać charakter kierunku ze strony starszych studentów, brakuje im motywacji do chodzenia na zajęcia, brania w nich aktywnego udziału.

Osoby studiujące Informatykę na WMI, którym brakuje dobrego miejsca do przekazania swoich doznań na kierunku innym studentom.

Ambitni, konkurencyjni studenci, którym brakuje możliwości pochwalenia się swoimi osiągnięciami na studiach, brakuje możliwości rywalizacji ze studentami spoza swojego kręgu znajomych.

Osoby studiujące Informatykę na WMI, którym brakuje rozrywki, związanej z WMI.

Osoby studiujące Informatykę na WMI, którym brakuje studenckiego projektu o charakterze Open Source, który mogą rozwinąć. Brakuje im wydziałowych kół naukowych, na których studenci mogliby się poznawać, pracować razem nad projektami.

Studenci kolekcjonerzy, którzy uwielbiają zdobywać wszystkie możliwe osiągnięcia, lubią się nimi chwalić.

### **Sposób dotarcia do grupy odbiorców**

Wywieszenie przyciągających plakatów/ogłoszeń o aplikacji na wydziale.
Założenie grupy na odpowiednich mediach społecznościowych.
Żeby rozgłosić powstanie tego typu aplikacji zostanie użyta poczta studencka służąca do rozsyłania informacji o nowym projekcie.
W późniejszych fazach wdrażania systemu utworzone zostanie mini koło naukowe pokazujące studentom pracę nad projektami open-source na przykładzie WMI Adventure.
Zachęcanie studentów poprzez kontakt ze starostami.

### **Główny produkt projektu**

Aplikacja kliencka dostępna na każdej platformie poprzez przeglądarkę, którą można pobrać jako aplikację mobilną (PWA).
Dane użytkowników i obliczenia będą działały na scentralizowanym serwerze.

W aplikacji będą wyróżnione trzy strefy:
- Strefa publiczna, czyli część projektu przeznaczona dla wszystkich studentów (konsumentów)
- Strefa autorska, czyli zestaw narzędzi umożliwiające rozwój treści w strefie publicznej, z których każdy może skorzystać i zaproponować nowe historie, karty, quizy, itp.
- Strefa administracyjna umożliwiająca zarządzanie kontami użytkowników i parametrami pracy aplikacji, dostępna tylko dla osób zarządzających aplikacją. Administratorzy będą **zatwierdzać** lub **odrzucać** treści, które będą chcieli dodać użytkownicy. Tą rolę może w przyszłości pełnić samorząd uczniowski, autorzy projektu lub inna zaufana grupa.

Aplikacja ma być lekka i szybka. Rozgrywka nie będzie wymagała poświęcenia wielu godzin na raz, studenci będą mogli spędzić kilka minut dziennie dokonując zadowalające postępy.

### **Wartości dodane wnoszone przez projekt**
- **Zdobywanie wiedzy** - poprzez rozwiązywanie quizów z bazy pytań utworzonej przez studentów.
- **Większa satysfakcja z nauki** - Dobre wyniki w nauce mają korzystne odzwieciedlenia w naszej aplikacji.
- **Aspekt proedukacyjny - Motywacja do nauki** - Chęci osiągnięcia największych miejsc rankingowych wiążą się z nauką. Wartości przekazane w opowieściach.
- **Rozrywka**:
    - pojedynki z innymi studentami w trybie battle
    - opowieści w trybie adventure przygotowane przez studentów
    - rozwój swojej kolekcji kart za pomocą Punktów umiejętności
    - zbieranie Punktów umiejętności poprzez rozwiązywanie codziennych Quizów
- **Kolekcjonowanie** - zdobywanie unikalnych kart z osiągnięciami, dodatkowa wartość za dobre oceny.
- **Rywalizacja** - rankingi oraz tryb battle.
- **Przekaz historii, które wprowadzają klimat WMI** - tryb adventure; Historie o charakterze uniwersalnym.
- Łączenie społeczności poprzez wspólny rozwój aplikacji.


### **Mierzalne wskaźniki służące do oceny wnoszonych wartości**
* Zaangażowanie studentów w dalszym rozwoju projektu.
* Feedback w postaci opinii składanych w repozytorium kodu, ankiet.
* Monitorowanie ilości aktywnych użytkowników.

# Rynek

## Habitica
*Aplikacja motywująca do osiągania wskazanych przez siebie celów połączona z aspektem gry przygodowej.*

Wykonywanie celów w Habitice jest uzależnione od uczciwego zaznaczania zrealizowanych celów przez użytkowników, a w WMI Adventure USOS i wyniki quizów zapewniają realną ocenę pracy użytkownika.

Habitica wykorzystuje walutę premium dostępną za prawdziwe pieniądze, która odblokowuje dostęp do części zawartości, a WMI Adventure cała zawartość będzie dostępna za darmo.

Tak samo jak Habitica, WMI Adventure będzie oparte na licencji *Open Source*.

Tak samo jak Habitica, aplikacja WMI Adventure będzie dostępna na wielu platformach.

W Habitice gracze nie pojedynkują się ze sobą, a w WMI Adventure, tak.

## Doki-Doki Literature Club
*Gra komputerowa typu visual-novel w stylu japońskiej mangi.*

Doki-Doki realizuję aspekt wizualny w stylistyce japońskiej mangi, a w WMI Adventure stylistyka będzie uniwersalna.

Doki-Doki jest zamkniętą i ukończoną historią bez dalszych ścieżek rozwoju, a WMI Adventure jest otwarte na rozbudowywanie i dodawanie nowych historii.

W WMI Adventure postacie i historie są wzięte z życia rzeczywistego, a Doki-Doki jest całkowicie fikcyjne.

W Doki-Doki i w WMI Adventure występują dialogi akompaniowane przez postacie na tle.

W Doki-Doki i WMI Adventure historia opowiadana jest w charakterze *Visual Novel*

Doki-Doki i WMI Adventure jest darmowe.

Kod źródłowy Doki-Doki nie jest publicznie dostępny, a WMI Adventure jest *Open Source*

## Hero Zero
*Bezpłatna gra przeglądarkowa polegająca na rozwijaniu swojego bohatera, wykonywaniu zadań i pojedynków z innymi graczami.*

W Hero Zero nie ma taktycznego aspektu w walkach. Walki oparte są wyłącznie na losowości i statystykach postaci. W WMI Adventure wprowadzamy aspekt taktyczny - użytkownicy będą dobierali karty w specyficzne kombinacje i kolejności.

W WMI Adventure przy pojedynku występują karty, a w Hero Zero tylko bohater.

W Hero Zero i w WMI Adventure pojedynki odbywają się automatycznie.

Hero Zero i WMI Adventure są darmowe.

Kod źródłowy Hero Zero nie jest publicznie dostępny, a WMI Adventure jest *Open Source*


# Opis produktu

1. Strefa publiczna, aplikacja kliencka
    - Przejrzysty interfejs webowy, w którym jest dostęp do wszystkich funkcji aplikacji
    - Tryb battle, w którym gracze rywalizują ze sobą w oparciu o karty bitewne, zdobyte w Trybie Adventure lub innych obszarach aplikacji, spośród nich wyłania się talię kart, które układa się w odpowiedniej kolejności. Drugi gracz nie bierze bezpośredniego udziału w walce, jedynie jego karty "bronią się". Pojedynki będą odbywać się automatycznie, z prostą wizualizacją. Sama walka karciana będzie polegać na efektach kart, które będą się uaktywniać po kolei. Załóżmy że gracz_1 i gracz_2 posiadają po 5 kart w talii, najpierw zadziała karta_1 gracza_1, potem karta_1 gracza_2, następnie karta_2 gracza_1 i tak dalej... gdy po aktywacji ostatnich kart, aktywują się po nich ponownie te pierwsze i pętla tak trwa dopóki jeden z graczy nie straci wszystkich punktów życia.
    - Tryb adventure - interaktywne opowiadania studentów w formie *visual novel*
        * Opowieści wzorowane na realnych przeżyciach na wydziale WMI, przedstawiane w formie pojawiających się grafik oraz kwestii dialogowych jak w grach rodzaju Visual Novel.
        * Postacie w naszej Visual Novel będą przedstawiać realnych pracowników wydziałowych, lub będą na nich wzorowane
        * W tym trybie mogą pojawić się również minigry lub pojedynki z wirtualnymi przeciwnikami w takiej samej formie co w Trybie Battle
        * Podczas przechodzenia historii w trybie adventure użytkownik może zdobyć Karty związane z jego postępem w rozgrywce
    - Rankingi - Dwie tablice rankingowe : rankingi w battle wyłaniające studenta posiadającego największe umiejętności w tym trybie, rankingi kolekcjonerskie oparte o ilość zdobytych kart i uniknalnych kart-osiągnieć.
    - Kolekcje kart, czyli unikalne karty za osiągnięcia w aplikacji, zdobywane głównie w Trybie Adventure po lub w trakcie przechodzenia jakiejś historii, karty mogą być bitewne, czyli posiadające odpowiednie efekty, które można wykorzystać w trybie battle, lub mieć znaczenie wyłącznie kolekcjonerskie. Karty bitewne można w przyszłości ulepszać za Punkty umiejętności.
    - Mini gry, które są dostępne do przejścia w odpowiednich warunkach
    - Quizy dostępne do rozwiązania skomponowane z pytań utworzonych przez studentów

2. Strefa autorska
    - Kreator historii z możliwością importowania własnych zdjęć, grafik postaci, dodawaniem dialogów i tworzeniem prostych animacji
    - Kreator Kart, importowanie grafik, proponowane statystyki, efekty.
    - Moduł udostępniania nowych pytań do Quizów z podziałem na kategorie

3. Strefa administracyjna
    - Integracja z systemem USOS, aby odpowiednio wspierać i zarządzać funkcjami w naszej aplikacji (np. dostęp do ocen)
    - Zarządzanie kontami użytkowników
    - **Zarządzanie treściami udostępnionymi przez użytkowników**
        - Akceptowanie lub odrzucanie pytań do codziennych quizów
    	- Akceptowanie lub odrzucanie historii do Trybu Adventure
    	- Akceptowanie lub odrzucanie kart do Trybu Battle
    - Modyfikacja parametrów aplikacji

4. Zarządzanie danymi, przetwarzanie danych itp.
    - Przechowywanie danych o kontach z aplikacji.
    - Nie przechowujemy danych personalnych w sposób jawny; ocen czy innych danych osobowych (PESEL)

5. Rodzaj użytkownika końcowego
    - Użytkownik, czyli gracz korzystający ze strefy publicznej
    - Twórca, czyli użytkownik dodający nowe treści w strefie autorskiej
    - Administrator systemu z uprawnieniami potrzebnymi do zarządzania strefą administracyjną i całą aplikacją. Weryfikuje nowe treści zgłaszane przez twórców.

# Zakres i ograniczenia

## Skład zespołu

- Mateusz Tylka - Product Owner:
    Frontend, Android, Kotlin, React, Java, Spring
- Marcin Kostrzewski - Scrum Master:
    Java/Kotlin, Android, Spring, Networking, Sysadmin, Python
- Dawid Korybalski:
    Frontend, JS, React, Django, Docker, Negocjacja / społeczność, marketing, SEO, Security
- Michał Czekański:
    Android, Django, Java, C#

## Wstępne kamienie milowe
- Konsultacja prototypu z grupą docelową - 16.04.2021
- Tryb battle - 20.06.2021
- Tryb adventure - 20.10.2021
- Integracja z USOS - 20.11.2021
- Quizy i minigry - 20.01.2022

## Szkic harmonogramu projektu

### Semestr I
- Prototyp Interfejsu
- Tryb Battle
    * Narzędzie do tworzenia kart
    * Wizualizacja walki
    * Administracja dotycząca kart
    * Content na 60 kart
    * Rankingi

### Semestr II
- Tryb adventure
    * Narzędzie do tworzenia historii
    * Interfejs trybu Adventure
    * Content na 50 historii
    * Administracja dotycząca historii

- Integracja z USOS
    * Połączenie konta USOS z kontem w aplikacji
    * Zarządzanie kontami użytkowników
    * Karty zmieniające wygląd w zależności od ocen studenta
    * Dostępność historii w zależności od przedmiotów studenta

- Quizy i minigry
    * Narzędzie do tworzenia pytań
    * Administracja dotycząca pytań
    * Interfejs i rozwiązywanie quizów
    * Implementacja 3 powtarzających się mini gier

## Potencjalne ryzyka
- Trudość oszacowania złożoności panelu do tworzenia zawartości
- Integracja z systemem USOS
- Balans w systemie walki kartami
- Utrzymanie uwagi odbiorców
