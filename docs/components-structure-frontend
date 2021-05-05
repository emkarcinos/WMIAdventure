# Struktura Komponentów

## Struktura plików

### Główny katalog kodu źródłowego */src* :

```
/src
	/assets
    /js
    /main-styles
```

* **assets** - pliki graficzne
* **js** - komponenty, pliki javascript
* **main-styles** - pliki css, a w nich globalne style

### Struktura komponentów

Podzieliłem komponenty na 4 poziomy:

1. atoms - najdrobniejsze komponenty
2. molecules - komponenty składające się z kilku komponentów *atoms*.
3. organisms - komponenty, które zawierają w sobie kilka komponentów *atoms* lub *molecules*.
4. pages - komponenty przedstawiające konkretne widoki/podstrony, składają się z pozostałych warstw komponentów.

To podejście nazywa się *atomic-design*, nie wiem czy sprawdzi się na dłuższą metę, ale na razie taką strukturę komponentów obrałem.

### Z czego składa się komponent

W tej chwili komponent to katalog o nazwie komponentu, który zawiera:

* Głowny plik js komponentu, który definiuję strukturę html w DOM.
* Katalog ze *styled-components*, czyli komponentami do stylowania, lub pojedyńczy plik bez katalogu, jeśli komponent składa się z jednego selektora html. Każdy selektor html to *styled-component*.
* Pliku *index.js*, który upiększa import danego komponentu.
* Ewentualne pomocnicze funkcje lub dane w osobnych plikach js.

Przykład;

```
/Notifications
	/StyledNotifications
    	...
    index.js
    Norifications.js
```

* **/StyledNorifications** - katalog ze *styled-components*
* **index.js** - katalog upiększający import komponentu Notifications.js
* **Notifications.js** - plik z definicją i główną logiką komponentu

### Struktura głównego katalogu */js*

```
/js
	/components
    /pages
    /utils
    App.js
    reportWebVitals.js
    setupTests.js
```

* **/components** - katalog z komponentami */atoms*, */molecules* oraz */organisms*.
* **/pages** - katalog z komponentami *pages* prezentującymi dany widok.
* **/utils** - pliki *js* z globalnymi zmiennymi takie jak kolory na przykład.

Można jeszcze pomyśleć o katalogu z globalnymi komponentami, które są często wykorzystywane w wielu obszarach aplikacji, np. Button, jeśli mielibyśmy jeden wygląd i strukturę buttona.

Kwestią otwartą jest jeszcze miejsce plików/komponentów pobierających dane z API.

## Stylowanie

Opracowałem workflow pracy ze *styled-components*, mają wiele zalet, ale byłem trochę pogubiony na początku przez przyzwyczajenie do SCSS'a z konwencją Block__Element--Modifier.

Dlatego znalazłem taki [artykuł](https://alanbsmith.medium.com/structuring-our-styled-components-part-i-2bf21fa64b28) o strukturze *styled-components* opierającej się o BEM.


### Struktura komponentów *styled-components*

Katalog ze *styled-components* nazywamy tak jak główny kontener/wrapper komponentu, a w nim definiujemy ten główny kontener i jego bloki.

```
/Notifications
	/StyledNotifications
    	Header.js
        index.js
        Item.js
        List.js
        Paragraph.js
        StyledNotifications.js
...
```

### Bloki

Bloki definiuje normalnie jako pojedyńczy *style-component* i eksportuje :

```javascript
import styled from 'styled-components';

const Header = styled.p`
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 8px 0;
`;

export default Header;
```

A w głównym kontenerze/wrapperze oprócz stylów wrappera przypisuje do niego bloki :

```javascript
import styled from 'styled-components';
import Header from './Header';
import Item from './Item';
import List from './List';
import Paragraph from './Paragraph';

const StyledNotifications = styled.div`
  position: absolute;
  top: 64px;
  left: 0;
  width: 100vw;
  height: calc(100vh - 64px);
  background-color: ${({theme}) => theme.colors.ui07trans};
`;

StyledNotifications.Header = Header;
StyledNotifications.Item = Item;
StyledNotifications.List = List;
StyledNotifications.Paragraph = Paragraph;

export default StyledNotifications;
```

Dzięki temu mamy jeden **import** w normalnym komponencie i czytelność tak jak w BEM :

```javascript
import React from 'react';
import StyledNotifications from './StyledNotifications';

function Notifications({header, paragraph}) {
    return (
        <StyledNotifications>
            <StyledNotifications.List>
                <StyledNotifications.Item>
                    <StyledNotifications.Header>
                        {header}
                    </StyledNotifications.Header>
                    <StyledNotifications.Paragraph>
                        {paragraph}
                    </StyledNotifications.Paragraph>
                </StyledNotifications.Item>
            </StyledNotifications.List>
        </StyledNotifications>
    );
}

export default Notifications;
```
### Modyfikatory

A jako odpowiedniki modyfikatorów w BEM, wykorzystuje propsy.

Logika w *styled-components* :

```javascript
import styled from 'styled-components';

const Row = styled.tr`
  display: inline-block;
  width: 100%;
  text-align: ${({textEnd}) => textEnd ? 'end' : 'start'};
  font-size: 14px;
  padding: 8px 0;
`;

export default Row;
```

Wykorzystanie :

```javascript
<StyledStatistic.Row textEnd>
    hello world
</StyledStatistic.Row>
```

### Theme Provider

Dzięki osadzeniu **App.js** w Theme Provider nie trzeba importować za każdym razem jakiś plików z */utils*, bo do każdego komponentu zostanie przekazany props *theme*.

```javascript
import theme from './utils/theme';

function App() {
  return (
      <ThemeProvider theme={theme}>
          <Switch>
            <Route exact path='/' component={MainMenu} />
            <Route path='/profile' component={Profile} />
            <Route path='/adventure' component={AdventureMode} />
            <Route path='/battle' component={BattleMode} />
            <Route path='/ranking' component={Ranking} />
            <Route path='/event' component={Event} />
            <Route path='/quiz' component={Quiz} />
            <Route path='/history-creator' component={HistoryCreator} />
            <Route path='/cards-creator' component={CardsCreator} />
            <Route path='/answer-creator' component={AnswerCreator} />
          </Switch>
      </ThemeProvider>
  );
}

export default App;
```

Wykorzystanie :

```javascript
import styled from 'styled-components';
import Icon from './Icon';

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  background-color: ${({theme}) => theme.colors.ui01};
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  outline-color: ${({theme}) => theme.colors.brand01};
  padding: 0;
  margin: 0 36px 0 0;
`;

StyledButton.Icon = Icon;

export default StyledButton;
```

## Podsumowanie

* Logika dzieli się na jeszcze więcej plików niż przy *SCSS*, ma to swoje plusy i minusy.
* Manipulacja stylami za pomocą *styled-components* o wiele ułatwiona w porównaniu do *SCSS*, to duży plus
* W dotychczasowym kodzie czasami pisałem praktycznie takie same style dla dwóch komponentów, może to wynikać z tego że czasami dało by się zrobić jeden komponent zamiast dwóch przy odpowiednich propsach, albo wyselekcjonować w przyszłości jakieś ogólne *styled-components* dla wszystkich komponentów
