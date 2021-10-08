import React from 'react';
import prototypeIcon from '../../../../../../assets/images/prototypeCardIcon.png';
import Article from './styled-components/Article';
import H3 from './styled-components/H3';
import Category from './styled-components/Category';
import Img from './styled-components/Img';
import Describe from './styled-components/Describe';
import Tooltip from './styled-components/Tooltip';

class FullCardView extends React.Component {
    render() {
        return (
            <Article common={this.props.common} gold={this.props.gold} epic={this.props.epic}>
                <H3>
                    {this.props.cardName ? this.props.cardName : "null"}
                </H3>
                <Category>
                    {this.props.cardSubject ? this.props.cardSubject : "null"}
                </Category>
                <Img src={prototypeIcon} alt='Prototype icon.' />
                <Describe>
                    {this.props.cardImage ? this.props.cardImage : "null"}
                </Describe>
                <Tooltip>
                    {this.props.description ? this.props.description : "null"}
                </Tooltip>
            </Article>
        );
    }
}

export default FullCardView;