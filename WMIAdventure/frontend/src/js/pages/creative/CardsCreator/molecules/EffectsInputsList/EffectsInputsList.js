import React from 'react';
import Div from './styled-components/Div';
import P from './styled-components/P';
import Button from './styled-components/Button';
import EffectInput from '../../atoms/EffectInput';
import Ul from "./styled-components/Ul";

class EffectsInputsList extends React.Component {
    render() {
        if (this.props.cardRank > 0){
            return (
                <>
                    <Div>
                        <P>
                            Efekty:
                        </P>
                        <Ul>
                            {
                                this.props.chosenEffects[this.props.cardRank - 1].map((effect) => {
                                    return (
                                        <EffectInput key={`effect-${effect.id}`}
                                                     id={effect.id} name={effect.name}
                                                     tooltip={effect.tooltip}
                                                     has_modifier={effect.has_modifier}
                                                     rank={this.props.cardRank}
                                                     effect={effect}
                                                     removeChosenEffectHandler={this.props.removeChosenEffectHandler}
                                                     effectsToSendHandler={this.props.effectsToSendHandler}
                                                     effectsFromCard={this.props.effectsToSend} />
                                    );
                                })
                            }
                        </Ul>

                        <Button onClick={this.props.showEffectChooseHandler(this.props.cardRank)}>
                            {/*plus icon*/}
                        </Button>
                    </Div>

                </>
            );
        }
        else {
            return (
                <></>
            )
        }
    }
}

export default EffectsInputsList;