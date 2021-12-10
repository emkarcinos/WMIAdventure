import React from 'react';
import ColumnGapContainer from "../../../global/molecules/ColumnGapContainer";
import FlexGapContainer from "../../../global/molecules/FlexGapContainer/FlexGapContainer";
import Media from "react-media";
import {desktop, mobile} from "../../../../utils/globals";
import DesktopDeckContainer from "./styled-components/DesktopDeckContainer";
import CompactCardView from "../../../global/atoms/CompactCardView";
import Header from "./styled-components/Header";
import FullCardView from "../../../global/atoms/FullCardView";
import ChangeDeckCard from "../../molecules/ChangeDeckCard";
import MiniCard from "../../atoms/MiniCard";

class MyDeck extends React.Component {
    nullCard = {
        id: 0,
        level: 1,
        name: '',
        subject: '',
        tooltip: '',
        image: null
    }
    state = {
        editorVisible: true,
    }

    componentDidMount() {
        this.setState({editorVisible: false})
    }

    getCardByNumber = (number) => {
        if (!this.props.deck.cards)
            return this.nullCard;

        const card = this.props.deck.cards[number - 1];
        if (!card)
            return this.nullCard

        return card
    }


    renderEditComponent = () => {
        if (!this.state.editorVisible)
            return;

        return (
            <>
                <ChangeDeckCard selectedCard={this.state.selectedCard} closeHandler={this.closeEditor}
                                deck={this.props.deck}/>
            </>
        )
    }

    setEditorVisible = (card) => {
        this.props.deck.setCurrentlyEditingCard(card);
        this.setState({editorVisible: true});
    }

    closeEditor = () => {
        this.setState({editorVisible: false});
    }
    renderCardNumber = (number) => {
        const card = this.getCardByNumber(number);
        const borderDown = (number > 3);
        return (
            <MiniCard icon={card.image} level={card.level} borderDown={borderDown}
                      onClick={() => this.setEditorVisible(card)}/>
        );
    }

    renderCardNumberDesktop = (number) => {
        const card = this.getCardByNumber(number);
        return (
            <CompactCardView cardName={card.name} setWidth={'126px'}
                             cardImage={card.image} setHeight={'200px'}
                             cardLevel={card.level} setMargin={'0'} shadow
                             onClick={() => this.setEditorVisible(card)}/>
        );
    }

    renderCardNumberLargeDesktop = (number) => {
        const card = this.getCardByNumber(number);
        return (
            <FullCardView cardName={card.name} cardSubject={card.subject}
                          cardImage={card.image} cardTooltip={card.tooltip}
                          description={card.description} setWidth={'258px'} setHeight={'456px'}
                          common={card.level === 1} gold={card.level === 2} epic={card.level === 3}
                          setMargin={'0'} shadow
                          onClick={() => this.setEditorVisible(card)}/>
        );
    }

    render() {
        return (
            <>
                <Media query={mobile}>
                    <ColumnGapContainer as={'section'} gap={'16px'} setMargin={'4px 0'}>
                        <Header>
                            Twoja Talia
                        </Header>

                        <FlexGapContainer gap={'16px'}>
                            {this.renderCardNumber(1)}
                            {this.renderCardNumber(2)}
                            {this.renderCardNumber(3)}
                        </FlexGapContainer>
                        <FlexGapContainer gap={'16px'}>
                            {this.renderCardNumber(4)}
                            {this.renderCardNumber(5)}
                        </FlexGapContainer>
                        {this.renderEditComponent()}
                    </ColumnGapContainer>
                </Media>

                <Media query={`${desktop} and (max-width: 1800px)`}>
                    <DesktopDeckContainer>
                        <ColumnGapContainer gap={'16px'}>
                            <FlexGapContainer gap={'16px'}>
                                {this.renderCardNumberDesktop(1)}
                                {this.renderCardNumberDesktop(2)}
                                {this.renderCardNumberDesktop(3)}
                            </FlexGapContainer>
                            <FlexGapContainer gap={'16px'}>
                                {this.renderCardNumberDesktop(4)}
                                {this.renderCardNumberDesktop(5)}
                            </FlexGapContainer>
                        </ColumnGapContainer>
                        {this.renderEditComponent()}
                    </DesktopDeckContainer>
                </Media>

                <Media query={'(min-width: 1800px)'}>
                    <DesktopDeckContainer>
                        <ColumnGapContainer gap={'16px'}>
                            <FlexGapContainer gap={'16px'}>
                                {this.renderCardNumberLargeDesktop(1)}
                                {this.renderCardNumberLargeDesktop(2)}
                                {this.renderCardNumberLargeDesktop(3)}
                                {this.renderCardNumberLargeDesktop(4)}
                                {this.renderCardNumberLargeDesktop(5)}
                            </FlexGapContainer>
                        </ColumnGapContainer>
                        {this.renderEditComponent()}
                    </DesktopDeckContainer>
                </Media>
            </>
        );
    }
}

export default MyDeck;