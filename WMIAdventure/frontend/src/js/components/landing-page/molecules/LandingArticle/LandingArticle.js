import React from 'react';
import Article from "./styled-components/Article";
import Div from "./styled-components/Div";
import H2 from "./styled-components/H2";
import Image from "./styled-components/Image";
import Paragraph from "./styled-components/Paragraph";

class LandingArticle extends React.Component {
    render() {
        return (
            <Article>
                <Div>
                    <H2>
                        {this.props.header}
                    </H2>
                    <Image src={this.props.image}/>
                </Div>
                <Paragraph>
                    {this.props.paragraph}
                </Paragraph>
            </Article>
        );
    }
}

export default LandingArticle;