import React from "react";
import FlexGapContainer from "../../../global/molecules/FlexGapContainer/FlexGapContainer";
import Amount from "./styled-components/Amount";
import Text from "./styled-components/Text";

class ExpGain extends React.Component {
    render() {
        return (
            <FlexGapContainer gap={'5px'}>
                <Amount>{`+${this.props.value}`}</Amount>
                <Text>EXP</Text>
            </FlexGapContainer>
        );
    }
}

export default ExpGain;