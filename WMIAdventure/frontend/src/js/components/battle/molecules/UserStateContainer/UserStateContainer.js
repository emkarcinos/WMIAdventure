import React from 'react';
import Container from './styled-components/Container';
import NickDiv from './styled-components/NickDiv';
import Avatar from './styled-components/Avatar';
import kuc1 from '../../../../../assets/icons/kuc1.svg';
import Nick from './styled-components/Nick';
import FlexGapContainer from '../../../global/molecules/FlexGapContainer/FlexGapContainer';
import Icon from './styled-components/Icon';
import health from '../../../../../assets/icons/health.svg';
import shield from '../../../../../assets/icons/shield.svg'
import UserStatistic from "../../atoms/UserStatistic";
import ColumnGapContainer from "../../../global/molecules/ColumnGapContainer";

class UserStateContainer extends React.Component {

    /*
    props:
        hp <- information about health points
        shield <- information about shield points
        setTranslateX <- handle init animation
     */

    render() {
        return (
            <Container setTranslateX={this.props.setTranslateX}>
                <ColumnGapContainer gap={'8px'}>
                    <FlexGapContainer gap={'16px'}>
                        <Icon src={shield} />
                        <UserStatistic type={'shield'} statisticNumber={this.props.shield} />
                    </FlexGapContainer>
                    <FlexGapContainer gap={'16px'}>
                        <Icon src={health} />
                        <UserStatistic type={'hp'} statisticNumber={this.props.hp} />
                    </FlexGapContainer>
                </ColumnGapContainer>
                <NickDiv user>
                    <Avatar src={this.props.image ? this.props.image : kuc1} />
                    <Nick>
                        skromnoscpotega
                    </Nick>
                </NickDiv>
            </Container>
        );
    }
}

export default UserStateContainer;