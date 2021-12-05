import React from 'react';
import {Helmet} from 'react-helmet';
import StyledWrapper from './StyledWrapper';
import Navbar from "../../components/global/molecules/Navbar";

function Ranking() {
    return (
        <>
            <Helmet>
                <title>Ranking użytkowników</title>
            </Helmet>
            <StyledWrapper>
                <Navbar backLink={'/'}/>
                <p>
                    Ranking View - not implemented yet.
                </p>
            </StyledWrapper>
        </>
    );
}

export default Ranking;