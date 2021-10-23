import React from 'react';
import MobilePopUp from '../MobilePopUp';
import UserInfo from '../../atoms/UserInfo';
import FlexGapContainer from '../../../global/molecules/FlexGapContainer/FlexGapContainer';
import Article from './styled-components/Article';
import BattleResult from '../../atoms/BattleResult';
import UserLevel from '../../atoms/UserLevel';
import ColumnGapContainer from '../../../global/molecules/ColumnGapContainer';
import imagePlaceholder from  '../../../../../assets/icons/upload_image_dark.svg';

class PostBattle extends React.Component {
    render() {
        return (
            <MobilePopUp visible={this.props.postBattle}
                         closeHandler={this.props.closeHandler}>
                <Article>
                    <ColumnGapContainer gap={'10px'}>
                        <BattleResult win={true} image={imagePlaceholder} />
                        <FlexGapContainer gap={'32px'}>
                            <UserInfo label={'Wygrane'} value={'24'} setMargin={'0'} />
                            <UserInfo label={'Przegrane'} value={'24'} setMargin={'0'} />
                            <UserInfo label={'Ratio'} value={'50%'} setMargin={'0'} />
                        </FlexGapContainer>
                        <UserLevel levelNumber={'25'} setTransform={'16px'} />
                    </ColumnGapContainer>
                </Article>
            </MobilePopUp>
        );
    }
}

export default PostBattle;