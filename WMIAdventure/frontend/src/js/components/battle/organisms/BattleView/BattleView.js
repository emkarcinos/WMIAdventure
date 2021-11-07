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

class BattleView extends React.Component {

    state = {
        kuceInBattleVisible: false,
        enemyCompactCardTranslateX: '-100vw',
        userCompactCardTranslateX: '100vw',
        enemyMiniCardsTranslateX: '-100vw',
        userMiniCardsTranslateX: '100vw',
        enemyStateContainerTranslateX: '-100vw',
        userStateContainerTranslateX: '100vw',
    }

    componentDidUpdate(prevProps) {
        if((prevProps.battleView !== this.props.battleView)
            && this.props.battleView === true) {
            this.setState({
                kuceInBattleVisible: true,
            });
            this.itemsAnimationInit();
        }
    }

    itemsAnimationInit = () => {
        setTimeout(() => {
            this.setState({
                enemyStateContainerTranslateX: '8vw',
                userStateContainerTranslateX: '-8vw'
            });
        }, battleInitLoadingDuration);

        setTimeout(() => {
            this.setState({
                enemyStateContainerTranslateX: '0',
                userStateContainerTranslateX: '0',
                enemyCompactCardTranslateX: '6vw',
                userCompactCardTranslateX: '-6vw',
            });
        }, battleInitLoadingDuration
            + secondStepAnimationDuration);

        setTimeout(() => {
            this.setState({
                enemyCompactCardTranslateX: '0',
                userCompactCardTranslateX: '0',

            });
        }, battleInitLoadingDuration
            + secondStepAnimationDuration * 2);

        setTimeout(() => {
            this.setState({
                enemyMiniCardsTranslateX: '0',
                userMiniCardsTranslateX: '0'

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
                                    <UserStateContainer setTranslateX={this.state.enemyStateContainerTranslateX}
                                                        enemy hp={'99'} shield={'1'} />
                                    <FlexGapContainer setWidth={'100%'} space>
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
                                                        user hp={'5'} shield={'19'} />
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