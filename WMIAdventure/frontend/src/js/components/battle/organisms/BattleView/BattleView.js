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
import CenterDiv from "./styled-components/CenterDiv";
import userUsedEffects from "../../../../utils/prototypeData/userUsedEffects";

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

        // effect icons mount movement
        enemyTargetEffectsStyles: {
            opacity: '0',
            scale: '0',
            translateY: '0',
        },

        userTargetEffectsStyles: {
            opacity: '0',
            scale: '0',
            translateY: '0',
        },

        // effect icons action animation with scale
        effectsActionScale: ['1', '1', '1', '1', '1'],

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
            this.itemsAnimationInit();
        }
    }

    getNewStateAttributes(state, attributes) {
        if((state.visible !== undefined) && (attributes.visible !== undefined))
            state.visible = attributes.visible;
        if((state.opacity !== undefined) && (attributes.opacity !== undefined))
            state.opacity = attributes.opacity;
        if((state.scale !== undefined) && (attributes.scale !== undefined))
            state.scale = attributes.scale;
        if((state.translateY !== undefined) && (attributes.translateY !== undefined))
            state.translateY = attributes.translateY;
        return state;
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

    countTargetEffects(userTarget) { // to set correct EffectsIconsContainer gap
        let enemyCount = 0;
        let userCount = 0;
        for(let i=0; i<userUsedEffects.length; i++) {
            if(userUsedEffects[i].target_player === this.state.user) userCount++;
            else enemyCount++
        }
        if(userTarget) return userCount;
        else return enemyCount;
    }

    effectsTargetIteration = (userTarget) => {
        return (
            userUsedEffects.map((effect, index) => {
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
            + secondStepAnimationDuration);

        // Second step of Compact cards animation
        setTimeout(() => {
            this.setState({
                enemyCompactCardTranslateX: '0',
                userCompactCardTranslateX: '0',
            });
        }, battleInitLoadingDuration
            + secondStepAnimationDuration * 2);

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
            + secondStepAnimationDuration * 2 + 100);

        // full card action call
        setTimeout(() => {
            this.fullCardAction();
        }, battleInitLoadingDuration
            + secondStepAnimationDuration * 4);
    }

    fullCardAction = () => {
        // show full card process
        this.setState({
            userFullCardAction: this.getNewStateAttributes(this.state.userFullCardAction, {visible: true})
        });
        setTimeout(() => {
            this.setState({
                userFullCardAction:
                    this.getNewStateAttributes(
                        this.state.userFullCardAction, {opacity: '1', translateY: '0'})
            });
        }, 100);
        // hide full card process
        setTimeout(() => {
            this.compactCardAction();
            this.setState({
                userFullCardAction:
                    this.getNewStateAttributes(
                        this.state.userFullCardAction, {opacity: '0', translateY: '100vh'})
            });
            setTimeout(() => {
                this.setState({
                    userFullCardAction:
                        this.getNewStateAttributes(this.state.userFullCardAction, {visible: false})
                });
            }, secondStepAnimationDuration);
        }, battleInitLoadingDuration +
            secondStepAnimationDuration * 3);
    }

    compactCardAction = () => {
        this.setState({
            kuceInBattleVisible: false,
            userCompactCardTranslateX: '100%',
            userCompactCardTranslateY: 'calc(-50vh + 50% + 34px)'
        });
        setTimeout(() => {
            this.effectsMount();
        }, secondStepAnimationDuration * 3);
    }

    effectsMount = () => {
        this.setState({
            userTargetEffectsStyles:
                this.getNewStateAttributes(
                    this.state.userTargetEffectsStyles, {opacity: '1', scale: '1', translateY: '128px'})
        });
        this.setState({
            enemyTargetEffectsStyles:
                this.getNewStateAttributes(
                    this.state.enemyTargetEffectsStyles, {opacity: '1', scale: '1', translateY: '-128px'})
        });
        setTimeout(() => {
            this.effectsActions();
        }, secondStepAnimationDuration * 3);
    }

    effectsActions = (index= 0) => {
        if(index < userUsedEffects.length) {
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
                        <FullCardActionBackground visible={this.state.userFullCardAction.visible}
                                                  setOpacity={this.state.userFullCardAction.opacity}>
                            <FullCardView cardName={'Test'} cardSubject={'przykładzik'}
                                          cardImage={icon1} cardTooltip={'niech wszystko działa'}
                                          description={'ta karta narazie nic nie robi'} common
                                          setTranslateY={this.state.userFullCardAction.translateY} />
                        </FullCardActionBackground>
                        <CenterDiv>
                            <EffectIconsContainer
                                childrenCount={this.countTargetEffects(true)}
                                setOpacity={this.state.userTargetEffectsStyles.opacity}
                                setScale={this.state.userTargetEffectsStyles.scale}
                                setTranslateY={this.state.userTargetEffectsStyles.translateY}>
                                {this.effectsTargetIteration(true)}
                            </EffectIconsContainer>
                        </CenterDiv>
                        <CenterDiv>
                            <EffectIconsContainer
                                childrenCount={this.countTargetEffects(false)}
                                setOpacity={this.state.enemyTargetEffectsStyles.opacity}
                                setScale={this.state.enemyTargetEffectsStyles.scale}
                                setTranslateY={this.state.enemyTargetEffectsStyles.translateY}>
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