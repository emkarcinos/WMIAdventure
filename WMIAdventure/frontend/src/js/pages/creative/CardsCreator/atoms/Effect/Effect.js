import React from 'react';
import Name from './styled-components/Name';
import Tooltip from './styled-components/Tooltip';
import Button from './styled-components/Button';

class Effect extends React.Component {
    render() {
        return (
            <Button disabled={this.props.chosen}
                    searchInput={this.props.searchInput}
                    name={this.props.name}
                    onClick={(event) => this.props.chosenEffectsHandler(event, this.props.rank, this.props.effect)}>
                <Name disabled={this.props.chosen}>
                    {this.props.name}
                </Name>
                <Tooltip disabled={this.props.chosen}>
                    {this.props.tooltip}
                </Tooltip>
            </Button>
        );
    }
}

export default Effect;