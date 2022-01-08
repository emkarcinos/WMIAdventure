# Dokumentacja komponentu CardDescribeInputs

## Stany komponentu

Komponent posiada stan `fieldsetHover`, który pomaga przy schowaniu komponentu gdy klikniemy poza obszar formularza.

```js
state = {
    fieldsetHover: false,
}
```

## Metody komponentu, handlery

### hoverTrue

Ustawia stan `fieldsetHover` na `true`.

```js
hoverTrue = () => {
    this.setState({fieldsetHover: true});
}
```

### hoverFalse

Ustawia stan `fieldsetHover` na `false`.

```js
hoverFalse = () => {
    this.setState({fieldsetHover: false});
}
```

### handleHiding

Wywołuje handler z komponentu rodzica, który sprawia że nasz komponent **CardDescribeInputs** znika, pod warunkiem, że
myszka nie jest w obszarze formularza (czyli tego naszego komponentu CardDescribeInputs).

```js
handleHiding = (event) => {
    if(!this.state.fieldsetHover)
        this.props.hideDescribeInputsHandler(event);
}
```

## Warstwa prezentacyjna komponentu

```js
render()
{
    return (
        <TransparentBack show={this.props.show} onClick={this.handleHiding}>
            <Fieldset onMouseEnter={this.hoverTrue} onMouseLeave={this.hoverFalse}>
                <Legend>
                    Karta
                </Legend>
                <Main>
                    <Caption htmlFor='cardName'>
                        Nazwa
                    </Caption>
                    <DivInput>
                        <Input id='cardName' name='cardName' type='text' onChange={this.props.updateDescribePreview}/>
                    </DivInput>
                </Main>
                <Main>
                    <Caption htmlFor='cardSubject'>
                        Przedmiot
                    </Caption>
                    <DivInput>
                        <Input id='cardSubject' name='cardSubject' type='text'
                               onChange={this.props.updateDescribePreview}/>
                    </DivInput>
                </Main>
                <Main last>
                    <Caption htmlFor='cardTooltip'>
                        Opis
                    </Caption>
                    <DivInput>
                        <Input id='cardTooltip' name='cardTooltip' type='text'
                               onChange={this.props.updateDescribePreview}/>
                    </DivInput>
                </Main>
            </Fieldset>
        </TransparentBack>
    );
}
```

**TransparentBack** to kontener z przezroczystym czarnym tłem, jak klikniemy na ten obszar poza formularzem, to
komponent **CardDescribeInputs** zniknie. Dzięki `onChange` w elementach `<Input />` aktualizuje się treść z
komponentu **CardDescribePreview**.
