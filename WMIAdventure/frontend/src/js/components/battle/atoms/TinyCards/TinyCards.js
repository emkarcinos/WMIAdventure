import React from 'react';
import MainContainer from './styled-components/MainContainer';
import ImageContainer from './styled-components/ImageContainer';
import CardImage from './styled-components/CardImage';
import unknownIcon from '../../../../../assets/images/unknown.png';
import Deck from "../../molecules/Deck";

class TinyCards extends Deck {
    constructor(props) {
        super(props);
        this.state = {
            card1 : null,
            card2 : null,
            card3 : null,
            card4 : null,
            card5 : null,
        };
    }

    getImages = (i) => {
        let contents = [];
        for (const [, card] of Object.entries(this.state)) {
            card ? contents.push(card.image) : contents.push(null);
        }
        return contents[i];
    }

    render() {
        return (
            <MainContainer setMargin={this.props.setMargin} gap={this.props.gap}>
                {[...Array(5)].map(
                    (e,i) => {
                        return (
                            <ImageContainer key={`cardImage-${i}`}>
                                <CardImage src={this.getImages(i) ? this.getImages(i) : unknownIcon} />
                            </ImageContainer>
                        );
                    }
                )}
            </MainContainer>
        );
    }
}

export default TinyCards;