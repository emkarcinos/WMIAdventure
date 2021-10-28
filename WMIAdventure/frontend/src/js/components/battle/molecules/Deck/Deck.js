import React from 'react';
import FlexGapContainer from '../../../global/molecules/FlexGapContainer/FlexGapContainer';
import MainDiv from './styled-components/MainDiv';
import Header from './styled-components/Header';
import Div from './styled-components/Div';
import CompactCardView from '../../../global/atoms/CompactCardView';
import {getCardById} from "../../../../utils/storage/cards/cardStorage";

class Deck extends React.Component {

    state = {
        card1: null,
        card2: null,
        card3: null,
        card4: null,
        card5: null,
    }

    setCardsStateFromDeckProps = () => {
        if (this.props.deck === null || this.props.deck === undefined) return;

        for (const [cardNumber, card] of Object.entries(this.props.deck)) {
            if (card.id === null || card.id === undefined) continue;
            getCardById(card.id)
                .then(respCard => {
                    if (respCard) {
                        this.setState({
                            [cardNumber]: {
                                name: respCard.name,
                                level: card.level,
                                image: respCard.image
                            }
                        });
                    }
                });

        }
    }

    componentDidMount() {
        this.setCardsStateFromDeckProps();
    }

    propsChanged = (prevProps) => {
        if (!prevProps.deck && !this.props.deck) return false;
        if (!prevProps.deck && this.props.deck) return true;

        return (this.props.deck.card1.id !== prevProps.deck.card1.id);
    }

    componentDidUpdate(prevProps) {
        if (this.propsChanged(prevProps))
            this.setCardsStateFromDeckProps();
    }

    cardPropertyHandler = (number, property) => {
        const field = this.state[`card${number}`];
        if (field === null) return;

        return field[`${property}`];
    }


    render() {
        return (
            <MainDiv>
                <Header>
                    Twoja talia
                </Header>
                <Div>
                    <FlexGapContainer gap={'10px'} setMargin={'0 0 10px 0'}>
                        <CompactCardView setWidth={'78px'} setHeight={'126px'} gold setMargin={'0'}
                                         setIconWidth={'48px'} setIconHeight={'48px'} decorationHeight={'16px'}
                                         cardName={this.cardPropertyHandler(1, 'name')}
                                         cardImage={this.cardPropertyHandler(1, 'image')}
                                         cardLevel={this.cardPropertyHandler(1, 'level')}
                                         setIconMarginBottom={'8px'} shadow/>
                        <CompactCardView setWidth={'78px'} setHeight={'126px'} common setMargin={'0'}
                                         setIconWidth={'48px'} setIconHeight={'48px'} decorationHeight={'16px'}
                                         cardName={this.cardPropertyHandler(2, 'name')}
                                         cardImage={this.cardPropertyHandler(2, 'image')}
                                         cardLevel={this.cardPropertyHandler(2, 'level')}
                                         setIconMarginBottom={'8px'} shadow/>
                        <CompactCardView setWidth={'78px'} setHeight={'126px'} gold setMargin={'0'}
                                         setIconWidth={'48px'} setIconHeight={'48px'} decorationHeight={'16px'}
                                         cardName={this.cardPropertyHandler(3, 'name')}
                                         cardImage={this.cardPropertyHandler(3, 'image')}
                                         cardLevel={this.cardPropertyHandler(3, 'level')}
                                         setIconMarginBottom={'8px'} shadow/>
                    </FlexGapContainer>
                    <FlexGapContainer gap={'10px'} setMargin={'0'}>
                        <CompactCardView setWidth={'78px'} setHeight={'126px'} common setMargin={'0'}
                                         setIconWidth={'48px'} setIconHeight={'48px'} decorationHeight={'16px'}
                                         cardName={this.cardPropertyHandler(4, 'name')}
                                         cardImage={this.cardPropertyHandler(4, 'image')}
                                         cardLevel={this.cardPropertyHandler(4, 'level')}
                                         setIconMarginBottom={'8px'} shadow/>
                        <CompactCardView setWidth={'78px'} setHeight={'126px'} epic setMargin={'0'}
                                         setIconWidth={'48px'} setIconHeight={'48px'} decorationHeight={'16px'}
                                         cardName={this.cardPropertyHandler(5, 'name')}
                                         cardImage={this.cardPropertyHandler(5, 'image')}
                                         cardLevel={this.cardPropertyHandler(5, 'level')}
                                         setIconMarginBottom={'8px'} shadow/>
                    </FlexGapContainer>
                </Div>
            </MainDiv>
        );
    }
}

export default Deck;