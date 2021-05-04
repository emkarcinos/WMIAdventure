# Kod źródłowy WMI Adventure

## Budowanie
Budowanie i uruchamianie kodu zarządzane jest przez **Docker compose** - wymagany **Docker**.

```
docker-compose build
```

Requesty z frontendu będą automatycznie wysyłane pod localhost:8000.
Baza danych Django działa lokalnie.

## Argumenty buildu
```
--build arg API_URL=adres:port - adres backendu - wszystkie requesty wysyłane będą pod ten adres
--build arg DB_SOURCE=(AZURE|localhost) - wybór bazy danych
--build arg DB_PASSWD - hasło do bazy AZURE
```

## Uruchamianie
```
docker-compose up
```
Uruchomi serwer Django na *localhost:8000* i frontend na *localhost:80*.
