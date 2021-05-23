import React from 'react';
import Div from './styled-components/Div';
import Label from './styled-components/Label';
import Input from './styled-components/Input';
import Span from './styled-components/Span';

class CostInput extends React.Component {
    render() {
        return (
            <Div activeCardRank={this.props.activeCardRank}>
                <Label htmlFor={`${this.props.activeCardRank}-next_level_cost`}>
                    Koszt Ulepszenia
                </Label>
                <Span>
                    <Input id={`${this.props.activeCardRank}-next_level_cost`}
                        name='next_level_cost'
                        type='number'
                        value={this.props.levelCostValues}
                        onChange={this.props.levelCostValuesHandler} />
                </Span>
            </Div>
        );
    }
}

export default CostInput;