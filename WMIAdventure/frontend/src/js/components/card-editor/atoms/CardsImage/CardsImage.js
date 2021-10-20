import React from 'react';
import cardsImage from '../../../../../assets/icons/cards.svg';
import Div from './styled-components/Div';
import Img from './styled-components/Img';

class CardsImage extends React.Component {
    render() {
        return (
            <Div>
                <Img src={cardsImage} alt='Obrazek złotej i epickiej karty.' />
            </Div>
        );
    }
}

export default CardsImage;