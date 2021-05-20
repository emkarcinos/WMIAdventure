import React from 'react';
import H2 from './styled-components/H2';
import P from './styled-components/P';
import Section from './styled-components/Section';
import Button from './styled-components/Button';
import CardDescribeInputs from '../../atoms/CardDescribeInputs';

class CardDescribePreview extends React.Component {
    constructor(props) {
        super(props);
        this.updateDescribePreview = this.updateDescribePreview.bind(this);
    }

    state = {
        cardName: 'Nazwa Karty',
        cardSubject: 'Przedmiot',
        cardTooltip: 'Opis Karty',
    }

    updateDescribePreview(event) {
        const keyName = event.target.name;
        this.setState({[keyName]: event.target.value});
    }

    render() {
        return (
            <Section>
                <H2>
                    {this.state.cardName}
                </H2>
                <P>
                    {this.state.cardSubject}
                </P>
                <P tooltip>
                    {this.state.cardTooltip}
                </P>
                <Button>
                    {/*pensil icon*/}
                </Button>
                <CardDescribeInputs updateDescribePreview={this.updateDescribePreview}/>
            </Section>
        );
    }
}

export default CardDescribePreview;