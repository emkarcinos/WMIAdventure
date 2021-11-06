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
import UserStat from "../../atoms/UserStat";

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
                    <UserStat type={'hp'} statNumber={'0'} />
                </FlexGapContainer>
                <FlexGapContainer gap={'16px'}>
                    <Icon src={shield} />
                    <UserStat type={'shield'} statNumber={'0'} />
                </FlexGapContainer>
            </Container>
        );
    }
}

export default UserStateContainer;