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
import UserStat from "../../atoms/UserStat";
import ColumnGapContainer from "../../../global/molecules/ColumnGapContainer";

class UserStateContainer extends React.Component {
    render() {
        return (
            <Container>
                {
                    this.props.enemy ?
                        <NickDiv enemy>
                            <Avatar src={this.props.image ? this.props.image : kuc1} />
                            <Nick>
                                skromnoscpotega
                            </Nick>
                        </NickDiv>
                        : ''
                }
                <ColumnGapContainer gap={'8px'}>
                    {
                        this.props.enemy ?
                            <>
                                <FlexGapContainer gap={'16px'}>
                                    <Icon src={health} />
                                    <UserStat type={'hp'} statNumber={this.props.hp} />
                                </FlexGapContainer>
                                <FlexGapContainer gap={'16px'}>
                                    <Icon src={shield} />
                                    <UserStat type={'shield'} statNumber={this.props.shield} />
                                </FlexGapContainer>
                            </>
                        : ''
                    }
                    {
                        this.props.user ?
                            <>
                                <FlexGapContainer gap={'16px'}>
                                    <Icon src={shield} />
                                    <UserStat type={'shield'} statNumber={this.props.shield} />
                                </FlexGapContainer>
                                <FlexGapContainer gap={'16px'}>
                                    <Icon src={health} />
                                    <UserStat type={'hp'} statNumber={this.props.hp} />
                                </FlexGapContainer>
                            </>
                        : ''
                    }
                </ColumnGapContainer>
                {
                    this.props.user ?
                        <NickDiv user>
                            <Avatar src={this.props.image ? this.props.image : kuc1} />
                            <Nick>
                                skromnoscpotega
                            </Nick>
                        </NickDiv>
                        : ''
                }
            </Container>
        );
    }
}

export default UserStateContainer;