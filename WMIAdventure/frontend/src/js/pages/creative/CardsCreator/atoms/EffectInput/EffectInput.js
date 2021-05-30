import React from 'react';
import Fieldset from './styled-components/Fieldset';
import Header from './styled-components/Header';
import Div from './styled-components/Div';
import P from './styled-components/P';
import Label from './styled-components/Label';
import InputNumber from './styled-components/InputNumber';
import InputRadio from './styled-components/InputRadio';
import Close from './styled-components/Close';

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
                    {this.props.name}
                </Header>
                <Div marginBottom show={this.props.has_modifier}>
                    <P>
                        <Label marginRight htmlFor={`${this.props.id}-power`}>
                            Moc
                        </Label>
                        <InputNumber id={`${this.props.id}-power`} name='power' type='number' />
                    </P>
                    <P>
                        <Label marginRight htmlFor={`${this.props.id}-randomize`}>
                            Losowość
                        </Label>
                        <InputNumber id={`${this.props.id}-randomize`} name='randomize' type='number' />
                    </P>
                </Div>
                <Div show>
                    <Label>
                        Cel
                    </Label>
                    <P radioLine>
                        <Label marginRight checked={this.state.checkedPlayer} htmlFor={`${this.props.id}-target1`}>
                            Gracz
                        </Label>
                        <InputRadio id={`${this.props.id}-target1`} name='target' value='1' type='radio' onChange={this.checkedTargetHandler}/>
                        <Label checked={this.state.checkedEnemy} htmlFor={`${this.props.id}-target2`}>
                            Przeciwnik
                        </Label>
                        <InputRadio id={`${this.props.id}-target2`} name='target' value='2' type='radio' onChange={this.checkedTargetHandler}/>
                    </P>
                </Div>
                <Close onClick={(event) => this.props.removeChosenEffectHandler(event, this.props.rank, this.props.effect)}/>
            </Fieldset>
        );
    }
}

export default EffectInput;