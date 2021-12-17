import React from 'react';
import {Helmet} from 'react-helmet';
import Navbar from "../../components/global/molecules/Navbar";
import MainContainer from "./styled-components/MainContainer";
import MenuDiv from "./styled-components/MenuDiv";
import OptionHeader from "./styled-components/OptionHeader";
import Span from "./styled-components/Span";
import BattleImage from "./styled-components/BattleImage";
import EditorImage from "./styled-components/EditorImage";
import Logo from "../../components/global/atoms/Logo";
import kuceBattle from '../../../assets/images/kuceBattle.png';
import kucEditor from '../../../assets/images/kucEditor.png';
import Option from "./styled-components/Option";

class MainMenu extends React.Component {
    render() {
        return (
            <>
                <Helmet>
                    <title>Strona główna WMI Adventure</title>
                </Helmet>
                <Navbar/>
                <MainContainer className="MainMenu">
                    <MenuDiv>
                        <Option to={'/battle'}>
                            <OptionHeader>
                                ~/<Span>Tryb battle</Span>
                            </OptionHeader>
                            <BattleImage src={kuceBattle}/>
                        </Option>
                        <Logo setSize={'110px'} setOrder={'0'}/>
                        <Option to={'/cards-creator-start'}>
                            <EditorImage src={kucEditor}/>
                            <OptionHeader>
                                <Span>~/</Span>Edytor kart
                            </OptionHeader>
                        </Option>
                    </MenuDiv>
                </MainContainer>
            </>
        );
    }
}

export default MainMenu;