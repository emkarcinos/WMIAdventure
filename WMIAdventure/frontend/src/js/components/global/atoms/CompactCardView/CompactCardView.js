import React from 'react';
import Div from './styled-components/Div';
import Name from './styled-components/Name';
import Img from './styled-components/Img';
import upload_image_dark from '../../../../../assets/icons/upload_image_dark.svg';
import NameContainer from './styled-components/NameContainer';
import {secondStepAnimationDuration} from "../../../../utils/globals";

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
        cardLevel -> information about card level
        cardImage -> card icon
        cardsOrder -> to show particular card in BattleView and hide the rest
        setOpacity -> to handle opacity animation in BattleView
     */

    state = {
        cardName: ' ',
        cardLevel: 1,
        cardImage: null,
        compactCardOpacity: '1',
        cardsOrder: this.props.cardsOrder,
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
        this.props.cardName ? this.setState({cardName: this.props.cardName}) : null;
        this.props.cardLevel ? this.setState({cardLevel: this.props.cardLevel}) : null;
        this.props.cardImage ? this.setState({cardImage: this.props.cardImage}) : null;
    }

    propsChanged = (prevProps) => prevProps.cardName !== this.props.cardName ||
        prevProps.cardImage !== this.props.cardImage ||
        prevProps.cardLevel !== this.props.cardLevel;

    componentDidMount() {
        this.setStateFromProps();
    }

    showNewCardsOrder = () => {
        // shows new ordered cards
        setTimeout(() => {
            this.setState({
                compactCardOpacity: '1'
            });
        }, 100);
    }

    componentDidUpdate(prevProps) {
        if(this.propsChanged(prevProps))
            this.setStateFromProps();
        else if(prevProps.cardsOrder
            && (prevProps.cardsOrder !== this.props.cardsOrder)) {
            // fade animation, and update orders, when cardsOrder did change
            this.setState({
                compactCardOpacity: '0'
            });

            setTimeout(() => {
                let newCardsOrder = this.props.cardsOrder;
                this.setState({
                    cardsOrder: newCardsOrder
                }, this.showNewCardsOrder);
            }, secondStepAnimationDuration);
        }
    }

    render() {
        return (
            <Div setWidth={this.props.setWidth} setHeight={this.props.setHeight}
                 setMargin={this.props.setMargin} level={this.props.cardLevel}
                 setTranslateX={this.props.setTranslateX}
                 decorationHeight={this.props.decorationHeight} shadow={this.props.shadow}
                 cardsOrder={this.state.cardsOrder} setOpacity={this.state.compactCardOpacity}>
                <NameContainer>
                    <Name nameLength={this.cardNameLengthHandler(this.state.cardName)}
                          ownFontSize={this.props.ownFontSize}>
                        {this.state.cardName ? this.state.cardName : "null"}
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