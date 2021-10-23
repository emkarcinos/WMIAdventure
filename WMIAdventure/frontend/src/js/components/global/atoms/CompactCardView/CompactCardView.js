import React from 'react';
import Div from './styled-components/Div';
import Name from './styled-components/Name';
import Img from './styled-components/Img';
import upload_image_dark from '../../../../../assets/icons/upload_image_dark.svg';
import NameContainer from './styled-components/NameContainer';

class CompactCardView extends React.Component {

    cardNameLengthHandler = (cardNameLength) => {
        try {
            if(cardNameLength.length)
                return cardNameLength.length;
            return 0;
        } catch (e) {
            return 0;
        }
    }

    render() {
        return (
            <Div common={this.props.common} gold={this.props.gold} epic={this.props.epic}>
                <NameContainer>
                    <Name nameLength={this.cardNameLengthHandler(this.props.cardName)}>
                        {this.props.cardName ? this.props.cardName : "null"}
                    </Name>
                </ NameContainer>
                <Img src={this.props.cardImage ? this.props.cardImage : upload_image_dark} alt="Image for card." />
            </Div>
        );
    }
}

export default CompactCardView;