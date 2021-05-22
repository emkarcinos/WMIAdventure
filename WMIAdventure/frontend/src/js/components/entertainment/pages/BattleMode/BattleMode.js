import React from 'react';
import NavBar from '../../organisms/NavBar';
import Statistic from '../../atoms/Statistic';
import StyledWrapper from './StyledWrapper';
import Avatar from '../../atoms/Avatar';
import avatar from '../../../../../assets/icons/avatar.svg';
import GridOneColumn from '../../organisms/GridOneColumn';

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