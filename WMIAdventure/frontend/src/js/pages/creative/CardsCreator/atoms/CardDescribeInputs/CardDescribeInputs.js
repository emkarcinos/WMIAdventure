import React from 'react';
import Fieldset from './styled-components/Fieldset';
import TransparentBack from './styled-components/TransparentBack';
import Legend from './styled-components/Legend';
import Div from './styled-components/Div';
import Input from './styled-components/Input';
import Label from './styled-components/Label';
import DivInput from './styled-components/DivInput';
import { Transition } from 'react-transition-group';
import ImageInput from "./styled-components/ImageInput";
import DivImageInput from "./styled-components/DivImageInput";
import CardImagePreview from "./styled-components/CardImagePreview";
import upload_image_dark from '../../../../../../assets/icons/upload_image_dark.svg'
import ImageInputPrompt from "./styled-components/ImageInputPrompt";

/* Transition timeout values */
const timeout = {
    appear: 50,
    enter: 50,
    exit: 500
};

class CardDescribeInputs extends React.Component {
    state = {
        fieldsetHover: false,
    }

    hoverTrue = () => {
        this.setState({fieldsetHover: true});
    }

    hoverFalse = () => {
        this.setState({fieldsetHover: false});
    }

    handleHiding = (event) => {
        if(!this.state.fieldsetHover)
            this.props.hideDescribeInputsHandler(event);
    }

    render() {
        return (
            <Transition in={this.props.show} timeout={timeout}>
                {state => (
                    <TransparentBack transitionState={state} onClick={this.handleHiding}>
                        <Fieldset onMouseEnter={this.hoverTrue} onMouseLeave={this.hoverFalse}>
                            <Legend>
                                Karta
                            </Legend>
                            <Div>
                                <Label htmlFor='cardName'>
                                    Nazwa
                                </Label>
                                <DivInput>
                                  <Input id='cardName' name='cardName' type='text' value={this.props.cardName}
                                         onChange={this.props.updateDescribePreview}
                                         placeholder={'Nazwa karty'}
                                  />
                                </DivInput>
                            </Div>
                            <Div>
                                <Label htmlFor='cardSubject'>
                                    Przedmiot
                                </Label>
                                <DivInput>
                                  <Input id='cardSubject' name='cardSubject' type='text' value={this.props.cardSubject}
                                         onChange={this.props.updateDescribePreview}
                                         placeholder={'Przedmiot'}
                                  />
                                </DivInput>
                            </Div>
                            <Div>
                                <Label htmlFor='cardTooltip'>
                                    Opis
                                </Label>
                                <DivInput>
                                  <Input id='cardTooltip' name='cardTooltip' type='text' value={this.props.cardTooltip}
                                         onChange={this.props.updateDescribePreview}
                                         placeholder={'Opis Karty'}
                                  />
                                </DivInput>
                            </Div>
                            <Div last>
                                <Label htmlFor='cardImage'>
                                    Ikona
                                </Label>
                                <DivImageInput>
                                    <CardImagePreview
                                        src={this.props.cardImage ? this.props.cardImage : upload_image_dark}
                                        alt='Załadowany obrazek/ikona'/>
                                    <ImageInput id='cardImage' name='cardImage' type='file' accept='image/png, .svg'
                                                onChange={this.props.onCardImageChange}
                                                />
                                    <ImageInputPrompt>Wybierz z pliku</ImageInputPrompt>
                                </DivImageInput>
                            </Div>
                        </Fieldset>
                    </TransparentBack>
                )}
            </Transition>
        );
    }
}

export default CardDescribeInputs;