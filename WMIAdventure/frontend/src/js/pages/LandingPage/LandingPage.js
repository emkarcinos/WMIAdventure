import React from 'react';
import Main from "./styled-components/Main";
import LandingNavBar from "../../components/landing-page/molecules/LandingNavBar";
import LandingHeroSection from "../../components/landing-page/molecules/LandingHeroSection";

class LandingPage extends React.Component {
    render() {
        return (
            <>
                <LandingNavBar/>
                <Main>
                    <LandingHeroSection/>
                </Main>
            </>
        );
    }
}

export default LandingPage;