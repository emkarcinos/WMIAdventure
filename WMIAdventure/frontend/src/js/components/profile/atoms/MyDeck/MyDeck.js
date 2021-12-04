import React from 'react';
import ColumnGapContainer from "../../../global/molecules/ColumnGapContainer";
import Header from "./styled-components/Header";
import FlexGapContainer from "../../../global/molecules/FlexGapContainer/FlexGapContainer";
import MiniCard from "../MiniCard";


class MyDeck extends React.Component {

    nullCard = {
        id: 0,
        level: 1,
        name: '',
        subject: '',
        tooltip: '',
        image: null
    }

    getCardByNumber = (number) => {
        if (!this.props.cards)
            return this.nullCard;

        const card = this.props.cards[number - 1];
        if (!card)
            return this.nullCard

        return card
    }

    renderCardNumber = (number) => {
        const card = this.getCardByNumber(number);
        const borderDown = (number <= 3);
        return (
            <MiniCard icon={card.image} level={card.level} borderDown={borderDown}/>
        );
    }

    render() {
        return (
            <ColumnGapContainer gap={'16px'} setMargin={'4px 0'}>
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
            </ColumnGapContainer>
        );
    }
}

export default MyDeck;