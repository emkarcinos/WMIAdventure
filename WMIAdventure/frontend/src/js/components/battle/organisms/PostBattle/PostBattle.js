import React from 'react';
import FlexGapContainer from '../../../global/molecules/FlexGapContainer/FlexGapContainer';
import Article from './styled-components/Article';
import BattleResult from '../../atoms/BattleResult';
import UserStatistic from '../../atoms/UserStatistic';
import ColumnGapContainer from '../../../global/molecules/ColumnGapContainer';
import TinyUserProfile from '../../molecules/TinyUserProfile';
import Div from './styled-components/Div';
import Decoration from './styled-components/Decoration';
import TinyCards from '../../atoms/TinyCards/TinyCards';
import PopUp from '../../../global/organisms/PopUp';
import Media from 'react-media';
import {desktop, mobile} from '../../../../utils/globals';
import TransBack from '../../../global/organisms/TransBack';
import UserInfo from "../../../global/atoms/UserInfo";

class PostBattle extends React.Component {

    state = {
        popUpHover: false
    }

    hoverTrue = () => {
        this.setState({popUpHover: true});
    }

    hoverFalse = () => {
        this.setState({popUpHover: false});
    }

    handleHiding = () => {
        if (!this.state.popUpHover)
            this.props.closeHandler();
    }

    opponentWinHandler = () => this.props.win === null ? null : !this.props.win

    updateUserLevel = async () => {
        if (!this.opponentWinHandler())
            await this.props.attacker.fetchNonVitalDataFromBackend(true);
    }

    componentDidMount() {
        setTimeout(async () => {
            await this.updateUserLevel();
        }, 1000);
    }

    render() {
        return (
            <>
                <Media query={mobile}>
                    <PopUp visible={this.props.postBattle}
                           closeHandler={this.props.closeHandler}
                           setTranslateY={this.props.setTranslateY}>
                        <Article>
                            <ColumnGapContainer gap={'10px'} setMargin={'0 0 16px 0'}>
                                <BattleResult win={this.props.win}/>
                                <FlexGapContainer gap={'32px'}>
                                    <UserInfo label={'Wygrane'} value={'24'} setMargin={'0'}/>
                                    <UserInfo label={'Przegrane'} value={'24'} setMargin={'0'}/>
                                    <UserInfo label={'Ratio'} value={'50%'} setMargin={'0'}/>
                                </FlexGapContainer>
                                <UserStatistic statisticNumber={this.props.attacker.getLevelObject().level}
                                               type={'level'}
                                               currentLvlValue={this.props.attacker.getLevelObject().percentage}/>
                            </ColumnGapContainer>

                            <Div win={this.props.win}>
                                <Decoration win={this.props.win}/>
                                <TinyUserProfile user={this.props.attacker}
                                                 setMargin={'10px 0 24px 0'}/>
                                <TinyCards deck={this.props.attackerDeck} gap={'10px'}/>
                            </Div>

                            <Div win={this.opponentWinHandler()}>
                                <Decoration win={this.opponentWinHandler()}/>
                                <TinyUserProfile user={this.props.opponent} setMargin={'10px 0 24px 0'}/>
                                <TinyCards deck={this.props.opponentDeck} gap={'10px'}/>
                            </Div>
                        </Article>
                    </PopUp>
                </Media>
                <Media query={desktop}>
                    <TransBack visible={this.props.postBattle}
                               setOpacity={this.props.setOpacity} closeHandler={this.handleHiding}>
                        <PopUp visible={this.props.postBattle} setTranslateY={this.props.setTranslateY}
                               setWidth={'932px'} setHeight={'560px'}
                               closeHandler={this.props.closeHandler}
                               hoverTrue={this.hoverTrue} hoverFalse={this.hoverFalse}>
                            <ColumnGapContainer gap={'10px'} setMargin={'0 0 28px 0'}>
                                <BattleResult win={this.props.win}/>
                                <FlexGapContainer gap={'32px'}>
                                    <UserInfo label={'Wygrane'} value={'24'} setMargin={'0'}/>
                                    <UserInfo label={'Przegrane'} value={'24'} setMargin={'0'}/>
                                    <UserInfo label={'Ratio'} value={'50%'} setMargin={'0'}/>
                                </FlexGapContainer>
                                <UserStatistic statisticNumber={this.props.attacker.getLevelObject().level}
                                               type={'level'}
                                               currentLvlValue={this.props.attacker.getLevelObject().percentage}/>
                            </ColumnGapContainer>

                            <FlexGapContainer gap={'28px'} setWidth={'100%'}>
                                <Div win={this.props.win}>
                                    <Decoration win={this.props.win}/>
                                    <TinyUserProfile user={this.props.attacker} setMargin={'0 0 24px 0'} vertical/>
                                    <TinyCards deck={this.props.attackerDeck} gap={'10px'}/>
                                </Div>

                                <Div win={this.opponentWinHandler()}>
                                    <Decoration win={this.opponentWinHandler()}/>
                                    <TinyUserProfile user={this.props.opponent} setMargin={'0 0 24px 0'} vertical/>
                                    <TinyCards deck={this.props.opponentDeck} gap={'10px'}/>
                                </Div>
                            </FlexGapContainer>
                        </PopUp>
                    </TransBack>
                </Media>
            </>
        );
    }
}

export default PostBattle;