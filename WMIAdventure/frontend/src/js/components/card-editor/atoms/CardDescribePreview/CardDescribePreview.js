import React from 'react';
import H1 from './styled-components/H1';
import P from './styled-components/P';
import Section from './styled-components/Section';
import Pencil from "./styled-components/Pencil";
import Container from "./styled-components/Container";
import Button from "./styled-components/Button"
import ImagePreview from "./styled-components/ImagePreview";
import upload_image from "../../../../../assets/icons/upload_image.svg";

class CardDescribePreview extends React.Component {

    handlePropsLength = (props) => {
        try {
            if(props.length) return props.length;
        } catch (e) {
            return 0;
        }

    }

    render() {
        return (
            <Container>
                {/* Button which is positioned over whole container so that the content is clickable */}
                <Button onClick={this.props.showDescribeInputsHandler}>
                </Button>

                <ImagePreview src={this.props.cardImage ? this.props.cardImage : upload_image} alt="Image for card." />

                {/* Main content section */}
                <Section>
                    <H1 len={this.handlePropsLength(this.props.cardName)}>
                        {this.props.cardName ? this.props.cardName : 'Nazwa karty'}
                    </H1>
                    <P len={this.handlePropsLength(this.props.cardSubject)}>
                        {this.props.cardSubject ? this.props.cardSubject : 'Przedmiot'}
                    </P>
                    <P tooltip len={this.handlePropsLength(this.props.cardTooltip)}>
                        {this.props.cardTooltip ? this.props.cardTooltip : 'Opis Karty'}
                    </P>
                </Section>

                {/* Pencil icon */}
                <Pencil>
                </Pencil>

            </Container>
        );
    }
}

export default CardDescribePreview;