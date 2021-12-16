import React from 'react';
import Main from "./styled-components/Main";
import LandingNavBar from "../../components/landing-page/molecules/LandingNavBar";
import LandingHeroSection from "../../components/landing-page/molecules/LandingHeroSection";
import LandingArticle from "../../components/landing-page/molecules/LandingArticle";
import LandingSection from "../../components/landing-page/organisms/LandingSection";
import LandingFooter from "../../components/landing-page/atoms/LandingFooter";
import content from "./content";

function LandingPage() {

    const targetRef = React.useRef(null);
    const [heroVisible, setHeroVisible] = React.useState(true);

    const callbackFunction = entries => {
        const entry = entries[0];
        setHeroVisible(entry.isIntersecting);
    }

    const options = React.useMemo(() => {
        return {
            root: null,
            rootMargin: '-40px',
            threshold: 0
        }
    }, []);

    React.useEffect(() => {
        const observer = new IntersectionObserver(callbackFunction, options);
        const currentTarget = targetRef.current;
        if (currentTarget)
            observer.observe(currentTarget);
        return () => {
            if (currentTarget)
                observer.unobserve(currentTarget);
        }
    }, [targetRef, options]);

    return (
        <>
            <LandingNavBar showBackground={!heroVisible}/>
            <Main>
                <LandingHeroSection setRef={targetRef}/>
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

export default LandingPage;