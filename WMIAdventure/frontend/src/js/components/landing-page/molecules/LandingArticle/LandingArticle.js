import React from 'react';
import Article from "./styled-components/Article";
import Div from "./styled-components/Div";
import H3 from "./styled-components/H3";
import Image from "./styled-components/Image";
import Paragraph from "./styled-components/Paragraph";

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
                <Paragraph>
                    {this.props.paragraph}
                </Paragraph>
            </Article>
        );
    }
}

export default LandingArticle;