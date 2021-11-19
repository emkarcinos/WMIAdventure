import React from 'react';
import {battleInitLoadingDuration, desktop, mobile, nextStepAnimationDuration} from "../../../../utils/globals";
import Media from "react-media";
import PopUp from "../../../global/organisms/PopUp";
import MainContainer from "./styled-components/MainContainer";
import KuceInBattle from "../../atoms/KuceInBattle";
import FlexGapContainer from "../../../global/molecules/FlexGapContainer/FlexGapContainer";
import UserStateContainer from "../../molecules/UserStateContainer";
import CompactCardView from "../../../global/atoms/CompactCardView";
import ColumnGapContainer from "../../../global/molecules/ColumnGapContainer";
import MiniCardView from "../../atoms/MiniCardView";
import EnemyStateContainer from "../../molecules/EnemyStateContainer";
import FullCardActionBackground from "./styled-components/FullCardActionBackground";
import FullCardView from "../../../global/atoms/FullCardView";
import EffectIconsContainer from "./styled-components/EffectIconsContainer";
import EffectIcon from "../../atoms/EffectIcon";
import CenterDiv from "./styled-components/CenterDiv";
import {getCurrentUserId} from "../../../../storage/user/userData";
import {battleFromData} from "../../../../api/data-models/battle/Battle";

class BattleView extends React.Component {

    /*
    props:
        battleView <- handle if component is visible
        closeHandler <- handle to make component invisible
        setTranslateY <- handle component open and close animation
     */

    state = {
        // false -> kuce in the middle not visible, true -> visible
        kuceInBattleVisible: false,

        // states for items initial animation movement
        enemyCompactCardTranslateX: '-100vw',
        userCompactCardTranslateX: '100vw',

        enemyMiniCardsTranslateX: ['-100vw', '-100vw', '-100vw', '-100vw', '-100vw'],
        userMiniCardsTranslateX: ['100vw', '100vw', '100vw', '100vw', '100vw'],

        enemyStateContainerTranslateX: '-100vw',
        userStateContainerTranslateX: '100vw',

        enemyCompactCardTranslateY: '0',
        userCompactCardTranslateY: '0',

        // full card action
        fullCardAction: {
            visible: false,
            opacity: '0',
            translateY: '100vh',
        },

        // define where effects icons container should move
        effectsTarget: {
            user: {
                opacity: '0',
                scale: '0',
                translateY: '0',
            },
            enemy: {
                opacity: '0',
                scale: '0',
                translateY: '0',
            }
        },

        // effect icons action animation with scale
        effectsActionScale: ['1', '1', '1', '1', '1'],
        prototypeIterationsCount: 0,

        isUsersTurn: true,
        /** @type Battle */
        battle: undefined,
    }
    /** @type Battle */
    battle = undefined;

    componentDidMount() {
        getCurrentUserId()
            .then(id => this.setState({user: id}))
    }

    componentDidUpdate(prevProps) {
        // to init animations when BattleView component will mount
        if ((prevProps.battleView !== this.props.battleView)
            && this.props.battleView === true) {
            this.setState({
                kuceInBattleVisible: true,
            });
            this.battle = battleFromData(this.props.battleData);
            this.setState({battle: this.battle});
            this.battle.fetchNonVitalDataAsynchronously(); // Runs in the background
            this.battle.nextTurn();
            this.itemsAnimationInit();
        }
    }

    stateContainersShotAnimation() {
        setTimeout(() => {
            this.setState({
                enemyStateContainerTranslateX: '8vw',
                userStateContainerTranslateX: '-8vw'
            });
        }, battleInitLoadingDuration);
    }

    compactCardsShotAnimation() {
        setTimeout(() => {
            this.setState({
                enemyCompactCardTranslateX: '6vw',
                userCompactCardTranslateX: '-6vw',
            });
        }, battleInitLoadingDuration
            + nextStepAnimationDuration);
    }

    stateContainersRetractionAnimation() {
        setTimeout(() => {
            this.setState({
                enemyStateContainerTranslateX: '0',
                userStateContainerTranslateX: '0',
            });
        }, battleInitLoadingDuration
            + nextStepAnimationDuration);
    }

    compactCardsRetractionAnimation() {
        setTimeout(() => {
            this.setState({
                enemyCompactCardTranslateX: '0',
                userCompactCardTranslateX: '0',
            });
        }, battleInitLoadingDuration
            + nextStepAnimationDuration * 2);
    }

    miniCardsInitAnimation() {
        setTimeout(() => {
            this.setState({
                enemyMiniCardsTranslateX: ['0', '0', '0', '0', '0'],
                userMiniCardsTranslateX: ['0', '0', '0', '0', '0'],
            });
        }, battleInitLoadingDuration
            + nextStepAnimationDuration * 2 + 100);
    }

    userStatsInitAnimation() {
        setTimeout(() => {
            this.setState({
                enemyHp: '100',
                userHp: '100',
                enemyShield: '20',
                userShield: '20'
            });
        }, battleInitLoadingDuration
            + nextStepAnimationDuration * 2 + 100);
    }

    firstFullCardActionCall() {
        setTimeout(() => {
            this.fullCardAction();
        }, battleInitLoadingDuration
            + nextStepAnimationDuration * 4);
    }

    // init elements animation and call full card action
    itemsAnimationInit = () => {
        this.stateContainersShotAnimation();
        this.compactCardsShotAnimation();
        this.compactCardsRetractionAnimation();
        this.stateContainersRetractionAnimation();
        this.miniCardsInitAnimation();
        this.userStatsInitAnimation();
        this.firstFullCardActionCall();
    }

    // helper function to set property states
    setNewStateAttributes(state, property, attributes) {
        if ((state.visible !== undefined) && (attributes.visible !== undefined))
            state.visible = attributes.visible;
        if ((state.opacity !== undefined) && (attributes.opacity !== undefined))
            state.opacity = attributes.opacity;
        if ((state.scale !== undefined) && (attributes.scale !== undefined))
            state.scale = attributes.scale;
        if ((state.translateY !== undefined) && (attributes.translateY !== undefined))
            state.translateY = attributes.translateY;
        this.setState({
            [property]: state
        });
    }

    // to set correct EffectsIconsContainer gap
    countTargetEffects(userTarget) {
        const effects = this.state.battle.currentTurn.usedEffects;
        let enemyCount = 0;
        let userCount = 0;
        for (const effect of effects) {
            if (effect.target_player === this.state.battle.user) userCount++;
            else enemyCount++
        }
        if (userTarget)
            return userCount;
        else
            return enemyCount;
    }

    // get proper mini cards to DOM
    getMiniCards = (enemy) => {
        return (
            [...Array(5)].map(
                (e, i) => {
                    return (
                        <MiniCardView key={enemy ? `enemyCard-${i}` : `userCard-${i}`}
                                      cardIndexInDeck={this.state.battle.getCardAtIdx(enemy, i).initialPosition}
                                      setTranslateX={
                                          enemy ? this.state.enemyMiniCardsTranslateX[i]
                                              : this.state.userMiniCardsTranslateX[i]
                                      }
                                      enemy={enemy} user={!enemy}
                                      cardLevel={this.state.battle.getCardAtIdx(enemy, i).level}
                                      animationDuration={`0.${9 - i}`}
                                      cardImage={this.state.battle.getCardAtIdx(enemy, i).image}/>
                    );
                })
        );
    }

    // get proper compact cards to DOM
    getCompactCards = (enemy) => {
        return (
            [...Array(5)].map(
                (e, i) => {
                    return (
                        <CompactCardView key={enemy ? `enemyCompactCard-${i}` : `userCompactCard-${i}`}
                                         cardIndexInDeck={enemy ? this.state.battle.enemy.deck.cards[i].initialPosition :
                                             this.state.battle.user.deck.cards[i].initialPosition}
                                         cardImage={this.state.battle.getCardAtIdx(enemy, i).image}
                                         cardName={this.state.battle.getCardAtIdx(enemy, i).name}
                                         cardLevel={this.state.battle.getCardAtIdx(enemy, i).level}
                                         setWidth={'124px'} setHeight={'200px'}
                                         setTranslateX={enemy ? this.state.enemyCompactCardTranslateX
                                             : this.state.userCompactCardTranslateX}
                                         setTranslateY={enemy ? this.state.enemyCompactCardTranslateY
                                             : this.state.userCompactCardTranslateY}
                                         setMargin={enemy ? '0 0 0 10px' : '0 10px 0 0'}/>
                    );
                })
        );
    }

    // get property effects to card and show in DOM
    effectsTargetIteration = (userTarget) => {
        const effects = this.state.battle.currentTurn.usedEffects;
        return effects.map((effect, index) => {
            if (userTarget === (effect.target_player === this.state.user)) {
                return (
                    <EffectIcon key={`effectIcon-${effect.id}`}
                                value={parseInt(effect.power)}
                                setScale={this.state.effectsActionScale[index]}
                    />
                );
            }
        });
    }

    showFullCardProcess() {
        this.setNewStateAttributes(
            this.state.fullCardAction, 'fullCardAction',
            this.state.battle.isUsersTurn ? {visible: true, translateY: '100vh'} : {
                visible: true,
                translateY: '-100vh'
            });

        setTimeout(() => {
            this.setNewStateAttributes(
                this.state.fullCardAction, 'fullCardAction', {opacity: '1', translateY: '0'});
        }, 100);
    }

    slideBackFullCardCallingCompactCardAction() {
        setTimeout(() => {
            this.state.battle.isUsersTurn ? this.compactCardAction(true) : this.compactCardAction(false);
            this.setNewStateAttributes(
                this.state.fullCardAction, 'fullCardAction',
                this.state.battle.isUsersTurn ? {opacity: '0', translateY: '100vh'} : {
                    opacity: '0',
                    translateY: '-100vh'
                });
        }, battleInitLoadingDuration +
            nextStepAnimationDuration * 3);
    }

    hideFullCardBackground() {
        setTimeout(() => {
            this.setNewStateAttributes(
                this.state.fullCardAction, 'fullCardAction', {visible: false});
        }, battleInitLoadingDuration +
            nextStepAnimationDuration * 4);
    }

    // show USER or ENEMY full card view
    fullCardAction = () => {
        this.showFullCardProcess();
        this.slideBackFullCardCallingCompactCardAction();
        this.hideFullCardBackground();
    }

    effectsMountCall(userTurn) {
        setTimeout(() => {
            userTurn ? this.effectsMount(true) : this.effectsMount(false);
        }, nextStepAnimationDuration * 2);
    }

    // push forward USER or ENEMY compact card
    compactCardAction = (userTurn) => {
        this.setState({
            kuceInBattleVisible: false,
        });
        if (userTurn) {
            this.setState({
                userCompactCardTranslateX: 'calc(100% - 5px)',
                userCompactCardTranslateY: 'calc(-50vh + 50% + 34px)'
            });
        } else {
            this.setState({
                enemyCompactCardTranslateX: 'calc(-100% + 5px)',
                enemyCompactCardTranslateY: 'calc(50vh - 50% - 34px)'
            });
        }
        this.effectsMountCall(userTurn);
    }

    effectsActionCall(userTurn) {
        setTimeout(() => {
            userTurn ? this.effectsActions(true) : this.effectsActions(false);
        }, nextStepAnimationDuration * 3);
    }

    // shows USER or ENEMY effect icons
    effectsMount = (userTurn) => {
        this.setNewStateAttributes(
            this.state.effectsTarget.user, 'effectsTarget.user',
            {opacity: '1', scale: '1', translateY: '128px'});
        this.setNewStateAttributes(
            this.state.effectsTarget.enemy, 'effectsTarget.enemy',
            {opacity: '1', scale: '1', translateY: '-128px'});
        this.effectsActionCall(userTurn);
    }

    effectIconCastEffect(newEffectsActionScale, index) {
        setTimeout(() => {
            newEffectsActionScale[index] = '1';
            this.setState({
                effectsActionScale: newEffectsActionScale
            });
            this.battle.currentTurn.advance();
            // TODO: here call function doing particular effect for example damage, change card-order etc.
        }, nextStepAnimationDuration);
    }

    callNextEffectIconAction(userTurn, index) {
        setTimeout(() => {
            this.effectsActions(userTurn, index + 1);
        }, nextStepAnimationDuration * 2);
    }

    effectsHideCall(userTurn) {
        setTimeout(() => {
            userTurn ? this.effectsHide(true) : this.effectsHide(false);
        }, nextStepAnimationDuration);
    }

    // scale USER or ENEMY effect icons to signal effect action
    effectsActions = (userTurn, index = 0) => {
        const effects = this.battle.currentTurn.usedEffects;
        if (index < effects.length) {
            let newEffectsActionScale = this.state.effectsActionScale.slice();
            newEffectsActionScale[index] = '1.25';
            this.setState({
                effectsActionScale: newEffectsActionScale
            });
            this.effectIconCastEffect(newEffectsActionScale, index);
            this.state.battle.currentTurn.advance();
            this.callNextEffectIconAction(userTurn, index);
        } else {
            this.effectsHideCall(userTurn);
        }
    }

    compactCardBackCall(userTurn) {
        setTimeout(() => {
            userTurn ? this.compactCardBack(true) : this.compactCardBack(false);
        }, nextStepAnimationDuration);
    }

    // hide USER or ENEMY effect icons
    effectsHide = (userTurn) => {
        this.setNewStateAttributes(
            this.state.effectsTarget.user, 'effectsTarget.user',
            {opacity: '0', scale: '0', translateY: '0'});
        this.setNewStateAttributes(
            this.state.effectsTarget.enemy, 'effectsTarget.enemy',
            {opacity: '0', scale: '0', translateY: '0'});
        this.compactCardBackCall(userTurn);
    }

    callNextCardSequence() {
        setTimeout(() => {
            const userTurn = this.battle.isUsersTurn;
            this.fullCardAction(userTurn);
        }, nextStepAnimationDuration * 3);
    }

    // back USER or ENEMY compact card to init position
    compactCardBack = (userTurn) => {
        this.setState({
            kuceInBattleVisible: true,
        });
        if (userTurn) {
            this.setState({
                userCompactCardTranslateX: '0',
                userCompactCardTranslateY: '0'
            });
        } else {
            this.setState({
                enemyCompactCardTranslateX: '0',
                enemyCompactCardTranslateY: '0'
            });
        }
        if (this.state.battle.nextTurn())
            this.callNextCardSequence();
        else {
            //Battle has ended, do stuff here to display the outcome
        }
    }

    getCurrentFullCard = () => {
        const card = this.battle.getCardOnTop();

        // I had to do it this way because of the way props are in FullCardView
        if (card.level === 1) {
            return (
                <FullCardView cardName={card.name} cardSubject={card.subject}
                              cardImage={card.image} cardTooltip={card.tooltip}
                              description={card.description} common
                              setTranslateY={this.state.fullCardAction.translateY}/>
            )
        } else if (card.level === 2) {
            return (
                <FullCardView cardName={card.name} cardSubject={card.subject}
                              cardImage={card.image} cardTooltip={card.tooltip}
                              description={card.description} gold
                              setTranslateY={this.state.fullCardAction.translateY}/>
            )
        } else {
            return (
                <FullCardView cardName={card.name} cardSubject={card.subject}
                              cardImage={card.image} cardTooltip={card.tooltip}
                              description={card.description} epic
                              setTranslateY={this.state.fullCardAction.translateY}/>
            )
        }

    }

    render() {
        if (this.state.battle === undefined) return (<></>);
        return (
            <>
                <Media query={mobile}>
                    <PopUp visible={this.props.battleView} disableClose
                           closeHandler={this.props.closeHandler}
                           setTranslateY={this.props.setTranslateY}>
                        <MainContainer>
                            <FlexGapContainer setMargin={'10px 0 0 0'}>
                                <ColumnGapContainer gap={'0'}>
                                    <EnemyStateContainer setTranslateX={this.state.enemyStateContainerTranslateX}
                                                         hp={parseInt(this.state.battle.enemy.stats.hp)}
                                                         shield={parseInt(this.state.battle.enemy.stats.armour)}
                                                         username={this.state.battle.enemy.username}
                                    />
                                    <FlexGapContainer setWidth={'100%'} gap={'4px'} reverse>
                                        {/* Enemy MiniCards!
                                        First card is not visible because is the same as Compact card */}
                                        {this.getMiniCards(true)}
                                    </FlexGapContainer>
                                </ColumnGapContainer>
                                {/* Enemy Compact Card! Particular Compact Card is visible if order === 1 */}
                                {this.getCompactCards(true)}
                            </FlexGapContainer>
                            <KuceInBattle visible={this.state.kuceInBattleVisible}/>
                            <FlexGapContainer setMargin={'0 0 10px 0'}>
                                {/* User Compact Card! Particular Compact Card is visible if order === 1 */}
                                {this.getCompactCards(false)}
                                <ColumnGapContainer gap={'0'}>
                                    <FlexGapContainer setWidth={'100%'} gap={'4px'}>
                                        {/* User MiniCards!
                                        First card is not visible because is the same as Compact card */}
                                        {this.getMiniCards(false)}
                                    </FlexGapContainer>
                                    <UserStateContainer setTranslateX={this.state.userStateContainerTranslateX}
                                                        hp={parseInt(this.state.battle.user.stats.hp)}
                                                        shield={parseInt(this.state.battle.user.stats.armour)}
                                                        username={this.state.battle.user.username}/>
                                </ColumnGapContainer>
                            </FlexGapContainer>
                        </MainContainer>
                        <FullCardActionBackground visible={this.state.fullCardAction.visible}
                                                  setOpacity={this.state.fullCardAction.opacity}>
                            {this.getCurrentFullCard()}
                        </FullCardActionBackground>
                        <CenterDiv>
                            <EffectIconsContainer
                                childrenCount={this.countTargetEffects(true)}
                                setOpacity={this.state.effectsTarget.user.opacity}
                                setScale={this.state.effectsTarget.user.scale}
                                setTranslateY={this.state.effectsTarget.user.translateY}>
                                {this.effectsTargetIteration(true)}
                            </EffectIconsContainer>
                        </CenterDiv>
                        <CenterDiv>
                            <EffectIconsContainer
                                childrenCount={this.countTargetEffects(false)}
                                setOpacity={this.state.effectsTarget.enemy.opacity}
                                setScale={this.state.effectsTarget.enemy.scale}
                                setTranslateY={this.state.effectsTarget.enemy.translateY}>
                                {this.effectsTargetIteration(false)}
                            </EffectIconsContainer>
                        </CenterDiv>
                    </PopUp>
                </Media>

                <Media query={desktop}>
                    desktop not implemented yet
                </Media>
            </>
        );
    }
}

export default BattleView;