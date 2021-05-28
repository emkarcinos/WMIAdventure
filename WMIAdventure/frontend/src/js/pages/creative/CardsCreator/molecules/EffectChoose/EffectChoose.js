import React from 'react';
import UlCommon from './styled-components/UlCommon';
import UlGold from './styled-components/UlGold';
import UlEpic from './styled-components/UlEpic';
import TransparentBack from './styled-components/TransparentBack';
import Effect from '../../atoms/Effect';
import Search from '../../atoms/Search';

class EffectChoose extends React.Component {

    state = {
        listHover: false,
    }

    hoverTrue = () => {
        this.setState({listHover: true});
    }

    hoverFalse = () => {
        this.setState({listHover: false});
    }

    handleHiding = (event) => {
        if(!this.state.listHover)
            this.props.hideEffectChooseHandler(event);
    }

    render() {
        return (
            <>
                <TransparentBack show={this.props.showEffectChoose} onClick={this.handleHiding}>
                    <UlCommon onMouseEnter={this.hoverTrue}
                              onMouseLeave={this.hoverFalse}
                              activeCardRank={this.props.activeCardRank}>
                        <Search />
                        {
                            this.props.effectsFromApi.map((effect) => {
                                return (
                                  <React.Fragment key={`effect-${effect.id}`}>
                                      <Effect name={effect.name} tooltip={effect.tooltip} chosenEffectsHandler={this.props.chosenEffectsHandler} />
                                  </React.Fragment>
                                );
                            })
                        }
                    </UlCommon>
                    <UlGold onMouseEnter={this.hoverTrue}
                            onMouseLeave={this.hoverFalse}
                            activeCardRank={this.props.activeCardRank}>
                        <Search />
                        {
                            this.props.effectsFromApi.map((effect) => {
                                return (
                                    <React.Fragment key={`effect-${effect.id}`}>
                                        <Effect name={effect.name} tooltip={effect.tooltip} />
                                    </React.Fragment>
                                );
                            })
                        }
                    </UlGold>
                    <UlEpic onMouseEnter={this.hoverTrue}
                            onMouseLeave={this.hoverFalse}
                            activeCardRank={this.props.activeCardRank}>
                        <Search />
                        {
                            this.props.effectsFromApi.map((effect) => {
                                return (
                                    <React.Fragment key={`effect-${effect.id}`}>
                                        <Effect name={effect.name} tooltip={effect.tooltip} />
                                    </React.Fragment>
                                );
                            })
                        }
                    </UlEpic>
                </TransparentBack>
            </>
        );
    }
}

export default EffectChoose;