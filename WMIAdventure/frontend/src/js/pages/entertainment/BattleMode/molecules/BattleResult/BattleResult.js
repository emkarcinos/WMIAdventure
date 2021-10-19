import React from 'react';
import Wrapper from './styled-components/Wrapper';
import H3 from './styled-components/H3';
import Back from './styled-components/Back';
import P from './styled-components/P';
import CardPreview from '../../atoms/CardPreview';
import CardsDiv from './styled-components/CardsDiv';
import Pcard from './styled-components/Pcard';
import DeckDiv from './styled-components/DeckDiv';
import Result from './styled-components/Result';
import CardsAPIGateway from "../../../../../api/gateways/CardsAPIGateway";
import BattleAPIGateway from "../../../../../api/gateways/BattleAPIGateway";

class BattleResult extends React.Component {

    state = {
        cards: [],
        userCard1: {},
        userCard2: {},
        userCard3: {},
        userCard4: {},
        userCard5: {},

        enemyCard1: {},
        enemyCard2: {},
        enemyCard3: {},
        enemyCard4: {},
        enemyCard5: {},

        battleResult: {},
    }

    componentDidMount() {
        CardsAPIGateway.getAllCards()
            .then(data => this.setState({cards: data}))
            .catch(error => console.log(error));

        // http://wmiadventure.westeurope.cloudapp.azure.com:8000/api/battle/14/

        BattleAPIGateway.fightWithUser(this.props.opponentId)
            .then(data => this.setState({battleResult: data}))
            .catch(error => console.log(error));
    }

    componentWillReceiveProps(nextProps) {
        try {
            for(let i=0; i<this.state.cards.length; i++) {
                if(nextProps.defenderDecks.user_decks[0].card1.id === this.state.cards[i].id) {
                    this.setState({
                        enemyCard1: {
                            name: this.state.cards[i].name,
                            subject: this.state.cards[i].subject,
                            tooltip: this.state.cards[i].tooltip,
                        }
                    });
                }
                if(nextProps.defenderDecks.user_decks[0].card2.id === this.state.cards[i].id) {
                    this.setState({
                        enemyCard2: {
                            name: this.state.cards[i].name,
                            subject: this.state.cards[i].subject,
                            tooltip: this.state.cards[i].tooltip,
                        }
                    });
                }
                if(nextProps.defenderDecks.user_decks[0].card3.id === this.state.cards[i].id) {
                    this.setState({
                        enemyCard3: {
                            name: this.state.cards[i].name,
                            subject: this.state.cards[i].subject,
                            tooltip: this.state.cards[i].tooltip,
                        }
                    });
                }
                if(nextProps.defenderDecks.user_decks[0].card4.id === this.state.cards[i].id) {
                    this.setState({
                        enemyCard4: {
                            name: this.state.cards[i].name,
                            subject: this.state.cards[i].subject,
                            tooltip: this.state.cards[i].tooltip,
                        }
                    });
                }
                if(nextProps.defenderDecks.user_decks[0].card5.id === this.state.cards[i].id) {
                    this.setState({
                        enemyCard5: {
                            name: this.state.cards[i].name,
                            subject: this.state.cards[i].subject,
                            tooltip: this.state.cards[i].tooltip,
                        }
                    });
                }
                if(nextProps.currentUserDecks.user_decks[0].card1.id === this.state.cards[i].id) {
                    this.setState({
                        userCard1: {
                            name: this.state.cards[i].name,
                            subject: this.state.cards[i].subject,
                            tooltip: this.state.cards[i].tooltip,
                        }
                    });
                }
                if(nextProps.currentUserDecks.user_decks[0].card2.id === this.state.cards[i].id) {
                    this.setState({
                        userCard2: {
                            name: this.state.cards[i].name,
                            subject: this.state.cards[i].subject,
                            tooltip: this.state.cards[i].tooltip,
                        }
                    });
                }
                if(nextProps.currentUserDecks.user_decks[0].card3.id === this.state.cards[i].id) {
                    this.setState({
                        userCard3: {
                            name: this.state.cards[i].name,
                            subject: this.state.cards[i].subject,
                            tooltip: this.state.cards[i].tooltip,
                        }
                    });
                }
                if(nextProps.currentUserDecks.user_decks[0].card4.id === this.state.cards[i].id) {
                    this.setState({
                        userCard4: {
                            name: this.state.cards[i].name,
                            subject: this.state.cards[i].subject,
                            tooltip: this.state.cards[i].tooltip,
                        }
                    });
                }
                if(nextProps.currentUserDecks.user_decks[0].card5.id === this.state.cards[i].id) {
                    this.setState({
                        userCard5: {
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
                        <P blue>
                            Walka!
                        </P>
                        {
                            this.state.battleResult.winner === 15 &&
                            <>
                                <Result win>
                                    Zwycięstwo!
                                </Result>
                                <P>
                                    Nasze pozostałe HP: {this.state.battleResult.attacker.statistics.hp}
                                </P>
                                <P>
                                    Pozostałe HP przeciwnika: {this.state.battleResult.defender.statistics.hp}
                                </P>
                            </>
                        }
                        {
                            this.state.battleResult.winner === this.props.opponentId &&
                            <>
                                <Result win={false}>
                                    Porażka!
                                </Result>
                                <P>
                                    Nasze pozostałe HP: {this.state.battleResult.attacker.statistics.hp}
                                </P>
                                <P>
                                    Pozostałe HP przeciwnika: {this.state.battleResult.defender.statistics.hp}
                                </P>
                            </>
                        }
                        <CardsDiv>
                            <Pcard hide>
                                Nasza talia
                            </Pcard>
                            <DeckDiv>
                                <Pcard hide1200>
                                    Nasza talia
                                </Pcard>
                                <CardPreview
                                    name={this.state.userCard1.name}
                                    subject={this.state.userCard1.subject}
                                    tooltip={this.state.userCard1.tooltip} />
                                <CardPreview
                                    name={this.state.userCard2.name}
                                    subject={this.state.userCard2.subject}
                                    tooltip={this.state.userCard2.tooltip} />
                                <CardPreview
                                    name={this.state.userCard3.name}
                                    subject={this.state.userCard3.subject}
                                    tooltip={this.state.userCard3.tooltip} />
                                <CardPreview
                                    name={this.state.userCard4.name}
                                    subject={this.state.userCard4.subject}
                                    tooltip={this.state.userCard4.tooltip} />
                                <CardPreview
                                    name={this.state.userCard5.name}
                                    subject={this.state.userCard5.subject}
                                    tooltip={this.state.userCard5.tooltip} />
                            </DeckDiv>
                            <Pcard hide>
                                Talia przeciwnika
                            </Pcard>
                            <DeckDiv>
                                <Pcard hide1200>
                                    Talia przeciwnika
                                </Pcard>
                                <CardPreview
                                    name={this.state.enemyCard1.name}
                                    subject={this.state.enemyCard1.subject}
                                    tooltip={this.state.enemyCard1.tooltip} />
                                <CardPreview
                                    name={this.state.enemyCard2.name}
                                    subject={this.state.enemyCard2.subject}
                                    tooltip={this.state.enemyCard2.tooltip} />
                                <CardPreview
                                    name={this.state.enemyCard3.name}
                                    subject={this.state.enemyCard3.subject}
                                    tooltip={this.state.enemyCard3.tooltip} />
                                <CardPreview
                                    name={this.state.enemyCard4.name}
                                    subject={this.state.enemyCard4.subject}
                                    tooltip={this.state.enemyCard4.tooltip} />
                                <CardPreview
                                    name={this.state.enemyCard5.name}
                                    subject={this.state.enemyCard5.subject}
                                    tooltip={this.state.enemyCard5.tooltip} />
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