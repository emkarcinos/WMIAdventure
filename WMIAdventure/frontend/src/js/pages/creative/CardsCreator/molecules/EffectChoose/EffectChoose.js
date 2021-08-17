import React from 'react';
import UlCommon from './styled-components/UlCommon';
import UlGold from './styled-components/UlGold';
import UlEpic from './styled-components/UlEpic';
import TransparentBack from './styled-components/TransparentBack';
import Effect from '../../atoms/Effect';
import Search from '../../atoms/Search';
import { Transition } from 'react-transition-group';

/* Transition timeout values */
const timeout = {
    appear: 50,
    enter: 50,
    exit: 500
};

class EffectChoose extends React.Component {

    state = {
        listHover: false,
        searchInput: '',
    }

    hoverTrue = () => {
        this.setState({listHover: true});
    }

    hoverFalse = () => {
        this.setState({listHover: false});
    }

    handleHiding = (event) => {
        if(!this.state.listHover) {
            this.props.hideEffectChooseHandler(event);
            setTimeout(() => {
                this.setState({searchInput: ''});
            }, 1000);
        }
    }

    handleSearch = (event) => {
        let keyValue = event.target.value;
        this.setState({searchInput: keyValue});
    }

    render() {
        return (
            <Transition in={this.props.showEffectChoose} timeout={timeout}>
                {state => (
                    <TransparentBack onClick={this.handleHiding} transitionState={state}>
                        <UlCommon onMouseEnter={this.hoverTrue}
                                  onMouseLeave={this.hoverFalse}
                                  activeCardRank={this.props.activeCardRank}>
                            <Search searchInput={this.state.searchInput} handleSearch={this.handleSearch} />
                            {
                                this.props.effectsFromApi.map((effect) => {
                                    return (
                                        <React.Fragment key={`effect-${effect.id}`}>
                                            <Effect name={effect.name}
                                                    tooltip={effect.tooltip}
                                                    rank={1}
                                                    effect={effect}
                                                    searchInput={this.state.searchInput}
                                                    chosen={
                                                        // If chosenEffects list contains current effect then mark it as chosen
                                                        !!this.props.chosenEffects[0].find(x => x.id === effect.id)
                                                    }
                                                    chosenEffectsHandler={this.props.chosenEffectsHandler} />
                                        </React.Fragment>
                                    );
                                })
                            }
                        </UlCommon>
                        <UlGold onMouseEnter={this.hoverTrue}
                                onMouseLeave={this.hoverFalse}
                                activeCardRank={this.props.activeCardRank}>
                            <Search searchInput={this.state.searchInput} handleSearch={this.handleSearch} />
                            {
                                this.props.effectsFromApi.map((effect) => {
                                    return (
                                        <React.Fragment key={`effect-${effect.id}`}>
                                            <Effect name={effect.name}
                                                    tooltip={effect.tooltip}
                                                    rank={2}
                                                    effect={effect}
                                                    searchInput={this.state.searchInput}
                                                    chosen={
                                                        // If chosenEffects list contains current effect then mark it as chosen
                                                        !!this.props.chosenEffects[1].find(x => x.id === effect.id)
                                                    }
                                                    chosenEffectsHandler={this.props.chosenEffectsHandler} />
                                        </React.Fragment>
                                    );
                                })
                            }
                        </UlGold>
                        <UlEpic onMouseEnter={this.hoverTrue}
                                onMouseLeave={this.hoverFalse}
                                activeCardRank={this.props.activeCardRank}>
                            <Search searchInput={this.state.searchInput} handleSearch={this.handleSearch} />
                            {
                                this.props.effectsFromApi.map((effect) => {
                                    return (
                                        <React.Fragment key={`effect-${effect.id}`}>
                                            <Effect name={effect.name}
                                                    tooltip={effect.tooltip}
                                                    rank={3}
                                                    effect={effect}
                                                    searchInput={this.state.searchInput}
                                                    chosen={
                                                        // If chosenEffects list contains current effect then mark it as chosen
                                                        !!this.props.chosenEffects[2].find(x => x.id === effect.id)
                                                    }
                                                    chosenEffectsHandler={this.props.chosenEffectsHandler} />
                                        </React.Fragment>
                                    );
                                })
                            }
                        </UlEpic>
                    </TransparentBack>
                )}
            </Transition>

        );
    }
}

export default EffectChoose;