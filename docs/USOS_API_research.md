# USOS API | Integracja z WMI Adventure

## Motywacje

Planujemy zintegrować się z system USOS by móc powiązać konto użytkownika WMI Adventure z jego kontem studenckim w systemie USOS.

Wykorzystamy to do rzeczy takich, jak:
- jedynie studenci WMI będą mogli rejestrować się w aplikacji
- wybrane przez studenta przedmioty, jego oceny oraz to na jakim semestrze aktualnie jest będzie miało wpływ na rozgrywkę

Takie dane o użytkownikach planujemy właśnie pobierać z bazy danych USOS.

## Klucz API

USOS API używa OAuth 1.0a do autoryzacji.

Trzeba uzyskać klucz do API [link](https://usosapps.amu.edu.pl/developers/). Klucz do API składa się z `Consumer Key` oraz `Consumer Secret`. Te wartości wykorzystane zostaną do protokołu OAuth 1.0a.

## Access Token

By mieć możliwość wyciągania danych użytkownika z USOS będziemy musieli uzyskać `Access Token`, uzyskuje się go w protokole OAuth.

W procesie uzyskiwania `Access Token'a` ustalamy `scopes`, które określają do jakich zasobów będziemy chcieli mieć dostęp.

Proces ten zostanie opisany szerzej potem, po omówieniu kwestii zarządzania użytkownikami.

### Czas aktywności `Access Token'a`

`Acces Token` staje się nieważny po dwóch godzinach ALBO jak użytkownik się wyloguje.

Można uzyskać długoterminowy `Access Token` poprzez ustawienie odpowiedniego `scope` `offline_access` w procesie uzyskiwania `Access Token'a`. Tak uzyskany token nie wygasa.

```
offline_access: Enables your application to perform authorized requests on behalf of the user at any time. By default, Access Tokens expire after a short time period to ensure applications only make requests on behalf of users when they are actively using the application. This scope makes Access Tokens long-lived.
```

## OAuth 1.0 i Python

Istnieją różne biblioteki wspierające operacje związane z OAuth 1.0, np:
- [oauthlib](https://github.com/oauthlib/oauthlib)
- [django-oauth-toolkit](https://github.com/jazzband/django-oauth-toolkit) - oauthlib pod framework django (wspiera DRF)

I wiele innych [bibliotek](https://oauth.net/1/).

## Integracja USOS z WMI Adventure

Uzyskane `Access Tokeny` powiązane z danym użytkownkiem będziemy przechowywać w bazie, by móc wyciągać odpowiednie dane tegoż użytkownika z systemu USOS.

Przy rejestracji, zgodnie z flow OAuth 1.0a, użytkownik w pewnym momencie będzie musiał zalogować się w systemie USOS oraz zaakceptować `scopes`, o które będziemy prosić.

Gdy zaakceptuje zostania sukcesywnie zarejestrowany, a backend `WMI Adventure` uzyska `Access Token` od systemu USOS, który zapiszemy w bazie danych razem z zarejesteowanym użykownikiem.

### Zarządzanie użytkownikami

Jeśli chodzi o użytkowników zarządzenie użytkownikami mamy dwie możliwości (**nie mówimy tutaj o profilach użytkowników**, to są dwie różne rzeczy.):
1. Tworzyć własnych użytkowników.
2. Nie tworzyć własnych użytkowników i korzystać z faktu, że studenci mają już konta w systemie USOS - korzystać właśnie z użytkowników USOS'owych.

Tworzenie własnych użytkowników wydaje się być lepszą opcją, będziemy mogli już zacząć działać nad jakąś rejestracją, logowaniem itp. bez potrzeby angażowania systemów zewnętrznych co da nam sporą swobodę w działaniu. Jeśli przyjdzie czas na dołożenie USOS'a do naszej aplikacji to nie będzie to ciężkie.

Z kolei gdybyśmy zdecydowali się nie tworzyć własnych użytkowników to nic by to nie wniosło i jedynie by nas ograniczyło. By móc implementować pewne rzeczy to najpierw musielibyśmy się zintegrować z USOS'em.

## Rejestracja i uzyskiwanie `Access Token'a`

`Access Token` uzyskamy, gdy użytkownik pomyślnie się zarejstruje w naszej aplikacji. Rejestracja będzie przebiegać w ten sposób:
1. Użytkownik wejdzie na stronę rejestracji, gdzie zostanie poproszony o podanie danych, którymi będzie się chciał do nas logować (username, hasło, itp.)
2. Użytkownik zostanie przekierowany do USOS'a, by się tam zalogował i potwierdził, że jest studentem.
3. USOS spyta się użytkownik czy chce dać naszej aplikacji dostęp do pewnych jego danych określonych przez nas `scopes`.
4. Jeśli użytkownik zaakceptuje `scopes`, to na backendzie otrzymamy `Access Token`.
5. Po otrzymaniu tego tokena stworzymy użytkownika w naszej bazie oraz zapiszemy go razem z otrzymanym `Access Token'em`, który umożliwi wyciąganie danych tego studenta z USOS'a.
