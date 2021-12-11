import React from "react";
import PopUp from "../../../global/organisms/PopUp";
import Search from "../../../global/atoms/Search";
import {getAllCards} from "../../../../storage/cards/cardStorage";
import Ul from "./styled-components/Ul";
import CardChooseDiv from "./styled-components/CardChooseDiv";
import ColumnGapContainer from "../../../global/molecules/ColumnGapContainer";
import FlexGapContainer from "../../../global/molecules/FlexGapContainer/FlexGapContainer";
import CompactCardView from "../../../global/atoms/CompactCardView";
import ButtonWithIcon from "../../../global/atoms/ButtonWithIcon";
import UserInfo from "../../../global/atoms/UserInfo";
import P from "./styled-components/P";
import InputWithIcon from "../../../global/atoms/InputWithIcon";
import pencilGrey from "../../../../../assets/icons/pencil-grey.svg";
import eye from "../../../../../assets/icons/eye.svg";
import pencilWhite from "../../../../../assets/icons/pencil.svg"
import theme from "../../../../utils/theme";
import {Card as ModelCard} from "../../../../api/data-models/battle/Card";
import Card from "../../../card-editor/atoms/Card";
import {updateCurrentUserDeck} from "../../../../storage/user/userData";
import TransBack from "../../../global/organisms/TransBack";
import FullCardView from "../../../global/atoms/FullCardView";
import {desktop, mobile, nextStepAnimationDuration} from "../../../../utils/globals";
import Media from 'react-media';

/**
 * Props:
 * - closeHandler
 * -
 */
class ChangeDeckCard extends React.Component {
    state = {
        searchInput: '',
        allCards: [],
        setTranslateY: '100vh',
        selectedCard: {
            id: 0,
            level: 1,
            name: '',
            subject: '',
            tooltip: '',
            description: '',
            image: null
        },
        cardPositionInDeck: 1,
        fullCardViewPopUp: {
            visible: false,
            opacity: 0,
            cardTranslateY: '-100vh',
        }
    }

    showFullCardViewPopUp = () => {
        this.setState({
            fullCardViewPopUp: {
                visible: true,
                opacity: 0,
                cardTranslateY: '-100vh',
            }
        });

        setTimeout(() => {
            this.setState({
                fullCardViewPopUp: {
                    visible: true,
                    opacity: 1,
                    cardTranslateY: '0',
                }
            });
        }, 10);
    }

    hideFulLCardViewPopUp = () => {
        this.setState({
            fullCardViewPopUp: {
                visible: true,
                opacity: 0,
                cardTranslateY: '-100vh',
            }
        });

        setTimeout(() => {
            this.setState({
                fullCardViewPopUp: {
                    visible: false,
                    opacity: 0,
                    cardTranslateY: '-100vh',
                }
            });
        }, nextStepAnimationDuration);
    }

    handleSearch = (event) => {
        let keyValue = event.target.value;
        this.setState({searchInput: keyValue});
    }

    fetchCards = async () => {
        const cards = await getAllCards();
        this.setState({allCards: cards});
    }

    componentDidMount() {
        this.fetchCards();
        setTimeout(() => {
            this.setState({
                setTranslateY: '0',
                visible: true
            })
        }, 1);
        this.setState({
            selectedCard: this.props.deck.getCurrentlyEditingCard(),
            cardPositionInDeck: this.props.deck.currentlyEditingIdx + 1,
        })
    }


    onNewCardChoose = (event, id, name, subject, tooltip, image, levels, access) => {
        if (!access)
            return;

        // TODO: If we will have levels implemented change this
        const description = this.state.allCards.filter(c => c.id === id)[0].levels[0].effects_description;
        this.setState({
            selectedCard: {
                id: id,
                level: 1,
                name: name,
                subject: subject,
                tooltip: tooltip,
                image: image,
                description: description
            }
        })
    }

    onNewCardSave = async () => {
        const selectedCard = this.state.selectedCard;
        const newCard = new ModelCard(selectedCard.id, 1);
        newCard.name = selectedCard.name;
        newCard.subject = selectedCard.subject;
        newCard.tooltip = selectedCard.tooltip;
        newCard.image = selectedCard.image;
        const didSave = this.props.deck.tryInsertCardAtPosition(newCard, this.state.cardPositionInDeck);
        if (!didSave)
            return;

        const hasUpdated = await updateCurrentUserDeck(this.props.deck.getAsDict())
        if (!hasUpdated)
            alert("Nie udało się zaktualizować talii");
        this.close();
        this.forceUpdate();
    }

    renderCardChoose = () => {
        return (
            <>
                <CardChooseDiv>
                    <Search searchInput={this.state.searchInput} handleSearch={this.handleSearch}/>
                    <Ul>
                        {
                            this.state.allCards.map((card) => {
                                return (
                                    <React.Fragment key={`card-${card.id}`}>
                                        <Card id={card.id} name={card.name}
                                              subject={card.subject}
                                              tooltip={card.tooltip}
                                              image={card.image}
                                              searchInput={this.state.searchInput}
                                              levels={card.levels}
                                              access={!this.props.deck.hasCardIdExceptCurrentlyEditing(card.id)}
                                              chosenCardHandler={this.onNewCardChoose}/>
                                    </React.Fragment>
                                );
                            })
                        }
                    </Ul>
                </CardChooseDiv>
            </>
        )
    }

    hoverTrue = () => {
        this.setState({popUpHover: true});
    }

    hoverFalse = () => {
        this.setState({popUpHover: false});
    }

    getInputButton = (isDesktop) => {
        return (
            <InputWithIcon width={isDesktop ? '28px' : '20px'} type={'number'} min={1} max={5} icon={pencilGrey}
                           default={this.props.deck.currentlyEditingIdx + 1} onChange={this.onNewCardPosition}/>
        )
    }

    onNewCardPosition = (newPosition) => {
        this.setState({cardPositionInDeck: newPosition});
    }

    onBgClick = () => {
        if (!this.state.popUpHover)
            this.close();
    }

    close = () => {
        this.setState({
            setTranslateY: '100vh',
            visible: false
        });
        setTimeout(this.props.closeHandler, 300);
    }

    render() {
        return (
            <>
                <Media query={mobile}>
                    <>
                        <PopUp visible={true}
                               closeHandler={this.close}
                               setTranslateY={this.state.setTranslateY}>
                            <ColumnGapContainer setWidth={'100%'} setHeight={'100%'} setPadding={'40px 20px 30px 20px'}
                                                gap={'10px'}>
                                <FlexGapContainer setWidth={'100%'} setPadding={'0px 27px'}
                                                  space={true}>
                                    <CompactCardView setMargin={'0'} cardName={this.state.selectedCard.name}
                                                     cardLevel={this.state.selectedCard.level}
                                                     cardImage={this.state.selectedCard.image}>

                                    </CompactCardView>
                                    <ColumnGapContainer gap={'10px'}>
                                        <UserInfo label={'Pozycja w talii'} value={this.getInputButton(false)}/>
                                        <ButtonWithIcon icon={eye} handler={this.showFullCardViewPopUp}>
                                            Podgląd
                                        </ButtonWithIcon>
                                        <ButtonWithIcon icon={pencilWhite} color={theme.colors.purplyPinky}
                                                        handler={this.onNewCardSave}>
                                            Zapisz
                                        </ButtonWithIcon>
                                    </ColumnGapContainer>
                                </FlexGapContainer>
                                <P>Wymień na</P>
                                {this.renderCardChoose()}
                            </ColumnGapContainer>
                        </PopUp>
                        {
                            this.state.fullCardViewPopUp.visible ?
                                <TransBack visible setOpacity={this.state.fullCardViewPopUp.opacity}
                                           closeHandler={this.hideFulLCardViewPopUp} customZIndex={'14'}>
                                    <FullCardView setWidth={'258px'} setHeight={'458px'} setMargin={'0'}
                                                  cardName={this.state.selectedCard.name}
                                                  cardLevel={this.state.selectedCard.level}
                                                  cardImage={this.state.selectedCard.image}
                                                  cardSubject={this.state.selectedCard.subject}
                                                  cardTooltip={this.state.selectedCard.tooltip}
                                                  description={this.state.selectedCard.description}
                                                  common={this.state.selectedCard.level === 1}
                                                  gold={this.state.selectedCard.level === 2}
                                                  epic={this.state.selectedCard.level === 3}
                                                  setTranslateY={this.state.fullCardViewPopUp.cardTranslateY}/>
                                </TransBack> : null
                        }
                    </>
                </Media>
                <Media query={desktop}>
                    <TransBack closeHandler={this.onBgClick} visible={true}
                               setOpacity={this.state.visible ? '100%' : '0'}>
                        <PopUp visible={true} closeHandler={this.close} setTranslateY={this.state.setTranslateY}
                               setHeight={'700px'} setWidth={'678px'} hoverTrue={this.hoverTrue}
                               hoverFalse={this.hoverFalse}>
                            <ColumnGapContainer setHeight={'100%'} setPadding={'20px'} gap={'40px'}>
                                <UserInfo label={'Pozycja w talii'} value={this.getInputButton(true)}/>
                                <FlexGapContainer setHeight={'458px'} gap={'40px'}>
                                    <FullCardView setWidth={'258px'} setHeight={'458px'} setMargin={'0'}
                                                  cardName={this.state.selectedCard.name}
                                                  cardLevel={this.state.selectedCard.level}
                                                  cardImage={this.state.selectedCard.image}
                                                  cardSubject={this.state.selectedCard.subject}
                                                  cardTooltip={this.state.selectedCard.tooltip}
                                                  description={this.state.selectedCard.description}
                                                  common
                                    />
                                    <ColumnGapContainer setHeight={'100%'} setWidth={'300px'}>
                                        <P>Wymień na</P>
                                        {this.renderCardChoose()}
                                    </ColumnGapContainer>
                                </FlexGapContainer>
                                <ButtonWithIcon icon={pencilWhite} color={theme.colors.purplyPinky}
                                                handler={this.onNewCardSave}>
                                    Zapisz
                                </ButtonWithIcon>
                            </ColumnGapContainer>
                        </PopUp>
                    </TransBack>
                </Media>
            </>
        );
    }
}

export default ChangeDeckCard;


