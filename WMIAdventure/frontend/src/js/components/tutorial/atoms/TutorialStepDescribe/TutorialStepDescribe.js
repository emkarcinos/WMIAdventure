import React from 'react';
import Header from "./styled-components/Header";
import Paragraph from "./styled-components/Paragraph";
import ColumnGapContainer from "../../../global/molecules/ColumnGapContainer";
import ButtonWithIcon from "../../../global/atoms/ButtonWithIcon";
import UserLabel from "../../../global/atoms/UserLabel";

class TutorialStepDescribe extends React.Component {
    render() {
        return (
            <ColumnGapContainer as={this.props.containerAs ? this.props.containerAs : 'div'}
                                gap={this.props.gap}>
                <Header as={this.props.headerAs ? this.props.headerAs : 'h2'}>
                    {this.props.header}
                </Header>
                <Paragraph>
                    {this.props.firstParagraph}
                </Paragraph>
                <Paragraph>
                    {this.props.secondParagraph}
                </Paragraph>
                {this.props.userLabel ? <UserLabel skillPoints={true} number={'25'} setMargin={'0'}/> : null}
                <ButtonWithIcon handler={this.props.buttonHandler} icon={this.props.buttonIcon}
                                color={this.props.buttonColor}>
                    {this.props.buttonLabel}
                </ButtonWithIcon>
            </ColumnGapContainer>
        );
    }
}

export default TutorialStepDescribe;