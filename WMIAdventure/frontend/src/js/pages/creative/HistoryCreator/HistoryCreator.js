import React from 'react';
import {Helmet} from 'react-helmet'
import NavBar from '../../entertainment/MainMenu/organisms/NavBar';
import StyledWrapper from './StyledWrapper';

function HistoryCreator() {
    return (
        <>
            <Helmet>
                <title>Kreator historii WMI Adventure</title>
            </Helmet>
            <StyledWrapper>
                <NavBar />
                <p>
                    History Creator View - not implemented yet.
                </p>
            </StyledWrapper>
        </>
    );
}

export default HistoryCreator;
