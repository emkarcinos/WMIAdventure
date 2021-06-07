import React from 'react';
import Label from './styled-components/Label';
import Input from './styled-components/Input';
import Span from './styled-components/Span';
import CommonDiv from './styled-components/CommonDiv';
import GoldDiv from './styled-components/GoldDiv';

class CostInputs extends React.Component {
    render() {
        return (
            <>
                <CommonDiv existNextCardRank={this.props.createGoldLevel} activateCardRank={this.props.activeCardRank}>
                    <Label htmlFor={`1-next_level_cost`}>
                        Koszt Ulepszenia
                    </Label>
                    <Span>
                        <Input id={`1-next_level_cost`}
                               name='next_level_cost'
                               type='number'
                               min='1'
                               value={this.props.levelCostValues[this.props.activeCardRank - 1]}
                               onChange={this.props.levelCostValuesHandler}/>
                    </Span>
                </CommonDiv>
                <GoldDiv existNextCardRank={this.props.createEpicLevel} activateCardRank={this.props.activeCardRank}>
                    <Label htmlFor={`2-next_level_cost`}>
                        Koszt Ulepszenia
                    </Label>
                    <Span>
                        <Input id={`2-next_level_cost`}
                               name='next_level_cost'
                               type='number'
                               min='1'
                               value={this.props.levelCostValues[this.props.activeCardRank - 1]}
                               onChange={this.props.levelCostValuesHandler}/>
                    </Span>
                </GoldDiv>
            </>
        );
    }
}

export default CostInputs;