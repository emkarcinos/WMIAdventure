import React from 'react';
import Div from './styled-components/Div';
import Name from './styled-components/Name';
import Img from './styled-components/Img';
import upload_image_dark from '../../../../../assets/icons/upload_image_dark.svg';
import NameContainer from './styled-components/NameContainer';
import {getCardById} from "../../../../utils/storage/cards/cardStorage";

class CompactCardView extends React.Component {
    state = {
        name: '',
        level: 1,
        image: null
    }

    isCommon = () => this.state.level === 1;
    isGold = () => this.state.level === 2;
    isEpic = () => this.state.level === 3;

    cardNameLengthHandler = (cardNameLength) => {
        try {
            if(cardNameLength.length)
                return cardNameLength.length;
            return 0;
        } catch (e) {
            return 0;
        }
    }

    componentDidUpdate(prevProps) {
        if ((prevProps === this.props) || !this.props.card) return;
        getCardById(this.props.card.id)
            .then(card => {
                if(card) {
                    this.setState({
                        name: card.name,
                        level: this.props.card.level,
                        image: card.image
                    });
                }
            });
    }

    render() {
        return (
            <Div setWidth={this.props.setWidth} setHeight={this.props.setHeight} setMargin={this.props.setMargin}
                 common={this.isCommon()} gold={this.isGold()} epic={this.isEpic()}
                 decorationHeight={this.props.decorationHeight} shadow={this.props.shadow}>
                <NameContainer>
                    <Name nameLength={this.cardNameLengthHandler(this.state.name)}
                          ownFontSize={this.props.ownFontSize}>
                        {this.state.name ? this.state.name : "null"}
                    </Name>
                </ NameContainer>
                <Img setIconWidth={this.props.setIconWidth} setIconHeight={this.props.setIconHeight}
                     setIconMarginBottom={this.props.setIconMarginBottom} alt="Image for card."
                     src={this.state.image ? this.state.image : upload_image_dark} />
            </Div>
        );
    }
}

export default CompactCardView;