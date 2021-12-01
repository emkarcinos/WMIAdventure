import React from 'react';
import Container from "./styled-components/Container";
import Icon from "./styled-components/Icon";
import Modifier from "./styled-components/Modifier";
import {buffModifierHandle} from "../../organisms/BattleView/effectsVisualizing";

/*
props:
    type -> define buff type to handle background color and icon
    modifier -> value of buff effect
 */

class BuffPreviewBlock extends React.Component {
    render() {
        return (
            <Container type={this.props.type}>
                <Icon type={this.props.type}/>
                <Modifier>
                    {buffModifierHandle(this.props.modifier)}
                </Modifier>
            </Container>
        );
    }
}

export default BuffPreviewBlock;