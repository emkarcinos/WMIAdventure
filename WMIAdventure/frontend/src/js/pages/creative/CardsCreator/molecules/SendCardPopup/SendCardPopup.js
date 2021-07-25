import React from 'react';
import CenteringContainer from "./styled-components/CenteringContainer";
import TransparentBack from "./styled-components/TransparentBack";
import PopupContainer from "./styled-components/PopupContainer";
import ContentContainer from "./styled-components/ContentContainer";
import BeforeSendCard from "../../atoms/BeforeSendCard";
import AfterSendCard from "../../atoms/AfterSendCard";

class SendCardPopup extends React.Component {
    chooseComponent() {
        if(!this.props.showSendMessage){
            return <BeforeSendCard hideSendCardPopupHandler={this.props.hideSendCardPopupHandler}
                                   sendCard={this.props.sendCard} />
        }
        else {
            return <AfterSendCard hideSendCardPopupHandler={this.props.hideSendCardPopupHandler}
                                  sendSucess={this.props.sendSuccess}/>
        }
    }

    render() {
        return (
            <>
                <TransparentBack show={this.props.show} onClick={this.props.hideSendCardPopupHandler}>
                </TransparentBack>

                <CenteringContainer show={this.props.show}>
                    <PopupContainer>
                        <ContentContainer>
                            {this.chooseComponent()}
                        </ContentContainer>
                    </PopupContainer>
                </CenteringContainer>
            </>

        );
    }
}

export default SendCardPopup;