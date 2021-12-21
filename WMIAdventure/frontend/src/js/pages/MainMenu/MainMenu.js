import React from 'react';
import {Helmet} from 'react-helmet';
import MainContainer from "./styled-components/MainContainer";
import ChooseAppModule from "../../components/main-menu/molecules/ChooseAppModule/ChooseAppModule";
import Media from "react-media";
import {desktop, mobile} from "../../utils/globals";
import DesktopBackground from "./styled-components/DesktopBackground";

class MainMenu extends React.Component {
    render() {
        return (
            <>
                <Helmet>
                    <title>Menu główne</title>
                </Helmet>
                <Media query={mobile}>
                    <MainContainer>
                        <ChooseAppModule/>
                    </MainContainer>
                </Media>
                <Media query={desktop}>
                    <DesktopBackground>
                        <MainContainer>
                            <ChooseAppModule/>
                        </MainContainer>
                    </DesktopBackground>
                </Media>
            </>
        );
    }
}

export default MainMenu;