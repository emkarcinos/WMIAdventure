import React from 'react';
import CenteringContainer from "./styled-components/CenteringContainer";
import TransparentBack from "./styled-components/TransparentBack";
import PopupContainer from "./styled-components/PopupContainer";
import ContentContainer from "./styled-components/ContentContainer";
import BeforeSendCard from "../../atoms/BeforeSendCard";
import AfterSendCard from "../../atoms/AfterSendCard";
import { Transition } from 'react-transition-group';
import FadeInContainer from "./styled-components/FadeInContainer";

/* Transition timeout values */
export const timeout = {
    appear: 50,
    enter: 50,
    exit: 500
};

class SendCardPopup extends React.Component {
    chooseComponent() {
        if(!this.props.showSendMessage){
            return <BeforeSendCard hideSendCardPopupHandler={this.props.hideSendCardPopupHandler}
                                   sendCard={this.props.sendCard}
                                   commentInputHandler={this.props.commentInputHandler}/>
        }
        else {
            return <AfterSendCard hideSendCardPopupHandler={this.props.hideSendCardPopupHandler}
                                  sendSucess={this.props.sendSuccess}
                                  failedSubmissionMsg={this.props.failedSubmissionMsg}/>
        }
    }

    render() {
        return (
            <Transition in={this.props.show} timeout={timeout}>
                {state => (
                    <FadeInContainer transitionState={state}>
                        <CenteringContainer>
                            <PopupContainer>
                                <ContentContainer>
                                    {this.chooseComponent()}
                                </ContentContainer>
                            </PopupContainer>
                        </CenteringContainer>

                        <TransparentBack onClick={this.props.hideSendCardPopupHandler}>
                        </TransparentBack>
                    </FadeInContainer>
                )}
            </Transition>

        );
    }
}

export default SendCardPopup;