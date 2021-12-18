import React from 'react';
import MainMenuButton from "../../atoms/MainMenuButton";
import Logo from "../../../global/atoms/Logo";
import Container from "./styled-components/Container";
import Media from "react-media";
import {desktop, mobile} from "../../../../utils/globals";


class ChooseAppModule extends React.Component {
    state = {
        battleHover: false,
        editorHover: false,
    }

    setBattleHover = () => {
        this.setState({
            battleHover: true,
        });
    }

    removeBattleHover = () => {
        this.setState({
            battleHover: false,
        });
    }

    setEditorHover = () => {
        this.setState({
            editorHover: true,
        });
    }

    removeEditorHover = () => {
        this.setState({
            editorHover: false,
        });
    }

    render() {
        return (
            <Container battleHover={this.state.battleHover} editorHover={this.state.editorHover}>
                <Media query={mobile}>
                    <>
                        <MainMenuButton setHover={this.setBattleHover} removeHover={this.removeBattleHover}
                                        battle url={'/battle'}/>
                        <Logo setSize={'110px'} setOrder={'0'}/>
                        <MainMenuButton setHover={this.setEditorHover} removeHover={this.removeEditorHover}
                                        editor url={'/cards-creator-start'}/>
                    </>
                </Media>
                <Media query={desktop}>
                    <>
                        <MainMenuButton setHover={this.setEditorHover} removeHover={this.removeEditorHover}
                                        editor setSelfEnd url={'/cards-creator-start'}/>
                        <Logo setMargin={'0 0 6px 30px'} setSize={'216px'} setOrder={'0'}/>
                        <MainMenuButton setHover={this.setBattleHover} removeHover={this.removeBattleHover}
                                        battle setSelfStart url={'/battle'}/>
                    </>
                </Media>
            </Container>
        );
    }
}

export default ChooseAppModule;