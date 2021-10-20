import React from 'react';
import Article from './styled-components/Article';
import H4 from './styled-components/H4';
import Psubject from './styled-components/Psubject';
import Ptooltip from './styled-components/Ptooltip';

class CardPreview extends React.Component {
    render() {
        return (
            <Article>
                <H4>
                    {this.props.name}
                </H4>
                <Psubject>
                    {this.props.subject}
                </Psubject>
                <Ptooltip>
                    {this.props.tooltip}
                </Ptooltip>
            </Article>
        );
    }
}

export default CardPreview;