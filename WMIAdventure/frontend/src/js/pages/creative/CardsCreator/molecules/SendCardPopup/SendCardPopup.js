import React from 'react';
import CenteringContainer from "./styled-components/CenteringContainer";
import TransparentBack from "./styled-components/TransparentBack";
import PopupContainer from "./styled-components/PopupContainer";
import ContentContainer from "./styled-components/ContentContainer";
import BeforeSendCard from "../../atoms/BeforeSendCard";

class SendCardPopup extends React.Component {
    render() {
        return (
            <>
                <TransparentBack show={this.props.show} onClick={this.props.hideSendCardPopupHandler}>
                </TransparentBack>

                <CenteringContainer show={this.props.show}>
                    <PopupContainer>
                        <ContentContainer>
                            <BeforeSendCard hideSendCardPopupHandler={this.props.hideSendCardPopupHandler} />
                        </ContentContainer>
                    </PopupContainer>
                </CenteringContainer>
            </>

        );
    }
}

export default SendCardPopup;