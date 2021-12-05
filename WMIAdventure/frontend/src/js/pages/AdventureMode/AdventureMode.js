import React from 'react';
import {Helmet} from 'react-helmet';
import StyledWrapper from './StyledWrapper';
import Navbar from "../../components/global/molecules/Navbar";

function AdventureMode() {
    return (
        <>
            <Helmet>
                <title>Tryb Adventure</title>
            </Helmet>
            <StyledWrapper>
                <Navbar backLink={'/'}/>
                <p>
                    Adventure Mode View - not implemented yet.
                </p>
            </StyledWrapper>
        </>
    );
}

export default AdventureMode;
