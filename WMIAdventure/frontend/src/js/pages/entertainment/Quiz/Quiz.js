import React from 'react';
import { Helmet } from 'react-helmet';
import NavBar from '../MainMenu/organisms/NavBar';
import StyledWrapper from './StyledWrapper';

function Quiz() {
    return (
        <>
            <Helmet>
                <title>Quiz</title>
            </Helmet>
            <StyledWrapper>
                <NavBar />
                <p>
                    Quiz View - not implemented yet.
                </p>
            </StyledWrapper>
        </>
    );
}

export default Quiz;