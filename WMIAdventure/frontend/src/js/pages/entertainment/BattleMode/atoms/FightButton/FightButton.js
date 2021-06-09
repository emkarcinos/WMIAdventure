import React from 'react';
import Button from './styled-components/Button';

class FightButton extends React.Component {

    render() {
        return (
            <Button onClick={() => this.props.battleResultHandler(event, this.props.userId)}>
                Szybki pojedynek!
            </Button>
        );
    }
}

export default FightButton;