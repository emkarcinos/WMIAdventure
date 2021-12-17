import React from 'react';
import {Helmet} from 'react-helmet';
import Navbar from "../../components/global/molecules/Navbar";
import MainContainer from "./styled-components/MainContainer";
import ChooseAppModule from "../../components/main-menu/molecules/ChooseAppModule/ChooseAppModule";
import Media from "react-media";
import {desktop, mobile} from "../../utils/globals";

class MainMenu extends React.Component {
    render() {
        return (
            <>
                <Helmet>
                    <title>Strona główna WMI Adventure</title>
                </Helmet>
                <Navbar/>
                <Media query={mobile}>
                    <MainContainer className="MainMenu">
                        <ChooseAppModule/>
                    </MainContainer>
                </Media>
                <Media query={desktop}>

                </Media>

            </>
        );
    }
}

export default MainMenu;