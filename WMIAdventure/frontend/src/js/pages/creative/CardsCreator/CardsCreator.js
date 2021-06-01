import React from 'react';

import Main from './styled-components/Main';
import Wrapper from './styled-components/Wrapper';
import Form from './styled-components/Form';
import Div from './styled-components/Div';
import Button from './styled-components/Button';

import CardDescribePreview from './atoms/CardDescribePreview';
import CardDescribeInputs from './atoms/CardDescribeInputs';
import CardProperties from './organisms/CardProperties';
import NavHeader from './molecules/NavHeader';

class CardsCreator extends React.Component {
    state = {
        cardName: 'Nazwa Karty',
        cardSubject: 'Przedmiot',
        cardTooltip: 'Opis Karty',
        showDescribeInputs: false,
        levelCostValues: [],
        effectsFromApi: [],
        effectsToSend: [[], [], []],
    }

    sendCardToApi = (event) => {
        event.preventDefault();

        const levelsToSend = [];
        for(let i=0; i < this.state.effectsToSend.length; i++) {
            if(this.state.effectsToSend[i].length !== 0) {
                levelsToSend.push(
                    {
                        level: String(i + 1),
                        next_level_cost: this.state.levelCostValues[i],
                        effects: this.state.effectsToSend[i]
                    }
                );
            }
        }

        const API = process.env['REACT_APP_API_URL'];
        try {
            let result = fetch(`http://${API}/api/cards/`, {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({
                    name: this.state.cardName,
                    subject: this.state.cardSubject,
                    image: null,
                    tooltip: this.state.cardTooltip,
                    levels: levelsToSend
                })
            });

            console.log('Result: ' + result);
        } catch (e) {
            console.log(e);
        }
    }

    componentDidMount() {
        const API = process.env['REACT_APP_API_URL'];
        fetch(`http://${API}/api/cards/card-effect/`)
            .then(response => {
                return response.json();
            })
            .then(data => this.setState({effectsFromApi: data}))
            .catch(error => console.log(error));
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
        let keyValue;
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

    setEffectsToSendHandler = (effects) => {
        this.setState({effectsToSend: effects});
    }

    render() {
        return (
            <Wrapper>
                <NavHeader />
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
                            effectsFromApi={this.state.effectsFromApi}
                            setEffectsToSendHandler={this.setEffectsToSendHandler}
                        />
                        <Div>
                            <Button type='submit' onClick={this.sendCardToApi}>
                                Wyślij
                            </Button>
                        </Div>
                    </Form>
                </Main>
            </Wrapper>
        );
    }
}

export default CardsCreator;