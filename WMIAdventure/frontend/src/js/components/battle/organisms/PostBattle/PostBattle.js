import React from 'react';
import MobilePopUp from '../MobilePopUp';
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

class PostBattle extends React.Component {
    render() {
        return (
            <MobilePopUp visible={this.props.postBattle}
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
                                         displayedUsername={this.props.attacker} />
                        <TinyCards cardImages={[]} />
                    </Div>

                    <Div win={!this.props.win}>
                        <Decoration win={!this.props.win} />
                        <TinyUserProfile term={'5'} level={'50'} rank={'12'} setMargin={'10px 0 24px 0'}
                                         displayedUsername={this.props.opponent} />
                        <TinyCards cardImages={[]} />
                    </Div>
                </Article>
            </MobilePopUp>
        );
    }
}

export default PostBattle;