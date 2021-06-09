import React from 'react';
import Wrapper from './styled-components/Wrapper';
import H3 from './styled-components/H3';
import Back from './styled-components/Back';
import P from './styled-components/P';
import CardPreview from '../../atoms/CardPreview';
import CardsDiv from './styled-components/CardsDiv';
import Pcard from './styled-components/Pcard';
import DeckDiv from './styled-components/DeckDiv';

class BattleResult extends React.Component {

    state = {
        cards: [],
        card1: {},
        card2: {},
        card3: {},
        card4: {},
        card5: {},
    }

    componentDidMount() {
        const API = process.env['REACT_APP_API_URL'];
        fetch(`http://${API}/api/cards/`)
            .then(response => {
                return response.json();
            })
            .then(data => this.setState({cards: data}))
            .catch(error => console.log(error));
    }

    componentWillReceiveProps(nextProps) {
        try {
            for(let i=0; i<this.state.cards.length; i++) {
                if(nextProps.defenderDecks.user_decks[0].card1.id === this.state.cards[i].id) {
                    this.setState({
                        card1: {
                            name: this.state.cards[i].name,
                            subject: this.state.cards[i].subject,
                            tooltip: this.state.cards[i].tooltip,
                        }
                    });
                }
                if(nextProps.defenderDecks.user_decks[0].card2.id === this.state.cards[i].id) {
                    this.setState({
                        card2: {
                            name: this.state.cards[i].name,
                            subject: this.state.cards[i].subject,
                            tooltip: this.state.cards[i].tooltip,
                        }
                    });
                }
                if(nextProps.defenderDecks.user_decks[0].card3.id === this.state.cards[i].id) {
                    this.setState({
                        card3: {
                            name: this.state.cards[i].name,
                            subject: this.state.cards[i].subject,
                            tooltip: this.state.cards[i].tooltip,
                        }
                    });
                }
                if(nextProps.defenderDecks.user_decks[0].card4.id === this.state.cards[i].id) {
                    this.setState({
                        card4: {
                            name: this.state.cards[i].name,
                            subject: this.state.cards[i].subject,
                            tooltip: this.state.cards[i].tooltip,
                        }
                    });
                }
                if(nextProps.defenderDecks.user_decks[0].card5.id === this.state.cards[i].id) {
                    this.setState({
                        card5: {
                            name: this.state.cards[i].name,
                            subject: this.state.cards[i].subject,
                            tooltip: this.state.cards[i].tooltip,
                        }
                    });
                }
            }
        } catch (e) {
            console.log(e);
        }
    }

    refreshPage = (event) => {
        event.preventDefault();
        window.location.reload();
    }

    render() {
        return (
            <Wrapper>
                <H3>
                  Walka z użytkownikiem o ID: {this.props.opponentId}
                </H3>
                {
                    this.props.defenderDecks.user_decks &&
                    this.props.defenderDecks.user_decks.length === 0 &&
                    <P red>
                        Nie można walczyć z tym graczem, bo nie posiada talii
                    </P>
                }
                {
                    this.props.defenderDecks.user_decks &&
                    this.props.defenderDecks.user_decks.length !== 0
                    && this.props.opponentId !== 15 &&
                    <>
                        <P green>
                            Walka!
                        </P>
                        <CardsDiv>
                            <Pcard hide>
                                Nasza talia
                            </Pcard>
                            <DeckDiv>
                                <Pcard hide1200>
                                    Nasza talia
                                </Pcard>
                                <CardPreview
                                    name={this.state.card1.name}
                                    subject={this.state.card1.subject}
                                    tooltip={this.state.card1.tooltip} />
                                <CardPreview
                                    name={this.state.card2.name}
                                    subject={this.state.card2.subject}
                                    tooltip={this.state.card2.tooltip} />
                                <CardPreview
                                    name={this.state.card3.name}
                                    subject={this.state.card3.subject}
                                    tooltip={this.state.card3.tooltip} />
                                <CardPreview
                                    name={this.state.card4.name}
                                    subject={this.state.card4.subject}
                                    tooltip={this.state.card4.tooltip} />
                                <CardPreview
                                    name={this.state.card5.name}
                                    subject={this.state.card5.subject}
                                    tooltip={this.state.card5.tooltip} />
                            </DeckDiv>
                            <Pcard hide>
                                Talia przeciwnika
                            </Pcard>
                            <DeckDiv>
                                <Pcard hide1200>
                                    Talia przeciwnika
                                </Pcard>
                                <CardPreview
                                    name={this.state.card1.name}
                                    subject={this.state.card1.subject}
                                    tooltip={this.state.card1.tooltip} />
                                <CardPreview
                                    name={this.state.card2.name}
                                    subject={this.state.card2.subject}
                                    tooltip={this.state.card2.tooltip} />
                                <CardPreview
                                    name={this.state.card3.name}
                                    subject={this.state.card3.subject}
                                    tooltip={this.state.card3.tooltip} />
                                <CardPreview
                                    name={this.state.card4.name}
                                    subject={this.state.card4.subject}
                                    tooltip={this.state.card4.tooltip} />
                                <CardPreview
                                    name={this.state.card5.name}
                                    subject={this.state.card5.subject}
                                    tooltip={this.state.card5.tooltip} />
                            </DeckDiv>
                        </CardsDiv>
                    </>

                }
                {
                    this.props.opponentId === 15 &&
                    <P red>
                        Użytkownik nie może walczyć sam ze sobą
                    </P>
                }
                <Back onClick={this.refreshPage}>
                    Powrót
                </Back>
            </Wrapper>
        );
    }
}

export default BattleResult;