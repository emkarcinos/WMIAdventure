# Dokumentacja komponentu CardProperties

## Stany komponentu

```js
state = {
    showLevelChoose: false,
    createCommonLevel: false,
    createGoldLevel: false,
    createEpicLevel: false,
    activeCardRank: 0,
    showEffectChoose: false,
}
```

- `showLevelChoose` mówi o tym czy komponent do pojawiania się wyboru stworzenia levelu karty `LevelChoose` 
  jest widoczny czy nie,
- `createCommonLevel` mówi o tym czy **pierwszy** level karty jest stworzony czy nie,
- `createGoldLevel` mówi o tym czy **drugi** level karty jest stworzony czy nie,
- `createEpicLevel` mówi o tym czy **trzeci** level karty jest stworzony czy nie,
- `activeCardRank` mówi o tym który poziom karty jest aktywny do edycji, **0 (zero)** oznacza że żaden,
- `showEffectChoose`  mówi o tym czy komponent do pojawiania się wyboru effektu karty `EffectChoose` 
  jest widoczny czy nie,
  
## Metody Komponentu - Handlery

### showLevelChooseHandler
Sprawia że komponent do pokazania się wyboru levelu karty `levelChoose` pojawia się. 
```js
showLevelChooseHandler = (event) => {
    event.preventDefault();
    this.setState({showLevelChoose: true});
}
```

### hideLevelChooseHandler
Sprawia że komponent do pokazania się wyboru levelu karty `levelChoose` **znika**.
```js
hideLevelChooseHandler = (event) => {
    event.preventDefault();
    this.setState({showLevelChoose: false});
}
```

### createCommonLevelHandler
Sprawia że tworzy się pierwszy level karty (typowy).
```js
createCommonLevelHandler = (event) => {
    event.preventDefault();
    this.hideLevelChooseHandler(event);
    this.setState({createCommonLevel: true});
    this.props.levelCostResetHandler(event, 1);
}
```
W *handlerze* wywołujemy też `hideLevelChooseHandler` aby okno z wyborem *levelu* zniknęło, 
oraz `levelCostResetHandler` aby ustawić koszt 

### createGoldLevelHandler
Sprawia że tworzy się drugi level karty (złoty).
```js
createCommonLevelHandler = (event) => {
    event.preventDefault();
    this.hideLevelChooseHandler(event);
    this.setState({createGoldLevel: true});
    this.props.levelCostResetHandler(event, 1);
}
```
W *handlerze* wywołujemy też `hideLevelChooseHandler` aby okno z wyborem *levelu* zniknęło.

### createEpicLevelHandler
Sprawia że tworzy się trzeci level karty (epicki).
```js
createCommonLevelHandler = (event) => {
    event.preventDefault();
    this.hideLevelChooseHandler(event);
    this.setState({createEpicLevel: true});
    this.props.levelCostResetHandler(event, 1);
}
```
W *handlerze* wywołujemy też `hideLevelChooseHandler` aby okno z wyborem *levelu* zniknęło.

### removeCommonLevelHandler
Usuwa pierwszy level karty (typowy).
```js
removeCommonLevelHandler = (event) => {
    event.preventDefault();
    this.setState({createCommonLevel: false});
}
```

