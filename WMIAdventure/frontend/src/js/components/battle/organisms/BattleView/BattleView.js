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
import DesktopBackground from "./styled-components/DesktopBackground";
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
        enemyCompactCardTranslateX: this.props.desktop ? '0' : '-100vw',
        userCompactCardTranslateX: this.props.desktop ? '0' : '100vw',
        enemyCompactCardTranslateY: this.props.desktop ? '-25vh' : '0',
        userCompactCardTranslateY: this.props.desktop ? '25vh' : '0',

        enemyMiniCardsTranslateX: ['-100vw', '-100vw', '-100vw', '-100vw', '-100vw'],
        userMiniCardsTranslateX: ['100vw', '100vw', '100vw', '100vw', '100vw'],

        enemyStateContainerTranslateX: '-100vw',
        userStateContainerTranslateX: '100vw',
        enemyStateContainerTranslateY: '-25vh',
        userStateContainerTranslateY: '25vh',

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

        // desktop background elements
        backgroundElemBeforePosX: '0',
        backgroundElemAfterPosX: '0',
    }

    componentDidMount() {
        getCurrentUserId()
            .then(id => this.setState({user: id}))
    }

    componentDidUpdate(prevProps) {
        // to init animations when BattleView component will mount
        if ((prevProps.visible !== this.props.visible)
            && this.props.visible === true) {
            this.setState({
                kuceInBattleVisible: true,
            });
            const battle = battleFromData(this.props.battleData);
            this.setState({battle: battle});
            battle.fetchNonVitalDataAsynchronously(); // Runs in the background
            battle.nextTurn();
            (this.props.desktop) ? this.desktopItemsAnimationInit() : this.itemsAnimationInit();
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

    usersStatsInitAnimation() {
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

    // init elements animation for mobile and call full card action
    itemsAnimationInit = () => {
        this.setState({
            kuceInBattleVisible: true,
        });
        this.stateContainersShotAnimation();
        this.compactCardsShotAnimation();
        this.compactCardsRetractionAnimation();
        this.stateContainersRetractionAnimation();
        this.miniCardsInitAnimation();
        this.usersStatsInitAnimation();
        this.firstFullCardActionCall();
    }

    showStatesContainersVertical() {
        setTimeout(() => {
            this.setState({
                enemyStateContainerTranslateY: '0',
                userStateContainerTranslateY: '0'
            });
        }, battleInitLoadingDuration
            + nextStepAnimationDuration);
    }

    showCompactCardsVertical() {
        setTimeout(() => {
            this.setState({
                enemyCompactCardTranslateY: '0',
                userCompactCardTranslateY: '0'
            });
        }, battleInitLoadingDuration
            + nextStepAnimationDuration + 100);
    }

    showPseudoBackgroundElements() {
        setTimeout(() => {
            this.setState({
                backgroundElemBeforePosX: '-100%',
                backgroundElemAfterPosX: '100%',
            });
        }, battleInitLoadingDuration
            + nextStepAnimationDuration * 3);
    }

    // init elements animation for desktop
    desktopItemsAnimationInit = () => {
        this.setState({
            kuceInBattleVisible: true,
        });
        this.showStatesContainersVertical();
        this.showCompactCardsVertical();
        this.usersStatsInitAnimation();
        this.showPseudoBackgroundElements();
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
                    const card = this.state.battle.getCardByInitialPos(enemy, i + 1);
                    const cardIdx = enemy ?
                        this.state.battle.enemy.deck.getCardIdxById(card.id) + 1 :
                        this.state.battle.user.deck.getCardIdxById(card.id) + 1;
                    return (
                        <MiniCardView key={enemy ? `enemyCard-${i}` : `userCard-${i}`}
                                      cardIndexInDeck={cardIdx}
                                      setTranslateX={
                                          enemy ? this.state.enemyMiniCardsTranslateX[i]
                                              : this.state.userMiniCardsTranslateX[i]
                                      }
                                      enemy={enemy} user={!enemy}
                                      cardLevel={card.level}
                                      animationDuration={`0.${9 - i}`}
                                      cardImage={card.image}/>
                    );
                })
        );
    }

    // get proper compact cards to DOM
    getCompactCards = (enemy) => {
        let handleMargin = '0'
        if (this.props.desktop) handleMargin = '0';
        else if (enemy)
            handleMargin = '0 0 0 10px';
        else handleMargin = '0 10px 0 0';
        return (
            [...Array(5)].map(
                (e, i) => {
                    const card = this.state.battle.getCardByInitialPos(enemy, i + 1);
                    const cardIdx = enemy ?
                        this.state.battle.enemy.deck.getCardIdxById(card.id) + 1 :
                        this.state.battle.user.deck.getCardIdxById(card.id) + 1;
                    return (
                        <CompactCardView key={enemy ? `enemyCompactCard-${i}` : `userCompactCard-${i}`}
                                         battleOnDesktop={this.props.desktop}
                                         cardIndexInDeck={cardIdx}
                                         cardImage={card.image}
                                         cardName={card.name}
                                         cardLevel={card.level}
                                         setWidth={'124px'} setHeight={'200px'}
                                         setTranslateX={enemy ? this.state.enemyCompactCardTranslateX
                                             : this.state.userCompactCardTranslateX}
                                         setTranslateY={enemy ? this.state.enemyCompactCardTranslateY
                                             : this.state.userCompactCardTranslateY}
                                         setMargin={handleMargin}/>
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
                                effectId={effect.id}
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
        }, nextStepAnimationDuration);

        this.state.battle.currentTurn.advance();
        // TODO: here call function doing particular effect for example damage, change card-order etc.
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
        const effects = this.state.battle.currentTurn.usedEffects;
        if (index < effects.length) {
            let newEffectsActionScale = this.state.effectsActionScale.slice();
            newEffectsActionScale[index] = '1.25';
            this.setState({
                effectsActionScale: newEffectsActionScale
            });
            this.effectIconCastEffect(newEffectsActionScale, index);
            this.callNextEffectIconAction(userTurn, index);
        } else {
            this.effectsHideCall(userTurn);
        }
    }

    compactCardBackCall(userTurn) {
        setTimeout(() => {
            userTurn ? this.compactCardBack(true) : this.compactCardBack(false);
        }, nextStepAnimationDuration);

        if (this.state.battle.nextTurn())
            setTimeout(() => {
                this.callNextCardSequence();
            }, nextStepAnimationDuration)
        else {
            this.showBattleOutcome();
            this.showPostBattle();
            //Battle has ended, do stuff here to display the outcome
        }
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
            const userTurn = this.state.battle.isUsersTurn;
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
    }

    getCurrentFullCard = () => {
        const card = this.state.battle.getCardOnTop();
        const levels = {
            common: card.level === 1,
            gold: card.level === 2,
            epic: card.level === 3,
        }
        return (
            <FullCardView cardName={card.name} cardSubject={card.subject}
                          cardImage={card.image} cardTooltip={card.tooltip}
                          description={card.description} common={levels.common}
                          gold={levels.gold} epic={levels.epic}
                          setTranslateY={this.state.fullCardAction.translateY}/>
        )
    }

    showBattleOutcome = () => {
        this.props.closeHandler();
        this.props.runPostBattle(this.props.battleData);
    }

    showPostBattle = () => {
        this.props.showPostBattle();
    }

    render() {
        if (this.state.battle === undefined) return (<></>);
        return (
            <>
                <Media query={mobile}>
                    <PopUp visible={this.props.visible} disableClose
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
                    <DesktopBackground visible={this.props.visible} setScale={this.props.setScale}>
                        <MainContainer setBeforeTranslateX={this.state.backgroundElemBeforePosX}
                                       setAfterTranslateY={this.state.backgroundElemAfterPosX}>
                            <PopUp visible={this.props.visible} disableClose
                                   setWidth={'100%'} setHeight={'100%'}
                                   setAlignment={'space-between'}>
                                <FlexGapContainer gap={'10px'} setMargin={'32px 0 0 0'}>
                                    <EnemyStateContainer setTranslateY={this.state.enemyStateContainerTranslateY}
                                                         hp={parseInt(this.state.battle.enemy.stats.hp)}
                                                         shield={parseInt(this.state.battle.enemy.stats.armour)}
                                                         username={this.state.battle.enemy.username}
                                    />
                                    <FlexGapContainer gap={'10px'} reverse>
                                        {this.getCompactCards(true)}
                                    </FlexGapContainer>
                                </FlexGapContainer>
                                <KuceInBattle visible={this.state.kuceInBattleVisible}/>
                                <FlexGapContainer gap={'10px'} setMargin={'0 0 32px 0'}>
                                    <FlexGapContainer gap={'10px'}>
                                        {this.getCompactCards(false)}
                                    </FlexGapContainer>
                                    <UserStateContainer setTranslateY={this.state.userStateContainerTranslateY}
                                                        hp={parseInt(this.state.battle.user.stats.hp)}
                                                        shield={parseInt(this.state.battle.user.stats.armour)}
                                                        username={this.state.battle.user.username}/>
                                </FlexGapContainer>
                            </PopUp>
                        </MainContainer>
                    </DesktopBackground>
                </Media>
            </>
        );
    }
}

export default BattleView;