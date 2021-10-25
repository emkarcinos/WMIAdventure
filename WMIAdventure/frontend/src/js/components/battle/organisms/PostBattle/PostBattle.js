import React from 'react';
import UserInfo from '../../atoms/UserInfo';
import FlexGapContainer from '../../../global/molecules/FlexGapContainer/FlexGapContainer';
import Article from './styled-components/Article';
import BattleResult from '../../atoms/BattleResult';
import UserLevel from '../../atoms/UserLevel';
import ColumnGapContainer from '../../../global/molecules/ColumnGapContainer';
import TinyUserProfile from '../../molecules/TinyUserProfile';
import Div from './styled-components/Div';
import Decoration from './styled-components/Decoration';
import TinyCards from '../../atoms/TinyCards/TinyCards';
import PopUp from '../../../global/organisms/PopUp';
import Media from 'react-media';
import {desktop, mobile} from '../../../../utils/globals';
import TransBack from '../../../global/organisms/TransBack';

class PostBattle extends React.Component {

    state = {
        popUpHover: false,
    }

    hoverTrue = () => {
        this.setState({popUpHover: true});
    }

    hoverFalse = () => {
        this.setState({popUpHover: false});
    }

    handleHiding = () => {
        if(!this.state.popUpHover)
            this.props.closeHandler();
    }

    render() {
        return (
            <>
                <Media query={mobile}>
                    <PopUp visible={this.props.postBattle}
                           closeHandler={this.props.closeHandler}>
                        <Article>
                            <ColumnGapContainer gap={'10px'} setMargin={'0 0 16px 0'}>
                                <BattleResult win={this.props.win} />
                                <FlexGapContainer gap={'32px'}>
                                    <UserInfo label={'Wygrane'} value={'24'} setMargin={'0'} />
                                    <UserInfo label={'Przegrane'} value={'24'} setMargin={'0'} />
                                    <UserInfo label={'Ratio'} value={'50%'} setMargin={'0'} />
                                </FlexGapContainer>
                                <UserLevel levelNumber={'25'} setTransform={'16px'} />
                            </ColumnGapContainer>

                            <Div win={this.props.win}>
                                <Decoration win={this.props.win} />
                                <TinyUserProfile term={'3'} level={'7'} rank={'7'} setMargin={'10px 0 24px 0'}
                                                 displayedUsername={'skromność to potęga'} />
                                <TinyCards cardImages={[]} gap={'10px'} />
                            </Div>

                            <Div win={!this.props.win}>
                                <Decoration win={!this.props.win} />
                                <TinyUserProfile term={'5'} level={'50'} rank={'12'} setMargin={'10px 0 24px 0'}
                                                 displayedUsername={'emkarcinos'} />
                                <TinyCards cardImages={[]} gap={'10px'} />
                            </Div>
                        </Article>
                    </PopUp>
                </Media>
                <Media query={desktop}>
                    <TransBack visible={this.props.postBattle} closeHandler={this.handleHiding}>
                        <PopUp visible={this.props.postBattle} setWidth={'932px'} setHeight={'560px'}
                               closeHandler={this.props.closeHandler}
                               hoverTrue={this.hoverTrue} hoverFalse={this.hoverFalse} >
                            <ColumnGapContainer gap={'10px'} setMargin={'0 0 28px 0'}>
                                <BattleResult win={this.props.win} />
                                <FlexGapContainer gap={'32px'}>
                                    <UserInfo label={'Wygrane'} value={'24'} setMargin={'0'} />
                                    <UserInfo label={'Przegrane'} value={'24'} setMargin={'0'} />
                                    <UserInfo label={'Ratio'} value={'50%'} setMargin={'0'} />
                                </FlexGapContainer>
                                <UserLevel levelNumber={'25'} setTransform={'16px'} />
                            </ColumnGapContainer>

                            <FlexGapContainer gap={'28px'} setWidth={'100%'}>
                                <Div win={this.props.win}>
                                    <Decoration win={this.props.win} />
                                    <TinyUserProfile term={'3'} level={'7'} rank={'7'} setMargin={'0 0 24px 0'}
                                                     displayedUsername={'skromność to potęga'} vertical />
                                    <TinyCards cardImages={[]} gap={'10px'} />
                                </Div>

                                <Div win={!this.props.win}>
                                    <Decoration win={!this.props.win} />
                                    <TinyUserProfile term={'5'} level={'50'} rank={'12'} setMargin={'0 0 24px 0'}
                                                     displayedUsername={'emkarcinos'} vertical />
                                    <TinyCards cardImages={[]} gap={'10px'} />
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