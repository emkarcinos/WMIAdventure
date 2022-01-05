# Kontrybucja

Jeśli chcesz przyczynić się do rozwoju WMIAdventure, prosimy najpierw o kontakt z autorami za pomocą stworzenia [issue](https://github.com/emkarcinos/WMIAdventure/issues/new/choose), napisania maila lub w dowolnej innej formie przed implementacją modyfikacji.

Proszę również przeczytać kodeks postępowania znajdujący się w pliku [CODE_OF_CONDUCT](https://github.com/emkarcinos/WMIAdventure/blob/main/CODE_OF_CONDUCT).

## Tworzenie issue

Issue są bardzo wartościowe dla naszego projektu. Na ich podstawie sporządzamy zadania do naszego *backlog'a*.
Prosimy o tworzenie nowych issue jeśli:

- Masz jakiekolwiek pytanie związane z projektem.
- Zauważyłeś coś w produkcie, co warto poprawić.
- Chcesz przedyskutować potencjalną modyfikacje, którą zamierzasz wprowadzić.

Proszę tworzyć nowe issue zgodnie z przeznaczonymi do nich [schematami](https://github.com/emkarcinos/WMIAdventure/issues/new/choose).  

Serdecznie dziękujemy za każde stworzone issue.

## Implementacja własnych zmian za pomocą pull request 

Pull requesty to genialna metoda do wprowadzania własnych zmian dla repozytorium.
Będziemy akceptować pull requesty spełniające następujące wymagania:

1. Zmiany lub nowe funkcjonalności zawarte w p.r. (pull request) będą zgodne z [wizją projektu](https://github.com/emkarcinos/WMIAdventure/blob/main/docs/vision.md) oraz [wymaganiami projektowymi](https://github.com/emkarcinos/WMIAdventure/blob/main/docs/project-requirements.md) napisanych przez twórców lub w dalszej perspektywie zmodyfikowanych przez społeczność WMIAdventure.
2. Kod wchodzący w skład p.r. będzie wystarczająco dobrej jakości, aby otrzymać zatwierdzenie od jednego z twórców lub późniejszych kontrybutorów z odpowiednimi uprawnieniami.
3. Kod p.r. dotyczący warstwy *frontend* w katalogu [frontend/](https://github.com/emkarcinos/WMIAdventure/tree/main/WMIAdventure/frontend) będzie sformatowany za pomocą formatera [eslint](https://eslint.org/).
3. Kod p.r. warstwy *backend* w katalogu [backend/](https://github.com/emkarcinos/WMIAdventure/tree/main/WMIAdventure/backend) będzie sformatowany za pomocą formatera [PEP](https://pypi.org/project/autopep8/).
4. Nowy p.r. będzie pomyślnie przechodzić przez testy automatyczne.
5. Funkcjonalny zakres p.r. zostanie odpowiednio przetestowany przez jednego z twórców lub późniejszych kontrybutorów z odpowiednimi uprawnieniami.

### Wygląd commit'ów

Proszę w treści każdego commit'u załączać numer/numery issue do którego dany commit się odnosi za pomocą "#(numer issue)".
Na przykład `git commit -m "#812 Setup django-ratelimit"`. 
Dzięki temu podczas *code review* łatwiej nam ustalić jaki problem rozwiązuje dany commit.

### Wygląd nowego p. r.

Tytuł p. r. powinien wyraźnie opisywać wprowadzoną funkcjonalność.
W opisie należy zapisać jakie issue rozwiązujemy naszym p. r. za pomocą `closes #(numer issue)`.

### Proces akceptacji p. r.

1. Analiza kodu (*code review*).
2. Testowanie wprowadzonych zmian.
3. Utworzenie komentarza w przypadku niejasności (opcja *comment* w p. r.).
4. Zarządzanie zmian w przypadku błędów lub możliwości ulepszenia kodu (opcja *request changes* w p. r.).
5. Akceptacja zmian, gdy wszystko jest zrobione prawidłowo (opcja *approve* podczas *code review* w p. r.).
6. *Zmergowanie* zmian na główną gałąź *main*.
7. Po *zmergowaniu* modyfikację zostaną automatycznie opublikowane na środowisku testowym.
8. Środowisko produkcyjne (wmi-adventure.pl) zostanie zaaktualizowane o nowe zmiany przy najbliższym *release*.
