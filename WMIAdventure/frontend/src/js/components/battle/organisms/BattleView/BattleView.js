import React from 'react';
import {battleInitLoadingDuration, nextStepAnimationDuration, desktop, mobile} from "../../../../utils/globals";
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
import {getCurrentUserId} from "../../../../utils/userData";
import CenterDiv from "./styled-components/CenterDiv";
import userUsedEffects from "../../../../utils/prototypeData/userUsedEffects";
import enemyUsedEffects from "../../../../utils/prototypeData/enemyUsedEffects";

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

        // states for hp and shield points
        enemyHp: '0',
        userHp: '0',
        enemyShield: '0',
        userShield: '0',

        // states to handle cards orders, pass to CompactCardView and MiniCardView as props
        cardsEnemyOrder : [1, 2, 3, 4, 5],
        cardsUserOrder : [1, 2, 3, 4, 5], // this means: first card on first place and so on

        // full cards action
        enemyFullCardAction: {
            visible: false,
            opacity: '0',
            translateY: '-100vh',
        },
        userFullCardAction: {
            visible: false,
            opacity: '0',
            translateY: '100vh',
        },

        // effect icons mount movement belongs to user
        userTargetEnemyEffects: {
            opacity: '0',
            scale: '0',
            translateY: '0',
        },

        userTargetSelfEffects: {
            opacity: '0',
            scale: '0',
            translateY: '0',
        },

        // effect icons mount movement belongs to enemy
        enemyTargetUserEffects: {
            opacity: '0',
            scale: '0',
            translateY: '0',
        },

        enemyTargetSelfEffects: {
            opacity: '0',
            scale: '0',
            translateY: '0',
        },

        // effect icons action animation with scale
        effectsActionScale: ['1', '1', '1', '1', '1'],

        // other prototype data
        cardLevels : [3, 3, 2, 1, 1],
        cardIcons : [icon1, icon2, icon3, icon4, icon5],
        prototypeIterationsCount: 0,
    }

    componentDidMount() {
        getCurrentUserId()
            .then(id => this.setState({user: id}))
    }

    componentDidUpdate(prevProps) {
        // to init animations when BattleView component will mount
        if((prevProps.battleView !== this.props.battleView)
            && this.props.battleView === true) {
            this.setState({
                kuceInBattleVisible: true,
            });
            this.itemsAnimationInit();
        }
    }

    // helper function to set property states
    setNewStateAttributes(state, property, attributes) {
        if((state.visible !== undefined) && (attributes.visible !== undefined))
            state.visible = attributes.visible;
        if((state.opacity !== undefined) && (attributes.opacity !== undefined))
            state.opacity = attributes.opacity;
        if((state.scale !== undefined) && (attributes.scale !== undefined))
            state.scale = attributes.scale;
        if((state.translateY !== undefined) && (attributes.translateY !== undefined))
            state.translateY = attributes.translateY;
        this.setState({
           [property]: state
        });
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
                (e,i) => {
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
                                      cardLevel={this.state.cardLevels[i]}
                                      animationDuration={`0.${9 - i}`}
                                      cardImage={this.state.cardIcons[i]}/>
                    );
                })
        );
    }

    // get proper compact cards to DOM
    getCompactCards = (enemy) => {
        return (
            [...Array(5)].map(
                (e,i) => {
                    return (
                        <CompactCardView key={enemy ? `enemyCompactCard-${i}` : `userCompactCard-${i}`}
                                         cardIndexInDeck={enemy ? this.state.cardsEnemyOrder[i]
                                             : this.state.cardsUserOrder[i]}
                                         cardImage={this.state.cardIcons[i]} cardName={`Karta ${i+1}`}
                                         setWidth={'124px'} cardLevel={3} setHeight={'200px'}
                                         setTranslateX={enemy ? this.state.enemyCompactCardTranslateX
                                             : this.state.userCompactCardTranslateX}
                                         setTranslateY={enemy ? this.state.enemyCompactCardTranslateY
                                             : this.state.userCompactCardTranslateY}
                                         setMargin={enemy ? '0 0 0 10px' : '0 10px 0 0'} />
                    );
                })
        );
    }

    countTargetEffects(userEffects, userTarget) { // to set correct EffectsIconsContainer gap
        let effects;
        if(userEffects) effects = userUsedEffects;
        else effects = enemyUsedEffects;
        let enemyCount = 0;
        let userCount = 0;
        for(let i=0; i<effects.length; i++) {
            if(effects[i].target_player === this.state.user) userCount++;
            else enemyCount++
        }
        if(userTarget) return userCount;
        else return enemyCount;
    }

    // get property effects to card and show in DOM
    effectsTargetIteration = (userEffects, userTarget) => {
        let effects;
        if(userEffects) effects = userUsedEffects;
        else effects = enemyUsedEffects;
        return (
            effects.map((effect, index) => {
                if(userTarget === (effect.target_player === this.state.user)) {
                    return (
                        <EffectIcon key={`effectIcon-${effect.id}`}
                                    value={effect.power}
                                    setScale={this.state.effectsActionScale[index]}
                        />
                    );
                }
            })
        );
    }

    // init elements animation
    itemsAnimationInit = () => {
        // Users containers show first
        setTimeout(() => {
            this.setState({
                enemyStateContainerTranslateX: '8vw',
                userStateContainerTranslateX: '-8vw'
            });
        }, battleInitLoadingDuration);

        // Second step of users containers animation and first of Compact cards
        setTimeout(() => {
            this.setState({
                enemyStateContainerTranslateX: '0',
                userStateContainerTranslateX: '0',
                enemyCompactCardTranslateX: '6vw',
                userCompactCardTranslateX: '-6vw',
            });
        }, battleInitLoadingDuration
            + nextStepAnimationDuration);

        // Second step of Compact cards animation
        setTimeout(() => {
            this.setState({
                enemyCompactCardTranslateX: '0',
                userCompactCardTranslateX: '0',
            });
        }, battleInitLoadingDuration
            + nextStepAnimationDuration * 2);

        // Mini cards animations in one step, and hp and shield points animation
        setTimeout(() => {
            this.setState({
                enemyMiniCardsTranslateX: ['0', '0', '0', '0', '0'],
                userMiniCardsTranslateX: ['0', '0', '0', '0', '0'],
                enemyHp: '100',
                userHp: '100',
                enemyShield: '20',
                userShield: '20'
            });
        }, battleInitLoadingDuration
            + nextStepAnimationDuration * 2 + 100);

        // full card action call
        setTimeout(() => {
            this.fullCardAction(true);
        }, battleInitLoadingDuration
            + nextStepAnimationDuration * 4);
    }

    // show USER or ENEMY full card view
    fullCardAction = (user) => {
        // show full card process
        this.setNewStateAttributes(
            user ? this.state.userFullCardAction : this.state.enemyFullCardAction,
            user ? 'userFullCardAction' : 'enemyFullCardAction', {visible: true});
        setTimeout(() => {
            this.setNewStateAttributes(
                user ? this.state.userFullCardAction : this.state.enemyFullCardAction,
                user ? 'userFullCardAction' : 'enemyFullCardAction',
                {opacity: '1', translateY: '0'});
        }, 100);
        // hide full card process
        setTimeout(() => {
            user ? this.compactCardAction(true) : this.compactCardAction(false);
            this.setNewStateAttributes(
                user ? this.state.userFullCardAction : this.state.enemyFullCardAction,
                user ? 'userFullCardAction' : 'enemyFullCardAction',
                user ? {opacity: '0', translateY: '100vh'} : {opacity: '0', translateY: '-100vh'});
            setTimeout(() => {
                this.setNewStateAttributes(
                    user ? this.state.userFullCardAction : this.state.enemyFullCardAction,
                    user ? 'userFullCardAction' : 'enemyFullCardAction', {visible: false});
            }, nextStepAnimationDuration);
        }, battleInitLoadingDuration +
            nextStepAnimationDuration * 3);
    }

    // push forward USER or ENEMY compact card
    compactCardAction = (user) => {
        if(user) {
            this.setState({
                kuceInBattleVisible: false,
                userCompactCardTranslateX: 'calc(100% - 5px)',
                userCompactCardTranslateY: 'calc(-50vh + 50% + 34px)'
            });
        } else {
            this.setState({
                kuceInBattleVisible: false,
                enemyCompactCardTranslateX: 'calc(-100% + 5px)',
                enemyCompactCardTranslateY: 'calc(50vh - 50% - 34px)'
            });
        }
        setTimeout(() => {
            user ? this.effectsMount(true) : this.effectsMount(false);
        }, nextStepAnimationDuration * 2);
    }

    // shows USER or ENEMY effect icons
    effectsMount = (user) => {
        this.setNewStateAttributes(
            user ? this.state.userTargetSelfEffects : this.state.enemyTargetUserEffects,
            user ? 'userTargetSelfEffects' : 'enemyTargetUserEffects',
            {opacity: '1', scale: '1', translateY: '128px'});
        this.setNewStateAttributes(
            user ? this.state.userTargetEnemyEffects : this.state.enemyTargetSelfEffects,
            user ? 'userTargetEnemyEffects' : 'enemyTargetSelfEffects',
            {opacity: '1', scale: '1', translateY: '-128px'});
        setTimeout(() => {
            user ? this.effectsActions(true) :  this.effectsActions(false);
        }, nextStepAnimationDuration * 3);
    }

    // scale USER or ENEMY effect icons to signal effect action
    effectsActions = (user, index= 0) => {
        let effects;
        if(user) effects = userUsedEffects;
        else effects = enemyUsedEffects;
        if(index < effects.length) {
            let newEffectsActionScale = this.state.effectsActionScale.slice();
            newEffectsActionScale[index] = '1.25';
            this.setState({
                effectsActionScale: newEffectsActionScale
            });
            setTimeout(() => {
                newEffectsActionScale[index] = '1';
                this.setState({
                    effectsActionScale: newEffectsActionScale
                });
                // TODO: here function doing particular effect for example damage, change card-order etc.
                setTimeout(() => {
                    this.effectsActions(user, index + 1);
                }, nextStepAnimationDuration)
            }, nextStepAnimationDuration);
        } else {
            setTimeout(() => {
                user ? this.effectsHide(true) : this.effectsHide(false);
            }, nextStepAnimationDuration);
        }
    }

    // hide USER or ENEMY effect icons
    effectsHide = (user) => {
        this.setNewStateAttributes(
            user ? this.state.userTargetSelfEffects : this.state.enemyTargetUserEffects,
            user ? 'userTargetSelfEffects' : 'enemyTargetUserEffects',
            {opacity: '0', scale: '0', translateY: '0'});
        this.setNewStateAttributes(
            user ? this.state.userTargetEnemyEffects : this.state.enemyTargetSelfEffects,
            user ? 'userTargetEnemyEffects' : 'enemyTargetSelfEffects',
            {opacity: '0', scale: '0', translateY: '0'});
        setTimeout(() => {
            user ? this.compactCardBack(true) : this.compactCardBack(false);
        }, nextStepAnimationDuration);
    }

    // back USER or ENEMY compact card to init position
    compactCardBack = (user) => {
        if(user) {
            this.setState({
                kuceInBattleVisible: true,
                userCompactCardTranslateX: '0',
                userCompactCardTranslateY: '0'
            });
        } else {
            this.setState({
                kuceInBattleVisible: true,
                enemyCompactCardTranslateX: '0',
                enemyCompactCardTranslateY: '0'
            });
        } setTimeout(() => {
            let newIterationsCount = this.state.prototypeIterationsCount;
            newIterationsCount = newIterationsCount + 1;
            this.setState({
                prototypeIterationsCount: newIterationsCount
            });
            if(this.state.prototypeIterationsCount < 2)
                this.fullCardAction(false);
        }, nextStepAnimationDuration * 3);
    }

    render() {
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
                                                         hp={this.state.enemyHp} shield={this.state.enemyShield} />
                                    <FlexGapContainer setWidth={'100%'} gap={'4px'} reverse>
                                        {/* Enemy MiniCards!
                                        First card is not visible because is the same as Compact card */}
                                        {this.getMiniCards(true)}
                                    </FlexGapContainer>
                                </ColumnGapContainer>
                                {/* Enemy Compact Card! Particular Compact Card is visible if order === 1 */}
                                {this.getCompactCards(true)}
                            </FlexGapContainer>
                            <KuceInBattle visible={this.state.kuceInBattleVisible} />
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
                                                        hp={this.state.userHp} shield={this.state.userShield} />
                                </ColumnGapContainer>
                            </FlexGapContainer>
                        </MainContainer>
                        <FullCardActionBackground visible={this.state.userFullCardAction.visible}
                                                  setOpacity={this.state.userFullCardAction.opacity}>
                            <FullCardView cardName={'Test User'} cardSubject={'przykładzik'}
                                          cardImage={icon1} cardTooltip={'niech wszystko działa'}
                                          description={'ta karta póki co nic nie robi'} common
                                          setTranslateY={this.state.userFullCardAction.translateY} />
                        </FullCardActionBackground>
                        <FullCardActionBackground visible={this.state.enemyFullCardAction.visible}
                                                  setOpacity={this.state.enemyFullCardAction.opacity}>
                            <FullCardView cardName={'Test Enemy'} cardSubject={'przykładzik2'}
                                          cardImage={icon1} cardTooltip={'wszystko działa'}
                                          description={'ta karta na razie nic nie robi'} common
                                          setTranslateY={this.state.enemyFullCardAction.translateY} />
                        </FullCardActionBackground>
                        <CenterDiv>
                            <EffectIconsContainer
                                childrenCount={this.countTargetEffects(true, true)}
                                setOpacity={this.state.userTargetSelfEffects.opacity}
                                setScale={this.state.userTargetSelfEffects.scale}
                                setTranslateY={this.state.userTargetSelfEffects.translateY}>
                                {this.effectsTargetIteration(true, true)}
                            </EffectIconsContainer>
                        </CenterDiv>
                        <CenterDiv>
                            <EffectIconsContainer
                                childrenCount={this.countTargetEffects(true, false)}
                                setOpacity={this.state.userTargetEnemyEffects.opacity}
                                setScale={this.state.userTargetEnemyEffects.scale}
                                setTranslateY={this.state.userTargetEnemyEffects.translateY}>
                                {this.effectsTargetIteration(true, false)}
                            </EffectIconsContainer>
                        </CenterDiv>
                        <CenterDiv>
                            <EffectIconsContainer
                                childrenCount={this.countTargetEffects(false, false)}
                                setOpacity={this.state.enemyTargetSelfEffects.opacity}
                                setScale={this.state.enemyTargetSelfEffects.scale}
                                setTranslateY={this.state.enemyTargetSelfEffects.translateY}>
                                {this.effectsTargetIteration(false, false)}
                            </EffectIconsContainer>
                        </CenterDiv>
                        <CenterDiv>
                            <EffectIconsContainer
                                childrenCount={this.countTargetEffects(false, true)}
                                setOpacity={this.state.enemyTargetUserEffects.opacity}
                                setScale={this.state.enemyTargetUserEffects.scale}
                                setTranslateY={this.state.enemyTargetUserEffects.translateY}>
                                {this.effectsTargetIteration(false, true)}
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