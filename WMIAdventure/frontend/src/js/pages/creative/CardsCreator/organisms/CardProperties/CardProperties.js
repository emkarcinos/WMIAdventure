import React from 'react';
import Fieldset from './styled-components/Fieldset';
import Div from './styled-components/Div';
import P from './styled-components/P';
import Button from './styled-components/Button';
import LevelChoose from '../../atoms/LevelChoose';
import Levels from '../../atoms/Levels';
import CostInputs from '../../atoms/CostInputs';
import EffectsInputsList from '../../molecules/EffectsInputsList';
import EffectChoose from '../../molecules/EffectChoose';
import Scroll from './styled-components/Scroll';

class CardProperties extends React.Component {
    state = {
        showLevelChoose: false,
        createCommonLevel: false,
        createGoldLevel: false,
        createEpicLevel: false,
        activeCardRank: 0,
        showEffectChoose: false,
        chosenEffects: [[], [], []],
        effectsToSend: [[], [], []],
    }

    showLevelChooseHandler = (event) => {
        event.preventDefault();
        this.setState({showLevelChoose: true});
    }

    hideLevelChooseHandler = (event) => {
        event.preventDefault();
        this.setState({showLevelChoose: false});
    }

    createCommonLevelHandler = (event) => {
        event.preventDefault();
        this.hideLevelChooseHandler(event);
        this.setState({createCommonLevel: true});
    }

    createGoldLevelHandler = (event) => {
        event.preventDefault();
        this.hideLevelChooseHandler(event);
        this.setState({createGoldLevel: true});
        this.props.levelCostResetHandler(event, 1);
    }

    createEpicLevelHandler = (event) => {
        event.preventDefault();
        this.hideLevelChooseHandler(event);
        this.setState({createEpicLevel: true});
        this.props.levelCostResetHandler(event, 2);
    }

    removeCommonLevelHandler = (event) => {
        event.preventDefault();
        this.setState({createCommonLevel: false});
    }

    removeGoldLevelHandler = (event) => {
        event.preventDefault();
        this.setState({createGoldLevel: false});
    }

    removeEpicLevelHandler = (event) => {
        event.preventDefault();
        this.setState({createEpicLevel: false});
    }

    activeLevelRecognize = (event, activeCardRank) => {
        event.preventDefault();
        this.setState({activeCardRank: activeCardRank});
    }

    showEffectChooseHandler = (event) => {
        event.preventDefault();
        this.setState({showEffectChoose: true});
    }

    hideEffectChooseHandler = (event) => {
        event.preventDefault();
        this.setState({showEffectChoose: false});
    }

    chosenEffectsHandler = (event, rank, effect) => {
        event.preventDefault();
        let newList = this.state.chosenEffects.slice();
        if(!newList[rank - 1].includes(effect))
            newList[rank - 1].push(effect);
        this.setState({chosenEffects: newList});
        this.hideEffectChooseHandler(event);
    }

    removeChosenEffectHandler = (event, rank, effect) => {
        event.preventDefault();
        let newList = this.state.chosenEffects.slice();
        newList[rank - 1] = newList[rank - 1].filter(function (elem) {
            return elem !== effect;
        });
        this.setState({chosenEffects: newList});

        newList = this.state.effectsToSend.slice();
        newList[rank - 1] = newList[rank - 1].filter(function (elem) {
            return Number(elem.card_effect) !== Number(String(effect.id) + String(rank));
        })
        this.setState({effectsToSend: newList});
        this.props.setEffectsToSendHandler(newList);
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
                <LevelChoose show={this.state.showLevelChoose}
                             hideLevelChooseHandler={this.hideLevelChooseHandler}
                             createCommonLevelHandler = {this.createCommonLevelHandler}
                             createGoldLevelHandler = {this.createGoldLevelHandler}
                             createEpicLevelHandler = {this.createEpicLevelHandler} />
                <EffectChoose
                    showEffectChoose={this.state.showEffectChoose}
                    hideEffectChooseHandler={this.hideEffectChooseHandler}
                    activeCardRank={this.state.activeCardRank}
                    effectsFromApi={this.props.effectsFromApi}
                    chosenEffectsHandler={this.chosenEffectsHandler} />
                <Fieldset activeCardRank={this.state.activeCardRank}>
                    <Scroll>
                        <CostInputs activeCardRank={this.state.activeCardRank}
                                    createGoldLevel={this.state.createGoldLevel}
                                    createEpicLevel={this.state.createEpicLevel}
                                    levelCostValues={this.props.levelCostValues}
                                    levelCostValuesHandler={this.props.levelCostValuesHandler} />
                        <EffectsInputsList
                            activeCardRank={this.state.activeCardRank}
                            showEffectChooseHandler={this.showEffectChooseHandler}
                            chosenEffects={this.state.chosenEffects}
                            removeChosenEffectHandler={this.removeChosenEffectHandler}
                            effectsToSendHandler = {this.effectsToSendHandler} />
                    </Scroll>
                    <Div activeCardRank={this.state.activeCardRank}>
                        <P>
                            Poziomy:
                        </P>
                        <Levels createCommonLevel={this.state.createCommonLevel}
                            createGoldLevel={this.state.createGoldLevel}
                            createEpicLevel={this.state.createEpicLevel}
                            removeCommonLevelHandler={this.removeCommonLevelHandler}
                            removeGoldLevelHandler={this.removeGoldLevelHandler}
                            removeEpicLevelHandler={this.removeEpicLevelHandler}
                            activeLevelRecognize={this.activeLevelRecognize}
                            levelCostClearHandler={this.props.levelCostClearHandler}
                        />
                        <Button onClick={this.showLevelChooseHandler}>
                            {/*ikona plusa*/}
                        </Button>
                    </Div>
                </Fieldset>
            </>
        );
    }
}

export default CardProperties;