import React from 'react';

import Main from './styled-components/Main';
import Wrapper from './styled-components/Wrapper';
import Header from './styled-components/Header';
import Form from './styled-components/Form';

import CardDescribePreview from '../../atoms/CardDescribePreview';
import CardDescribeInputs from '../../atoms/CardDescribeInputs';
import CardProperties from '../../molecules/CardProperties';

class CardsCreator extends React.Component {
    state = {
        cardName: 'Nazwa Karty',
        cardSubject: 'Przedmiot',
        cardTooltip: 'Opis Karty',
        showDescribeInputs: false
    }

    handleChange = (event) => {
        const keyName = event.target.name;
        this.setState({[keyName] : event.target.value});
    }

    showDescribeInputsHandler = (event) => {
        event.preventDefault();
        this.setState({showDescribeInputs: true});
    }

    hideDescribeInputsHandler = (event) => {
        event.preventDefault();
        this.setState({showDescribeInputs: false});
    }

    updateDescribePreview = (event) => {
        const keyName = event.target.name;
        let keyValue = '';
        if(event.target.value !== '')
            keyValue = event.target.value;
        else keyValue = '-';
        this.setState({[keyName]: keyValue});
    }

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
}

export default CardsCreator;