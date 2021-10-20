import React from 'react';
import { Helmet } from 'react-helmet';
import StyledWrapper from './StyledWrapper';
import NavBar from '../../components/prototype/organisms/NavBar';

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