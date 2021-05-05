import React from 'react';
import NavBar from '../../components/organisms/NavBar';
import Statistic from '../../components/atoms/Statistic';
import StyledWrapper from './StyledWrapper';
import Avatar from '../../components/atoms/Avatar';
import avatar from '../../../assets/icons/avatar.svg';
import GridOneColumn from '../../components/organisms/GridOneColumn';

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