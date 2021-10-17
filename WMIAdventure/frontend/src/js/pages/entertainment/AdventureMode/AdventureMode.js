import React from 'react';
import { Helmet } from 'react-helmet';

import NavBar from '../MainMenu/organisms/NavBar';
import StyledWrapper from './StyledWrapper';

function AdventureMode() {
    return (
        <>
            <Helmet>
                <title>Tryb Adventure</title>
            </Helmet>
            <StyledWrapper>
                <NavBar />
                    <p>
                        Adventure Mode View - not implemented yet.
                    </p>
            </StyledWrapper>
        </>
    );
}

export default AdventureMode;
