import React from "react";
import PopUp from "../../../global/organisms/PopUp";
import Search from "../../../global/atoms/Search";
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
import {cardsFromUserCardsData, nullCard} from "../../../../api/data-models/battle/Card";
import {getCurrentUserCards, updateCurrentUserDeck} from "../../../../storage/user/userData";
import TransBack from "../../../global/organisms/TransBack";
import FullCardView from "../../../global/atoms/FullCardView";
import {desktop, mobile, nextStepAnimationDuration} from "../../../../utils/globals";
import Media from 'react-media';
import {InsertCardAtPositionCommand} from "../../../../api/data-models/battle/EditableDeck";
import upgrade from '../../../../../assets/icons/upgrade-light.svg';
import UpgradeCardSection from "../../molecules/UpgradeCardSection";
import UserCard from "../../atoms/UserCard";

/**
 * Props:
 * - closeHandler
 * -
 */
class ChangeDeckCard extends React.Component {
    state = {
        searchInput: '',
        /**
         * @type {[Card]}
         */
        allCards: [],
        setTranslateY: '100vh',
        selectedCard: nullCard(),
        cardPositionInDeck: 1,
        fullCardViewPopUp: {
            visible: false,
            opacity: 0,
            cardTranslateY: '-100vh',
        },
        upgradeCardSectionPopUp: {
            visible: false,
            opacity: 0,
            translateX: '100vw',
        },
        upgradePopUpHover: false,
    }

    showUpgradeCardPopUp = () => {
        this.setState({
            upgradeCardSectionPopUp: {
                visible: true,
                opacity: 0,
                translateX: '100vw',
            }
        });

        setTimeout(() => {
            this.setState({
                upgradeCardSectionPopUp: {
                    visible: true,
                    opacity: 1,
                    translateX: '0',
                }
            });
        }, 10);
    }

    hideUpgradeCardPopUp = () => {
        this.setState({
            upgradeCardSectionPopUp: {
                visible: true,
                opacity: 0,
                translateX: '100vw',
            }
        });

        setTimeout(() => {
            this.setState({
                upgradeCardSectionPopUp: {
                    visible: false,
                    opacity: 0,
                    translateX: '100vw',
                }
            });
        }, nextStepAnimationDuration);
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
        const userCards = await getCurrentUserCards();
        const cards = await cardsFromUserCardsData(userCards);
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
        });
    }

    onNewCardChoose = (event, id, access) => {
        if (!access)
            return;
        const chosenCard = this.state.allCards.filter(card => card.id === id)[0];
        this.setState({
            selectedCard: chosenCard,
        })
    }

    onNewCardSave = async () => {
        const insertCommand = new InsertCardAtPositionCommand(this.props.deck);
        const didSave = insertCommand.execute(this.state.selectedCard, this.state.cardPositionInDeck);
        if (!didSave)
            return;

        const hasUpdated = await updateCurrentUserDeck(this.props.deck.getAsDict())
        if (!hasUpdated) {
            alert("Nie udało się zaktualizować talii");
            insertCommand.rollback();
        }
        this.close();
        this.forceUpdate();
    }

    renderCardChoose = () => {
        return (
            <>
                <Search searchInput={this.state.searchInput} handleSearch={this.handleSearch}/>
                <CardChooseDiv>
                    <Ul>
                        {
                            this.state.allCards.map((card) => {
                                return (
                                    <React.Fragment key={`card-${card.id}`}>
                                        <UserCard id={card.id} name={card.name}
                                                  subject={card.subject}
                                                  tooltip={card.tooltip}
                                                  image={card.image}
                                                  searchInput={this.state.searchInput}
                                                  level={card.level}
                                                  description={card.description}
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

    hoverUpgradeTrue = () => {
        this.setState({upgradePopUpHover: true});
    }

    hoverUpgradeFalse = () => {
        this.setState({upgradePopUpHover: false});
    }

    handleTransUpgradeHide = () => {
        if (!this.state.upgradePopUpHover)
            this.hideUpgradeCardPopUp();
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

    renderFullCardView() {
        if (this.state.fullCardViewPopUp.visible) {
            return (
                <TransBack visible setOpacity={this.state.fullCardViewPopUp.opacity} fullscreen
                           closeHandler={this.hideFulLCardViewPopUp} customZIndex={'5'}>
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
                </TransBack>
            );
        }
    }

    renderUpgradeCardSection() {
        if (this.state.upgradeCardSectionPopUp.visible) {
            return (
                <>
                    <Media query={mobile}>
                        <PopUp visible closeHandler={this.hideUpgradeCardPopUp} setPosition={'fixed'}
                               setAlignment={'center'} setTop={this.props.onPopup ? '8px' : '56px'}
                               setTranslateX={this.state.upgradeCardSectionPopUp.translateX}>
                            <UpgradeCardSection cardId={this.state.selectedCard.id}
                                                cardName={this.state.selectedCard.name}
                                                cardLevel={this.state.selectedCard.level}
                                                cardImage={this.state.selectedCard.image}
                                                cardDescription={this.state.selectedCard.description}
                                                nextLevelCost={this.state.selectedCard.next_level_cost}/>
                        </PopUp>
                    </Media>
                    <Media query={desktop}>
                        <TransBack visible closeHandler={this.handleTransUpgradeHide}
                                   setOpacity={this.state.upgradeCardSectionPopUp.opacity}>
                            <PopUp visible closeHandler={this.hideUpgradeCardPopUp} setPosition={'fixed'}
                                   setAlignment={'center'} setTop={this.props.onPopup ? '8px' : '56px'}
                                   setWidth={'766px'} setHeight={'712px'}
                                   hoverTrue={this.hoverUpgradeTrue} hoverFalse={this.hoverUpgradeFalse}
                                   setTranslateX={this.state.upgradeCardSectionPopUp.translateX}>
                                <UpgradeCardSection cardId={this.state.selectedCard.id}
                                                    cardName={this.state.selectedCard.name}
                                                    cardLevel={this.state.selectedCard.level}
                                                    cardImage={this.state.selectedCard.image}
                                                    cardSubject={this.state.selectedCard.subject}
                                                    cardTooltip={this.state.selectedCard.tooltip}
                                                    cardDescription={this.state.selectedCard.description}
                                                    nextLevelCost={this.state.selectedCard.next_level_cost}/>
                            </PopUp>
                        </TransBack>
                    </Media>
                </>
            );
        }
    }

    render() {
        return (
            <>
                <Media query={mobile}>
                    <>
                        <PopUp visible={true} setTop={this.props.onPopup ? '0' : '56px'}
                               closeHandler={this.close} setPosition={'fixed'}
                               setTranslateY={this.state.setTranslateY}>
                            <ColumnGapContainer setWidth={'100%'} setHeight={'100%'} setPadding={'40px 20px 30px 20px'}
                                                gap={'10px'}>
                                <FlexGapContainer setWidth={'100%'} setPadding={'0px 26px'}
                                                  space={true}>
                                    <CompactCardView setMargin={'0'} cardName={this.state.selectedCard.name}
                                                     cardLevel={this.state.selectedCard.level}
                                                     cardImage={this.state.selectedCard.image}/>
                                    <ColumnGapContainer gap={'10px'}>
                                        <UserInfo label={'Pozycja w talii'} value={this.getInputButton(false)}/>
                                        <ButtonWithIcon icon={eye} handler={this.showFullCardViewPopUp}>
                                            Podgląd
                                        </ButtonWithIcon>
                                        <ButtonWithIcon icon={upgrade} color={theme.colors.yellowyOrangy}
                                                        handler={this.state.selectedCard.next_level_cost
                                                            ? this.showUpgradeCardPopUp : null}
                                                        access={this.state.selectedCard.next_level_cost}>
                                            Ulepsz
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
                        {this.renderFullCardView()}
                        {this.renderUpgradeCardSection()}
                    </>
                </Media>
                <Media query={desktop}>
                    <>
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
                                                      common={this.state.selectedCard.level === 1}
                                                      gold={this.state.selectedCard.level === 2}
                                                      epic={this.state.selectedCard.level === 3}
                                        />
                                        <ColumnGapContainer setHeight={'100%'} setWidth={'300px'}>
                                            <P>Wymień na</P>
                                            {this.renderCardChoose()}
                                        </ColumnGapContainer>
                                    </FlexGapContainer>
                                    <FlexGapContainer gap={'40px'}>
                                        <ButtonWithIcon icon={upgrade} color={theme.colors.yellowyOrangy}
                                                        handler={this.state.selectedCard.next_level_cost
                                                            ? this.showUpgradeCardPopUp : null}
                                                        access={this.state.selectedCard.next_level_cost}>
                                            Ulepsz
                                        </ButtonWithIcon>
                                        <ButtonWithIcon icon={pencilWhite} color={theme.colors.purplyPinky}
                                                        handler={this.onNewCardSave}>
                                            Zapisz
                                        </ButtonWithIcon>
                                    </FlexGapContainer>
                                </ColumnGapContainer>
                            </PopUp>
                        </TransBack>
                        {this.renderUpgradeCardSection()}
                    </>
                </Media>
            </>
        );
    }
}

export default ChangeDeckCard;


