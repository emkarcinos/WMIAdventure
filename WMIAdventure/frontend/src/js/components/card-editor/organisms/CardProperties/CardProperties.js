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
import {desktop, mobile} from '../../../../utils/globals';

class CardProperties extends React.Component {
    state = {
        showLevelChoose: false,
        createCommonLevel: false,
        createGoldLevel: false,
        createEpicLevel: false,
        activeCardRank: 0,
        showEffectChoose: false,
        /**
         * Determines for which card level effects list will be shown.
         */
        effectChooseForCardRank: 0,
        chosenEffects: [[], [], []],
        effectsToSend: [[], [], []],
        startEdit: false,
    }

    componentDidUpdate(prevProps) {
        if (prevProps.levelsListFromCard.length === this.props.levelsListFromCard.length) return;
        setTimeout(() => {
            if (!this.state.startEdit) {
                let levelsList = this.props.levelsListFromCard;
                for (let i = 0; i < levelsList.length; i++) {
                    if (levelsList[i] === 1)
                        this.setState({createCommonLevel: true});
                    if (levelsList[i] === 2)
                        this.setState({createGoldLevel: true});
                    if (levelsList[i] === 3)
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

    /**
     * Resets cost of upgrade for proper card levels after some card level was created.
     * @param createdLevel Based on a created level, function will decide which upgrade costs should be reset.
     */
    determineWhichLevelCostToReset = (createdLevel) => {
        let levelsToReset = [];

        // If common level was created
        if (createdLevel === 1) {
            if (this.state.createGoldLevel || this.state.createEpicLevel) {
                levelsToReset.push(1);
            }
        }

        // If gold level was created
        else if (createdLevel === 2) {
            if (this.state.createCommonLevel) {
                levelsToReset.push(1);
            }
            if (this.state.createEpicLevel) {
                levelsToReset.push(2);
            }
        }

        // If epic level was created
        else if (createdLevel === 3) {
            if (this.state.createGoldLevel) {
                levelsToReset.push(2);
            } else if (this.state.createCommonLevel) {
                levelsToReset.push(1);
            }
        }

        this.props.levelCostResetHandler(levelsToReset);
    }

    /**
     * Clears cost of upgrade for proper card levels after some card level was removed.
     * @param removedLevel Based on the removed level, function will decide which upgrade costs should be cleared.
     */
    clearUpgradeCostAfterRemove = (removedLevel) => {
        let levelsToClear = [removedLevel];

        // If gold level was removed
        if (removedLevel === 2) {
            if (!this.state.createEpicLevel) {
                levelsToClear.push(1);
            }
        }

        // If epic level was removed
        else if (removedLevel === 3) {
            if (this.state.createGoldLevel) {
                levelsToClear.push(2);
            } else if (this.state.createCommonLevel) {
                levelsToClear.push(1);
            }
        }

        this.props.levelCostClearHandler(levelsToClear);
    }

    /**
     * Sets appropriate state after some card level was created.
     * @param level Which card level was created.
     */
    setStateAfterLevelCreation = (level) => {
        if (level === 1) {
            this.setState({createCommonLevel: true});
        } else if (level === 2) {
            this.setState({createGoldLevel: true});
        } else if (level === 3) {
            this.setState({createEpicLevel: true});
        }
        this.setState({activeCardRank: level});
    }

    /**
     * Handles creating card level.
     * @param event
     * @param level Level which was created.
     */
    createLevelHandler = (event, level) => {
        event.preventDefault();
        this.hideLevelChooseHandler(event);
        this.setStateAfterLevelCreation(level);
        this.determineWhichLevelCostToReset(level);
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
        this.props.removeLevelHandler(1);
        this.clearUpgradeCostAfterRemove(1);
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
        this.props.removeLevelHandler(2);
        this.clearUpgradeCostAfterRemove(2);
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
        this.props.removeLevelHandler(3);
        this.clearUpgradeCostAfterRemove(3);
    }

    activeLevelRecognize = (event, activeCardRank) => {
        event.preventDefault();
        this.setState({activeCardRank: activeCardRank});
    }

    /**
     * Calls function which sets appropriate state. This state causes showing list of effects to choose from.
     * Chosen effects will be attached to the card with given level.
     * @param cardRank Card level to which chosen effects will be attached.
     * @returns {(function(): void)|*} Function which will be called to set appropriate states.
     */
    showEffectChooseHandler = (cardRank) => {
        let t = this;
        return function (event) {
            event.preventDefault();
            t.setState({showEffectChoose: true, effectChooseForCardRank: cardRank})
        }
    }

    hideEffectChooseHandler = (event) => {
        event.preventDefault();
        this.setState({showEffectChoose: false});
    }

    chosenEffectsHandler = (event, rank, effect) => {
        event.preventDefault();
        let newList = this.state.chosenEffects.slice();
        if (!newList[rank - 1].includes(effect))
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

    /**
     * Checks if there is created level higher than provided.
     * @param cardLevel
     * @returns {boolean}
     */
    existsHigherLevel = (cardLevel) => {
        if (cardLevel === 1) {
            return this.state.createGoldLevel || this.state.createEpicLevel;
        } else if (cardLevel === 2) {
            return this.state.createEpicLevel;
        }

        return false;
    }

    render() {
        return (
            <>
                <LevelChoose show={this.state.showLevelChoose}
                             hideLevelChooseHandler={this.hideLevelChooseHandler}
                             createLevelHandler={this.createLevelHandler}
                             commonLevelChosen={this.state.createCommonLevel}
                             goldLevelChosen={this.state.createGoldLevel}
                             epicLevelChosen={this.state.createEpicLevel}/>
                <EffectChoose
                    showEffectChoose={this.state.showEffectChoose}
                    hideEffectChooseHandler={this.hideEffectChooseHandler}
                    cardRank={this.state.effectChooseForCardRank}
                    effectsFromApi={this.props.effectsFromApi}
                    chosenEffects={this.state.chosenEffects}
                    chosenEffectsHandler={this.chosenEffectsHandler}/>
                {/* Mobile sized screens */}
                <Media query={mobile}>
                    <Fieldset activeCardRank={this.state.activeCardRank}>
                        <DivScroll rank={this.state.activeCardRank}>
                            <CostInputs
                                cardRank={this.existsHigherLevel(this.state.activeCardRank) ? this.state.activeCardRank : 0}
                                levelCostValues={this.props.levelCostValues}
                                levelCostValuesHandler={this.props.levelCostValuesHandler}/>
                            <EffectsInputsList
                                cardRank={this.state.activeCardRank}
                                showEffectChooseHandler={this.showEffectChooseHandler}
                                chosenEffects={this.state.chosenEffects}
                                removeChosenEffectHandler={this.removeChosenEffectHandler}
                                effectsToSendHandler={this.effectsToSendHandler}
                                effectsToSend={this.state.effectsToSend}/>
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
                            />
                            <Button onClick={this.showLevelChooseHandler}
                                    createCommon={this.state.createCommonLevel}
                                    createGold={this.state.createGoldLevel}
                                    createEpic={this.state.createEpicLevel}
                            >
                                {/*ikona plusa*/}
                            </Button>
                        </DivLevel>
                    </Fieldset>
                </Media>
                {/* Desktop sized screens */}
                <Media query={desktop}>
                    <DivCenter>
                        <Fieldset create={this.state.createCommonLevel} createCommon={this.state.createCommonLevel}>
                            <Levels
                                createCommonLevel={this.state.createCommonLevel}
                                activeCommon={this.state.activeCardRank === 1}
                                removeCommonLevelHandler={this.removeCommonLevelHandler}
                                activeLevelRecognize={this.activeLevelRecognize}
                            />
                            <DivScroll>
                                <CostInputs cardRank={this.state.createGoldLevel || this.state.createEpicLevel ? 1 : 0}
                                            levelCostValues={this.props.levelCostValues}
                                            levelCostValuesHandler={this.props.levelCostValuesHandler}/>
                                <EffectsInputsList
                                    cardRank={this.state.createCommonLevel ? 1 : 0}
                                    showEffectChooseHandler={this.showEffectChooseHandler}
                                    chosenEffects={this.state.chosenEffects}
                                    removeChosenEffectHandler={this.removeChosenEffectHandler}
                                    effectsToSendHandler={this.effectsToSendHandler}
                                    effectsToSend={this.state.effectsToSend}/>
                            </DivScroll>
                        </Fieldset>
                        <Fieldset create={this.state.createGoldLevel} createGold={this.state.createGoldLevel}>
                            <Levels
                                createGoldLevel={this.state.createGoldLevel}
                                activeGold={this.state.activeCardRank === 2}
                                removeGoldLevelHandler={this.removeGoldLevelHandler}
                                activeLevelRecognize={this.activeLevelRecognize}
                            />
                            <DivScroll>
                                <CostInputs cardRank={this.state.createEpicLevel ? 2 : 0}
                                            levelCostValues={this.props.levelCostValues}
                                            levelCostValuesHandler={this.props.levelCostValuesHandler}/>
                                <EffectsInputsList
                                    cardRank={this.state.createGoldLevel ? 2 : 0}
                                    showEffectChooseHandler={this.showEffectChooseHandler}
                                    chosenEffects={this.state.chosenEffects}
                                    removeChosenEffectHandler={this.removeChosenEffectHandler}
                                    effectsToSendHandler={this.effectsToSendHandler}
                                    effectsToSend={this.state.effectsToSend}/>
                            </DivScroll>
                        </Fieldset>
                        <Fieldset create={this.state.createEpicLevel} createEpic={this.state.createEpicLevel}>
                            <Levels
                                createEpicLevel={this.state.createEpicLevel}
                                activeEpic={this.state.activeCardRank === 3}
                                removeEpicLevelHandler={this.removeEpicLevelHandler}
                                activeLevelRecognize={this.activeLevelRecognize}
                            />
                            <DivScroll>
                                <CostInputs cardRank={0}
                                            levelCostValues={this.props.levelCostValues}
                                            levelCostValuesHandler={this.props.levelCostValuesHandler}/>
                                <EffectsInputsList
                                    cardRank={this.state.createEpicLevel ? 3 : 0}
                                    showEffectChooseHandler={this.showEffectChooseHandler}
                                    chosenEffects={this.state.chosenEffects}
                                    removeChosenEffectHandler={this.removeChosenEffectHandler}
                                    effectsToSendHandler={this.effectsToSendHandler}
                                    effectsToSend={this.state.effectsToSend}/>
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