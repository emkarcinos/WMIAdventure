import React from 'react';
import H2 from './styled-components/H2';
import P from './styled-components/P';
import Section from './styled-components/Section';
import Button from './styled-components/Button';

class CardDescribePreview extends React.Component {
    render() {
        return (
            <>
                <Section>
                    <H2>
                        {this.props.cardName}
                    </H2>
                    <P>
                        {this.props.cardSubject}
                    </P>
                    <P tooltip>
                        {this.props.cardTooltip}
                    </P>
                </Section>
                <Button onClick={this.props.showDescribeInputsHandler}>
                    {/*pensil icon*/}
                </Button>
            </>
        );
    }
}

export default CardDescribePreview;