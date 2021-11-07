import React from 'react';
import Div from './styled-components/Div';
import Header from './styled-components/Header';
import Image from './styled-components/Image';
import winIcon from '../../../../../assets/images/win-icon.png';
import loseIcon from '../../../../../assets/images/lose-icon.png';
import drawIcon from '../../../../../assets/images/battleIconLarge.png';

class BattleResult extends React.Component {
    resultHandler = () => {
        if (this.props.win === null) return {text: 'Remis', icon: drawIcon};
        if (this.props.win) return {text: 'Zwycięstwo!', icon: winIcon};
        return {text: 'Przegrana!', icon: loseIcon};
    }

    render() {
        return (
            <Div>
                <Header>
                    {this.resultHandler().text}
                </Header>
                <Image src={this.resultHandler().icon}/>
            </Div>
        );
    }
}

export default BattleResult;