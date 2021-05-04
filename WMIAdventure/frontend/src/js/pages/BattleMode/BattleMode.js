import React from 'react';
import './BattleMode.scss';
import styled from 'styled-components';

import NavBar from '../../components/organisms/NavBar';
import Statistic from '../../components/atoms/Statistic';

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
            <Statistic />
        </StyledWrapper>
    );
}

export default BattleMode;