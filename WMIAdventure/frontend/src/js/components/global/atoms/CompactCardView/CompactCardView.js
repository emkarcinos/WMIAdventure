import React from 'react';
import Div from './styled-components/Div';
import Name from './styled-components/Name';
import Img from './styled-components/Img';
import upload_image_dark from '../../../../../assets/icons/upload_image_dark.svg';
import NameContainer from './styled-components/NameContainer';

class CompactCardView extends React.Component {
    /*
    props:
        setWidth -> set width of main Div
        setHeight -> set height of main Div
        setMargin -> set margin of main Div
        decorationHeight -> set height of top decoration border card view
        shadow -> signal that component has shadow
        ownFontSize -> set font size of card name
        setTranslateX -> handle movement animation
        level -> information about card level
        cardImage -> card icon
     */

    state = {
        name: ' ',
        level: 1,
        cardImage: null
    }

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
            <Div setWidth={this.props.setWidth} setHeight={this.props.setHeight}
                 setMargin={this.props.setMargin} level={this.props.level}
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