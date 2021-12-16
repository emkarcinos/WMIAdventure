import React from 'react';
import Main from "./styled-components/Main";
import LandingNavBar from "../../components/landing-page/molecules/LandingNavBar";
import LandingHeroSection from "../../components/landing-page/molecules/LandingHeroSection";
import LandingArticle from "../../components/landing-page/molecules/LandingArticle";
import LandingSection from "../../components/landing-page/organisms/LandingSection";
import LandingFooter from "../../components/landing-page/atoms/LandingFooter";
import content from "./content";

class LandingPage extends React.Component {
    render() {
        return (
            <>
                <LandingNavBar/>
                <Main>
                    <LandingHeroSection/>
                    <LandingSection>
                        <LandingArticle header={content.article1.header}
                                        image={content.article1.image}
                                        paragraph={content.article1.paragraph}/>
                        <LandingArticle header={content.article2.header}
                                        image={content.article2.image}
                                        paragraph={content.article2.paragraph}/>
                        <LandingArticle header={content.article3.header}
                                        image={content.article3.image}
                                        paragraph={content.article3.paragraph}/>
                        <LandingArticle header={content.article4.header}
                                        image={content.article4.image}
                                        paragraph={content.article4.paragraph}/>
                        <LandingArticle header={content.article5.header}
                                        image={content.article5.image}
                                        paragraph={content.article5.paragraph}/>
                        <LandingArticle header={content.article6.header}
                                        image={content.article6.image}
                                        paragraph={content.article6.paragraph}/>
                    </LandingSection>
                </Main>
                <LandingFooter/>
            </>
        );
    }
}

export default LandingPage;