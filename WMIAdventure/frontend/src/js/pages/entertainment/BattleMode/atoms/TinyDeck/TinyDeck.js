import React from 'react';
import Div from './styled-components/Div';
import ImageContainer from './styled-components/ImageContainer';
import CardImage from './styled-components/CardImage';
import upload_image_dark from "../../../../../../assets/icons/upload_image_dark.svg";

class TinyDeck extends React.Component {
    render() {
        return (
            <Div onClick={this.props.showHandler} show={this.props.tinyDeckVisible}>
                <ImageContainer>
                    <CardImage src={this.props.cardImages[0] ? this.props.cardImages[0] : upload_image_dark} />
                </ImageContainer>

                <ImageContainer>
                    <CardImage src={this.props.cardImages[1] ? this.props.cardImages[1] : upload_image_dark} />
                </ImageContainer>

                <ImageContainer>
                    <CardImage src={this.props.cardImages[2] ? this.props.cardImages[2] : upload_image_dark} />
                </ImageContainer>

                <ImageContainer>
                    <CardImage src={this.props.cardImages[3] ? this.props.cardImages[3] : upload_image_dark} />
                </ImageContainer>

                <ImageContainer>
                    <CardImage src={this.props.cardImages[4] ? this.props.cardImages[4] : upload_image_dark} />
                </ImageContainer>
            </Div>
        );
    }
}

export default TinyDeck;