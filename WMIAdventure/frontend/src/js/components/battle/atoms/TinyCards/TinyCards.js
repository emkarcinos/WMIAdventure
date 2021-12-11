import React from 'react';
import MainContainer from './styled-components/MainContainer';
import ImageContainer from './styled-components/ImageContainer';
import CardImage from './styled-components/CardImage';
import unknownIcon from '../../../../../assets/images/unknown.png';
import Deck from "../../molecules/Deck";

class TinyCards extends Deck {
    render() {
        return (
            <MainContainer setMargin={this.props.setMargin} gap={this.props.gap}>
                {[...Array(5)].map(
                    (e, i) => {
                        const cardImg = this.props.deck.cards[i].image
                        return (
                            <ImageContainer key={`cardImage-${i}`}>
                                <CardImage src={cardImg ? cardImg : unknownIcon}/>
                            </ImageContainer>
                        );
                    }
                )}
            </MainContainer>
        );
    }
}

export default TinyCards;