import React from 'react';
import H2 from './styled-components/H2';
import P from './styled-components/P';
import Section from './styled-components/Section';
import Button from './styled-components/Button';
import CardDescribeInputs from '../../atoms/CardDescribeInputs';

class CardDescribePreview extends React.Component {
    state = {
        cardName: 'Nazwa Karty',
        cardSubject: 'Przedmiot',
        cardTooltip: 'Opis Karty',
        showInputs: false
    }

    updateDescribePreview = (event) => {
        const keyName = event.target.name;
        this.setState({[keyName]: event.target.value});
    }

    showInputsHandler = (event) => {
        event.preventDefault();
        this.setState({showInputs: true});
    }

    hideInputsHandler = (event) => {
        event.preventDefault();
        this.setState({showInputs: false});
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
                <Button onClick={this.showInputsHandler}>
                    {/*pensil icon*/}
                </Button>
                <CardDescribeInputs
                    updateDescribePreview={this.updateDescribePreview}
                    show={this.state.showInputs}
                    hideInputsHandler={this.hideInputsHandler}
                />
            </Section>
        );
    }
}

export default CardDescribePreview;