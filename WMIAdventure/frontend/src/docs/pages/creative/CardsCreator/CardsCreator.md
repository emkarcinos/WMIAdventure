# Dokumentacja komponentu CardsCreator

## Stany komponentu

Komponent w swoich stanach będzie zawierał wszystkie potrzebne dane, aby wysłać odpowiednią strukturę *json* do Backendu.  
Póki co, znajduje się tutaj nazwa karty, przedmiot z którego pochodzi oraz jej opis.
```js
 state = {
    cardName: 'Nazwa Karty',
    cardSubject: 'Przedmiot',
    cardTooltip: 'Opis Karty',
    showDescribeInputs: false
}
```
Stan `showDescribeInputs` odpowiada za pokazanie pól formularza do określenia tych opisowych atrybutów karty. 
Gdy `showDescribeInputs` będzie `true` to obszar z tymi polami pojawi się, wysunie się z góry.

## Metody komponentu, handlery

### showDescribeInputsHandler

Ustawia stan `showDescribeInputs` odpowiedzialny za wyświetlenie inputów opisowych kartę na `true`.
```js
showDescribeInputsHandler = (event) => {
    event.preventDefault();
    this.setState({showDescribeInputs: true});
}
```
Dzięki `event.preventDefault()` strona nie odświerza się po kliknięciu w *button*.

### hideDescribeInputsHandler

Przełącza stan `showDescribeInputs` na `false`, wywoływany jest wtedy, kiedy chcemy z powrotem "schować" inputy
do opisu karty.
```js
 hideDescribeInputsHandler = (event) => {
    event.preventDefault();
    this.setState({showDescribeInputs: false});
}
```

### updateDescribePreview

To handler odpowiedzialny za aktualizację naszego podglądu dla Nazwy Karty, jej Przedmiotu oraz Opisu działania.
Zmienia on treść nagłówka "Nazwa Karty" oraz paragrafów "Przedmiot" oraz "Opis Karty". Zmienia stany również na
'-', jeśli ktoś pozostawi je puste, aby struktura elemtów *html* była zachowana i nie wyglądało to dziwnie.
```js
updateDescribePreview = (event) => {
    const keyName = event.target.name;
    let keyValue = '';
    if(event.target.value !== '')
        keyValue = event.target.value;
    else keyValue = '-';
    this.setState({[keyName]: keyValue});
}
```
Jest to zrobione w taki sposób, że to co wpiszemy w tych opisowych inputach, to będzie wartość na którą zaaktualizuje
się dany stan reprezentujący jakiś konkretny atrybut karty na przykład jej nazwę. A te elementy *html* zmienią swoją
treść, bo jest ona uzależniona od wartości tych stanów.

Na przykład mamy stany `{cardName: 'nazwa karty', cardSubject: 'Przedmiot'}` i mamy w strukturze *html*:
```html
<input name="cardName" onChange={handleChange}/>
<input name="cardSubject" onChange={handleChange}/>
```
To dzięki odpowiedniemu atrybutowi **name**, `handleChange` rozpozna który stan komponentu zaaktualizować.


## Warstwa prezentacyjna komponentu

```js
render() {
    return (
        <Wrapper>
            <Header></Header>
            <Main>
                <CardDescribePreview
                    cardName={this.state.cardName}
                    cardSubject={this.state.cardSubject}
                    cardTooltip={this.state.cardTooltip}
                    showDescribeInputsHandler={this.showDescribeInputsHandler}
                />
                <Form>
                    <CardDescribeInputs
                        updateDescribePreview={this.updateDescribePreview}
                        show={this.state.showDescribeInputs}
                        hideDescribeInputsHandler={this.hideDescribeInputsHandler}
                    />
                    <CardProperties />
                </Form>
            </Main>
        </Wrapper>
    );
}
```
### Wrapper

Element **Wrapper** to główny pojemnik na nasz Kreator Kart, zwykły *div*, który środkuje nasze elementy,
nadaje wysokość, oraz sprawia, że możemy określać koordynaty elementów względem obszaru tego **Wrapper** dzięki
`position: relative`.

```js
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
`;

export default Wrapper;
```
Elementy wyjeżdżające poza ten element nie będą wpływać na rozmiar okna przeglądarki dzięki `overflow: hidden`.

### Header

To nagłówek widoku, gdzie będzie przycisk do cofania się i rozwinięcie menu aplikacji. Selektor *html* - `<header></header>.`
```js
import styled from 'styled-components';

const Header = styled.header`
  height: 56px;
`;

export default Header;
```

### Main

Obszar głownej zawartości Kreatora, selektor *html* `<main></main>` dla zachowania semantyczności.
```js
import styled from 'styled-components';

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  width: 100%;
  min-height: calc(100vh - 56px);
  padding: 20px 16px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: ${({theme}) => theme.colors.uiBlue};
`;

export default Main;
```

- Również wyśrodkowany *flexem*
- Jego szerokość 100% rodzica, czyli będzie na całą stronę, a wysokość to całkowita wysokość okna przeglądarki 
  minus wysokość nagłówka nawigacyjnego
- Wykorzystany jest tutaj **theme provider**, dzięki któremu nie musimy importować pliku z globalnymi 
  zmiennymi takich jak kolory, tylko możemy się do nich odnieść za pomocą tej ostatniej linijki przy *background-color*.

### CardDescribePreview
Wstawiamy tutaj komponent **CardDescribePreview** i przekazujemy mu następujące **propsy** (takie argumenty):
- Stany przechowujące nazwę karty, jej przedmiot oraz opis, aby wiedział jaką treść pokazać,
- Handler odpowiedzialny za pokazanie pól do wypełnienia dla nazwy karty itd., dzięki temu będziemy mogli wywołać
w tym komponencie zmianę stanu `showDescribeInputs`.
```js
<CardDescribePreview
    cardName={this.state.cardName}
    cardSubject={this.state.cardSubject}
    cardTooltip={this.state.cardTooltip}
    showDescribeInputsHandler={this.showDescribeInputsHandler}
/>
```

### Form

To znacznik *html* określający formularz, który będziemy wysyłać.
```js
import styled from 'styled-components';

const Form = styled.form`
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
`;

export default Form;
```

### CardDescribeInputs
A tutaj już w formularzu zawarty jest komponent **CardDescribeInputs**, przekazujemy mu takie *propsy*:
- handlera **updateDescribePreview**, aby mógł go wywołać do zaaktualizowania podglądu dla Nazwy Karty itd.,
- stan **showDescribeInputs**, aby wiedział kiedy się pokazać,
- handlera **hideDescribeInputsHandler**, aby mógł wywołać ukrycie się z powrotem.
```js
<CardDescribeInputs
    updateDescribePreview={this.updateDescribePreview}
    show={this.state.showDescribeInputs}
    hideDescribeInputsHandler={this.hideDescribeInputsHandler}
/>
```

### CardProperties

Dalej mamy komponent **CardProperties**, który reprezentuje cały obszar z pozostałymi atrybutami kart takimi 
jak efekty itp.
```js
<CardProperties />
```












