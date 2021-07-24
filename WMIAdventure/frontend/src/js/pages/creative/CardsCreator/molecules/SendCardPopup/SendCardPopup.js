import React from 'react';
import CenteringContainer from "./styled-components/CenteringContainer";
import TransparentBack from "./styled-components/TransparentBack";
import PopupContainer from "./styled-components/PopupContainer";
import ContentContainer from "./styled-components/ContentContainer";
import InfoText from "./styled-components/InfoText";
import Header from "./styled-components/Header";
import DivTextArea from "./styled-components/DivTextArea";
import TextAreaLabel from "./styled-components/TextAreaLabel";
import TextArea from "./styled-components/TextArea";
import DivButtons from "./styled-components/DivButtons";
import Button from "./styled-components/Button";

class SendCardPopup extends React.Component {
    render() {
        return (
            <>
                <TransparentBack show={this.props.show} onClick={this.props.hideSendCardPopupHandler}>
                </TransparentBack>

                <CenteringContainer show={this.props.show}>
                    <PopupContainer>
                        <ContentContainer>
                            <Header>Wyślij</Header>
                            <InfoText>
                                Możesz dołączyć dodatkową wiadomość dla administratorów weryfikujących kartę.
                            </InfoText>
                            <DivTextArea>
                                <TextAreaLabel htmlFor='additionalComments'>Wiadomość</TextAreaLabel>
                                <TextArea id='additionalComments' name='additionalComments' type='text'
                                          placeholder={'Wiadomość'}>
                                </TextArea>
                            </DivTextArea>
                            <DivButtons>
                                <Button onClick={this.props.hideSendCardPopupHandler}>Wróć</Button>
                                <Button>Wyślij</Button>
                            </DivButtons>
                        </ContentContainer>
                    </PopupContainer>
                </CenteringContainer>
            </>

        );
    }
}

export default SendCardPopup;