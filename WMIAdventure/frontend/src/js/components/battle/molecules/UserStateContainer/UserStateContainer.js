import React from 'react';
import Container from './styled-components/Container';
import TopDiv from './styled-components/TopDiv';
import Avatar from './styled-components/Avatar';
import kuc1 from '../../../../../assets/icons/kuc1.svg';
import Nick from './styled-components/Nick';
import FlexGapContainer from '../../../global/molecules/FlexGapContainer/FlexGapContainer';
import Icon from './styled-components/Icon';
import health from '../../../../../assets/icons/health.svg';
import shield from '../../../../../assets/icons/shield.svg'
import UserLevel from "../../atoms/UserLevel";

class UserStateContainer extends React.Component {
    render() {
        return (
            <Container>
                <TopDiv>
                    <Avatar src={this.props.image ? this.props.image : kuc1} />
                    <Nick>
                        skromnoscpotega
                    </Nick>
                </TopDiv>
                <FlexGapContainer gap={'16px'} setMargin={'12px 0 10px 0'}>
                    <Icon src={health} />
                    <UserLevel levelNumber={'50'} setTransform={'30px'} />
                </FlexGapContainer>
                <FlexGapContainer gap={'16px'}>
                    <Icon src={shield} />
                    <UserLevel levelNumber={'10'} setTransform={'20px'} />
                </FlexGapContainer>
            </Container>
        );
    }
}

export default UserStateContainer;