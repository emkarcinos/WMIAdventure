import React from 'react';
import Div from './styled-components/Div';
import P from './styled-components/P';
import Back from './styled-components/Back';

class BattleResult extends React.Component {

    refreshPage = (event) => {
        event.preventDefault();
        window.location.reload();
    }

    render() {
        return (
            <Div>
                <P>
                  Walka z użytkownikiem o ID: {this.props.opponentId}
                </P>
                <Back onClick={this.refreshPage}>
                    Powrót
                </Back>
            </Div>
        );
    }
}

export default BattleResult;