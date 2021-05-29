import React from 'react';
import Div from './styled-components/Div';
import P from './styled-components/P';
import Button from './styled-components/Button';
import EffectInput from '../../atoms/EffectInput';
import UlCommon from './styled-components/UlCommon';
import UlGold from './styled-components/UlGold';
import UlEpic from './styled-components/UlEpic';

class EffectsInputsList extends React.Component {
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
                                        has_modifier={effect.has_modifier} />
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
                                                 has_modifier={effect.has_modifier} />
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
                                                 has_modifier={effect.has_modifier} />
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