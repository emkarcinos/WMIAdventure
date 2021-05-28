import React from 'react';
import Fieldset from './styled-components/Fieldset';
import Header from './styled-components/Header';
import Div from './styled-components/Div';
import P from './styled-components/P';
import Label from './styled-components/Label';
import InputNumber from './styled-components/InputNumber';
import InputRadio from './styled-components/InputRadio';

class EffectInput extends React.Component {

    state = {
        checkedPlayer: false,
        checkedEnemy: false
    }

    checkedTargetHandler = (event) => {
        if(event.target.checked && event.target.value === '1') {
           this.setState({checkedPlayer: true});
            this.setState({checkedEnemy: false});
        } else if(event.target.checked && event.target.value === '2') {
            this.setState({checkedPlayer: false});
            this.setState({checkedEnemy: true});
        }
    }

    render() {
        return (
            <Fieldset>
                <Header>
                    Damage
                </Header>
                <Div marginBottom>
                    <P>
                        <Label marginRight>
                            Moc
                        </Label>
                        <InputNumber type='number' />
                    </P>
                    <P>
                        <Label marginRight>
                            Losowość
                        </Label>
                        <InputNumber type='number' />
                    </P>
                </Div>
                <Div>
                    <Label>
                        Cel
                    </Label>
                    <P radioLine>
                        <Label marginRight checked={this.state.checkedPlayer} htmlFor='target1'>
                            Gracz
                        </Label>
                        <InputRadio id='target1' name='target' value='1' type='radio' onChange={this.checkedTargetHandler}/>
                        <Label checked={this.state.checkedEnemy} htmlFor='target2'>
                            Przeciwnik
                        </Label>
                        <InputRadio id='target2' name='target' value='2' type='radio' onChange={this.checkedTargetHandler}/>
                    </P>
                </Div>
            </Fieldset>
        );
    }
}

export default EffectInput;