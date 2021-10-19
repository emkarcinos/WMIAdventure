import React from 'react';
import StyledWrapper from './StyledWrapper';

function FlexCenterContainer({children}) {
    return (
        <StyledWrapper>
            {children}
        </StyledWrapper>
    );
}

export default FlexCenterContainer;