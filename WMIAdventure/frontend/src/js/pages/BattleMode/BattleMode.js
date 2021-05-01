import React from 'react';
import './BattleMode.scss';
import styled from 'styled-components';
import colors from  '../../utils/colors';

import NavBar from '../../components/organisms/NavBar';

const StyledWrapper = styled.div`
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      min-height: 100vh;
      
      p {
        font-size: 64px;
        color: ${colors.text01};
      }
`;

function BattleMode() {
    return (
        <StyledWrapper className="BattleMode">
            <NavBar />
            <p className='AdventureMode__paragraph'>
                Battle Mode View - not implemented yet.
            </p>
        </StyledWrapper>
    );
}

export default BattleMode;