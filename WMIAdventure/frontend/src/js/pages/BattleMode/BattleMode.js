import React from 'react';
import './BattleMode.scss';
import styled from 'styled-components';

import NavBar from '../../components/organisms/NavBar';
import Avatar from '../../components/atoms/Avatar';

import avatar from '../../../assets/icons/avatar.svg';

const StyledWrapper = styled.div`
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      min-height: 100vh;
`;

function BattleMode() {
    return (
        <StyledWrapper className="BattleMode">
            <NavBar />
            <Avatar image={avatar} />
        </StyledWrapper>
    );
}

export default BattleMode;