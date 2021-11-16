import React from 'react';
import Main from './styled-components/Main';
import Wrapper from './styled-components/Wrapper';
import Form from './styled-components/Form';
import Div from './styled-components/Div';
import Button from './styled-components/Button';
import BasicCardData from '../../../../api/data-models/cards/BasicCardData';
import WholeCardData from '../../../../api/data-models/cards/WholeCardData';
import ProposedContentAPIGateway from '../../../../api/gateways/proposed-content/ProposedContentAPIGateway';
import CardsAPIGateway from '../../../../api/gateways/CardsAPIGateway';
import SendCardPopup, {timeout as SendCardPopupTimeout} from '../../molecules/SendCardPopup/SendCardPopup';
import CardChoose from '../../molecules/CardChoose';
import NavHeader from '../../../prototype/molecules/NavHeader';
import CardDescribePreview from '../../atoms/CardDescribePreview';
import CardDescribeInputs from '../../atoms/CardDescribeInputs';
import CardProperties from '../CardProperties';
import CardView from '../CardView';

class CardsCreator extends React.Component {
    state = {
        cardId: undefined,
        cardName: '',
        cardSubject: '',
        cardTooltip: '',
        cardImage: null,

        /**
         * If user uploads image, then cardImage is file object and can't be used to preview uploaded image, so this variable exists.
         */
        cardImageURLPreview: null,
        /**
         * index 0 - cost of upgrade from level common to higher
         *
         * index 1 - cost of upgrade from level gold to higher
         *
         * index 2 - always undefined, there is no higher level than epic
         */
        levelCostValues: [undefined, undefined, undefined],
        effectsFromApi: [],
        effectsToSend: [[], [], []],
        showDescribeInputs: false,

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
        showCardView: false,
    }

    cardSubmissionSuccessHandler = () => {
        this.setState({
            showSendMessage: true,
            sendSuccess: true
        });
    }

    cardSubmissionFailedHandler = (response) => {
        response.then(response => {
            this.setState({
                showSendMessage: true,
                sendSuccess: false,
                failedCardSubmissionMsg: JSON.stringify(response).replace(/[{}"\]]+/g, '').replace(/[,[]+/g, ' '),
            });
        });
    }

    /**
     * Sends card data without image to the server.
     * If image was uploaded then it will be sent in second PUT request.
     * @param event
     */
    sendCardToApi = (event) => {
        event.preventDefault();

        let basicCardData = new BasicCardData(this.state.cardName, this.state.cardSubject, this.state.cardTooltip, this.state.cardImage);
        let wholeCardData = new WholeCardData(basicCardData, this.state.effectsToSend, this.state.levelCostValues);
        ProposedContentAPIGateway.sendProposedCard(wholeCardData, this.state.comment, this.cardSubmissionSuccessHandler,
            this.cardSubmissionFailedHandler)
            .catch(err => console.log(err));
    }

    componentDidMount() {
        if (this.props.creatorType === 'edit')
            this.setState({headerLabel: 'Edytowanie karty', showCardChoose: true});
        else if (this.props.creatorType === 'create')
            this.setState({headerLabel: 'Nowa karta', showCardChoose: false});

        if (this.props.creatorType === 'edit') {
            CardsAPIGateway.getAllCards()
                .then(data => this.setState({cardsFromApi: data}))
                .catch(error => console.log(error));
        }
        CardsAPIGateway.getAllEffects()
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
        this.setState({showSendCardPopup: true})
    }

    hideSendCardPopupHandler = (event) => {
        event.preventDefault();
        this.setState({showSendCardPopup: false})

        /* We hide send message after timeout, because SendCardPopup has closing animation. */
        setTimeout(() => {
            this.setState({showSendMessage: false});
        }, SendCardPopupTimeout.exit)
    }

    updateDescribePreview = (event) => {
        const keyName = event.target.name;
        let keyValue;
        if (event.target.value !== '')
            keyValue = event.target.value;
        else keyValue = '';
        this.setState({[keyName]: keyValue});
    }

    onCardImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            this.setState({
                cardImage: event.target.files[0],
                cardImageURLPreview: URL.createObjectURL(event.target.files[0])
            });
        }
    }

    levelCostValuesHandler = (event) => {
        let newList = this.state.levelCostValues.slice();
        if (event.target.value > 0)
            newList[Number(event.target.id[0]) - 1] = event.target.value;
        else newList[Number(event.target.id[0]) - 1] = undefined;
        this.setState({levelCostValues: newList});
    }

    /**
     * Clears upgrade cost for given array of card levels.
     * @param levels Array of card levels which will have their upgrade cost cleared.
     */
    levelCostClearHandler = (levels) => {
        let newList = this.state.levelCostValues.slice();
        levels.forEach((rank) => {
            newList[rank - 1] = undefined
        });
        this.setState({levelCostValues: newList});
    }

    /**
     * Resets upgrade cost for given array of card levels.
     * @param levels Array of card levels which will have their upgrade cost reset.
     */
    levelCostResetHandler = (levels) => {
        let newList = this.state.levelCostValues.slice();
        levels.forEach((rank) => {
            newList[rank - 1] = 1
        });
        this.setState({levelCostValues: newList});
    }

    setEffectsToSendHandler = (effects) => {
        this.setState({effectsToSend: effects});
    }

    /**
     * Being called after new level is created.
     * @param level Newly created level.
     */
    levelCreatedHandler = (level) => {
        let newLevelsListFromCard = this.state.levelsListFromCard;
        newLevelsListFromCard.push(level);
        this.setState({levelsListFromCard: newLevelsListFromCard});
    }

    /**
     * Removes level.
     * @param level Given level to remove.
     */
    removeLevelHandler = (level) => {
        let newEffectsToSend = this.state.effectsToSend.slice();
        let newChosenEffectsFromCard = this.state.chosenEffectsFromCard.slice();

        newEffectsToSend[level - 1] = [];
        newChosenEffectsFromCard[level - 1] = [];

        let newLevelsListFromCard = this.state.levelsListFromCard.filter((l) => {
            return l !== level
        });

        this.setState({
            effectsToSend: newEffectsToSend,
            chosenEffectsFromCard: newChosenEffectsFromCard,
            levelsListFromCard: newLevelsListFromCard
        })
    }

    hideCardChooseHandler = (event) => {
        event.preventDefault();
        this.setState({showCardChoose: false});
    }

    chosenCardHandler = (event, id, name, subject, tooltip, image, levels) => {
        event.preventDefault();
        this.setState({
            cardId: id,
            cardName: name,
            cardSubject: subject,
            cardTooltip: tooltip,
            cardImage: image,
            cardImageURLPreview: image,
        });

        this.setLevelsListFromCard(levels);
        this.setLevelCostValuesFromCard(levels);
        this.setChosenEffectsFromCard(levels);
        this.hideCardChooseHandler(event);
    }

    setLevelsListFromCard = (levels) => {
        let newLevelsList = [];
        for (let i = 0; i < levels.length; i++) {
            newLevelsList.push(levels[i].level);
        }
        this.setState({levelsListFromCard: newLevelsList});
    }

    setLevelCostValuesFromCard = (levels) => {
        let newCostList = this.state.levelCostValues.slice();
        try {
            if (levels[0].next_level_cost)
                newCostList[levels[0].level - 1] = levels[0].next_level_cost;
            if (levels[1].next_level_cost)
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
        for (let i = 0; i < levels.length; i++) {
            for (let j = 0; j < levels[i].effects.length; j++) {
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

    showCardViewHandler = (event) => {
        event.preventDefault();
        if (this.state.effectsToSend[0].length !== 0 ||
            this.state.effectsToSend[1].length !== 0 ||
            this.state.effectsToSend[2].length !== 0)
            this.setState({showCardView: true});
    }

    hideCardViewHandler = (event) => {
        event.preventDefault();
        this.setState({showCardView: false});
    }

    render() {
        return (
            <>
                <CardChoose showCardChoose={this.state.showCardChoose}
                            hideCardChooseHandler={this.hideCardChooseHandler}
                            cardsFromAPI={this.state.cardsFromApi}
                            chosenCardHandler={this.chosenCardHandler}/>
                <Wrapper>
                    <NavHeader backLink={'/cards-creator-start'} label={this.state.headerLabel}/>
                    <Main>
                        <CardDescribePreview cardName={this.state.cardName}
                                             cardSubject={this.state.cardSubject}
                                             cardTooltip={this.state.cardTooltip}
                                             showDescribeInputsHandler={this.showDescribeInputsHandler}
                                             cardImage={this.state.cardImageURLPreview}
                        />
                        <Form>
                            <CardDescribeInputs updateDescribePreview={this.updateDescribePreview}
                                                onCardImageChange={this.onCardImageChange}
                                                show={this.state.showDescribeInputs}
                                                hideDescribeInputsHandler={this.hideDescribeInputsHandler}
                                                cardName={this.state.cardName}
                                                cardSubject={this.state.cardSubject}
                                                cardTooltip={this.state.cardTooltip}
                                                cardImage={this.state.cardImageURLPreview}
                            />
                            <CardProperties creatorType={this.props.creatorType}
                                            levelCostValues={this.state.levelCostValues}
                                            levelsListFromCard={this.state.levelsListFromCard}
                                            effectsFromApi={this.state.effectsFromApi}
                                            chosenEffectsFromCard={this.state.chosenEffectsFromCard}
                                            effectsToSend={this.state.effectsToSend}
                                            levelCostValuesHandler={this.levelCostValuesHandler}
                                            levelCostClearHandler={this.levelCostClearHandler}
                                            levelCostResetHandler={this.levelCostResetHandler}
                                            removeLevelHandler={this.removeLevelHandler}
                                            setEffectsToSendHandler={this.setEffectsToSendHandler}
                                            levelCreatedHandler={this.levelCreatedHandler}
                            />
                            <Div>
                                <Button onClick={this.refreshPage} access show={this.props.creatorType}>
                                    Edytuj inną
                                </Button>
                                <Button show access={this.state.effectsToSend[0].length !== 0 ||
                                this.state.effectsToSend[1].length !== 0 ||
                                this.state.effectsToSend[2].length !== 0} onClick={this.showCardViewHandler}>
                                    Podgląd
                                </Button>
                                <Button type='submit' access onClick={this.showSendCardPopupHandler} show>
                                    Wyślij
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
                <CardView hideCardViewHandler={this.hideCardViewHandler}
                          show={this.state.showCardView}
                          cardName={this.state.cardName}
                          cardSubject={this.state.cardSubject}
                          cardTooltip={this.state.cardTooltip}
                          cardImage={this.state.cardImageURLPreview}
                          cardEffects={this.state.effectsToSend}/>
            </>
        );
    }
}


export default CardsCreator;
