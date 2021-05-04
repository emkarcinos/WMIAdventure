# Kod źródłowy WMI Adventure

## Budowanie
Budowanie i uruchamianie kodu zarządzane jest przez **Docker compose** - wymagany **Docker**.

```
docker-compose build
```

Requesty z frontendu będą automatycznie wysyłane pod localhost:8000.

Jeżeli chcemy przekierowywać requesty pod inny adres, możemy go ustawić jako argument:
```
docker-compose build --build-arg API_URL=adres:port
```

## Uruchamianie
```
docker-compose up
```
Uruchomi serwer Django na *localhost:8000* i frontend na *localhost:80*.
