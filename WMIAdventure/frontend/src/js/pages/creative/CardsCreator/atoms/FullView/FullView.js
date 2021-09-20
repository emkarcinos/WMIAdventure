import React from 'react';
import prototypeIcon from '../../../../../../assets/images/prototypeCardIcon.png';
import Article from './styled-components/Article';
import H3 from './styled-components/H3';
import Category from './styled-components/Category';
import Img from './styled-components/Img';
import Describe from './styled-components/Describe';
import Tooltip from './styled-components/Tooltip';

class FullView extends React.Component {
    render() {
        return (
            <Article common={this.props.common} gold={this.props.gold} epic={this.props.epic}>
                <H3>
                    Test
                </H3>
                <Category>
                    Test
                </Category>
                <Img src={prototypeIcon} alt='Prototype icon.' />
                <Describe>
                    Gotta go fast Linia 2
                </Describe>
                <Tooltip>
                    Zadaje 15 obrażeń i zatrzymuje przeciwnika na jedną turę.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequat.
                </Tooltip>
            </Article>
        );
    }
}

export default FullView;