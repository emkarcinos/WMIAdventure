import React from 'react';
import Fieldset from './styled-components/Fieldset';
import TransparentBack from './styled-components/TransparentBack';
import Legend from './styled-components/Legend';
import Div from './styled-components/Div';
import Input from './styled-components/Input';
import Label from './styled-components/Label';
import DivInput from './styled-components/DivInput';

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
            this.props.hideInputs(event);
    }

    render() {
        return (
            <TransparentBack show={this.props.show} onClick={this.handleHiding}>
                <Fieldset onMouseEnter={this.hoverTrue} onMouseLeave={this.hoverFalse}>
                    <Legend>
                        Karta
                    </Legend>
                    <Div>
                        <Label htmlFor='cardName'>
                            Nazwa
                        </Label>
                        <DivInput>
                            <Input id='cardName' name='cardName' type='text'/>
                        </DivInput>
                    </Div>
                    <Div>
                        <Label htmlFor='cardSubject'>
                            Przedmiot
                        </Label>
                        <DivInput>
                            <Input id='cardSubject' name='cardSubject' type='text'/>
                        </DivInput>
                    </Div>
                    <Div last>
                        <Label htmlFor='cardTooltip'>
                            Opis
                        </Label>
                        <DivInput>
                            <Input id='cardTooltip' name='cardTooltip' type='text'/>
                        </DivInput>
                    </Div>
                </Fieldset>
            </TransparentBack>
        );
    }
}

export default CardDescribeInputs;