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
import {visualizeEffect} from "./effectsVisualizing";
import TransBack from "../../../global/organisms/TransBack";
import theme from "../../../../utils/theme";
import play from '../../../../../assets/icons/play.svg';
import pause from '../../../../../assets/icons/pause.svg';
import playDark from '../../../../../assets/icons/play-dark.svg';
import pauseDark from '../../../../../assets/icons/pause-dark.svg';
import ButtonWithIcon from "../../../global/atoms/ButtonWithIcon";
import MobileBattleButton from "./styled-components/MobileBattleButton";
import doubleSpeedIconDark from '../../../../../assets/icons/double-speed-dark.svg';
import normalSpeedIconDark from '../../../../../assets/icons/normal-speed-dark.svg';
import doubleSpeedIcon from '../../../../../assets/icons/double-speed.svg';
import normalSpeedIcon from '../../../../../assets/icons/normal-speed.svg';

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

        // desktop compact card action
        compactCardOnTopScale: {
            user: '1',
            enemy: '1',
            middle: '0'
        },

        // type: (0: nothing) (1: damage) (2: heal) (3: shield)
        effectFrameOpacity: {
            type: 'nothing',
            user: '0',
            enemy: '0'
        },
        autoplayEnabled: true,
        speedIncrease: false,
        speedValue: nextStepAnimationDuration,
        nextStepCallback: () => {
        },
    }

    componentDidMount() {
        getCurrentUserId()
            .then(id => this.setState({user: id}));
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

    flipAutoplay = () => {
        const newState = !this.state.autoplayEnabled;
        this.setState({autoplayEnabled: newState});

        if (newState)
            this.state ? this.state.nextStepCallback() : null;
    }

    flipSpeed = () => {
        const newState = !this.state.speedIncrease;
        this.setState({speedIncrease: newState});

        if (newState)
            this.setState({speedValue: nextStepAnimationDuration / 2});
        else
            this.setState({speedValue: nextStepAnimationDuration});

        if (newState)
            this.state ? this.state.nextStepCallback() : null;
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
            + this.state.speedValue);
    }

    stateContainersRetractionAnimation() {
        setTimeout(() => {
            this.setState({
                enemyStateContainerTranslateX: '0',
                userStateContainerTranslateX: '0',
            });
        }, battleInitLoadingDuration
            + this.state.speedValue);
    }

    compactCardsRetractionAnimation() {
        setTimeout(() => {
            this.setState({
                enemyCompactCardTranslateX: '0',
                userCompactCardTranslateX: '0',
            });
        }, battleInitLoadingDuration
            + this.state.speedValue * 2);
    }

    miniCardsInitAnimation() {
        setTimeout(() => {
            this.setState({
                enemyMiniCardsTranslateX: ['0', '0', '0', '0', '0'],
                userMiniCardsTranslateX: ['0', '0', '0', '0', '0'],
            });
        }, battleInitLoadingDuration
            + this.state.speedValue * 2 + 100);
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
            + this.state.speedValue * 2 + 100);
    }

    onNextButtonPress = () => {
        if (this.state.autoplayEnabled)
            return;

        this.state ? this.state.nextStepCallback() : null;
    }

    firstFullCardActionCall() {
        setTimeout(() => {
            this.fullCardAction();
        }, battleInitLoadingDuration
            + this.state.speedValue * 4);
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
            + this.state.speedValue);
    }

    showCompactCardsVertical() {
        setTimeout(() => {
            this.setState({
                enemyCompactCardTranslateY: '0',
                userCompactCardTranslateY: '0'
            });
        }, battleInitLoadingDuration
            + this.state.speedValue + 100);
    }

    showPseudoBackgroundElements() {
        setTimeout(() => {
            this.setState({
                backgroundElemBeforePosX: '-100%',
                backgroundElemAfterPosX: '100%',
            });
        }, battleInitLoadingDuration
            + this.state.speedValue * 3);
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
                                      cardImage={card.image}
                                      hasBuff={card.buffs.length !== 0}
                                      blocked={card.stoppedTurns > 0}
                        />
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
                    const compactCardOnTopScale = enemy ? this.state.compactCardOnTopScale.enemy :
                        this.state.compactCardOnTopScale.user;
                    return (
                        <CompactCardView key={enemy ? `enemyCompactCard-${i}` : `userCompactCard-${i}`}
                                         battleOnDesktop={this.props.desktop}
                                         cardIndexInDeck={cardIdx}
                                         cardImage={card.image}
                                         cardName={card.name}
                                         cardLevel={card.level}
                                         blocked={card.stoppedTurns > 0}
                                         setWidth={'124px'} setHeight={'200px'}
                                         setTranslateX={enemy ? this.state.enemyCompactCardTranslateX
                                             : this.state.userCompactCardTranslateX}
                                         setTranslateY={enemy ? this.state.enemyCompactCardTranslateY
                                             : this.state.userCompactCardTranslateY}
                                         setMargin={handleMargin}
                                         setScale={(cardIdx === 1) ? compactCardOnTopScale : '1'}
                                         buffs={card.buffs}/>
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
            const call = () => {

                this.state.battle.isUsersTurn ? this.compactCardAction(true) : this.compactCardAction(false);
                this.setNewStateAttributes(
                    this.state.fullCardAction, 'fullCardAction',
                    this.state.battle.isUsersTurn ? {opacity: '0', translateY: '100vh'} : {
                        opacity: '0',
                        translateY: '-100vh'
                    });

                this.hideFullCardBackground();
                this.setState({
                    nextStepCallback: () => {
                    }
                })
            }

            this.setState({nextStepCallback: call});
            this.state.autoplayEnabled ? this.state.nextStepCallback() : null;
        }, battleInitLoadingDuration +
            this.state.speedValue * 3);
    }

    hideFullCardBackground() {
        setTimeout(() => {
            this.setNewStateAttributes(
                this.state.fullCardAction, 'fullCardAction', {visible: false});
        }, battleInitLoadingDuration +
            this.state.speedValue * 4);
    }

    // show USER or ENEMY full card view
    fullCardAction = () => {
        this.showFullCardProcess();
        this.slideBackFullCardCallingCompactCardAction();
    }

    effectsMountCall(userTurn) {
        setTimeout(() => {
            userTurn ? this.effectsMount(true) : this.effectsMount(false);
        }, this.state.speedValue * 2);
    }

    compactCardActionMobile = (userTurn) => {
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
    }

    compactCardActionDesktop = (userTurn) => {
        setTimeout(() => {
            this.setState({
                compactCardOnTopScale: {user: `${Number(!userTurn)}`, enemy: `${Number(userTurn)}`, middle: '1'}
            });
        }, this.state.speedValue);
    }

    // push forward USER or ENEMY compact card
    compactCardAction = (userTurn) => {
        this.setState({
            kuceInBattleVisible: false,
        });
        this.props.desktop ? this.compactCardActionDesktop(userTurn) : this.compactCardActionMobile(userTurn);
        this.effectsMountCall(userTurn);
    }

    effectsActionCall(userTurn) {
        setTimeout(() => {
            userTurn ? this.effectsActions(true) : this.effectsActions(false);
        }, this.state.speedValue * 3);
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
        }, this.state.speedValue);

        const usedEffect = this.state.battle.currentTurn.getNextEffect()
        this.state.battle.currentTurn.advance();
        visualizeEffect(usedEffect, this);
    }

    callNextEffectIconAction(userTurn, index) {
        setTimeout(() => {
            this.effectsActions(userTurn, index + 1);
        }, this.state.speedValue * 2);
    }

    // scale USER or ENEMY effect icons to signal effect action
    effectsActions = (userTurn, index = 0) => {
        const effects = this.state.battle.currentTurn.usedEffects;
        if (index < effects.length) {
            let newEffectsActionScale = this.state.effectsActionScale.slice();
            newEffectsActionScale[index] = '1.25';
            const action = () => {

                this.setState({
                    effectsActionScale: newEffectsActionScale
                });
                this.effectIconCastEffect(newEffectsActionScale, index);
                this.callNextEffectIconAction(userTurn, index);

                this.setState({
                    nextStepCallback: () => {
                    }
                })
            }

            this.setState({nextStepCallback: action})

            this.state.autoplayEnabled ? action() : null;
        } else {
            this.effectsHide();
        }
    }

    compactCardBackCall() {
        setTimeout(() => {
            this.compactCardBack();
            if (this.state.battle.nextTurn())
                this.callNextCardSequence();
            else {
                this.showBattleOutcome();
                this.showPostBattle();
                //Battle has ended, do stuff here to display the outcome
            }
        }, this.state.speedValue);
    }

    // hide USER or ENEMY effect icons
    effectsHide = () => {
        setTimeout(() => {
            this.setNewStateAttributes(
                this.state.effectsTarget.user, 'effectsTarget.user',
                {opacity: '0', scale: '0', translateY: '0'});
            this.setNewStateAttributes(
                this.state.effectsTarget.enemy, 'effectsTarget.enemy',
                {opacity: '0', scale: '0', translateY: '0'});
            this.compactCardBackCall();
        }, this.state.speedValue);
    }

    callNextCardSequence() {
        setTimeout(() => {
            const userTurn = this.state.battle.isUsersTurn;
            const usedCardId = this.state.battle.currentTurn.usedCardId;

            if (usedCardId) {
                const cardExecutorDeck = userTurn ? this.state.battle.user.deck : this.state.battle.enemy.deck;
                const usedCard = cardExecutorDeck.lookupCardById(usedCardId);

                // If used card is stopped then don't play animation of using this stopped card.
                if (usedCard.stoppedTurns > 0)
                    this.compactCardBackCall();
                else
                    this.fullCardAction(userTurn);
            } else {
                this.compactCardBackCall();
            }

        }, this.state.speedValue * 3);
    }

    // back USER or ENEMY compact card to init position
    compactCardBack = () => {
        this.setState({
            kuceInBattleVisible: true,
        });

        if (this.props.desktop) {
            this.setState({
                compactCardOnTopScale: {user: '1', enemy: '1', middle: '0'},
            });
        } else {
            this.setState({
                userCompactCardTranslateX: '0',
                userCompactCardTranslateY: '0',
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
                          setTranslateY={this.state.fullCardAction.translateY}
                          buffs={card.buffs}/>
        );
    }

    showBattleOutcome = () => {
        this.props.closeHandler();
        this.props.runPostBattle(this.props.battleData);
    }

    showPostBattle = () => {
        this.props.showPostBattle();
    }

    playersOpacityHandler = (isEnemy) => {
        const stoppedOpacity = '50%'
        const stoppedTurns = isEnemy ? this.state.battle.enemy.stoppedTurns : this.state.battle.user.stoppedTurns;

        return stoppedTurns ? stoppedOpacity : '100%';
    }

    render() {
        if (this.state.battle === undefined) return (<></>);
        return (
            <>
                <Media query={mobile}>
                    <PopUp visible={this.props.visible} disableClose
                           setTranslateY={this.props.setTranslateY}>
                        <TransBack visible={true} closeHandler={this.onNextButtonPress} setOpacity={'0'}
                                   customZIndex={'50'}/>
                        <MainContainer>
                            <FlexGapContainer setMargin={'10px 0 0 0'} opacity={this.playersOpacityHandler(true)}>
                                <ColumnGapContainer gap={'0'}>
                                    <EnemyStateContainer setTranslateX={this.state.enemyStateContainerTranslateX}
                                                         hp={parseInt(this.state.battle.enemy.stats.hp)}
                                                         shield={parseInt(this.state.battle.enemy.stats.armour)}
                                                         username={this.state.battle.enemy.username}
                                                         image={this.state.battle.enemy.image}
                                                         effectFrameOpacity={this.state.effectFrameOpacity.enemy}
                                                         frameOpacityType={this.state.effectFrameOpacity.type}
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
                            <FlexGapContainer setMargin={'0 0 10px 0'} opacity={this.playersOpacityHandler(false)}>
                                {/* User Compact Card! Particular Compact Card is visible if order === 1 */}
                                {this.getCompactCards(false)}
                                <ColumnGapContainer gap={'0'} setRelative>
                                    <FlexGapContainer setWidth={'100%'} gap={'4px'}>
                                        {/* User MiniCards!
                                        First card is not visible because is the same as Compact card */}
                                        {this.getMiniCards(false)}
                                    </FlexGapContainer>
                                    <UserStateContainer setTranslateX={this.state.userStateContainerTranslateX}
                                                        hp={parseInt(this.state.battle.user.stats.hp)}
                                                        shield={parseInt(this.state.battle.user.stats.armour)}
                                                        username={this.state.battle.user.username}
                                                        image={this.state.battle.user.image}
                                                        effectFrameOpacity={this.state.effectFrameOpacity.user}
                                                        frameOpacityType={this.state.effectFrameOpacity.type}
                                    />
                                    <MobileBattleButton setTop={'-92px'} onClick={this.flipSpeed}
                                                        borderColor={this.state.speedIncrease
                                                            ? theme.colors.purplyPinky : theme.colors.greenyBluey}>
                                        <img src={this.state.speedIncrease
                                            ? normalSpeedIconDark : doubleSpeedIconDark}
                                             alt={'normal/double speed'}/>
                                    </MobileBattleButton>
                                    <MobileBattleButton setTop={'-46px'} onClick={this.flipAutoplay}
                                                        borderColor={this.state.autoplayEnabled
                                                            ? theme.colors.greenyBluey : theme.colors.purplyPinky}>
                                        <img src={this.state.autoplayEnabled ? pauseDark : playDark}
                                             alt={'play/pause'}/>
                                    </MobileBattleButton>
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
                        <TransBack visible={true} closeHandler={this.onNextButtonPress} setOpacity={'0'}
                                   customZIndex={'200'}/>
                        <MainContainer setBeforeTranslateX={this.state.backgroundElemBeforePosX}
                                       setAfterTranslateY={this.state.backgroundElemAfterPosX}>
                            <PopUp visible={this.props.visible} disableClose
                                   setWidth={'100%'} setHeight={'100%'}
                                   setAlignment={'space-between'}>
                                <FlexGapContainer gap={'10px'} setMargin={'32px 0 0 0'}
                                                  opacity={this.playersOpacityHandler(true)}>
                                    <EnemyStateContainer setTranslateY={this.state.enemyStateContainerTranslateY}
                                                         hp={parseInt(this.state.battle.enemy.stats.hp)}
                                                         shield={parseInt(this.state.battle.enemy.stats.armour)}
                                                         username={this.state.battle.enemy.username}
                                                         image={this.state.battle.enemy.image}
                                                         effectFrameOpacity={this.state.effectFrameOpacity.enemy}
                                                         frameOpacityType={this.state.effectFrameOpacity.type}
                                    />
                                    <FlexGapContainer gap={'10px'} reverse>
                                        {this.getCompactCards(true)}
                                    </FlexGapContainer>
                                </FlexGapContainer>
                                <KuceInBattle visible={this.state.kuceInBattleVisible}/>
                                <FlexGapContainer gap={'10px'} setMargin={'0 0 32px 0'}
                                                  opacity={this.playersOpacityHandler(false)}>
                                    <FlexGapContainer gap={'10px'}>
                                        {this.getCompactCards(false)}
                                    </FlexGapContainer>
                                    <UserStateContainer setTranslateY={this.state.userStateContainerTranslateY}
                                                        hp={parseInt(this.state.battle.user.stats.hp)}
                                                        shield={parseInt(this.state.battle.user.stats.armour)}
                                                        username={this.state.battle.user.username}
                                                        image={this.state.battle.user.image}
                                                        effectFrameOpacity={this.state.effectFrameOpacity.user}
                                                        frameOpacityType={this.state.effectFrameOpacity.type}/>
                                </FlexGapContainer>
                            </PopUp>
                        </MainContainer>
                        <FullCardActionBackground visible={this.state.fullCardAction.visible}
                                                  setOpacity={this.state.fullCardAction.opacity}>
                            {this.getCurrentFullCard()}
                        </FullCardActionBackground>
                        <CenterDiv>
                            <CompactCardView cardName={this.state.battle.getCardOnTop().name}
                                             cardLevel={this.state.battle.getCardOnTop().level}
                                             cardImage={this.state.battle.getCardOnTop().image}
                                             setWidth={'124px'} setHeight={'200px'} setMargin={'0'}
                                             setScale={this.state.compactCardOnTopScale.middle}
                                             blocked={this.state.battle.getCardOnTop().stoppedTurns > 0}
                                             buffs={this.state.battle.getCardOnTop().buffs}
                            />
                        </CenterDiv>
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
                        <CenterDiv setZindex={'500'} onClick={this.onNextButtonPress}>
                            <ButtonWithIcon handler={this.flipSpeed} setMargin={'0 0 16px 820px'}
                                            icon={this.state.speedIncrease ? normalSpeedIcon : doubleSpeedIcon}
                                            color={this.state.speedIncrease ? theme.colors.purplyPinky
                                                : theme.colors.greenyBluey}>
                                {this.state.speedIncrease ? 'Normalna prędkość' : 'Podwójna prędkość'}</ButtonWithIcon>
                            <ButtonWithIcon handler={this.flipAutoplay} setMargin={'0 0 0 900px'}
                                            icon={this.state.autoplayEnabled ? pause : play}
                                            color={this.state.autoplayEnabled ? theme.colors.greenyBluey
                                                : theme.colors.purplyPinky}>
                                Autoplay</ButtonWithIcon>
                        </CenterDiv>
                    </DesktopBackground>
                </Media>
            </>
        );
    }
}

export default BattleView;