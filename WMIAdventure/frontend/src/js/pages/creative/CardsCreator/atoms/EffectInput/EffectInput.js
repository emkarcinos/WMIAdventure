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
        checkedEnemy: false,

        card_effect: undefined,
        target: undefined,
        power: undefined,
        range: undefined,
    }

    componentDidMount() {
        let effectsFromCard = this.props.effectsFromCard;
        let rank = this.props.rank;
        let id = this.props.id;
        let effectAttributes;

        for (let i=0; i<effectsFromCard.length; i++) {
            effectAttributes = effectsFromCard[i].filter(function (elem) {
                return elem.level === rank && elem.card_effect === id;
            });
            if(effectAttributes.length !== 0) break;
        }

        if (effectAttributes.length > 0) {
            try {
                if(effectAttributes[0].target === 1) {
                    this.setState({checkedPlayer: true, checkedEnemy: false});
                    this.setState({target: 1});
                }
                else if(effectAttributes[0].target === 2) {
                    this.setState({checkedPlayer: false, checkedEnemy: true});
                    this.setState({target: 2});
                }
            } catch (error) {
                console.log(error);
            }

            try {
                this.setState({
                    power: effectAttributes[0].power,
                    range: effectAttributes[0].range
                });
            } catch (error) {
                console.log(error);
            }
        }

    }

    checkedTargetHandler = (event) => {
        if(event.target.checked && event.target.value === '1') {
           this.setState({checkedPlayer: true, checkedEnemy: false});
        } else if(event.target.checked && event.target.value === '2') {
            this.setState({checkedPlayer: false, checkedEnemy: true});
        }

        this.cardAttributesHandler(event);
    }

    cardAttributesHandler = (event) => {
        let keyName = event.target.name;
        let keyValue = event.target.value;
        this.setState({[keyName]: keyValue});
        this.setState({card_effect: this.props.id});
        setTimeout(() => {
            let newEffect = {
                card_effect: this.state.card_effect,
                target: this.state.target,
                power: this.state.power,
                range: this.state.range
            }
            this.props.effectsToSendHandler(this.props.rank, newEffect);
        }, 10);
    }

    render() {
        return (
            <Fieldset>
                <Header>
                    {this.props.name}
                </Header>
                <Div marginBottom show={this.props.has_modifier}>
                    <P>
                        <Label marginRight htmlFor={`${this.props.id}-${this.props.rank}-power`}>
                            Moc
                        </Label>
                        <InputNumber id={`${this.props.id}-${this.props.rank}-power`} value={this.state.power}
                                     name='power' type='number' min='0' max='99' onChange={this.cardAttributesHandler}/>
                    </P>
                    <P>
                        <Label marginRight htmlFor={`${this.props.id}-${this.props.rank}-range`}>
                            Losowość
                        </Label>
                        <InputNumber id={`${this.props.id}-${this.props.rank}-range`} value={this.state.range}
                                     name='range' type='number' min='0' max='99' onChange={this.cardAttributesHandler}/>
                    </P>
                </Div>
                <Div show>
                    <Label>
                        Cel
                    </Label>
                    <P radioLine>
                        <Label marginRight checked={this.state.checkedPlayer}
                               htmlFor={`${this.props.id}-${this.props.rank}-target1`}>
                            Gracz
                        </Label>
                        <InputRadio id={`${this.props.id}-${this.props.rank}-target1`}
                                    name='target' value='1' type='radio' onChange={this.checkedTargetHandler}/>
                        <Label checked={this.state.checkedEnemy}
                               htmlFor={`${this.props.id}-${this.props.rank}-target2`}>
                            Przeciwnik
                        </Label>
                        <InputRadio id={`${this.props.id}-${this.props.rank}-target2`}
                                    name='target' value='2' type='radio' onChange={this.checkedTargetHandler}/>
                    </P>
                </Div>
                <Close onClick={
                    (event) => this.props.removeChosenEffectHandler(event, this.props.rank, this.props.effect)
                }/>
            </Fieldset>
        );
    }
}

export default EffectInput;