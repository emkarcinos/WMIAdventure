import React from 'react';
import Div from './styled-components/Div';
import H3 from './styled-components/H3';
import Back from './styled-components/Back';
import P from './styled-components/P';
import CardPreview from '../../atoms/CardPreview';

class BattleResult extends React.Component {

    refreshPage = (event) => {
        event.preventDefault();
        window.location.reload();
    }

    render() {
        console.log(this.props.defenderDecks);
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
                            name='Quick sort'
                            subject='Algorytmy i Struktury Danych'
                            tooltip='Zadaje 25 obrażeń, i zmienia losowo kolejność naszych kart.' />
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