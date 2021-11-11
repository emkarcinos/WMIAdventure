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

        // states for hp and shield points
        enemyHp: '0',
        userHp: '0',
        enemyShield: '0',
        userShield: '0',

        // prototype data
        cardLevels : [3, 3, 2, 1, 1],
        icons : [icon1, icon2, icon3, icon4, icon5],
        // states to handle cards orders, pass to CompactCardView and MiniCardView as props
        cardsUserOrder : [1, 2, 3, 4, 5], // this means: first card on first place and so on
        cardsEnemyOrder : [1, 2, 3, 4, 5],
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
                                  cardImage={this.state.icons[i]}/>
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
                                     cardImage={this.state.icons[i]} cardName={`Karta ${i+1}`}
                                     setWidth={'124px'} cardLevel={3} setHeight={'200px'}
                                     setTranslateX={enemy ? this.state.enemyCompactCardTranslateX
                                         : this.state.userCompactCardTranslateX}
                                     setMargin={enemy ? '0 0 0 10px' : '0 10px 0 0'} />
                );
            })
        );
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