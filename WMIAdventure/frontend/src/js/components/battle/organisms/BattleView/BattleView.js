import React from 'react';
import {battleInitLoadingDuration, secondStepAnimationDuration, desktop, mobile} from "../../../../utils/globals";
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
            run: false,
            opacity: '0',
            translateY: '-100vh',
        },
        userFullCardAction: {
            run: false,
            opacity: '0',
            translateY: '100vh',
        },

        // effect icons mount movement
        effectsTargetToEnemyMount: {
            translateX: ['0', '0', '0'],
            translateY: ['0', '0', '0'],
            opacity: ['0', '0', '0']
        },

        effectsTargetToUserMount: {
            translateX: ['0', '0', '0'],
            translateY: ['0', '0', '0'],
            opacity: ['0', '0', '0']
        },

        // effect icons action animation with scale
        effectsActionScale: ['1', '1', '1', '1', '1'],

        // used effects prototype data
        enemyUsedEffects: [ // player 2
            {
                id: 1, // damage
                target_player: 1,
                power: 42,
                changed_stats: {
                    hp: 58,
                    armour: 0
                }
            },
            {
                id: 3, // random change cards order
                target_player: 1
            },
            {
                id: 4, // one turn stop
                target_player: 1
            },
            {
                id: 2, // shield
                target_player: 2
            },
            {
                id: 5, // double card run
                target_player: 2
            }
        ],

        userUsedEffects: [ // player 1
            {
                id: 1, // damage
                target_player: 2,
                power: 1,
                changed_stats: {
                    hp: 78,
                    armour: 0
                },
            },
            {
                id: 8, // increase next card power
                target_player: 1,
                power: 2,
            },
            {
                id: 10, // increase next card damage
                target_player: 2,
                power: 3,
            },
            {
                id: 7, // block next card
                target_player: 1,
                power: 4,
            },
            {
                id: 6, // heal
                target_player: 2,
                power: 5,
            },
        ], // id of effects in this array

        // other prototype data
        cardLevels : [3, 3, 2, 1, 1],
        cardIcons : [icon1, icon2, icon3, icon4, icon5],
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
            this.itemsAnimationInit(this.fullCardAction);
        }
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

    usedEffectsIteration = () => {
        const user = this.state.user;
        let userOpacityIndex = 0; let enemyOpacityIndex = 0;
        let userXIndex = 0; let enemyXIndex = 0;
        let userYIndex = 0; let enemyYIndex = 0;
        return (
            this.state.userUsedEffects.map((effect, index) => {
                return (
                    <EffectIcon key={`effectIcon-${effect.id}`}
                                value={effect.power}
                                setOpacity={
                                    (effect.target_player === user)
                                        ? this.state.effectsTargetToUserMount.opacity[userOpacityIndex++]
                                        : this.state.effectsTargetToEnemyMount.opacity[enemyOpacityIndex++]}
                                setTranslateX={
                                    (effect.target_player === user)
                                        ? this.state.effectsTargetToUserMount.translateX[userXIndex++]
                                        : this.state.effectsTargetToEnemyMount.translateX[enemyXIndex++]}
                                setTranslateY={
                                    (effect.target_player === user)
                                        ? this.state.effectsTargetToUserMount.translateY[userYIndex++]
                                        : this.state.effectsTargetToEnemyMount.translateY[enemyYIndex++]}
                                setScale={this.state.effectsActionScale[index]}
                    />
                );
            })
        );
    }

    itemsAnimationInit = (callback) => {
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
            + secondStepAnimationDuration);

        // Second step of Compact cards animation
        setTimeout(() => {
            this.setState({
                enemyCompactCardTranslateX: '0',
                userCompactCardTranslateX: '0',
            });
        }, battleInitLoadingDuration
            + secondStepAnimationDuration * 2);

        /* Mini cards animations in one step,
        and hp and shield points animation */
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
            + secondStepAnimationDuration * 2 + 100);

        setTimeout(() => {
            callback();
        }, battleInitLoadingDuration
            + secondStepAnimationDuration * 4);
    }

    fullCardAction = () => {
        // show full card process
        let newUserFullCardAction = this.state.userFullCardAction;
        newUserFullCardAction.run = true;
        this.setState({
            userFullCardAction: newUserFullCardAction
        });
        newUserFullCardAction.translateY = '0';
        newUserFullCardAction.opacity = '1';
        setTimeout(() => {
            this.setState({
                userFullCardAction: newUserFullCardAction
            });
        }, 100);

        // hide full card process
        setTimeout(() => {
            this.compactCardAction();
            newUserFullCardAction = this.state.userFullCardAction;
            newUserFullCardAction.translateY = '100vh';
            newUserFullCardAction.opacity = '0';
            this.setState({
                userFullCardAction: newUserFullCardAction
            });
            newUserFullCardAction.run = false;
            setTimeout(() => {
                this.setState({
                    userFullCardAction: newUserFullCardAction
                });
            }, secondStepAnimationDuration);
        }, battleInitLoadingDuration +
            secondStepAnimationDuration * 3);
    }

    compactCardAction = () => {
        this.setState({
            kuceInBattleVisible: false,
            userCompactCardTranslateX: '100%',
            userCompactCardTranslateY: 'calc(-50vh + 50% + 24px)'
            // half screen - (half card + half navbar)
        });
        setTimeout(() => {
            this.effectsMount(true);
        }, secondStepAnimationDuration * 3);
    }

    setEffectAction = (index, actionIndex, opacity, translateXPowerCase, translateX, translateY) => {
        const effect = this.state.userUsedEffects;
        let userTarget = (effect[index].target_player === this.state.user);
        let newEffectsAction = userTarget ?
            this.state.effectsTargetToUserMount
            : this.state.effectsTargetToEnemyMount;

        newEffectsAction.opacity[actionIndex] = opacity;
        newEffectsAction.translateX[actionIndex] = effect[index].power ? translateXPowerCase : translateX;
        newEffectsAction.translateY[actionIndex] = translateY;

        userTarget ? this.setState({
            effectsTargetToUserMount : newEffectsAction
        }) : this.setState({
            effectsTargetToEnemyMount : newEffectsAction
        });
    }

    getCountUsedEffectsChosenTarget = (user) => {
        const currentUserId = this.state.user;
        let userTarget = 0;
        let enemyTarget = 0;
        for (let i=0; i<this.state.userUsedEffects.length; i++) {
            if(this.state.userUsedEffects[i].target_player === currentUserId)
                ++userTarget;
            else ++enemyTarget;
        }
        if(user) return userTarget;
        else return enemyTarget;
    }

    effectsMount = (user) => {
        if (this.getCountUsedEffectsChosenTarget(user) === 1) {
            this.state.userUsedEffects.map((effect, index) => {
                if((effect.target_player === this.state.user) === user) {
                    this.setEffectAction(
                        index, 0, '1', '-15%', '0',
                        (user ? '-144px' : '124px')
                    );
                    if(user) {
                        setTimeout(() => {
                            this.effectsMount(false);
                        }, secondStepAnimationDuration * 2);
                    } else {
                        setTimeout(() => {
                            this.effectsActions();
                        }, secondStepAnimationDuration * 2);
                    }
                }
            });
        } else if(this.getCountUsedEffectsChosenTarget(user) === 2) {
            let userTargetMeeting = 0;
            this.state.userUsedEffects.map((effect, index) => {
                if(((effect.target_player === this.state.user) === user) && userTargetMeeting === 0) {
                    userTargetMeeting++;
                    this.setEffectAction(
                        index, 0, '1', '-70%', '-100%',
                        (user ? '-144px' : '124px')
                    );
                } else if(((effect.target_player === this.state.user) === user) && userTargetMeeting === 1) {
                    userTargetMeeting++;
                    setTimeout(() => {
                        this.setEffectAction(
                            index, 1, '1', '50%', '100%',
                            (user ? '-144px' : '124px')
                        );
                        if(user) {
                            setTimeout(() => {
                                this.effectsMount(false);
                            }, secondStepAnimationDuration * 2);
                        } else {
                            setTimeout(() => {
                                this.effectsActions();
                            }, secondStepAnimationDuration * 2);
                        }
                    },secondStepAnimationDuration * 2);
                }
            });
        } else if(this.getCountUsedEffectsChosenTarget(user) === 3) {
            let userTargetMeeting = 0;
            this.state.userUsedEffects.map((effect, index) => {
                if(((effect.target_player === this.state.user) === user) && userTargetMeeting === 0) {
                    userTargetMeeting++;
                    this.setEffectAction(
                        index,0, '1', '-130%', '-120%',
                        (user ? '-144px' : '124px')
                    );
                } else if(((effect.target_player === this.state.user) === user) && userTargetMeeting === 1) {
                    userTargetMeeting++;
                    setTimeout(() => {
                        this.setEffectAction(
                            index,1, '1', '-15%', '20%',
                            (user ? '-144px' : '124px')
                        );
                    }, secondStepAnimationDuration * 2)
                } else if(((effect.target_player === this.state.user) === user) && userTargetMeeting === 2) {
                    setTimeout(() => {
                        this.setEffectAction(
                            index, 2, '1', '100%', '160%',
                            (user ? '-144px' : '124px')
                        );
                        if(user) {
                            setTimeout(() => {
                                this.effectsMount(false);
                            }, secondStepAnimationDuration * 2);
                        } else {
                            setTimeout(() => {
                                this.effectsActions();
                            }, secondStepAnimationDuration * 2);
                        }
                    }, secondStepAnimationDuration * 4);
                }
            })
        }
    }

    effectsActions = (index= 0) => {
        if(index < this.state.userUsedEffects.length) {
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
                // TODO: here function doing particular effect for example damage, change card order etc.
                setTimeout(() => {
                    this.effectsActions(index + 1);
                }, secondStepAnimationDuration * 2)
            }, secondStepAnimationDuration * 2);
        }
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
                        <FullCardActionBackground visible={this.state.userFullCardAction.run}
                                                  setOpacity={this.state.userFullCardAction.opacity}>
                            <FullCardView cardName={'Test'} cardSubject={'przykładzik'}
                                          cardImage={icon1} cardTooltip={'niech wszystko działa'}
                                          description={'ta karta narazie nic nie robi'} common
                                          setTranslateY={this.state.userFullCardAction.translateY} />
                        </FullCardActionBackground>
                        <EffectIconsContainer>
                            {this.usedEffectsIteration()}
                        </EffectIconsContainer>
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