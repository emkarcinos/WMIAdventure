import React from 'react';
import {Helmet} from 'react-helmet'
import StyledWrapper from './StyledWrapper';
import NavBar from '../../components/prototype/organisms/NavBar';

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
