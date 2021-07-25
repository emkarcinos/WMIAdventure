import React from 'react';
import Header from "./styled-components/Header";
import InfoText from "./styled-components/InfoText";
import DivTextArea from "./styled-components/DivTextArea";
import TextAreaLabel from "./styled-components/TextAreaLabel";
import TextArea from "./styled-components/TextArea";
import DivButtons from "./styled-components/DivButtons";
import Button from "./styled-components/Button";

class BeforeSendCard extends React.Component {
    render() {
        return (
            <>
                <Header>Wyślij</Header>
                <InfoText>
                    Możesz dołączyć dodatkową wiadomość dla administratorów weryfikujących kartę.
                </InfoText>
                <DivTextArea>
                    <TextAreaLabel htmlFor='additionalComments'>Wiadomość</TextAreaLabel>
                    <TextArea id='additionalComments' name='additionalComments' type='text'
                              placeholder={'Wiadomość'} onChange={this.props.additionalCommentsInputHandler}>
                    </TextArea>
                </DivTextArea>
                <DivButtons>
                    <Button onClick={this.props.hideSendCardPopupHandler}>Wróć</Button>
                    <Button type='submit' onClick={this.props.sendCard}>Wyślij</Button>
                </DivButtons>
            </>
        )
    }
}

export default BeforeSendCard;