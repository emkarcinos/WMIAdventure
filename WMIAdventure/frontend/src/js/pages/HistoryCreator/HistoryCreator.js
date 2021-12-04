import React from 'react';
import {Helmet} from 'react-helmet'
import StyledWrapper from './StyledWrapper';
import Navbar from "../../components/global/molecules/Navbar";

function HistoryCreator() {
    return (
        <>
            <Helmet>
                <title>Kreator historii WMI Adventure</title>
            </Helmet>
            <StyledWrapper>
                <Navbar/>
                <p>
                    History Creator View - not implemented yet.
                </p>
            </StyledWrapper>
        </>
    );
}

export default HistoryCreator;
