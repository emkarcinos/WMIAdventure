import React from 'react';
import NavBar from '../../components/entertainment/organisms/NavBar';
import Statistic from '../../components/entertainment/atoms/Statistic';
import StyledWrapper from './StyledWrapper';
import Avatar from '../../components/entertainment/atoms/Avatar';
import avatar from '../../../assets/icons/avatar.svg';
import GridOneColumn from '../../components/entertainment/organisms/GridOneColumn';

function BattleMode() {
    return (
        <StyledWrapper>
            <NavBar />
            <GridOneColumn rowGaps='32px'>
                <Avatar image={avatar} />
                <Statistic />
            </GridOneColumn>
        </StyledWrapper>
    );
}

export default BattleMode;