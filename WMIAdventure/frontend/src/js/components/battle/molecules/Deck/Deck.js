import React from 'react';
import FlexGapContainer from '../../../global/molecules/FlexGapContainer/FlexGapContainer';
import MainDiv from './styled-components/MainDiv';
import Header from './styled-components/Header';
import Div from './styled-components/Div';
import CompactCardView from '../../../global/atoms/CompactCardView';

class Deck extends React.Component {

    state = {
        card1 : null,
        card2 : null,
        card3 : null,
        card4 : null,
        card5 : null,
    }


    componentDidUpdate() {
        if(this.props.deck === null) return;

        // We only update the state if it wasn't set
        if(this.state.card1 === null) {
            this.setState({
                card1: this.props.deck.card1,
                card2: this.props.deck.card2,
                card3: this.props.deck.card3,
                card4: this.props.deck.card4,
                card5: this.props.deck.card5,
            });
        }
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
                                         card={this.state.card1}
                                         setIconMarginBottom={'8px'} shadow />
                        <CompactCardView setWidth={'78px'} setHeight={'126px'} common setMargin={'0'}
                                         setIconWidth={'48px'} setIconHeight={'48px'} decorationHeight={'16px'}
                                         card={this.state.card2}
                                         setIconMarginBottom={'8px'} shadow />
                        <CompactCardView setWidth={'78px'} setHeight={'126px'} gold setMargin={'0'}
                                         setIconWidth={'48px'} setIconHeight={'48px'} decorationHeight={'16px'}
                                         card={this.state.card3}
                                         setIconMarginBottom={'8px'} shadow />
                    </FlexGapContainer>
                    <FlexGapContainer gap={'10px'} setMargin={'0'}>
                        <CompactCardView setWidth={'78px'} setHeight={'126px'} common setMargin={'0'}
                                         setIconWidth={'48px'} setIconHeight={'48px'} decorationHeight={'16px'}
                                         card={this.state.card4}
                                         setIconMarginBottom={'8px'} shadow />
                        <CompactCardView setWidth={'78px'} setHeight={'126px'} epic setMargin={'0'}
                                         setIconWidth={'48px'} setIconHeight={'48px'} decorationHeight={'16px'}
                                         card={this.state.card5}
                                         setIconMarginBottom={'8px'} shadow />
                    </FlexGapContainer>
                </Div>
            </MainDiv>
        );
    }
}

export default Deck;