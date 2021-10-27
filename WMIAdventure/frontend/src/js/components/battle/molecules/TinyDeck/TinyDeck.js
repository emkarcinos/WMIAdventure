import React from 'react';
import Div from './styled-components/Div';
import Media from 'react-media';
import TinyCards from '../../atoms/TinyCards/TinyCards';
import Deck from "../Deck";

class TinyDeck extends Deck {

    getImages = () => {
        let contents = [];
        for (const [, card] of Object.entries(this.state)) {
            card ? contents.push(card.image) : contents.push(null);
        }
        return contents;
    }

    render() {
        return (
            <Div onClick={this.props.showHandler}
                 show={this.props.tinyDeckVisible}
                 visible={this.props.tinyDeckDisplay}>
                <Media query={'(max-width: 340px)'}>
                    <TinyCards cardImages={this.getImages()} setMargin={'0'} gap={'2px'} />
                </Media>

                <Media query={'(min-width: 341px) and (max-width: 1024px)'}>
                    <TinyCards cardImages={this.getImages()} setMargin={'0'} gap={'8px'} />
                </Media>
            </Div>
        );
    }
}

export default TinyDeck;