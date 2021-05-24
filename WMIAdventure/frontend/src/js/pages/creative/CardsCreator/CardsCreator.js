import React from 'react';

import Main from './styled-components/Main';
import Wrapper from './styled-components/Wrapper';
import Header from './styled-components/Header';
import Form from './styled-components/Form';

import CardDescribePreview from './atoms/CardDescribePreview';
import CardDescribeInputs from './atoms/CardDescribeInputs';
import CardProperties from './organisms/CardProperties';

class CardsCreator extends React.Component {
    state = {
        cardName: 'Nazwa Karty',
        cardSubject: 'Przedmiot',
        cardTooltip: 'Opis Karty',
        showDescribeInputs: false,
        levelCostValues: [],
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

    levelCostValuesHandler = (event) => {
        let newList = this.state.levelCostValues.slice();
        if(event.target.value > 0)
            newList[Number(event.target.id[0]) - 1] = event.target.value;
        else newList[Number(event.target.id[0]) - 1] = undefined;
        this.setState({levelCostValues: newList});
    }

    levelCostClearHandler = (event, rank) => {
        event.preventDefault();
        let newList = this.state.levelCostValues.slice();
        newList[rank - 1] = undefined;
        this.setState({levelCostValues: newList});
    }

    levelCostResetHandler = (event, rank) => {
        event.preventDefault();
        let newList = this.state.levelCostValues.slice();
        newList[rank - 1] = 1;
        this.setState({levelCostValues: newList});
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
                        <CardProperties
                            levelCostValues={this.state.levelCostValues}
                            levelCostValuesHandler={this.levelCostValuesHandler}
                            levelCostClearHandler={this.levelCostClearHandler}
                            levelCostResetHandler={this.levelCostResetHandler}
                        />
                    </Form>
                </Main>
            </Wrapper>
        );
    }
}

export default CardsCreator;