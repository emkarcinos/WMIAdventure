import React from 'react';
import Label from './styled-components/Label';
import Input from './styled-components/Input';
import Span from './styled-components/Span';
import CommonDiv from './styled-components/CommonDiv';
import EpicDiv from './styled-components/EpicDiv';
import GoldDiv from './styled-components/GoldDiv';

class CostInputs extends React.Component {
    render() {
        return (
            <>
                <CommonDiv activeCardRank={this.props.activeCardRank}>
                    <Label htmlFor={`${this.props.activeCardRank}-next_level_cost`}>
                        Koszt Ulepszenia
                    </Label>
                    <Span>
                        <Input id={`${this.props.activeCardRank}-next_level_cost`}
                               name='next_level_cost'
                               type='number'
                               value={this.props.levelCostValues[this.props.activeCardRank - 1]}
                               onChange={this.props.levelCostValuesHandler}/>
                    </Span>
                </CommonDiv>
                <GoldDiv activeCardRank={this.props.activeCardRank}>
                    <Label htmlFor={`${this.props.activeCardRank}-next_level_cost`}>
                        Koszt Ulepszenia
                    </Label>
                    <Span>
                        <Input id={`${this.props.activeCardRank}-next_level_cost`}
                               name='next_level_cost'
                               type='number'
                               value={this.props.levelCostValues[this.props.activeCardRank - 1]}
                               onChange={this.props.levelCostValuesHandler}/>
                    </Span>
                </GoldDiv>
                <EpicDiv activeCardRank={this.props.activeCardRank}>
                    <Label htmlFor={`${this.props.activeCardRank}-next_level_cost`}>
                        Koszt Ulepszenia
                    </Label>
                    <Span>
                        <Input id={`${this.props.activeCardRank}-next_level_cost`}
                               name='next_level_cost'
                               type='number'
                               value={this.props.levelCostValues[this.props.activeCardRank - 1]}
                               onChange={this.props.levelCostValuesHandler}/>
                    </Span>
                </EpicDiv>
            </>
        );
    }
}

export default CostInputs;