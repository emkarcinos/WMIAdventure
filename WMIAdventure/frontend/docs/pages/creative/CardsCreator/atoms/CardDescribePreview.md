# Dokumentacja komponentu CardDescribePreview

## Warstwa prezentacyjna komponentu

Ten komponent zawiera nagłówek h2 pokazujący Nazwę Karty, oraz dwa paragrafy z Przedmiotem Karty i Opisem Karty.

```js
class CardDescribePreview extends React.Component {
    render() {
        return (
            <>
                <Section>
                    <H1>
                        {this.props.cardName}
                    </H1>
                    <H3>
                        {this.props.cardSubject}
                    </H3>
                    <H3 tooltip>
                        {this.props.cardTooltip}
                    </H3>
                </Section>
                <Button onClick={this.props.showDescribeInputsHandler}>
                    {/*pensil icon*/}
                </Button>
            </>
        );
    }
}
```
Treść jest zależna od propsów komponentu rodzica. Ten komponent zawiera również *buttona*, który aktywuje pojawienie
się komponentu **CardDescribeInputs**, który zawiera inputy do tych trzech opisowych atrybutów karty.