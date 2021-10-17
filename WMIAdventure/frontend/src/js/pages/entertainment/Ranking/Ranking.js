import React from 'react';
import { Helmet } from 'react-helmet';
import NavBar from '../MainMenu/organisms/NavBar';
import StyledWrapper from './StyledWrapper';

function Ranking() {
    return (
        <>
            <Helmet>
                <title>Ranking użytkowników</title>
            </Helmet>
            <StyledWrapper>
                <NavBar />
                <p>
                    Ranking View - not implemented yet.
                </p>
            </StyledWrapper>
        </>
    );
}

export default Ranking;