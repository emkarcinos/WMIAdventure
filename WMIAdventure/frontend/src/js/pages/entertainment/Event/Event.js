import React from 'react';
import {Helmet} from 'react-helmet';
import NavBar from '../MainMenu/organisms/NavBar';
import StyledWrapper from './StyledWrapper';

function Event() {
    return (
        <>
            <Helmet>
                <title>Eventy</title>
            </Helmet>
            <StyledWrapper>
                <NavBar />
                <p>
                    Event View - not implemented yet.
                </p>
            </StyledWrapper>
        </>
    );
}

export default Event;