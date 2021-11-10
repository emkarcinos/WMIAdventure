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
     */

    state = {
        miniCardOpacity: '1',
        cardsOrder: this.props.cardsOrder,
    }

    componentDidUpdate(prevProps) {
        if(prevProps.cardsOrder && (prevProps.cardsOrder !== this.props.cardsOrder)) {
            this.setState({
               miniCardOpacity: '0'
            });

            setTimeout(() => {
                let newCardsOrder = this.props.cardsOrder;
                this.setState({
                    cardsOrder: newCardsOrder
                });
            }, secondStepAnimationDuration);

            setTimeout(() => {
                this.setState({
                    miniCardOpacity: '1'
                });
            }, secondStepAnimationDuration + 100);
        }
    }

    render() {
        return (
            <CardsContainer visible={this.props.visible} setTranslateX={this.props.setTranslateX}
                            setOpacity={this.state.miniCardOpacity} enemy={this.props.enemy}
                            user={this.props.user} cardsOrder={this.state.cardsOrder}
                            level={this.props.cardLevel} animationDuration={this.props.animationDuration}
                            onClick={() => this.props.changeCardsOrder()}>
                {
                    this.props.enemy ?
                        <>
                            <IconContainer enemy>
                                <Icon src={this.props.cardImage ? this.props.cardImage : iconPlaceholder} />
                            </IconContainer>
                        </>
                        : ''
                }
                {
                    this.props.user ?
                        <>
                            <IconContainer>
                                <Icon src={this.props.cardImage ? this.props.cardImage : iconPlaceholder} />
                            </IconContainer>
                        </>
                        : ''
                }
            </CardsContainer>
        );
    }
}

export default MiniCardView;