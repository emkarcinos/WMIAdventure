import React from 'react';
import CardsContainer from "./styled-components/CardsContainer";
import Icon from "./styled-components/Icon";
import iconPlaceholder from '../../../../../assets/icons/upload_image_dark.svg';
import IconContainer from "./styled-components/IconContainer";
import {secondStepAnimationDuration} from "../../../../utils/globals";

class MiniCardView extends React.Component {
    /*
    props:
        setTranslateX -> handle init animation
        enemy -> signal that card belong to enemy
        user -> signal that card belong to current user
        cardLevel -> information about card level
        visible -> handle visibility of card
        cardImage -> card icon
        cardsOrder -> to show particular card in BattleView and hide the rest
        setOpacity -> to handle opacity animation in BattleView
     */

    state = {
        miniCardOpacity: '1',
        cardIndexInDeck: this.props.cardIndexInDeck,
    }

    showNewCardsOrder = () => {
        // shows new ordered cards
        setTimeout(() => {
            this.setState({
                miniCardOpacity: '1'
            });
        }, 100)
    }

    componentDidUpdate(prevProps) {
        // fade animation, and update orders, when cardsOrder did change
        if(prevProps.cardIndexInDeck &&
            (prevProps.cardIndexInDeck !== this.props.cardIndexInDeck)) {
            this.setState({
               miniCardOpacity: '0'
            });

            setTimeout(() => {
                let newCardIndexInDeck = this.props.cardIndexInDeck;
                this.setState({
                    cardIndexInDeck: newCardIndexInDeck
                }, this.showNewCardsOrder);
            }, secondStepAnimationDuration);
        }
    }

    render() {
        return (
            <CardsContainer visible={this.props.visible} setTranslateX={this.props.setTranslateX}
                            setOpacity={this.state.miniCardOpacity} enemy={this.props.enemy}
                            user={this.props.user} cardIndexInDeck={this.state.cardIndexInDeck}
                            level={this.props.cardLevel} animationDuration={this.props.animationDuration}
                            onClick={() => this.props.changeCardsOrder()}>
                <IconContainer enemy={this.props.enemy}>
                    <Icon src={this.props.cardImage ? this.props.cardImage : iconPlaceholder} />
                </IconContainer>
            </CardsContainer>
        );
    }
}

export default MiniCardView;