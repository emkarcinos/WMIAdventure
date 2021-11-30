import React from 'react';
import Div from './styled-components/Div';
import Name from './styled-components/Name';
import Img from './styled-components/Img';
import upload_image_dark from '../../../../../assets/icons/upload_image_dark.svg';
import NameContainer from './styled-components/NameContainer';
import {blockedCardOpacity, nextStepAnimationDuration} from "../../../../utils/globals";
import BuffsContainer from "./styled-components/BuffsContainer";
import BuffValue from "./styled-components/BuffValue";

class CompactCardView extends React.Component {
    /*
    props:
        setWidth -> set width of main Div
        setHeight -> set height of main Div
        setMargin -> set margin of main Div
        decorationHeight -> set height of top decoration border card view
        shadow -> signal that component has shadow
        ownFontSize -> set font size of card name
        setTranslateX -> handle horizontal movement animation (X)
        setTranslateY -> handle vertical movement animation (Y)
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
        cardIndexInDeck: this.props.cardIndexInDeck,
    }

    cardNameLengthHandler = (cardNameLength) => {
        try {
            if (cardNameLength.length)
                return cardNameLength.length;
            return 0;
        } catch (e) {
            return 0;
        }
    }

    /**
     * Sets appropriate opacity. (checks if card is blocked or not)
     * @param blocked If this card is blocked or not.
     */
    setAppropriateOpacity = (blocked) => {
        const opacity = blocked ? blockedCardOpacity : '1';
        this.setState({compactCardOpacity: opacity});
    }

    setStateFromProps = () => {
        this.props.cardName ? this.setState({cardName: this.props.cardName}) : null;
        this.props.cardLevel ? this.setState({cardLevel: this.props.cardLevel}) : null;
        this.props.cardImage ? this.setState({cardImage: this.props.cardImage}) : null;
    }

    propsChanged = (prevProps) =>
        prevProps.cardName !== this.props.cardName ||
        prevProps.cardImage !== this.props.cardImage ||
        prevProps.cardLevel !== this.props.cardLevel;

    componentDidMount() {
        this.setStateFromProps();
    }

    showNewCardsOrder = () => {
        // shows new ordered cards
        setTimeout(() => {
            this.setAppropriateOpacity(this.props.blocked)
        }, 100);
    }

    componentDidUpdate(prevProps) {
        if (this.propsChanged(prevProps))
            this.setStateFromProps();
        if (prevProps.cardIndexInDeck
            && (prevProps.cardIndexInDeck !== this.props.cardIndexInDeck)) {
            // fade animation, and update orders, when cardsOrder did change
            this.setState({
                compactCardOpacity: '0'
            });

            setTimeout(() => {
                let newCardIndexInDeck = this.props.cardIndexInDeck;
                this.setState({
                    cardIndexInDeck: newCardIndexInDeck
                }, this.showNewCardsOrder);
            }, nextStepAnimationDuration);
        }
        // If card changed it's blocked state and deck order wasn't changed then set proper opacity
        else if (prevProps.blocked !== this.props.blocked) {
            this.setAppropriateOpacity(this.props.blocked);
        }
    }

    getBuffs = () => {
        if (this.props.buffs && this.props.buffs.length !== 0) {
            return (
                this.props.buffs.map(() => {
                    return (
                        <BuffValue key={`${this.state.cardName}-buff-${this.props.buffs.id}`}>
                            value
                        </BuffValue>
                    );
                })
            );
        }
    }

    render() {
        return (
            <Div setWidth={this.props.setWidth} setHeight={this.props.setHeight}
                 setMargin={this.props.setMargin} level={this.props.cardLevel}
                 battleOnDesktop={this.props.battleOnDesktop ? this.props.battleOnDesktop : false}
                 setTranslateX={this.props.setTranslateX} setTranslateY={this.props.setTranslateY}
                 decorationHeight={this.props.decorationHeight} shadow={this.props.shadow}
                 cardIndexInDeck={this.state.cardIndexInDeck} setOpacity={this.state.compactCardOpacity}
                 setScale={this.props.setScale} hasBuff={this.props.buffs && (this.props.buffs.length !== 0)}>
                <BuffsContainer>
                    {this.getBuffs()}
                </BuffsContainer>
                <NameContainer>
                    <Name nameLength={this.cardNameLengthHandler(this.state.cardName)}
                          ownFontSize={this.props.ownFontSize}>
                        {this.state.cardName ? this.state.cardName : "null"}
                    </Name>
                </ NameContainer>
                <Img setIconWidth={this.props.setIconWidth} setIconHeight={this.props.setIconHeight}
                     setIconMarginBottom={this.props.setIconMarginBottom} alt="Image for card."
                     src={this.state.cardImage ? this.state.cardImage : upload_image_dark}/>
            </Div>
        );
    }
}

export default CompactCardView;