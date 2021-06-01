import React from 'react';
import Name from './styled-components/Name';
import Tooltip from './styled-components/Tooltip';
import Button from './styled-components/Button';

class Effect extends React.Component {
    render() {
        return (
            <Button onClick={(event) => this.props.chosenEffectsHandler(event, this.props.rank, this.props.effect)}>
                <Name>
                    {this.props.name}
                </Name>
                <Tooltip>
                    {this.props.tooltip}
                </Tooltip>
            </Button>
        );
    }
}

export default Effect;