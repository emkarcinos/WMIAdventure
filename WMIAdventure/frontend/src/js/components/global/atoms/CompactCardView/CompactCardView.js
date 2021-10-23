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
            <Div setWidth={this.props.setWidth} setHeight={this.props.setHeight} setMargin={this.props.setMargin}
                 common={this.props.common} gold={this.props.gold} epic={this.props.epic}
                 decorationHeight={this.props.decorationHeight} shadow={this.props.shadow}>
                <NameContainer>
                    <Name nameLength={this.cardNameLengthHandler(this.props.cardName)}
                          ownFontSize={this.props.ownFontSize}>
                        {this.props.cardName ? this.props.cardName : "null"}
                    </Name>
                </ NameContainer>
                <Img setIconWidth={this.props.setIconWidth} setIconHeight={this.props.setIconHeight}
                     setIconMarginBottom={this.props.setIconMarginBottom} alt="Image for card."
                     src={this.props.cardImage ? this.props.cardImage : upload_image_dark} />
            </Div>
        );
    }
}

export default CompactCardView;