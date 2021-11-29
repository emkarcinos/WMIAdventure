import React from 'react';
import CardsContainer from "./styled-components/CardsContainer";
import Icon from "./styled-components/Icon";
import iconPlaceholder from '../../../../../assets/icons/upload_image_dark.svg';
import IconContainer from "./styled-components/IconContainer";
import {blockedCardOpacity, nextStepAnimationDuration} from "../../../../utils/globals";

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
            // If card is blocked then display it as blocked by setting appropriate opacity
            const opacity = this.props.blocked ? blockedCardOpacity : '1';
            this.setState({
                miniCardOpacity: opacity
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
            }, nextStepAnimationDuration);
        }
        // If card changed it's blocked state and deck order wasn't changed then set proper opacity
        else if (prevProps.blocked !== this.props.blocked) {
            const opacity = this.props.blocked ? blockedCardOpacity : '1';
            this.setState({
                miniCardOpacity: opacity
            });
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