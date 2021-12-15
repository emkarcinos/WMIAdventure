import React from 'react';
import Main from "./styled-components/Main";
import LandingNavBar from "../../components/landing-page/molecules/LandingNavBar";
import LandingHeroSection from "../../components/landing-page/molecules/LandingHeroSection";
import LandingArticle from "../../components/landing-page/molecules/LandingArticle";
import cardIcon from '../../../assets/images/cardIcon.png';

class LandingPage extends React.Component {
    render() {
        return (
            <>
                <LandingNavBar/>
                <Main>
                    <LandingHeroSection/>
                    <LandingArticle header='Karty ze świata informatyki'
                                    image={cardIcon}
                                    paragraph='Podczas studiów oraz przygód z programowaniem poznajemy wiele różnych
                                    rzeczy oraz pojęć. Czasami wręcz nie możemy zapomnieć o pewnych technologicznych
                                    niuansach czy przeżyciach. Bez obaw! WMI Adventure sprawi, że te wspomnienia
                                    jeszcze bardziej będą Cię nękać, wszystko w tej aplikacji
                                    opiera się na reprezentujących je kartach.'/>
                </Main>
            </>
        );
    }
}

export default LandingPage;