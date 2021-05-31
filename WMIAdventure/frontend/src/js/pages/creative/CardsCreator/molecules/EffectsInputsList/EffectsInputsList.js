import React from 'react';
import Div from './styled-components/Div';
import P from './styled-components/P';
import Button from './styled-components/Button';
import EffectInput from '../../atoms/EffectInput';
import UlCommon from './styled-components/UlCommon';
import UlGold from './styled-components/UlGold';
import UlEpic from './styled-components/UlEpic';

class EffectsInputsList extends React.Component {

    state = {
        effectsToSend: [[], [], []]
    }

    effectsToSendHandler = (rank, effects) => {
        let newList = this.state.effectsToSend.slice();
        newList[rank - 1] = newList[rank - 1].filter(function (elem) {
            return elem.card_effect !== effects.card_effect;
        })
        newList[rank - 1].push(effects);
        this.setState({effectsToSend: newList});
        this.props.setEffectsToSendHandler(newList);
    }

    render() {
        return (
            <>
                <Div activeCardRank={this.props.activeCardRank}>
                    <P>
                        Efekty:
                    </P>
                    <UlCommon rank={this.props.activeCardRank}>
                        {
                            this.props.chosenEffects[0].map((effect) => {
                                return (
                                    <EffectInput key={`effect-${effect.id}`}
                                        id={effect.id} name={effect.name}
                                        tooltip={effect.tooltip}
                                        has_modifier={effect.has_modifier}
                                        rank={1}
                                        effect={effect}
                                        removeChosenEffectHandler={this.props.removeChosenEffectHandler}
                                        effectsToSendHandler={this.effectsToSendHandler} />
                                );
                            })
                        }
                    </UlCommon>
                    <UlGold rank={this.props.activeCardRank}>
                        {
                            this.props.chosenEffects[1].map((effect) => {
                                return (
                                    <EffectInput key={`effect-${effect.id}`}
                                         id={effect.id} name={effect.name}
                                         tooltip={effect.tooltip}
                                         has_modifier={effect.has_modifier}
                                         rank={2}
                                         effect={effect}
                                         removeChosenEffectHandler={this.props.removeChosenEffectHandler}
                                         effectsToSendHandler={this.props.effectsToSendHandler} />
                                );
                            })
                        }
                    </UlGold>
                    <UlEpic rank={this.props.activeCardRank}>
                        {
                            this.props.chosenEffects[2].map((effect) => {
                                return (
                                    <EffectInput key={`effect-${effect.id}`}
                                         id={effect.id} name={effect.name}
                                         tooltip={effect.tooltip}
                                         has_modifier={effect.has_modifier}
                                         rank={3}
                                         effect={effect}
                                         removeChosenEffectHandler={this.props.removeChosenEffectHandler}
                                         effectsToSendHandler={this.props.effectsToSendHandler} />
                                );
                            })
                        }
                    </UlEpic>
                    <Button onClick={this.props.showEffectChooseHandler}>
                        {/*plus icon*/}
                    </Button>
                </Div>

            </>
        );
    }
}

export default EffectsInputsList;