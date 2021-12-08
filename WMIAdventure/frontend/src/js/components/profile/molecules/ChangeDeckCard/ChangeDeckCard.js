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
            image: null
        },
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
        setTimeout(() => this.setState({setTranslateY: '0'}), 1);
        this.setState({selectedCard: this.props.deck.getCurrentlyEditingCard()})
    }


    onNewCardChoose = (event, id, name, subject, tooltip, image) => {
        this.setState({
            selectedCard: {
                id: id,
                level: 1,
                name: name,
                subject: subject,
                tooltip: tooltip,
                image: image,
            }
        })
    }

    onNewCardSave = () => {
        const selectedCard = this.state.selectedCard;
        const newCard = new ModelCard(selectedCard.id, 1);
        newCard.name = selectedCard.name;
        newCard.subject = selectedCard.subject;
        newCard.tooltip = selectedCard.tooltip;
        newCard.image = selectedCard.image;
        const didSave = this.props.deck.tryToOverrideCurrentlyEditingCard(newCard);
        if (!didSave)
            alert("Już jest w decku");
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

    getInputButton = () => {
        return (
            <InputWithIcon width={'20px'} type={'number'} min={'1'} max={'5'} icon={pencilGrey}/>
        )
    }

    close = () => {
        this.setState({setTranslateY: '100vh'});
        setTimeout(this.props.closeHandler, 300);
    }

    render() {
        return (
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
                                <UserInfo label={'Pozycja w talii'} value={this.getInputButton()}/>
                                <ButtonWithIcon icon={eye}>
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
            </>
        );
    }
}

export default ChangeDeckCard;