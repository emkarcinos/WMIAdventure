import React from 'react';
import FlexGapContainer from '../../../global/molecules/FlexGapContainer/FlexGapContainer';
import MainDiv from './styled-components/MainDiv';
import Header from './styled-components/Header';
import Div from './styled-components/Div';
import CompactCardView from '../../../global/atoms/CompactCardView';

class Deck extends React.Component {
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
                                         cardName={'C++'} setIconMarginBottom={'8px'} shadow />
                        <CompactCardView setWidth={'78px'} setHeight={'126px'} common setMargin={'0'} shadow
                                         setIconWidth={'48px'} setIconHeight={'48px'} ownFontSize={'12px'}
                                         cardName={'Python'} setIconMarginBottom={'8px'} decorationHeight={'16px'} />
                        <CompactCardView setWidth={'78px'} setHeight={'126px'} gold setMargin={'0'} decorationHeight={'16px'}
                                         setIconWidth={'48px'} setIconHeight={'48px'} ownFontSize={'12px'}
                                         cardName={'Dowód Indukcyjny'} setIconMarginBottom={'8px'} shadow />
                    </FlexGapContainer>
                    <FlexGapContainer gap={'10px'} setMargin={'0'}>
                        <CompactCardView setWidth={'78px'} setHeight={'126px'} common setMargin={'0'} shadow
                                         setIconWidth={'48px'} setIconHeight={'48px'} decorationHeight={'16px'}
                                         cardName={'Sudo'} setIconMarginBottom={'8px'} />
                        <CompactCardView setWidth={'78px'} setHeight={'126px'} epic setMargin={'0'} decorationHeight={'16px'}
                                         setIconWidth={'48px'} setIconHeight={'48px'} ownFontSize={'12px'}
                                         cardName={'Cormen'} setIconMarginBottom={'8px'} shadow />
                    </FlexGapContainer>
                </Div>
            </MainDiv>
        );
    }
}

export default Deck;