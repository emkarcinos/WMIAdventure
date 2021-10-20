import React from 'react';
import StyledWrapper from './StyledWrapper';

function GridOneColumn({children, rowGaps, margin}) {
    return (
        <StyledWrapper rowGaps={rowGaps} margin={margin} className='MainMenuContainer'>
            {children}
        </StyledWrapper>
    );
}

export default GridOneColumn;