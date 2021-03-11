## Nazwa Projektu: WMI Adventure

## Autorzy: Dawid Korybalski, Mateusz Tylka, Michał Czekański, Marcin Kostrzewski

## Data: 04/03/2021

# Executive summary

Celem tego dokumentu jest przekazanie ogólnych celów i informacji o projekcie WMI Adventure. 

# Cel i Grupa Docelowa

### **Problem**
Wielu osobom studiującym Informatykę na WMI brakuje motywacji do lepszej nauki. Studenci często traktują studia jako "proces zdobywania papierków", nie angażują się w życie wydziału. Potrzebują natchnienia, które w ferworze walki z zaliczeniami może być znikome. Brakuje klubów, grupowych aktywności, zaagnażowania w projekty uczelniane.

### **Rozwiązanie**
Aplikacja open-source typu "Level Up Life" wyprofilowana pod kierunek Informatyka na WMI

- Użytkownik aplikacji będzie nagradzany za aktywność studencką.
- Nagrody będą w postaci kart - karty są tym lepsze im lepsze oceny student uzyskał.
- Dodatkowe wydarzenia występujące tylko podczas przebywania na terenie wydziału
- System rankingów indukujący rywalizację pomiędzy użytkownikami, a tym samym motywujący do nauki.
- Do korzystania z aplikacji zachęcały będą dodatkowo dwa oddzielne moduły projektu:
    - **tryb battle** - proste karciane pojedynki
    - **tryb adventure** - co semestr odblokowanie nowej historyjki związanej z życiem studenckim na WMI
- Historie w trybie adventure mogą stanowić natchnienie dla studentów, będą obrazowały inny punkt widzenia na studiowanie, dadzą wizje nauki z pasją i satysfakcją.
- Charakter open-sourcowy daje możliwość aktywnym studentom *przelania* swoich historii do aplikacji

Przechowywanie kodu w postaci open-source ma zachęcić wszystkich studentów do włożenia własnego udziału w rozwój projektu. Ma to stanowić przykład dla przyszłych projektów, które mogą być dalej utrzymywane przez innych studentów.

### **Grupa odbiorców**
Osoby studiujące Informatykę na WMI, którzy czuli by satysfakcję z pewnego sposobu nagradzania ich efektów nauki, innego niż oceny.

Osoby chętne do rywalizacji.

Osoby chętne do kolekcjonowania kart związanych z Informatyką ogólnie oraz z kierunkiem Informatyka na WMI.

Osoby zainteresowane stopniowym odkrywaniem pewniej komiksowej historii wydziałowej.

Osoby zaintereresowane rozwojem studenckiej aplikacji open-source.

### **Sposób dotarcia do grupy odbiorców**
Każdy student powinien otrzymać informacje o wdrożeniu aplikacji i możliwości zaangażowania w rozwój projektu.

### **Głowny produkt projektu**
Aplikacja mobilna na system Android.

Ma to być "lekka" aplikacja, która dostarczy łatwo dostępną rozgrywkę, do której można łatwo wrócić, bez poświęcania zbyt dużej ilości czasu na dokonywanie postępów.  Urządzenia mobilne idealnie się do tego nadają, każdy nosi przy sobie telefon.

### **Wartości dodane wnoszone przez projekt**
- **Większa satysfakcja z nauki** - Pokazanie swoich umiejętności naukowe poprzez aktywność w aplikacji i pozycje w rankingach.
- **Aspekt proedukacyjny - Motywacja do nauki** - kolekcja kart, rankingi, korzyści z dobrych wyników w nauce.
- **Rozrywka** wynikająca z:
    - trybu battle
    - związanych z informatyką elementów humorystyczne w opisach kart
    - tryb adventure
- **Kolecjonowanie** - zdobywanie unikalnych kart z osiągnięciami, dodatkowa wartość za dobre oceny.
- **Rywalizacja** - rankingi oraz tryb battle.
- **Przekaz pewniej historii oraz wprowadzenie klimatu WMI** - tryb adventure.
- Łączenie społeczności poprzez wspólny rozwój aplikacji.
- Historie o charakterze uniwersalnym.

### **Mierzalne wskaźniki służące do oceny wnoszonych wartości**
* Zaangażowanie studentów w dalszym rozwoju projektu.
* Feedback w postaci opinii składanych w repozytorium kodu, ankiet.
* Monitorowanie ilości aktywnych użytkowników.

# Rynek

Na rynku jest pełno aplikacji motywujących do rozwoju osobistego typu "Level Up Life", lecz brakuje aplikacji motywujących do nauki wyprofilowanych pod kierunek Informatyka na WMI.

Planem jest wstrzelić się w tę lukę.

# Opis produktu

1. Kolekcje kart. Unikalne karty za osiągnięcia, bonusy za dobre oceny, karty za ukończenie przedmiotów.
2. Moduł battle.
    Gracze rywalizują ze sobą w oparciu o zdobyte wcześniej karty, spośród nich wyłania się talię. Drugi gracz nie bierze udziału w walce, jedynie jego karty *bronią się*.

3. Tryb adventure - przeżycie opowiadanej przez nas historii w formie *visual novel* i zdobywanie kart.
4. Moduł rankingowy.
    Dwie tablice rankingowe - rankingi w battle, rankingi kolekcjonerskie.

5. Zdarzenia losowe - szansa na pojawienie się minigry

4. integracja z systemami zewnętrznymi - USOS API
    - Rejestracja: Związanie użytkownika aplikacji z użytkownikiem USOS
    - Brak zależności od dostępu do systemu w dalszych krokach - Brak dostępu do serwera USOS nie wpłynie na działanie aplikacji.

5. zarządzanie danymi, przetwarzanie danych itp.
    - Przechowywanie danych o kontach z aplikacji.
    - Nie przechowujemy danych personalnych w sposób jawny; ocen czy innych danych osobowych (PESEL)

6. rodzaj użytkownika końcowego
    - Student jako użytkownik aplikacji mający pełen dostęp do wszystkich jej funkcjonalności.

# Zakres i ograniczenia
## In / Out

Topic | In | Out | Opt
| :--- | :---: | :---: | :---:
Konta administratora | - | - | Opt
Studenci innych kierunków jak Informatyka | - | Out | -
Aplikacja webowa | - | - | Opt
Przechowywanie studenckich danych na serwerze | - | Out | -
Limit walk na dzień | - | - | Opt
Wpływ ocen na karty | - | - | Opt
Zależność od obecności na wydziale | - | - | Opt
Rozbudowane animacje postaci | - | Out | -
Elementy 3D | - | Out | -
Aktywny udział podczas walki | - | Out | -
Odrzucanie / akceptowanie pojedynków | - | Out | -
Powiadomienia systemowych o ataku | - | Out | -
Wizualizacja przebiegu walki podczas ataku | In | - | -
Historia walk | In | - | -
Czat | - | Out | -
System znajomości | - | Out | -



## Skład zespołu

- Marcin:
    SCRUM, Java/Kotlin, Android, Spring, Networking, Sysadmin
- Wirus:
    Frontend, Android, Kotlin, React, Java, Spring, Project Owner
- Dawid:
    Frontend, JS, React, Django, Docker, Negocjacja / społeczność, marketing, SEO, Security
- Michał:
    Android, Django, Java, C#

## Wstępne kamienie milowe
- Prototyp interfejsu
- Uwierzytelnianie
- Tryb battle
- Battle z serwerem
- System kart
- Adventure
- Rankingi
- Karty
- Historia
- Grafika

## Szkic harmonogramu projektu

...

---

