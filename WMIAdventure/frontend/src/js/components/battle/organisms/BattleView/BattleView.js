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
        enemyMiniCardsTranslateX: '-100vw',
        userMiniCardsTranslateX: ['100vw', '100vw', '100vw', '100vw', '100vw'],
        enemyStateContainerTranslateX: '-100vw',
        userStateContainerTranslateX: '100vw',

        // states for hp and shield points
        enemyHp: '0',
        userHp: '0',
        enemyShield: '0',
        userShield: '0',

        // access cards animation during battle
        battleStarted: false,

        // set translate X to specific card
        // ... maybe arrays?

        // prototype data
        cardLevels : [3, 3, 2, 1, 1],
        icons : [icon1, icon2, icon3, icon4, icon5],
        cardsOrder : [1, 2, 3, 4, 5],
        orderPlaceDistance: 58,
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
                enemyMiniCardsTranslateX: '0',
                userMiniCardsTranslateX: ['0', '0', '0', '0', '0'],
                enemyHp: '100',
                userHp: '100',
                enemyShield: '20',
                userShield: '20'
            });
        }, battleInitLoadingDuration
            + secondStepAnimationDuration * 2 + 100);

        // Give access to animations during battle
        setTimeout(() => {
            this.setState({
                battleStarted: true,
            });
        },battleInitLoadingDuration
        + secondStepAnimationDuration * 3);
    }

   // userCardsOrderUpdate(cardsPositions) {
        // cardsPositions = [1, 2, 3, 4, 5]; // => [0, 0, 0, 0, 0]
        // pierwsza karta na pierwszym miejscu, druga na drugim itd.

        // cardsPositions = [2, 4, 5, 1, 3]; // => [2*58, 0, 2*58, -2*58, -2*58]
        // druga karta na pierwszym, czwarta na drugim, piąta na trzecim itd.
        // albo inaczej pierwsza karta na czwartym, druga na pierwszym, trzecia na piątym itd.

        // jedynka moze sie przesuwac 58, 2*58, 3*58
        // dwójka moze sie przesuwac 58, 2*58, 3*58
        // trójka moze sie przesuwac -58, 58, 2*58
        // czwórka moze sie przesuwac -2*58, -58, 58
        // piątka moze sie przesuwac -3*58, -2*58, -58
  //  }

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
                                    <FlexGapContainer setWidth={'100%'} gap={'4px'}>
                                        {/* first card is not visible because is the same as Compact card */}
                                        {[...Array(5)].map(
                                            (e,i) => {
                                                return (
                                                    <MiniCardView key={`enemyCard-${i}`}
                                                                  cardsOrder={this.state.cardsOrder[5 - i]}
                                                                  battleStarted={this.state.battleStarted}
                                                                  setTranslateX={this.state.enemyMiniCardsTranslateX}
                                                                  enemy cardLevel={this.state.cardLevels[i]}
                                                                  visible={!(i===0)} animationDuration={`0.${10 - i}`}
                                                                  cardImage={this.state.icons[5 - i]}/>
                                                );
                                            }
                                        )}
                                    </FlexGapContainer>
                                </ColumnGapContainer>
                                <CompactCardView cardImage={icon1} cardName={'Karta 1'}
                                                 setWidth={'124px'} cardLevel={3} setHeight={'200px'}
                                                 setTranslateX={this.state.enemyCompactCardTranslateX}
                                                 setMargin={'0 0 0 10px'} />
                            </FlexGapContainer>
                            <KuceInBattle visible={this.state.kuceInBattleVisible} />
                            <FlexGapContainer setMargin={'0 0 10px 0'}>
                                <CompactCardView cardImage={icon1} cardName={'Karta 1'}
                                                 setWidth={'124px'} cardLevel={1} setHeight={'200px'}
                                                 setTranslateX={this.state.userCompactCardTranslateX}
                                                 setMargin={'0 10px 0 0'} />
                                <ColumnGapContainer gap={'0'}>
                                    <FlexGapContainer setWidth={'100%'} gap={'4px'}>
                                        {/* first card is not visible because is the same as Compact card */}
                                        {[...Array(5)].map(
                                            (e,i) => {
                                                return (
                                                    <MiniCardView key={`userCard-${i}`}
                                                                  cardsOrder={this.state.cardsOrder[i]}
                                                                  battleStarted={this.state.battleStarted}
                                                                  setTranslateX={this.state.userMiniCardsTranslateX[i]}
                                                                  user cardLevel={this.state.cardLevels[i]}
                                                                  visible={!(i===0)} animationDuration={`0.${10 - i}`}
                                                                  cardImage={this.state.icons[i]}/>
                                                );
                                            }
                                        )}
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