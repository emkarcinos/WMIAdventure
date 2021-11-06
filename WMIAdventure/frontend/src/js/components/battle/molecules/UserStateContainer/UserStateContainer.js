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
import ColumnGapContainer from "../../../global/molecules/ColumnGapContainer";

class UserStateContainer extends React.Component {
    render() {
        return (
            <Container>
                {
                    this.props.enemy ?
                        <TopDiv enemy>
                            <Avatar src={this.props.image ? this.props.image : kuc1} />
                            <Nick>
                                skromnoscpotega
                            </Nick>
                        </TopDiv>
                        : ''
                }
                <ColumnGapContainer gap={'8px'}>
                    {
                        this.props.enemy ?
                            <>
                                <FlexGapContainer gap={'16px'}>
                                    <Icon src={health} />
                                    <UserStat type={'hp'} statNumber={'0'} />
                                </FlexGapContainer>
                                <FlexGapContainer gap={'16px'}>
                                    <Icon src={shield} />
                                    <UserStat type={'shield'} statNumber={'0'} />
                                </FlexGapContainer>
                            </>
                        : ''
                    }
                    {
                        this.props.user ?
                            <>
                                <FlexGapContainer gap={'16px'}>
                                    <Icon src={shield} />
                                    <UserStat type={'shield'} statNumber={'0'} />
                                </FlexGapContainer>
                                <FlexGapContainer gap={'16px'}>
                                    <Icon src={health} />
                                    <UserStat type={'hp'} statNumber={'0'} />
                                </FlexGapContainer>
                            </>
                        : ''
                    }
                </ColumnGapContainer>
                {
                    this.props.user ?
                        <TopDiv user>
                            <Avatar src={this.props.image ? this.props.image : kuc1} />
                            <Nick>
                                skromnoscpotega
                            </Nick>
                        </TopDiv>
                        : ''
                }
            </Container>
        );
    }
}

export default UserStateContainer;