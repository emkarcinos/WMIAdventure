import React from 'react';
import StyledWrapper from './StyledWrapper';

function GridOneColumn({children}) {
    return (
        <StyledWrapper className='MainMenuContainer'>
            {children}
        </StyledWrapper>
    );
}

export default GridOneColumn;