import React from 'react';
import ColumnGapContainer from "../../../global/molecules/ColumnGapContainer";
import FlexGapContainer from "../../../global/molecules/FlexGapContainer/FlexGapContainer";
import MiniCard from "../MiniCard";
import Media from "react-media";
import {desktop, mobile} from "../../../../utils/globals";
import DesktopDeckContainer from "./styled-components/DesktopDeckContainer";
import CompactCardView from "../../../global/atoms/CompactCardView";


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

    renderCardNumberDesktop = (number) => {
        const card = this.getCardByNumber(number);
        return (
            <CompactCardView cardName={card.name} setWidth={'126px'}
                             cardImage={card.image} setHeight={'200px'}
                             cardLevel={card.level} setMargin={'0'} shadow/>
        );
    }

    render() {
        return (
            <>
                <Media query={mobile}>
                    <ColumnGapContainer gap={'16px'} setMargin={'4px 0'}>
                        <DesktopDeckContainer>
                            <FlexGapContainer gap={'16px'}>
                                {this.renderCardNumber(1)}
                                {this.renderCardNumber(2)}
                                {this.renderCardNumber(3)}
                            </FlexGapContainer>
                            <FlexGapContainer gap={'16px'}>
                                {this.renderCardNumber(4)}
                                {this.renderCardNumber(5)}
                            </FlexGapContainer>
                        </DesktopDeckContainer>
                    </ColumnGapContainer>
                </Media>

                <Media query={desktop}>
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
                    </DesktopDeckContainer>
                </Media>
            </>
        );
    }
}

export default MyDeck;