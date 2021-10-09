import React from 'react';
import Div from './styled-components/Div';
import Name from './styled-components/Name';
import Img from './styled-components/Img';
import upload_image from '../../../../../../assets/icons/upload_image.svg';

class CompactCardView extends React.Component {
    render() {
        return (
            <Div common={this.props.common} gold={this.props.gold} epic={this.props.epic}>
                <Name>
                    {this.props.cardName ? this.props.cardName : "null"}
                </Name>
                <Img src={this.props.cardImage ? this.props.cardImage : upload_image} alt="Image for card." />
            </Div>
        );
    }
}

export default CompactCardView;