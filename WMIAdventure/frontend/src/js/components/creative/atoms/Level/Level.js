import React from 'react';
import Button from './styled-components/Button';

class Level extends React.Component {
    render() {
        return (
            <>
                <Button show={this.props.createCommonLevel}>
                    TYPOWA
                </Button>
                <Button show={this.props.createGoldLevel}>
                    ZŁOTA
                </Button>
                <Button show={this.props.createEpicLevel}>
                    EPICKA
                </Button>
            </>
        );
    }
}

export default Level;