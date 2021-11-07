import React from 'react';
import Div from './styled-components/Div';
import Name from './styled-components/Name';
import Img from './styled-components/Img';
import upload_image_dark from '../../../../../assets/icons/upload_image_dark.svg';
import NameContainer from './styled-components/NameContainer';

class CompactCardView extends React.Component {
    state = {
        name: ' ',
        level: 1,
        cardImage: null
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

    setStateFromProps = () => {
        this.props.cardName ? this.setState({name: this.props.cardName}) : null;
        this.props.level ? this.setState({level: this.props.level}) : null;
        this.props.cardImage ? this.setState({cardImage: this.props.cardImage}) : null;
    }

    propsChanged = (prevProps) => prevProps.cardName !== this.props.cardName ||
        prevProps.cardImage !== this.props.cardImage ||
        prevProps.level !== this.props.level;

    componentDidMount() {
        this.setStateFromProps();
    }

    componentDidUpdate(prevProps) {
        if(this.propsChanged(prevProps))
            this.setStateFromProps();
    }

    render() {
        return (
            <Div setWidth={this.props.setWidth} setHeight={this.props.setHeight} setMargin={this.props.setMargin}
                 common={this.isCommon()} gold={this.isGold()} epic={this.isEpic()}
                 setTranslateX={this.props.setTranslateX}
                 decorationHeight={this.props.decorationHeight} shadow={this.props.shadow}>
                <NameContainer>
                    <Name nameLength={this.cardNameLengthHandler(this.state.name)}
                          ownFontSize={this.props.ownFontSize}>
                        {this.state.name ? this.state.name : "null"}
                    </Name>
                </ NameContainer>
                <Img setIconWidth={this.props.setIconWidth} setIconHeight={this.props.setIconHeight}
                     setIconMarginBottom={this.props.setIconMarginBottom} alt="Image for card."
                     src={this.state.cardImage ? this.state.cardImage : upload_image_dark} />
            </Div>
        );
    }
}

export default CompactCardView;