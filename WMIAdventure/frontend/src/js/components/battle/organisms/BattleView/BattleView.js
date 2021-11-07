import React from 'react';
import {desktop, mobile} from "../../../../utils/globals";
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
    }

    componentDidUpdate(prevProps) {
        if((prevProps.battleView !== this.props.battleView)
            && this.props.battleView === true) {
            this.setState({
                kuceInBattleVisible: true,
            });
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
                                    <UserStateContainer enemy hp={'99'} shield={'1'} />
                                    <FlexGapContainer setWidth={'100%'} space>
                                        <MiniCardView enemy rank={3} visible={false} icon={icon1} />
                                        <MiniCardView enemy rank={2} visible icon={icon2} />
                                        <MiniCardView enemy rank={3} visible icon={icon3} />
                                        <MiniCardView enemy rank={1} visible icon={icon4} />
                                        <MiniCardView enemy rank={1} visible icon={icon5} />
                                    </FlexGapContainer>
                                </ColumnGapContainer>
                                <CompactCardView cardImage={icon1} cardName={'Karta 1'}
                                                 setWidth={'124px'} level={3}
                                                 setHeight={'200px'}
                                                 setMargin={'0 0 0 10px'} />
                            </FlexGapContainer>
                            <KuceInBattle visible={this.state.kuceInBattleVisible} />
                            <FlexGapContainer setMargin={'0 0 10px 0'}>
                                <CompactCardView cardImage={icon1} cardName={'Karta 1'}
                                                 setWidth={'124px'} level={1}
                                                 setHeight={'200px'}
                                                 setMargin={'0 10px 0 0'} />
                                <ColumnGapContainer gap={'0'}>
                                    <FlexGapContainer setWidth={'100%'} space>
                                        <MiniCardView user rank={1} visible={false} icon={icon1} />
                                        <MiniCardView user rank={2} visible icon={icon2} />
                                        <MiniCardView user rank={1} visible icon={icon3} />
                                        <MiniCardView user rank={2} visible icon={icon4} />
                                        <MiniCardView user rank={3} visible icon={icon5} />
                                    </FlexGapContainer>
                                    <UserStateContainer user hp={'5'} shield={'19'} />
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