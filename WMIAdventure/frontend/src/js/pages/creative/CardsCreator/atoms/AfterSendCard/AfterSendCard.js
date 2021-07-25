import React from 'react';
import Header from "./styled-components/Header";
import InfoText from "./styled-components/InfoText";
import DivButtons from "./styled-components/DivButtons";
import Button from "./styled-components/Button";

class AfterSendCard extends React.Component {
    headerContent(){
        if(this.props.sendSucess){
            return 'Sukces!'
        }
        return 'Nie udało się wysłać karty.'
    }

    infoText(){
        if(this.props.sendSucess){
            return (
                <InfoText>
                    Karta została pomyślnie wysłana do weryfikacji.
                    Zostaniesz powiadomiony, gdy karta zostanie zaakceptowana / odrzucona.
                </InfoText>
            )
        }
        else {
            return (
                <>
                    <InfoText>
                        Coś poszło nie tak!
                    </InfoText>
                    <InfoText>
                        Odpowiedź od serwera dlaczego request nie został przyjęty.
                    </InfoText>
                </>
            )
        }
    }

    buttonContent(){
        if(this.props.sendSucess){
            return 'OK'
        }
        return 'Powrót do edycji'
    }

    render() {
        return (
            <>
                <Header>{this.headerContent()}</Header>

                {this.infoText()}

                <DivButtons>
                    <Button onClick={this.props.hideSendCardPopupHandler}>{this.buttonContent()}</Button>
                </DivButtons>
            </>
        )
    }
}

export default AfterSendCard;