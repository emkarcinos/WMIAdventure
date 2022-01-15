import React from 'react';
import Label from './styled-components/Label';
import Input from './styled-components/Input';
import Span from './styled-components/Span';
import Div from "./styled-components/Div";

class CostInputs extends React.Component {
    render() {
        if (this.props.cardRank === 0) {
            return <></>
        } else {
            return (
                <>
                    <Div>
                        <Label htmlFor={`${this.props.cardRank}-next_level_cost`}>
                            Koszt Ulepszenia
                        </Label>
                        <Span>
                            <Input id={`${this.props.cardRank}-next_level_cost`}
                                   name='next_level_cost'
                                   type='text'
                                   min='1'
                                   max='99'
                                   value={this.props.levelCostValues[this.props.cardRank - 1]}
                                   onChange={this.props.levelCostValuesHandler}/>
                        </Span>
                    </Div>
                </>
            );
        }
    }
}

export default CostInputs;