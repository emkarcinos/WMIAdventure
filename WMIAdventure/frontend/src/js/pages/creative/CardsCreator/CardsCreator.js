import React from 'react';
import isMobile from "react-device-detect";

import Main from './styled-components/Main';
import Wrapper from './styled-components/Wrapper';
import Form from './styled-components/Form';
import Div from './styled-components/Div';
import Button from './styled-components/Button';

import CardDescribePreview from './atoms/CardDescribePreview';
import CardDescribeInputs from './atoms/CardDescribeInputs';
import CardProperties from './organisms/CardProperties';
import NavHeader from '../global/molecules/NavHeader';
import CardChoose from './molecules/CardChoose';
import SendMessage from './atoms/SendMessage';
import SendCardPopup from "./molecules/SendCardPopup";
import {timeout as SendCardPopupTimeout} from "./molecules/SendCardPopup/SendCardPopup";

class CardsCreator extends React.Component {
    state = {
        cardId: undefined,
        cardName: null,
        cardSubject: null,
        cardTooltip: null,
        levelCostValues: [],
        effectsFromApi: [],
        effectsToSend: [[], [], []],
        showDescribeInputs: false,
        /**
         * Level objects as received from the server, obtained when editing existing card.
         */
        levelsFromApi: [],

        headerLabel: '',
        showCardChoose: false,
        cardsFromApi: [],
        levelsListFromCard: [],
        chosenEffectsFromCard: [[], [], []],
        showSendMessage: false,
        sendSuccess: false,
        failedCardSubmissionMsg: null,
        showSendCardPopup: false,
        comment: "",
    }

    cardSubmissionFailedHandler(serverResponse){
        let t = this;
        serverResponse.json().then(function (jsonResponse){
            t.setState({
                showSendMessage: true,
                sendSuccess: false,
                failedCardSubmissionMsg: JSON.stringify(jsonResponse),
            });
        })
    }

    sendCardToApi = (event) => {
        event.preventDefault();
        const API = process.env['REACT_APP_API_URL'];

        const levelsToSend = [];
        for(let i=0; i < this.state.effectsToSend.length; i++) {
            if(this.state.effectsToSend[i].length !== 0) {
                levelsToSend.push (
                    {
                        level: String(i + 1),
                        next_level_cost: this.state.levelCostValues[i],
                        effects: this.state.effectsToSend[i]
                    }
                );
            }
        }

        try {
            let result = fetch(`http://${API}/api/proposed-content/cards/`, {
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
                    levels: levelsToSend,
                    comment: this.state.comment
                })
            }) .then (
                response => {
                    if(response.ok) {
                        this.setState({
                            showSendMessage: true,
                            sendSuccess: true
                        });
                    } else {
                        this.cardSubmissionFailedHandler(response)
                    }
                }
            );
            console.log('Result: ' + result);
        } catch (e) {
            console.log(e);
        }
    }

    componentDidMount() {
        if(this.props.creatorType === 'edit')
            this.setState({headerLabel: 'Edytowanie karty', showCardChoose: true});
        else if(this.props.creatorType === 'create')
            this.setState({headerLabel: 'Nowa karta', showCardChoose: false});

        const API = process.env['REACT_APP_API_URL'];

        if(this.props.creatorType === 'edit') {
            fetch(`http://${API}/api/cards/`)
                .then(response => {
                    return response.json();
                })
                .then(data => this.setState({cardsFromApi: data}))
                .catch(error => console.log(error));
        }

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

    showSendCardPopupHandler = (event) => {
        event.preventDefault();
        this.setState({showSendCardPopup : true})
    }

    hideSendCardPopupHandler = (event) => {
        event.preventDefault();
        this.setState({showSendCardPopup : false})

        /* We hide send message after timeout, because SendCardPopup has closing animation. */
        setTimeout(() => {
            this.setState({showSendMessage: false});
        }, SendCardPopupTimeout.exit)
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

    /**
     * Removes level.
     * @param level Given level to remove.
     */
    removeLevelHandler = (level) => {
        let newLevelsFromApi = this.state.levelsFromApi.filter((l) => l.level !== level);
        this.setState({levelsFromApi: newLevelsFromApi});
        this.setLevelsListFromCard(newLevelsFromApi);
        this.setLevelCostValuesFromCard(newLevelsFromApi);
        this.setChosenEffectsFromCard(newLevelsFromApi);
    }

    hideCardChooseHandler = (event) => {
        event.preventDefault();
        this.setState({showCardChoose: false});
    }

    chosenCardHandler = (event, id, name, subject, tooltip, levels) => {
        event.preventDefault();
        this.setState({
            cardId: id,
            cardName: name,
            cardSubject: subject,
            cardTooltip: tooltip,
            levelsFromApi: levels
        });

        this.setLevelsListFromCard(levels);
        this.setLevelCostValuesFromCard(levels);
        this.setChosenEffectsFromCard(levels);
        this.hideCardChooseHandler(event);
    }

    setLevelsListFromCard = (levels) => {
        let newLevelsList = [];
        for (let i=0; i<levels.length; i++) {
            newLevelsList.push(levels[i].level);
        }
        this.setState({levelsListFromCard: newLevelsList});
    }

    setLevelCostValuesFromCard = (levels) => {
        let newCostList = this.state.levelCostValues.slice();
        try {
            if(levels[0].next_level_cost)
                newCostList[levels[0].level - 1] = levels[0].next_level_cost;
            if(levels[1].next_level_cost)
                newCostList[levels[1].level - 1] = levels[1].next_level_cost;
            this.setState({levelCostValues: newCostList});
        } catch (error) {
            console.log(error);
        }
    }

    setChosenEffectsFromCard = (levels) => {
        let newEffectsList = [[], [], []];
        let newChosenEffectsList = [[], [], []];
        let chosenEffectElem;
        for (let i=0; i<levels.length; i++) {
            for (let j=0; j<levels[i].effects.length; j++) {
                newEffectsList[levels[i].level - 1].push({
                    card_effect: levels[i].effects[j].card_effect,
                    target: levels[i].effects[j].target,
                    power: levels[i].effects[j].power,
                    range: levels[i].effects[j].range,
                    level: levels[i].level
                });
                chosenEffectElem = this.state.effectsFromApi.filter(function (elem) {
                    return elem.id === levels[i].effects[j].card_effect;
                })
                newChosenEffectsList[levels[i].level - 1].push(chosenEffectElem[0]);
            }
        }
        this.setState({effectsToSend: newEffectsList});
        this.setState({chosenEffectsFromCard: newChosenEffectsList});
    }

    hideSendMessageHandler = (event) => {
        event.preventDefault();
        this.setState({showSendMessage: false});
    }

    refreshPage = () => {
        window.location.reload();
    }

    commentInputHandler = (event) => {
        const keyName = event.target.name;
        let keyValue = event.target.value;
        this.setState({[keyName]: keyValue});
    }

    render() {
        if (isMobile) {
            return (
                <>
                    <CardChoose showCardChoose={this.state.showCardChoose}
                                hideCardChooseHandler={this.hideCardChooseHandler}
                                cardsFromAPI={this.state.cardsFromApi}
                                chosenCardHandler={this.chosenCardHandler} />
                    <Wrapper>
                        <NavHeader backLink={'/cards-creator-start'} label={this.state.headerLabel} />
                        <Main>
                            <CardDescribePreview cardName={this.state.cardName}
                                cardSubject={this.state.cardSubject}
                                cardTooltip={this.state.cardTooltip}
                                showDescribeInputsHandler={this.showDescribeInputsHandler}
                            />
                            <Form>
                                <CardDescribeInputs updateDescribePreview={this.updateDescribePreview}
                                    show={this.state.showDescribeInputs}
                                    hideDescribeInputsHandler={this.hideDescribeInputsHandler}
                                    cardName={this.state.cardName}
                                    cardSubject={this.state.cardSubject}
                                    cardTooltip={this.state.cardTooltip}
                                />
                                <CardProperties creatorType={this.props.creatorType}
                                    levelCostValues={this.state.levelCostValues}
                                    levelCostValuesHandler={this.levelCostValuesHandler}
                                    levelCostClearHandler={this.levelCostClearHandler}
                                    levelCostResetHandler={this.levelCostResetHandler}
                                    effectsFromApi={this.state.effectsFromApi}
                                    setEffectsToSendHandler={this.setEffectsToSendHandler}
                                    levelsListFromCard={this.state.levelsListFromCard}
                                    chosenEffectsFromCard={this.state.chosenEffectsFromCard}
                                    effectsToSend={this.state.effectsToSend}
                                    removeLevelHandler={this.removeLevelHandler}
                                />
                                <Div>
                                    <Button type='submit' onClick={this.sendCardToApi} show={true}>
                                        Wyślij
                                    </Button>
                                    <Button onClick={this.refreshPage} show={this.props.creatorType}>
                                        Edytuj inną kartę
                                    </Button>
                                </Div>
                            </Form>
                        </Main>
                    </Wrapper>
                    <SendMessage showMessage={this.state.showSendMessage}
                                 sendSuccess={this.state.sendSuccess}
                                 hideSendMessageHandler={this.hideSendMessageHandler} />
                </>
            );
        }
        else {
            return (
                <>
                    <CardChoose showCardChoose={this.state.showCardChoose}
                                hideCardChooseHandler={this.hideCardChooseHandler}
                                cardsFromAPI={this.state.cardsFromApi}
                                chosenCardHandler={this.chosenCardHandler} />
                    <Wrapper>
                        <NavHeader backLink={'/cards-creator-start'} label={this.state.headerLabel} />
                        <Main>
                            <CardDescribePreview cardName={this.state.cardName}
                                cardSubject={this.state.cardSubject}
                                cardTooltip={this.state.cardTooltip}
                                showDescribeInputsHandler={this.showDescribeInputsHandler}
                            />
                            <Form style={{"max-width": '450px'}}>
                                <CardDescribeInputs updateDescribePreview={this.updateDescribePreview}
                                    show={this.state.showDescribeInputs}
                                    hideDescribeInputsHandler={this.hideDescribeInputsHandler}
                                    cardName={this.state.cardName}
                                    cardSubject={this.state.cardSubject}
                                    cardTooltip={this.state.cardTooltip}
                                />
                                <CardProperties creatorType={this.props.creatorType}
                                    levelCostValues={this.state.levelCostValues}
                                    levelCostValuesHandler={this.levelCostValuesHandler}
                                    levelCostClearHandler={this.levelCostClearHandler}
                                    levelCostResetHandler={this.levelCostResetHandler}
                                    effectsFromApi={this.state.effectsFromApi}
                                    setEffectsToSendHandler={this.setEffectsToSendHandler}
                                    levelsListFromCard={this.state.levelsListFromCard}
                                    chosenEffectsFromCard={this.state.chosenEffectsFromCard}
                                    effectsToSend={this.state.effectsToSend}
                                    removeLevelHandler={this.removeLevelHandler}
                                />
                                <Div>
                                    <Button type='submit' onClick={this.showSendCardPopupHandler} show={true}>
                                        Wyślij
                                    </Button>
                                    <Button onClick={this.refreshPage} show={this.props.creatorType}>
                                        Edytuj inną kartę
                                    </Button>
                                </Div>
                            </Form>
                        </Main>
                    </Wrapper>
                    <SendCardPopup show={this.state.showSendCardPopup}
                                   hideSendCardPopupHandler={this.hideSendCardPopupHandler}
                                   sendCard={this.sendCardToApi}
                                   showSendMessage={this.state.showSendMessage}
                                   sendSuccess={this.state.sendSuccess}
                                   failedSubmissionMsg={this.state.failedCardSubmissionMsg}
                                   commentInputHandler={this.commentInputHandler}/>
                </>
            );
        }

    }
}

export default CardsCreator;