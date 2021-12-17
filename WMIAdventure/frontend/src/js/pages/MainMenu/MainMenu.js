import React from 'react';
import {Helmet} from 'react-helmet';
import Navbar from "../../components/global/molecules/Navbar";
import MainContainer from "./styled-components/MainContainer";
import MenuDiv from "./styled-components/MenuDiv";

function MainMenu() {
    return (
        <>
            <Helmet>
                <title>Strona główna WMI Adventure</title>
            </Helmet>
            <Navbar/>
            <MainContainer className="MainMenu">
                <MenuDiv>
                    
                </MenuDiv>
            </MainContainer>
        </>
    );
}

export default MainMenu;