import React from 'react';
import {Helmet} from 'react-helmet';
import MainContainer from "./styled-components/MainContainer";
import ChooseAppModule from "../../components/main-menu/molecules/ChooseAppModule/ChooseAppModule";
import Media from "react-media";
import {desktop, mobile, nextStepAnimationDuration} from "../../utils/globals";
import DesktopBackground from "./styled-components/DesktopBackground";
import HelloNewbiePopUp from "../../components/main-menu/organisms/HelloNewbiePopUp";

class MainMenu extends React.Component {
    state = {
        helloNewbiePopUp: {
            visible: true,
            transBackOpacity: '0',
            translateY: '-100vh'
        }
    }

    openHelloNewbiePopUp = () => {
        setTimeout(() => {
            this.setState({
                helloNewbiePopUp: {
                    visible: true,
                    transBackOpacity: '1',
                    translateY: '0'
                }
            });
        }, 100)
    }

    closeHelloNewbiePopUp = () => {
        localStorage.removeItem('tutorial');

        this.setState({
            helloNewbiePopUp: {
                visible: true,
                transBackOpacity: '0',
                translateY: '-100vh'
            }
        });

        setTimeout(() => {
            this.setState({
                helloNewbiePopUp: {
                    visible: false,
                    transBackOpacity: '0',
                    translateY: '-100vh'
                }
            });
        }, nextStepAnimationDuration)
    }

    goToTutorial = () => {
        this.props.history.push(`tutorial`);
    }

    render() {
        return (
            <>
                <Helmet>
                    <title>Menu główne</title>
                </Helmet>
                <Media query={mobile}>
                    <MainContainer>
                        {localStorage.getItem("tutorial") === "on" ?
                            <HelloNewbiePopUp visible={this.state.helloNewbiePopUp.visible}
                                              open={this.openHelloNewbiePopUp}
                                              close={this.closeHelloNewbiePopUp}
                                              goToTutorial={this.goToTutorial}
                                              setTransBackOpacity={this.state.helloNewbiePopUp.transBackOpacity}
                                              setTranslateY={this.state.helloNewbiePopUp.translateY}/> : null}
                        <ChooseAppModule/>
                    </MainContainer>
                </Media>
                <Media query={desktop}>
                    <DesktopBackground>
                        {localStorage.getItem("tutorial") === "on" ?
                            <HelloNewbiePopUp visible={this.state.helloNewbiePopUp.visible}
                                              open={this.openHelloNewbiePopUp}
                                              close={this.closeHelloNewbiePopUp}
                                              goToTutorial={this.goToTutorial}
                                              setTransBackOpacity={this.state.helloNewbiePopUp.transBackOpacity}
                                              setTranslateY={this.state.helloNewbiePopUp.translateY}/> : null}
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