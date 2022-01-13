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

        initInfo: {
            visible: true,
            translateX: '100vw',
        },

        info2: {
            visible: false,
            translateX: '100vw',
        },
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
                initInfo: {
                    visible: true,
                    translateX: '0',
                },
            });
        }, nextStepAnimationDuration * 3);
    }

    step1 = () => {
        this.setState({
            initInfo: {
                visible: true,
                translateX: '-100vw',
            }
        });

        setTimeout(() => {
            this.setState({
                initInfo: {
                    visible: false,
                    translateX: '-100vw',
                },
                info2: {
                    visible: true,
                    translateX: '100vw',
                }
            });
        }, nextStepAnimationDuration);

        setTimeout(() => {
            this.setState({
                info2: {
                    visible: true,
                    translateX: '0',
                }
            });
        }, nextStepAnimationDuration * 2);
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
                        <ContainerWithBackground visible={this.state.initInfo.visible}
                                                 setTranslateX={this.state.initInfo.translateX}>
                            <TutorialStepDescribe
                                gap={'20px'} headerAs={'h1'} header={'Tryb Battle'}
                                firstParagraph={`Jesteś własnie w widoku pojedynku z przeciwnikiem. 
                                To Tryb Battle - główne miejsce w WMI Adventure, gdzie odbywają się 
                                heroiczne pojedynki z innymi członkami społeczności WMI.`}
                                secondParagraph={`Twoim celem jest pokonanie przeciwnika 
                                - zbicie jego punktów HP do 0.`}
                                buttonLabel={'Ok'} buttonIcon={fast}
                                buttonHandler={this.step1} buttonColor={theme.colors.dark}/>
                        </ContainerWithBackground>
                        <ContainerWithBackground visible={this.state.info2.visible}
                                                 setTranslateX={this.state.info2.translateX}>
                            <TutorialStepDescribe
                                containerAs={'section'} gap={'20px'} header={'Talia kart'}
                                firstParagraph={`Karty to miecz i tarcza każdego wojownika. Ułożone są w 
                                pięcioelementową talię, ich kolejność jest kluczowa. Podczas kolejnych tur 
                                pojedynku karty wykonują się po kolei, jedna na turę. `}
                                secondParagraph={`Nie mamy możliwości manipulowania kartami podczas 
                                trwania pojedynku - talię ustawiamy przed pojedynkami.`}
                                buttonLabel={'Ok'} buttonIcon={fast}
                                buttonHandler={this.step1} buttonColor={theme.colors.dark}/>
                        </ContainerWithBackground>
                    </CenterDiv>
                </MainContainer>
            </>
        );
    }
}

export default Tutorial;