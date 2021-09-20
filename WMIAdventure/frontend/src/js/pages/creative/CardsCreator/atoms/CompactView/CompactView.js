import React from 'react';
import prototypeIcon from '../../../../../../assets/images/prototypeCardIcon.png';
import Div from './styled-components/Div';
import Name from './styled-components/Name';
import Img from './styled-components/Img';

class CompactView extends React.Component {
    render() {
        return (
            <Div common={this.props.common} gold={this.props.gold} epic={this.props.epic}>
                <Name>
                    C++
                </Name>
                <Img src={prototypeIcon} alt='Prototypowa ikona.'/>
            </Div>
        );
    }
}

export default CompactView;