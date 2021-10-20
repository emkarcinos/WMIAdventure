import React from 'react';
import Div from './styled-components/Div';
import TinyDeck from '../../molecules/TinyDeck';

class SwipeProfile extends React.Component {

    state = {
        hide: true,
        tinyDeckVisible: true,
    }

    showHandler = () => {
        this.setState({
            hide: false,
            tinyDeckVisible: false,
        });
    }

    render() {
        return (
            <Div hide={this.state.hide}>
                <TinyDeck
                    showHandler={this.showHandler}
                    cardImages={[]}
                    tinyDeckVisible={this.state.tinyDeckVisible}
                />
            </Div>
        );
    }
}

export default SwipeProfile;