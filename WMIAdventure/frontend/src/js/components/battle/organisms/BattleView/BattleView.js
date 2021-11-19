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
import icon1 from '../../../../../assets/images/icon1.png';
import icon2 from '../../../../../assets/images/icon2.png';
import icon3 from '../../../../../assets/images/icon3.png';
import icon4 from '../../../../../assets/images/icon4.png';
import icon5 from '../../../../../assets/images/icon5.png';
import EnemyStateContainer from "../../molecules/EnemyStateContainer";
import FullCardActionBackground from "./styled-components/FullCardActionBackground";
import FullCardView from "../../../global/atoms/FullCardView";
import EffectIconsContainer from "./styled-components/EffectIconsContainer";
import EffectIcon from "../../atoms/EffectIcon";
import CenterDiv from "./styled-components/CenterDiv";
import userUsedEffects from "../../../../utils/prototypeData/userUsedEffects";
import enemyUsedEffects from "../../../../utils/prototypeData/enemyUsedEffects";
import DesktopBackground from "./styled-components/DesktopBackground";
import {getCurrentUserId} from "../../../../storage/user/userData";

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

        // states for hp and shield points
        enemyHp: '0',
        userHp: '0',
        enemyShield: '0',
        userShield: '0',

        // states to handle cards orders, pass to CompactCardView and MiniCardView as props
        cardsEnemyOrder: [1, 2, 3, 4, 5],
        cardsUserOrder: [1, 2, 3, 4, 5], // this means: first card on first place and so on

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

        // other prototype data, will be remove when true data comes perhaps
        cards: [
            {level: 3, icon: icon1}, {level: 3, icon: icon2}, {level: 2, icon: icon3},
            {level: 1, icon: icon4}, {level: 1, icon: icon5}
        ],
        prototypeIterationsCount: 0,

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
            && this.props.visible === true)
            (this.props.desktop) ? this.desktopItemsAnimationInit() : this.itemsAnimationInit();
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
            this.fullCardAction(true);
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
    countTargetEffects(battleIterations, userTarget) {
        const effects = (battleIterations % 2 === 0) ? userUsedEffects : enemyUsedEffects;
        let enemyCount = 0;
        let userCount = 0;
        for (const effect of effects) {
            if (effect.target_player === this.state.user) userCount++;
            else enemyCount++
        }
        if (userTarget)
            return userCount;
        else
            return enemyCount;
    }

    // prototype function, runs if we click on mini enemy cards
    changeCardsEnemyOrder = () => {
        this.setState({
            cardsEnemyOrder: [3, 2, 1, 5, 4]
            // this means: first card on third place, second on second, third on first and so on
        });
    }

    // prototype function, runs if we click on mini user cards
    changeCardsUserOrder = () => {
        this.setState({
            cardsUserOrder: [5, 4, 2, 3, 1]
            // this means: first card on fifth place, second on fourth, third on second and so on
        });
    }

    // get proper mini cards to DOM
    getMiniCards = (enemy) => {
        return (
            [...Array(5)].map(
                (e, i) => {
                    return (
                        <MiniCardView key={enemy ? `enemyCard-${i}` : `userCard-${i}`}
                                      changeCardsOrder={
                                          enemy ? this.changeCardsEnemyOrder : this.changeCardsUserOrder
                                      }
                                      cardIndexInDeck={
                                          enemy ? this.state.cardsEnemyOrder[i] : this.state.cardsUserOrder[i]
                                      }
                                      setTranslateX={
                                          enemy ? this.state.enemyMiniCardsTranslateX[i]
                                              : this.state.userMiniCardsTranslateX[i]
                                      }
                                      enemy={enemy} user={!enemy}
                                      cardLevel={this.state.cards[i].level}
                                      animationDuration={`0.${9 - i}`}
                                      cardImage={this.state.cards[i].icon}/>
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
                    return (
                        <CompactCardView key={enemy ? `enemyCompactCard-${i}` : `userCompactCard-${i}`}
                                         battleOnDesktop={this.props.desktop}
                                         cardIndexInDeck={enemy ? this.state.cardsEnemyOrder[i]
                                             : this.state.cardsUserOrder[i]}
                                         cardImage={this.state.cards[i].icon} cardName={`Karta ${i + 1}`}
                                         setWidth={'124px'} cardLevel={3} setHeight={'200px'}
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
    effectsTargetIteration = (battleIterations, userTarget) => {
        const effects = (battleIterations % 2 === 0) ? userUsedEffects : enemyUsedEffects;
        // console.log(`User: ${this.state.user}`); TODO: some browsers see user as null
        return effects.map((effect, index) => {
            if (userTarget === (effect.target_player === this.state.user)) {
                return (
                    <EffectIcon key={`effectIcon-${effect.id}`}
                                value={effect.power}
                                setScale={this.state.effectsActionScale[index]}
                    />
                );
            }
        });
    }

    showFullCardProcess(userTurn) {
        this.setNewStateAttributes(
            this.state.fullCardAction, 'fullCardAction',
            userTurn ? {visible: true, translateY: '100vh'} : {visible: true, translateY: '-100vh'});

        setTimeout(() => {
            this.setNewStateAttributes(
                this.state.fullCardAction, 'fullCardAction', {opacity: '1', translateY: '0'});
        }, 100);
    }

    slideBackFullCardCallingCompactCardAction(userTurn) {
        setTimeout(() => {
            userTurn ? this.compactCardAction(true) : this.compactCardAction(false);
            this.setNewStateAttributes(
                this.state.fullCardAction, 'fullCardAction',
                userTurn ? {opacity: '0', translateY: '100vh'} : {opacity: '0', translateY: '-100vh'});
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
    fullCardAction = (userTurn) => {
        this.showFullCardProcess(userTurn);
        this.slideBackFullCardCallingCompactCardAction(userTurn);
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
        const effects = userTurn ? userUsedEffects : enemyUsedEffects;
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
            let newIterationsCount = this.state.prototypeIterationsCount;
            newIterationsCount = newIterationsCount + 1;
            this.setState({
                prototypeIterationsCount: newIterationsCount
            });
            // to prevent from infinitive loop
            if (newIterationsCount < 2) {
                const userTurn = newIterationsCount % 2 === 0;
                this.fullCardAction(userTurn);
            }
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
        this.callNextCardSequence();
    }

    render() {
        return (
            <>
                <Media query={mobile}>
                    <PopUp visible={this.props.visible} disableClose
                           setTranslateY={this.props.setTranslateY}>
                        <MainContainer>
                            <FlexGapContainer setMargin={'10px 0 0 0'}>
                                <ColumnGapContainer gap={'0'}>
                                    <EnemyStateContainer setTranslateX={this.state.enemyStateContainerTranslateX}
                                                         hp={this.state.enemyHp} shield={this.state.enemyShield}/>
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
                                                        hp={this.state.userHp} shield={this.state.userShield}/>
                                </ColumnGapContainer>
                            </FlexGapContainer>
                        </MainContainer>
                        <FullCardActionBackground visible={this.state.fullCardAction.visible}
                                                  setOpacity={this.state.fullCardAction.opacity}>
                            <FullCardView cardName={'Pełny Opis Test'} cardSubject={'przykładzik'}
                                          cardImage={icon1} cardTooltip={'niech wszystko działa'}
                                          description={'ta karta póki co nic nie robi'} common
                                          setTranslateY={this.state.fullCardAction.translateY}/>
                        </FullCardActionBackground>
                        <CenterDiv>
                            <EffectIconsContainer
                                childrenCount={this.countTargetEffects(this.state.prototypeIterationsCount, true)}
                                setOpacity={this.state.effectsTarget.user.opacity}
                                setScale={this.state.effectsTarget.user.scale}
                                setTranslateY={this.state.effectsTarget.user.translateY}>
                                {this.effectsTargetIteration(this.state.prototypeIterationsCount, true)}
                            </EffectIconsContainer>
                        </CenterDiv>
                        <CenterDiv>
                            <EffectIconsContainer
                                childrenCount={this.countTargetEffects(this.state.prototypeIterationsCount, false)}
                                setOpacity={this.state.effectsTarget.enemy.opacity}
                                setScale={this.state.effectsTarget.enemy.scale}
                                setTranslateY={this.state.effectsTarget.enemy.translateY}>
                                {this.effectsTargetIteration(this.state.prototypeIterationsCount, false)}
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
                                    <EnemyStateContainer hp={this.state.enemyHp} shield={this.state.enemyShield}
                                                         setTranslateY={this.state.enemyStateContainerTranslateY}/>
                                    <FlexGapContainer gap={'10px'} reverse>
                                        {this.getCompactCards(true)}
                                    </FlexGapContainer>
                                </FlexGapContainer>
                                <KuceInBattle visible={this.state.kuceInBattleVisible}/>
                                <FlexGapContainer gap={'10px'} setMargin={'0 0 32px 0'}>
                                    <FlexGapContainer gap={'10px'}>
                                        {this.getCompactCards(false)}
                                    </FlexGapContainer>
                                    <UserStateContainer hp={this.state.userHp} shield={this.state.userShield}
                                                        setTranslateY={this.state.userStateContainerTranslateY}/>
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