import React from 'react';
import Div from './styled-components/Div';
import H3 from './styled-components/H3';
import Back from './styled-components/Back';
import P from './styled-components/P';
import CardPreview from '../../atoms/CardPreview';

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
        console.log('wykonuje sie');
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
    }

    refreshPage = (event) => {
        event.preventDefault();
        window.location.reload();
    }

    render() {
        return (
            <Div>
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
            </Div>
        );
    }
}

export default BattleResult;