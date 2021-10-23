import React from 'react';
import Div from './styled-components/Div';
import Header from './styled-components/Header';
import Image from './styled-components/Image';

class BattleResult extends React.Component {
    render() {
        return (
            <Div>
                <Header>
                    {this.props.result}
                </Header>
                <Image src={this.props.image} />
            </Div>
        );
    }
}

export default BattleResult;