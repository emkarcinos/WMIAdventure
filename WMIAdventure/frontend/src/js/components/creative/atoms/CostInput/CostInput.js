import React from 'react';
import Div from './styled-components/Div';
import Label from './styled-components/Label';
import Input from './styled-components/Input';
import Span from './styled-components/Span';

class CostInput extends React.Component {
    render() {
        return (
            <Div activeCardRank={this.props.activeCardRank}>
                <Label htmlFor='next_level_cost'>
                    Koszt Ulepszenia
                </Label>
                <Span>
                    <Input id='next_level_cost' name='next_level_cost' type='number' />
                </Span>
            </Div>
        );
    }
}

export default CostInput;