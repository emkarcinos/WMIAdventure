import React from "react";
import Header from "../../../card-editor/atoms/AfterSendCard/styled-components/Header";
import InfoText from "../../../card-editor/atoms/AfterSendCard/styled-components/InfoText";
import {Transition} from "react-transition-group";
import FadeInContainer from "../../../card-editor/molecules/SendCardPopup/styled-components/FadeInContainer";
import CenteringContainer from "../../../card-editor/molecules/SendCardPopup/styled-components/CenteringContainer";
import PopupContainer from "../../../card-editor/molecules/SendCardPopup/styled-components/PopupContainer";
import ContentContainer from "../../../card-editor/molecules/SendCardPopup/styled-components/ContentContainer";
import TransparentBack from "../../../card-editor/molecules/SendCardPopup/styled-components/TransparentBack";
import theme from "../../../../utils/theme";
import xClose from "../../../../../assets/icons/x-close.svg";
import ButtonWithIcon from "../ButtonWithIcon";

export const timeout = {
    appear: 50,
    enter: 50,
    exit: 500
};

class GenericPopup extends React.Component {
    render() {
        return (
            <Transition in={this.props.show} timeout={timeout}>
                {state => (
                    <FadeInContainer transitionState={state}>
                        <CenteringContainer>
                            <PopupContainer>
                                <ContentContainer>
                                    <Header>{this.props.header}</Header>
                                    <InfoText>{this.props.text}</InfoText>
                                    {this.props.text2 ? <InfoText>{this.props.text2}</InfoText> : null}
                                    {this.props.text3 ? <InfoText>{this.props.text3}</InfoText> : null}
                                    <ButtonWithIcon handler={this.props.onClickHandler}
                                                    color={theme.colors.yellowyOrangy} icon={xClose}>
                                        {this.props.buttonText}
                                    </ButtonWithIcon>
                                </ContentContainer>
                            </PopupContainer>
                        </CenteringContainer>

                        <TransparentBack onClick={this.props.onClickHandler}>
                        </TransparentBack>
                    </FadeInContainer>
                )}
            </Transition>

        );
    }
}

export default GenericPopup;
