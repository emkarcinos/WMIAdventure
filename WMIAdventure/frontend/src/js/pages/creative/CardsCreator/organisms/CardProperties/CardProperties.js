import React from 'react';
import Fieldset from './styled-components/Fieldset';
import DivLevel from './styled-components/DivLevel';
import P from './styled-components/P';
import Button from './styled-components/Button';
import LevelChoose from '../../atoms/LevelChoose';
import Levels from '../../atoms/Levels';
import CostInputs from '../../atoms/CostInputs';
import EffectsInputsList from '../../molecules/EffectsInputsList';
import EffectChoose from '../../molecules/EffectChoose';
import DivScroll from './styled-components/DivScroll';
import Media from 'react-media';
import DivCenter from './styled-components/DivCenter';

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
        startEdit: false,
    }

    componentWillReceiveProps(nextProps) {
        setTimeout(() => {
            if(!this.state.startEdit) {
                let levelsList = nextProps.levelsListFromCard;
                for(let i=0; i<levelsList.length; i++) {
                    if(levelsList[i] === 1)
                        this.setState({createCommonLevel: true});
                    if(levelsList[i] === 2)
                        this.setState({createGoldLevel: true});
                    if(levelsList[i] === 3)
                        this.setState({createEpicLevel: true});
                }

                setTimeout(() => {
                    this.setState({
                        chosenEffects: this.props.chosenEffectsFromCard,
                        effectsToSend: this.props.effectsToSend
                    });
                }, 10);
            }
        }, 10);
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
        this.setState({
            createCommonLevel: true,
            activeCardRank: 1,
        });
    }

    createGoldLevelHandler = (event) => {
        event.preventDefault();
        this.hideLevelChooseHandler(event);
        this.setState({
            createGoldLevel: true,
            activeCardRank: 2
        });
        this.props.levelCostResetHandler(event, 1);
    }

    createEpicLevelHandler = (event) => {
        event.preventDefault();
        this.hideLevelChooseHandler(event);
        this.setState({
            createEpicLevel: true,
            activeCardRank: 3,
        });
        this.props.levelCostResetHandler(event, 2);
    }

    removeCommonLevelHandler = (event) => {
        event.preventDefault();
        this.setState({createCommonLevel: false});
        let newListChosenEffects = this.state.chosenEffects.slice();
        let newListEffectsToSend = this.state.effectsToSend.slice();
        newListChosenEffects[0] = [];
        newListEffectsToSend[0] = [];
        this.setState({chosenEffects: newListChosenEffects});
        this.setState({effectsToSend: newListEffectsToSend});
        this.props.setEffectsToSendHandler(newListEffectsToSend);
    }

    removeGoldLevelHandler = (event) => {
        event.preventDefault();
        this.setState({createGoldLevel: false});
        let newListChosenEffects = this.state.chosenEffects.slice();
        let newListEffectsToSend = this.state.effectsToSend.slice();
        newListChosenEffects[1] = [];
        newListEffectsToSend[1] = [];
        this.setState({chosenEffects: newListChosenEffects});
        this.setState({effectsToSend: newListEffectsToSend});
        this.props.setEffectsToSendHandler(newListEffectsToSend);
    }

    removeEpicLevelHandler = (event) => {
        event.preventDefault();
        this.setState({createEpicLevel: false});
        let newListChosenEffects = this.state.chosenEffects.slice();
        let newListEffectsToSend = this.state.effectsToSend.slice();
        newListChosenEffects[2] = [];
        newListEffectsToSend[2] = [];
        this.setState({chosenEffects: newListChosenEffects});
        this.setState({effectsToSend: newListEffectsToSend});
        this.props.setEffectsToSendHandler(newListEffectsToSend);
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
        this.setState({startEdit: true});
        event.preventDefault();
        let newList = this.state.chosenEffects.slice();
        newList[rank - 1] = newList[rank - 1].filter(function (elem) {
            return elem !== effect;
        });
        this.setState({chosenEffects: newList});

        newList = this.state.effectsToSend.slice();
        newList[rank - 1] = newList[rank - 1].filter(function (elem) {
            return (
                Number(String(elem.card_effect) + String(rank)) !==
                Number(String(effect.id) + String(rank))
            );
        })
        this.setState({effectsToSend: newList});
        this.props.setEffectsToSendHandler(newList);
    }

    effectsToSendHandler = (rank, effects) => {
        let newList = this.state.effectsToSend.slice();
        newList[rank - 1] = newList[rank - 1].filter(function (elem) {
            return (
                Number(String(elem.card_effect) + String(rank)) !==
                Number(String(effects.card_effect) + String(rank))
            );
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
                             commonLevelChosen={this.state.createCommonLevel}
                             createGoldLevelHandler = {this.createGoldLevelHandler}
                             goldLevelChosen={this.state.createGoldLevel}
                             createEpicLevelHandler = {this.createEpicLevelHandler}
                             epicLevelChosen={this.state.createEpicLevel}/>
                <EffectChoose
                    showEffectChoose={this.state.showEffectChoose}
                    hideEffectChooseHandler={this.hideEffectChooseHandler}
                    activeCardRank={this.state.activeCardRank}
                    effectsFromApi={this.props.effectsFromApi}
                    chosenEffects={this.state.chosenEffects}
                    chosenEffectsHandler={this.chosenEffectsHandler} />
                <Media query='(max-width: 768px)'>
                    <Fieldset activeCardRank={this.state.activeCardRank}>
                        <DivScroll rank={this.state.activeCardRank}>
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
                                effectsToSendHandler={this.effectsToSendHandler}
                                effectsToSend={this.state.effectsToSend} />
                        </DivScroll>
                        <DivLevel activeCardRank={this.state.activeCardRank}>
                            <P>
                                Poziomy:
                            </P>
                            <Levels
                                createCommonLevel={this.state.createCommonLevel}
                                activeCommon={this.state.activeCardRank === 1}

                                createGoldLevel={this.state.createGoldLevel}
                                activeGold={this.state.activeCardRank === 2}

                                createEpicLevel={this.state.createEpicLevel}
                                activeEpic={this.state.activeCardRank === 3}

                                removeCommonLevelHandler={this.removeCommonLevelHandler}
                                removeGoldLevelHandler={this.removeGoldLevelHandler}
                                removeEpicLevelHandler={this.removeEpicLevelHandler}
                                activeLevelRecognize={this.activeLevelRecognize}
                                levelCostClearHandler={this.props.levelCostClearHandler}
                            />
                            <Button onClick={this.showLevelChooseHandler}>
                                {/*ikona plusa*/}
                            </Button>
                        </DivLevel>
                    </Fieldset>
                </Media>
                <Media query='(min-width: 768px)'>
                    <DivCenter>
                        <Fieldset create={this.state.createCommonLevel} createCommon={this.state.createCommonLevel}>
                            <Levels
                                createCommonLevel={this.state.createCommonLevel}
                                activeCommon={this.state.activeCardRank === 1}
                                removeCommonLevelHandler={this.removeCommonLevelHandler}
                                activeLevelRecognize={this.activeLevelRecognize}
                                levelCostClearHandler={this.props.levelCostClearHandler}
                            />
                            <DivScroll>
                                <CostInputs activeCardRank={this.state.activeCardRank}
                                            createGoldLevel={this.state.createGoldLevel}
                                            createEpicLevel={this.state.createEpicLevel}
                                            levelCostValues={this.props.levelCostValues}
                                            levelCostValuesHandler={this.props.levelCostValuesHandler} />
                                <EffectsInputsList
                                    createCommonLevel={this.state.createCommonLevel}
                                    showEffectChooseHandler={this.showEffectChooseHandler}
                                    chosenEffects={this.state.chosenEffects}
                                    removeChosenEffectHandler={this.removeChosenEffectHandler}
                                    effectsToSendHandler={this.effectsToSendHandler}
                                    effectsToSend={this.state.effectsToSend} />
                            </DivScroll>
                        </Fieldset>
                        <Fieldset create={this.state.createGoldLevel} createGold={this.state.createGoldLevel}>
                            <Levels
                                createGoldLevel={this.state.createGoldLevel}
                                activeGold={this.state.activeCardRank === 2}
                                removeGoldLevelHandler={this.removeGoldLevelHandler}
                                activeLevelRecognize={this.activeLevelRecognize}
                                levelCostClearHandler={this.props.levelCostClearHandler}
                            />
                            <DivScroll>
                                <CostInputs activeCardRank={this.state.activeCardRank}
                                            createGoldLevel={this.state.createGoldLevel}
                                            createEpicLevel={this.state.createEpicLevel}
                                            levelCostValues={this.props.levelCostValues}
                                            levelCostValuesHandler={this.props.levelCostValuesHandler} />
                                <EffectsInputsList
                                    createGoldLevel={this.state.createGoldLevel}
                                    showEffectChooseHandler={this.showEffectChooseHandler}
                                    chosenEffects={this.state.chosenEffects}
                                    removeChosenEffectHandler={this.removeChosenEffectHandler}
                                    effectsToSendHandler={this.effectsToSendHandler}
                                    effectsToSend={this.state.effectsToSend} />
                            </DivScroll>
                        </Fieldset>
                        <Fieldset create={this.state.createEpicLevel} createEpic={this.state.createEpicLevel}>
                            <Levels
                                createEpicLevel={this.state.createEpicLevel}
                                activeEpic={this.state.activeCardRank === 3}
                                removeEpicLevelHandler={this.removeEpicLevelHandler}
                                activeLevelRecognize={this.activeLevelRecognize}
                                levelCostClearHandler={this.props.levelCostClearHandler}
                            />
                            <DivScroll>
                                <CostInputs activeCardRank={this.state.activeCardRank}
                                            createGoldLevel={this.state.createGoldLevel}
                                            createEpicLevel={this.state.createEpicLevel}
                                            levelCostValues={this.props.levelCostValues}
                                            levelCostValuesHandler={this.props.levelCostValuesHandler} />
                                <EffectsInputsList
                                    createEpicLevel={this.state.createEpicLevel}
                                    showEffectChooseHandler={this.showEffectChooseHandler}
                                    chosenEffects={this.state.chosenEffects}
                                    removeChosenEffectHandler={this.removeChosenEffectHandler}
                                    effectsToSendHandler={this.effectsToSendHandler}
                                    effectsToSend={this.state.effectsToSend} />
                            </DivScroll>
                        </Fieldset>
                        <Button onClick={this.showLevelChooseHandler}
                                createCommon={this.state.createCommonLevel}
                                createGold={this.state.createGoldLevel}
                                createEpic={this.state.createEpicLevel}>
                            Dodaj poziom do karty
                        </Button>
                    </DivCenter>
                </Media>
            </>
        );
    }
}

export default CardProperties;