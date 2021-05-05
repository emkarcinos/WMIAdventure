import React from 'react';
import StyledWrapper from './StyledWrapper';

function GridOneColumn({children, rowGaps}) {
    return (
        <StyledWrapper rowGaps={rowGaps} className='MainMenuContainer'>
            {children}
        </StyledWrapper>
    );
}

export default GridOneColumn;