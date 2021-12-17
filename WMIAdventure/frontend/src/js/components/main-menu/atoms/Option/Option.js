import React from 'react';
import kuceBattle from "../../../../../assets/images/kuceBattle.png";
import OptionLink from "./styled-components/OptionLink";
import OptionHeader from "./styled-components/OptionHeader";
import Span from "./styled-components/Span";
import BattleImage from "./styled-components/BattleImage";
import kucEditor from "../../../../../assets/images/kucEditor.png";
import EditorImage from "./styled-components/EditorImage";

class Option extends React.Component {

    renderBattleOption() {
        return (
            <>
                <OptionHeader>
                    ~/<Span>Tryb battle</Span>
                </OptionHeader>
                <BattleImage src={kuceBattle}/>
            </>
        );
    }

    renderEditorOption() {
        return (
            <>
                <EditorImage src={kucEditor}/>
                <OptionHeader>
                    <Span>~/</Span>Edytor kart
                </OptionHeader>
            </>
        );
    }

    render() {
        return (
            <OptionLink to={this.props.url}>
                {this.props.battle ? this.renderBattleOption() : null}
                {this.props.editor ? this.renderEditorOption() : null}
            </OptionLink>
        );
    }
}

export default Option;