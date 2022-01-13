import React from 'react';
import BackgroundImg from "./styled-components/BackgroundImg";
import tutorialFrame1 from '../../../assets/images/tutorial-frame-1.png';
import {Helmet} from "react-helmet";
import MainContainer from "./styled-components/MainContainer";

class Tutorial extends React.Component {
    render() {
        return (
            <>
                <Helmet>
                    <title>Samouczek</title>
                </Helmet>
                <MainContainer>
                    <BackgroundImg src={tutorialFrame1}/>
                </MainContainer>
            </>
        );
    }
}

export default Tutorial;