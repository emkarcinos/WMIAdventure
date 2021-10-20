import React from 'react';
import Div from './styled-components/Div';
import ImageContainer from './styled-components/ImageContainer';
import CardImage from './styled-components/CardImage';
import upload_image_dark from "../../../../../assets/icons/upload_image_dark.svg";

class TinyDeck extends React.Component {

    render() {
        return (
            <Div onClick={this.props.showHandler} show={this.props.tinyDeckVisible}>
                {[...Array(5)].map(
                    (e,i) => {
                        return (
                            <ImageContainer key={`cardImage-${i}`}>
                                <CardImage src={this.props.cardImages[i] ? this.props.cardImages[i] : upload_image_dark} />
                            </ImageContainer>
                        );
                    }
                )}
            </Div>
        );
    }
}

export default TinyDeck;