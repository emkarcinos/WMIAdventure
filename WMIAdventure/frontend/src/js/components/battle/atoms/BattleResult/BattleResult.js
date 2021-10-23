import React from 'react';
import Div from './styled-components/Div';
import Header from './styled-components/Header';
import Image from './styled-components/Image';
import winIcon from  '../../../../../assets/images/win-icon.png';
import loseIcon from  '../../../../../assets/images/lose-icon.png';

class BattleResult extends React.Component {
    render() {
        return (
            <Div>
                <Header>
                    {this.props.win ? 'Zwycięstwo!' : 'Przegrana!'}
                </Header>
                <Image src={this.props.win ? winIcon : loseIcon} />
            </Div>
        );
    }
}

export default BattleResult;