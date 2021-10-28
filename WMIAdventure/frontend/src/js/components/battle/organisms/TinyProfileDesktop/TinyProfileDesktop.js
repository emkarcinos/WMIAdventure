import React from 'react';
import Div from './styled-components/Div';
import TinyUserProfile from '../../molecules/TinyUserProfile';
import ColumnGapContainer from '../../../global/molecules/ColumnGapContainer';
import FlexGapContainer from '../../../global/molecules/FlexGapContainer/FlexGapContainer';
import UserInfo from '../../atoms/UserInfo';
import CompactCardView from '../../../global/atoms/CompactCardView';
import Container from './styled-components/Container';
import {getCardById} from "../../../../utils/storage/cards/cardStorage";
import {getUsersDecks} from "../../../../utils/userData";

class TinyProfileDesktop extends React.Component {
    placeholderCard = {
        name: '423434',
        level: 1,
        image: null
    }

    constructor(props) {
        super(props);
        this.state = {
            userId: null,
            card1: this.placeholderCard,
            card2: this.placeholderCard,
            card3: this.placeholderCard,
            card4: this.placeholderCard,
            card5: this.placeholderCard,
            fetchedCards: false
        }
    }

    setCards = () => {
        if (this.state.userDeck === null || this.state.userDeck === undefined) return;

        for (const [cardNumber, card] of Object.entries(this.state.userDeck)) {
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

    getCards = () => {
        if (!this.props.userId) return;
        getUsersDecks(this.props.userId)
            .then(deck => {
                if (!deck) return;
                const attackerDeck = deck[0];

                for (const [cardNumber, card] of Object.entries(attackerDeck)) {
                    if (card.id === null || card.id === undefined) continue;
                    getCardById(card.id)
                        .then(respCard => {
                            if (respCard) {
                                this.setState({
                                    [cardNumber]: {
                                        name: respCard.name,
                                        level: card.level,
                                        image: respCard.image
                                    },
                                    fetchedCards: true
                                });

                            }
                        });
                }
            });
    }

    componentDidMount() {
        this.getCards()
    }

    componentDidUpdate() {
        if (this.props.userId && !this.state.fetchedCards)
            this.getCards()
    }

    render() {
        const deckSize = 5;
        return (
            <Div>
                <Container gap={'24px'}>
                    <TinyUserProfile displayedUsername={this.props.username}
                                     term={7} level={50} rank={2} avatar={null}/>

                    <ColumnGapContainer gap={'10px'}>
                        <FlexGapContainer gap={'52px'}>
                            <UserInfo label={'Wygrane'} value={'24'}/>
                            <UserInfo label={'Przegrane'} value={'24'}/>
                        </FlexGapContainer>
                        <UserInfo label={'Ratio'} value={'50%'}/>
                    </ColumnGapContainer>
                </Container>
                <FlexGapContainer gap={'16px'}>
                    {Array.from({length: deckSize}, (_, i) => i + 1).map(
                        i => {
                            return (
                                <CompactCardView key={`compactCard-${i}`}
                                                 cardName={this.state[`card${i}`].name}
                                                 cardImage={this.state[`card${i}`].image}
                                                 cardLevel={this.state[`card${i}`].image}
                                                 setWidth={'90px'} setHeight={'150px'} common
                                                 setMargin={'0'} ownFontSize={'20px'}
                                                 setIconWidth={'60px'} setIconHeight={'60px'}
                                                 decorationHeight={'18px'}/>
                            );
                        }
                    )}
                </FlexGapContainer>
            </Div>
        );
    }
}

export default TinyProfileDesktop;