import React from 'react';
import Div from './styled-components/Div';
import TinyUserProfile from '../../molecules/TinyUserProfile';
import ColumnGapContainer from '../../../global/molecules/ColumnGapContainer';
import FlexGapContainer from '../../../global/molecules/FlexGapContainer/FlexGapContainer';
import CompactCardView from '../../../global/atoms/CompactCardView';
import Container from './styled-components/Container';
import {getCurrentUserDecks} from "../../../../storage/user/userData";
import UserInfo from "../../../global/atoms/UserInfo";
import {EditableDeck, nullEditableDeck} from "../../../../api/data-models/battle/EditableDeck";
import {cardsFromDeckData} from "../../../../api/data-models/battle/Card";
import P from "./styled-components/P";
import ChangeDeckCard from "../../../profile/organisms/ChangeDeckCard";

class TinyProfileDesktop extends React.Component {
    state = {
        editorVisible: false,
        deck: nullEditableDeck(),
    }

    async getDeck() {
        const data = await getCurrentUserDecks();
        if (!data)
            return;

        const userSpecificCards = await cardsFromDeckData(data);
        this.setState({deck: new EditableDeck(userSpecificCards)});
    }

    componentDidMount() {
        this.getDeck()
    }

    setEditorVisible = (card) => {
        this.state.deck.setCurrentlyEditingCard(card);
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
                <ChangeDeckCard closeHandler={this.closeEditor} deck={this.state.deck}/>
            </>
        )
    }

    renderDeck() {
        let key = 1;
        const components = []
        for (const card of this.state.deck.cards) {
            components.push(
                <CompactCardView key={`compactCard-${key}`}
                                 cardName={card.name}
                                 cardImage={card.image}
                                 cardLevel={card.level}
                                 setWidth={'90px'} setHeight={'150px'}
                                 setMargin={'0'} ownFontSize={'20px'}
                                 setIconWidth={'60px'} setIconHeight={'60px'}
                                 decorationHeight={'18px'}
                                 onClick={() => this.setEditorVisible(card)}/>
            );
            key++;
        }
        return (<>{components}</>);
    }

    render() {
        return (
            <Div>
                <Container gap={'24px'}>
                    <TinyUserProfile displayedUsername={this.props.username}
                                     term={7} level={50} rank={2} avatar={this.props.avatar}/>

                    <ColumnGapContainer gap={'10px'}>
                        <FlexGapContainer gap={'52px'}>
                            <UserInfo label={'Wygrane'} value={'24'}/>
                            <UserInfo label={'Przegrane'} value={'24'}/>
                        </FlexGapContainer>
                        <UserInfo label={'Ratio'} value={'50%'}/>
                    </ColumnGapContainer>
                </Container>
                <FlexGapContainer gap={'16px'}>
                    {this.renderDeck()}
                </FlexGapContainer>

                <P>Klinkij na kartę aby zmodyfikować talię</P>
                {this.renderEditComponent()}
            </Div>
        );
    }
}

export default TinyProfileDesktop;