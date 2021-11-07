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

        // states for items animation movement
        enemyCompactCardTranslateX: '-100vw',
        userCompactCardTranslateX: '100vw',
        enemyMiniCardsTranslateX: '-100vw',
        userMiniCardsTranslateX: '100vw',
        enemyStateContainerTranslateX: '-100vw',
        userStateContainerTranslateX: '100vw',

        // states for hp and shield points
        enemyHp: '0',
        userHp: '0',
        enemyShield: '0',
        userShield: '0',
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
                userMiniCardsTranslateX: '0',
                enemyHp: '100',
                userHp: '100',
                enemyShield: '20',
                userShield: '20'
            });
        }, battleInitLoadingDuration
            + secondStepAnimationDuration * 2 + 100);
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
                                    <FlexGapContainer setWidth={'100%'} space>
                                        {/* first card is not visible because is the same as Compact card */}
                                        <MiniCardView setTranslateX={this.state.enemyMiniCardsTranslateX}
                                                      enemy rank={3} visible={false} icon={icon1} />
                                        <MiniCardView setTranslateX={this.state.enemyMiniCardsTranslateX}
                                                      enemy rank={2} visible icon={icon2}
                                                      animationDuration={'0.9'} />
                                        <MiniCardView setTranslateX={this.state.enemyMiniCardsTranslateX}
                                                      enemy rank={3} visible icon={icon3}
                                                      animationDuration={'0.8'} />
                                        <MiniCardView setTranslateX={this.state.enemyMiniCardsTranslateX}
                                                      enemy rank={1} visible icon={icon4}
                                                      animationDuration={'0.7'} />
                                        <MiniCardView setTranslateX={this.state.enemyMiniCardsTranslateX}
                                                      enemy rank={1} visible icon={icon5}
                                                      animationDuration={'0.6'} />
                                    </FlexGapContainer>
                                </ColumnGapContainer>
                                <CompactCardView cardImage={icon1} cardName={'Karta 1'}
                                                 setWidth={'124px'} level={3} setHeight={'200px'}
                                                 setTranslateX={this.state.enemyCompactCardTranslateX}
                                                 setMargin={'0 0 0 10px'} />
                            </FlexGapContainer>
                            <KuceInBattle visible={this.state.kuceInBattleVisible} />
                            <FlexGapContainer setMargin={'0 0 10px 0'}>
                                <CompactCardView cardImage={icon1} cardName={'Karta 1'}
                                                 setWidth={'124px'} level={1} setHeight={'200px'}
                                                 setTranslateX={this.state.userCompactCardTranslateX}
                                                 setMargin={'0 10px 0 0'} />
                                <ColumnGapContainer gap={'0'}>
                                    <FlexGapContainer setWidth={'100%'} space>
                                        {/* first card is not visible because is the same as Compact card */}
                                        <MiniCardView setTranslateX={this.state.userMiniCardsTranslateX}
                                                      user rank={1} visible={false} icon={icon1} />
                                        <MiniCardView setTranslateX={this.state.userMiniCardsTranslateX}
                                                      user rank={2} visible icon={icon2}
                                                      animationDuration={'0.9'} />
                                        <MiniCardView setTranslateX={this.state.userMiniCardsTranslateX}
                                                      user rank={1} visible icon={icon3}
                                                      animationDuration={'0.8'} />
                                        <MiniCardView setTranslateX={this.state.userMiniCardsTranslateX}
                                                      user rank={2} visible icon={icon4}
                                                      animationDuration={'0.7'} />
                                        <MiniCardView setTranslateX={this.state.userMiniCardsTranslateX}
                                                      user rank={3} visible icon={icon5}
                                                      animationDuration={'0.6'} />
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