import React from 'react';
import BackgroundImg from "./styled-components/BackgroundImg";
import tutorialFrame1 from '../../../assets/images/tutorial-frame-1.png';
import tutorialFrame2 from '../../../assets/images/tutorial-frame-2.png';
import tutorialFrame3 from '../../../assets/images/tutorial-frame-3.png';
import tutorialFrame4 from '../../../assets/images/tutorial-frame-4.png';
import tutorialFrame5 from '../../../assets/images/tutorial-frame-5.png';
import tutorialFrame6 from '../../../assets/images/tutorial-frame-6.png';
import tutorialFrame7 from '../../../assets/images/tutorial-frame-7.png';
import tutorialFrameDesktop1 from '../../../assets/images/tutorial-frame-desktop1.png';
import {Helmet} from "react-helmet";
import StepContainer from "./styled-components/StepContainer";
import CenterDiv from "./styled-components/CenterDiv";
import TutorialStepDescribe from "../../components/tutorial/atoms/TutorialStepDescribe";
import fast from '../../../assets/icons/fast.svg';
import theme from "../../utils/theme";
import TextContainer from "./styled-components/TextContainer";
import {desktop, mobile, nextStepAnimationDuration} from "../../utils/globals";
import EndDiv from "./styled-components/EndDiv";
import TextBorderContainer from "./styled-components/TextBorderContainer";
import MainContainer from "./styled-components/MainContainer";
import Media from "react-media";


class Tutorial extends React.Component {
    state = {
        initBackgroundScale: 0,

        initInfo: {
            visible: true,
            textTranslateX: '100vw',
            containerTranslateX: '0',
        },

        info2: {
            visible: false,
            translateX: '100vw',
        },

        info3: {
            visible: false,
            translateX: '100vw',
        },

        info4: {
            visible: false,
            translateX: '100vw',
        },

        info5: {
            visible: false,
            translateX: '100vw',
        },

        info6: {
            visible: false,
            translateX: '100vw',
        },

        info7: {
            visible: false,
            translateX: '100vw',
        },
    }

    componentDidMount() {
        this.initStep();
    }

    initStep = () => {
        setTimeout(() => {
            this.setState({
                initBackgroundScale: 1,
            });
        }, 10);

        setTimeout(() => {
            this.setState({
                initInfo: {
                    visible: true,
                    textTranslateX: '0',
                    containerTranslateX: '0',
                },
            });
        }, nextStepAnimationDuration * 3);
    }

    step2 = () => {
        this.setState({
            initInfo: {
                visible: true,
                textTranslateX: '-100vw',
                containerTranslateX: '-100vw',
            },
            info2: {
                visible: true,
                translateX: '100vw',
            }
        });

        setTimeout(() => {
            this.setState({
                initInfo: {
                    visible: false,
                    textTranslateX: '-100vw',
                    containerTranslateX: '-100vw',
                },
                info2: {
                    visible: true,
                    translateX: '0',
                }
            });
        }, nextStepAnimationDuration);
    }

    step3 = () => {
        this.setState({
            info2: {
                visible: true,
                translateX: '-100vw',
            },
            info3: {
                visible: true,
                translateX: '100vw',
            }
        });

        setTimeout(() => {
            this.setState({
                info2: {
                    visible: false,
                    translateX: '-100vw',
                },
                info3: {
                    visible: true,
                    translateX: '0',
                }
            });
        }, nextStepAnimationDuration);
    }

    step4 = () => {
        this.setState({
            info3: {
                visible: true,
                translateX: '-100vw',
            },
            info4: {
                visible: true,
                translateX: '100vw',
            }
        });

        setTimeout(() => {
            this.setState({
                info3: {
                    visible: false,
                    translateX: '-100vw',
                },
                info4: {
                    visible: true,
                    translateX: '0',
                }
            });
        }, nextStepAnimationDuration);
    }

    step5 = () => {
        this.setState({
            info4: {
                visible: true,
                translateX: '-100vw',
            },
            info5: {
                visible: true,
                translateX: '100vw',
            }
        });

        setTimeout(() => {
            this.setState({
                info4: {
                    visible: false,
                    translateX: '-100vw',
                },
                info5: {
                    visible: true,
                    translateX: '0',
                }
            });
        }, nextStepAnimationDuration);
    }

    step6 = () => {
        this.setState({
            info5: {
                visible: true,
                translateX: '-100vw',
            },
            info6: {
                visible: true,
                translateX: '100vw',
            }
        });

        setTimeout(() => {
            this.setState({
                info5: {
                    visible: false,
                    translateX: '-100vw',
                },
                info6: {
                    visible: true,
                    translateX: '0',
                }
            });
        }, nextStepAnimationDuration);
    }

    step7 = () => {
        this.setState({
            info6: {
                visible: true,
                translateX: '-100vw',
            },
            info7: {
                visible: true,
                translateX: '100vw',
            }
        });

        setTimeout(() => {
            this.setState({
                info6: {
                    visible: false,
                    translateX: '-100vw',
                },
                info7: {
                    visible: true,
                    translateX: '0',
                }
            });
        }, nextStepAnimationDuration);
    }

    goToProfile = () => {
        this.props.history.push(`profile`);
    }

    renderInitStep() {
        if (this.state.initInfo.visible) {
            return (
                <StepContainer setTranslateX={this.state.initInfo.containerTranslateX}>
                    <Media query={mobile}>
                        <BackgroundImg setScale={this.state.initBackgroundScale} src={tutorialFrame1}/>
                    </Media>
                    <Media query={desktop}>
                        <BackgroundImg setScale={this.state.initBackgroundScale} src={tutorialFrameDesktop1}/>
                    </Media>
                    <CenterDiv setTranslateX={this.state.initInfo.textTranslateX}>
                        <TextContainer>
                            <TutorialStepDescribe
                                gap={'20px'} headerAs={'h1'} header={'Tryb Battle'}
                                firstParagraph={`Jesteś własnie w widoku pojedynku z przeciwnikiem. 
                                        To Tryb Battle - główne miejsce w WMI Adventure, gdzie odbywają się 
                                        heroiczne pojedynki z innymi członkami społeczności WMI.`}
                                secondParagraph={`Twoim celem jest pokonanie przeciwnika 
                                        - zbicie jego punktów HP do 0.`}
                                buttonLabel={'Ok'} buttonIcon={fast}
                                buttonHandler={this.step2} buttonColor={theme.colors.dark}/>
                        </TextContainer>
                    </CenterDiv>
                </StepContainer>
            );
        }
    }

    renderStep2() {
        if (this.state.info2.visible) {
            return (
                <StepContainer setTranslateX={this.state.info2.translateX}>
                    <BackgroundImg setScale={'1'} src={tutorialFrame2}/>
                    <CenterDiv>
                        <TextContainer>
                            <TutorialStepDescribe
                                containerAs={'section'} gap={'20px'} header={'Talia kart'}
                                firstParagraph={`Karty to miecz i tarcza każdego wojownika. Ułożone są w 
                                    pięcioelementową talię, ich kolejność jest kluczowa. Podczas kolejnych tur 
                                    pojedynku karty wykonują się po kolei, jedna na turę. `}
                                secondParagraph={`Nie mamy możliwości manipulowania kartami podczas 
                                    trwania pojedynku - talię ustawiamy przed pojedynkami.`}
                                buttonLabel={'Ok'} buttonIcon={fast}
                                buttonHandler={this.step3} buttonColor={theme.colors.dark}/>
                        </TextContainer>
                    </CenterDiv>
                </StepContainer>
            );
        }
    }

    renderStep3() {
        if (this.state.info3.visible) {
            return (
                <StepContainer setAlignment={'flex-start'} setTranslateX={this.state.info3.translateX}>
                    <BackgroundImg setScale={'1'} src={tutorialFrame3}/>
                    <EndDiv>
                        <TextBorderContainer>
                            <TutorialStepDescribe
                                containerAs={'section'} gap={'20px'} header={'Karta'}
                                firstParagraph={`Działanie kart to zestaw efektów, które wpływają na statystyki graczy, 
                                ich talie i poszczególne karty. Część z nich ma określoną moc. 
                                Efekty mogą też wzmacniać inne karty - prawidłowe ułożenie talii 
                                uczyni z nas najlepszych wojowników. `}
                                secondParagraph={`Podczas trwania danej tury to właśnie efekty 
                                grają kluczową rolę w rozgrywce.`}
                                buttonLabel={'Ok'} buttonIcon={fast}
                                buttonHandler={this.step4} buttonColor={theme.colors.dark}/>
                        </TextBorderContainer>
                    </EndDiv>
                </StepContainer>
            );
        }
    }

    renderStep4() {
        if (this.state.info4.visible) {
            return (
                <StepContainer setAlignment={'flex-start'} setTranslateX={this.state.info4.translateX}>
                    <BackgroundImg setScale={'1'} src={tutorialFrame4}/>
                    <EndDiv>
                        <TextBorderContainer>
                            <TutorialStepDescribe
                                containerAs={'section'} gap={'20px'} header={'Tura'}
                                firstParagraph={`Podczas trwania jednej tury, karta 
                                na wierzchu talii gracza wykonuje swoje efekty.`}
                                buttonLabel={'Ok'} buttonIcon={fast}
                                buttonHandler={this.step5} buttonColor={theme.colors.dark}/>
                        </TextBorderContainer>
                    </EndDiv>
                </StepContainer>
            );
        }
    }

    renderStep5() {
        if (this.state.info5.visible) {
            return (
                <StepContainer setTranslateX={this.state.info5.translateX}>
                    <BackgroundImg setScale={'1'} src={tutorialFrame5}/>
                    <CenterDiv>
                        <TextContainer>
                            <TutorialStepDescribe
                                containerAs={'section'} gap={'20px'} header={'Koniec tury'}
                                firstParagraph={`Tura kończy się po wykonaniu wszystkich efektów karty. 
                                Ta karta trafia teraz na spód talii i następna oczekuję na swoją kolejkę.`}
                                secondParagraph={`Następny ruch należy do przeciwnika.`}
                                buttonLabel={'Ok'} buttonIcon={fast}
                                buttonHandler={this.step6} buttonColor={theme.colors.dark}/>
                        </TextContainer>
                    </CenterDiv>
                </StepContainer>
            );
        }
    }

    renderStep6() {
        if (this.state.info6.visible) {
            return (
                <StepContainer setTranslateX={this.state.info6.translateX}>
                    <BackgroundImg setScale={'1'} src={tutorialFrame6}/>
                    <CenterDiv>
                        <TextBorderContainer setMargin={'0 0 200px 0'}>
                            <TutorialStepDescribe
                                containerAs={'section'} gap={'20px'} header={'Przyciski'}
                                firstParagraph={`Podczas pojedynku mamy dyspozycji 
                                trzy przyciski ułatwiające sterowanie całym trybem.`}
                                buttonLabel={'Ok'} buttonIcon={fast}
                                buttonHandler={this.step7} buttonColor={theme.colors.dark}/>
                        </TextBorderContainer>
                    </CenterDiv>
                </StepContainer>
            );
        }
    }

    renderStep7() {
        if (this.state.info7.visible) {
            return (
                <StepContainer setTranslateX={this.state.info7.translateX}>
                    <BackgroundImg setScale={'1'} src={tutorialFrame7}/>
                    <EndDiv>
                        <TextBorderContainer>
                            <TutorialStepDescribe
                                containerAs={'section'} gap={'20px'} header={'Koniec walki'}
                                firstParagraph={`Po wygranej walce zdobywamy punkty EXP, które liczą się do 
                                naszego poziomu. Za pojedynki z graczami o najwyższych poziomach 
                                dostaniemy najwięcej takich punktów.`}
                                secondParagraph={`Awans na kolejny poziom skutkuje zdobywaniem Punktów Nauki, 
                                które pozwolą nam ulepszać nasze karty na wyższe poziomy, przez co staną się 
                                silniejsze i będziemy mogli pokonywać przeciwników z łatwością.`}
                                buttonLabel={'Ok'} buttonIcon={fast} userLabel={true}
                                buttonHandler={this.goToProfile} buttonColor={theme.colors.dark}/>
                        </TextBorderContainer>
                    </EndDiv>
                </StepContainer>
            );
        }
    }

    render() {
        return (
            <>
                <Helmet>
                    <title>Samouczek</title>
                </Helmet>
                <MainContainer>
                    {this.renderInitStep()}
                    {this.renderStep2()}
                    {this.renderStep3()}
                    {this.renderStep4()}
                    {this.renderStep5()}
                    {this.renderStep6()}
                    {this.renderStep7()}
                </MainContainer>
            </>
        );
    }
}

export default Tutorial;