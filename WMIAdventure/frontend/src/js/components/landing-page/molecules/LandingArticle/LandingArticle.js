import React from 'react';
import Article from "./styled-components/Article";
import Div from "./styled-components/Div";
import H3 from "./styled-components/H3";
import Image from "./styled-components/Image";
import Paragraph from "./styled-components/Paragraph";
import Line from "./styled-components/Line";
import RepoLink from "../../../../pages/LandingPage/styled-components/RepoLink";

class LandingArticle extends React.Component {
    render() {
        return (
            <Article>
                <Div>
                    <H3>
                        {this.props.header}
                    </H3>
                    <Image src={this.props.image}/>
                </Div>
                {this.props.github ?
                    <Paragraph>
                        Jesteś ciekawy jak aplikacja jest zbudowana?
                        Chciałbyś zaproponować lub wprowadzić własne zmiany?
                        Nie ma problemu! WMI Adventure to projekt open source,
                        który jest otwarty na wszelkie sugestie i rozwój.
                        Zapraszamy na nasze&nbsp;
                        <RepoLink target='_blank' href='https://github.com/emkarcinos/WMIAdventure'>
                            repozytorium
                        </RepoLink>
                        &nbsp;na githubie po więcej informacji.
                    </Paragraph> :
                    <Paragraph>
                        {this.props.paragraph}
                    </Paragraph>
                }

                {
                    this.props.line ?
                        <Line/>
                        : null
                }
            </Article>
        );
    }
}

export default LandingArticle;