import React from 'react';
import MainContainer from './styled-components/MainContainer';
import ImageContainer from './styled-components/ImageContainer';
import CardImage from './styled-components/CardImage';
import uploadImageDark from '../../../../../assets/icons/upload_image_dark.svg';

class TinyCards extends React.Component {
    render() {
        return (
            <MainContainer setMargin={this.props.setMargin}>
                {[...Array(5)].map(
                    (e,i) => {
                        return (
                            <ImageContainer key={`cardImage-${i}`}>
                                <CardImage src={this.props.cardImages[i] ? this.props.cardImages[i] : uploadImageDark} />
                            </ImageContainer>
                        );
                    }
                )}
            </MainContainer>
        );
    }
}

export default TinyCards;