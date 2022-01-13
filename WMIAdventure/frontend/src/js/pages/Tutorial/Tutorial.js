import React from 'react';
import BackgroundImg from "./styled-components/BackgroundImg";
import tutorialFrame1 from '../../../assets/images/tutorial-frame-1.png';
import {Helmet} from "react-helmet";
import MainContainer from "./styled-components/MainContainer";
import CenterDiv from "./styled-components/CenterDiv";
import TutorialStepDescribe from "../../components/tutorial/atoms/TutorialStepDescribe";
import fast from '../../../assets/icons/fast.svg';
import theme from "../../utils/theme";
import ContainerWithBackground from "./styled-components/ContainerWithBackground";
import {nextStepAnimationDuration} from "../../utils/globals";

class Tutorial extends React.Component {
    state = {
        initBackgroundScale: 0,
        initInfoTranslateX: '100vw',
    }

    componentDidMount() {
        this.initAnimation();
    }

    initAnimation = () => {
        setTimeout(() => {
            this.setState({
                initBackgroundScale: 1,
            });
        }, 10);

        setTimeout(() => {
            this.setState({
                initInfoTranslateX: '0',
            });
        }, nextStepAnimationDuration * 3);
    }

    nextStep = () => {

    }

    render() {
        return (
            <>
                <Helmet>
                    <title>Samouczek</title>
                </Helmet>
                <MainContainer>
                    <BackgroundImg setScale={this.state.initBackgroundScale} src={tutorialFrame1}/>
                    <CenterDiv>
                        <ContainerWithBackground setTranslateX={this.state.initInfoTranslateX}>
                            <TutorialStepDescribe
                                gap={'20px'} headerAs={'h1'} header={'Tryb Battle'}
                                firstParagraph={`Jesteś własnie w widoku pojedynku z przeciwnikiem. 
                                To Tryb Battle - główne miejsce w WMI Adventure, gdzie odbywają się 
                                heroiczne pojedynki z innymi członkami społeczności WMI.`}
                                secondParagraph={`Twoim celem jest pokonanie przeciwnika 
                                - zbicie jego punktów HP do 0.`}
                                buttonLabel={'Ok'} buttonIcon={fast}
                                buttonHandler={this.nextStep} buttonColor={theme.colors.dark}/>
                        </ContainerWithBackground>
                    </CenterDiv>
                </MainContainer>
            </>
        );
    }
}

export default Tutorial;