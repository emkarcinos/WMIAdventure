import React from 'react';
import kuceBattle from "../../../../../assets/images/kuceBattle.png";
import ButtonLink from "./styled-components/ButtonLink";
import ButtonHeader from "./styled-components/ButtonHeader";
import Span from "./styled-components/Span";
import BattleImage from "./styled-components/BattleImage";
import kucEditor from "../../../../../assets/images/kucEditor.svg";
import EditorImage from "./styled-components/EditorImage";

class MainMenuButton extends React.Component {

    renderBattleOption() {
        return (
            <>
                <ButtonHeader>
                    ~/<Span>Tryb battle</Span>
                </ButtonHeader>
                <BattleImage src={kuceBattle}/>
            </>
        );
    }

    renderEditorOption() {
        return (
            <>
                <EditorImage src={kucEditor}/>
                <ButtonHeader>
                    <Span>~/</Span>Edytor kart
                </ButtonHeader>
            </>
        );
    }

    render() {
        return (
            <ButtonLink setSelfStart={this.props.setSelfStart}
                        setSelfEnd={this.props.setSelfEnd}
                        onMouseEnter={this.props.setHover}
                        onMouseLeave={this.props.removeHover}
                        to={this.props.url}>
                {this.props.battle ? this.renderBattleOption() : null}
                {this.props.editor ? this.renderEditorOption() : null}
            </ButtonLink>
        );
    }
}

export default MainMenuButton;