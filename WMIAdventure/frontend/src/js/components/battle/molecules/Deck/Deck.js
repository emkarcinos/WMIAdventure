import React from 'react';
import FlexGapContainer from '../../../global/molecules/FlexGapContainer/FlexGapContainer';
import MainDiv from './styled-components/MainDiv';
import Header from './styled-components/Header';
import Div from './styled-components/Div';
import CompactCardView from '../../../global/atoms/CompactCardView';
import ChangeDeckCard from "../../../profile/organisms/ChangeDeckCard";

class Deck extends React.Component {
    state = {
        editorVisible: false,
    }

    renderCompactCardIdx(idx) {
        const card = this.props.deck.cards[idx];
        return (
            <CompactCardView setWidth={'90px'} setHeight={'150px'} setMargin={'0'}
                             setIconWidth={'48px'} setIconHeight={'48px'} decorationHeight={'16px'}
                             cardName={card.name} cardImage={card.image} cardLevel={card.level}
                             setIconMarginBottom={'16px'} shadow onClick={() => this.setEditorVisible(card)}/>
        )
    }

    setEditorVisible = (card) => {
        this.props.deck.setCurrentlyEditingCard(card);
        this.setState({editorVisible: true});
    }

    closeEditor = () => {
        this.setState({editorVisible: false});
    }

    renderEditComponent = () => {
        if (!this.state.editorVisible)
            return;

        return (
            <>
                <ChangeDeckCard closeHandler={this.closeEditor} deck={this.props.deck} onPopup/>
            </>
        )
    }

    render() {
        return (
            <MainDiv>
                <Header>
                    Twoja talia
                </Header>
                <Div>
                    <FlexGapContainer gap={'10px'} setMargin={'0 0 10px 0'}>
                        {this.renderCompactCardIdx(0)}
                        {this.renderCompactCardIdx(1)}
                        {this.renderCompactCardIdx(2)}
                    </FlexGapContainer>
                    <FlexGapContainer gap={'10px'} setMargin={'0'}>
                        {this.renderCompactCardIdx(3)}
                        {this.renderCompactCardIdx(4)}
                    </FlexGapContainer>
                </Div>
                {this.renderEditComponent()}
            </MainDiv>
        );
    }
}

export default Deck;