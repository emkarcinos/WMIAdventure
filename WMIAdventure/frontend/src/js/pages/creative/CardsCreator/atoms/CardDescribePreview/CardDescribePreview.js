import React from 'react';
import H1 from './styled-components/H1';
import P from './styled-components/P';
import Section from './styled-components/Section';
import Button from './styled-components/Button';

class CardDescribePreview extends React.Component {
    render() {
        return (
            <>
                <Section>
                    <H1>
                        {this.props.cardName ? this.props.cardName : 'Nazwa karty'}
                    </H1>
                    <P>
                        {this.props.cardSubject ? this.props.cardSubject : 'Przedmiot'}
                    </P>
                    <P tooltip>
                        {this.props.cardTooltip ? this.props.cardTooltip : 'Opis Karty'}
                    </P>
                    <Button onClick={this.props.showDescribeInputsHandler}>
                        {/*pensil icon*/}
                    </Button>
                </Section>
            </>
        );
    }
}

export default CardDescribePreview;