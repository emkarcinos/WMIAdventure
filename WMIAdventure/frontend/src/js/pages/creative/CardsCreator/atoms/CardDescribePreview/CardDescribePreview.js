import React from 'react';
import H1 from './styled-components/H1';
import P from './styled-components/P';
import Section from './styled-components/Section';
import Pencil from "./styled-components/Pencil";
import Container from "./styled-components/Container";

class CardDescribePreview extends React.Component {
    render() {
        return (
            <Container onClick={this.props.showDescribeInputsHandler}>
                {/* Pencil icon */}
                <Pencil>
                </Pencil>

                {/* Main content section */}
                <Section>
                    <H1>
                        {this.props.cardName}
                    </H1>
                    <P>
                        {this.props.cardSubject}
                    </P>
                    <P tooltip>
                        {this.props.cardTooltip}
                    </P>
                </Section>

                {/* Invisible pencil used to center main section in container flexbox */}
                <Pencil invisible={true}>
                </Pencil>
            </Container>
        );
    }
}

export default CardDescribePreview;