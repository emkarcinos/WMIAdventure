import React from 'react';
import Ul from './styled-components/Ul'
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
            }, 600);
        }
    }

    handleSearch = (event) => {
        let keyValue = event.target.value;
        this.setState({searchInput: keyValue});
    }

    /**
     * Chooses proper components that should be rendered for given card level.
     * @param cardRank Card level which will determine which components are rendered.
     * @returns {JSX.Element} Chosen components.
     */
    chooseProperComponentsForCardRank = (cardRank) => {
        if (cardRank < 1) {
            return <></>
        }
        else {
            return (
                <Ul onMouseEnter={this.hoverTrue}
                          onMouseLeave={this.hoverFalse}>
                    <Search handleSearch={this.handleSearch}/>
                    {
                        this.props.effectsFromApi.map((effect) => {
                            return (
                                <React.Fragment key={`effect-${effect.id}`}>
                                    <Effect name={effect.name}
                                            tooltip={effect.tooltip}
                                            rank={cardRank}
                                            effect={effect}
                                            chosen={
                                                // If chosenEffects list contains current effect then mark it as chosen
                                                !!this.props.chosenEffects[cardRank - 1].find(x => x.id === effect.id)
                                            }
                                            chosenEffectsHandler={this.props.chosenEffectsHandler}
                                            searchInput={this.state.searchInput}
                                    />
                                </React.Fragment>
                            );
                        })
                    }
                </Ul>
            )
        }
    }

    render() {
        return (
            <Transition in={this.props.showEffectChoose} timeout={timeout}>
                {state => (
                    <TransparentBack onClick={this.handleHiding} transitionState={state}>
                        {this.chooseProperComponentsForCardRank(this.props.cardRank)}
                    </TransparentBack>
                )}
            </Transition>

        );
    }
}

export default EffectChoose;