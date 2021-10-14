import React from 'react';
import {Helmet} from 'react-helmet';
import NavBar from '../MainMenu/organisms/NavBar';
import StyledWrapper from './StyledWrapper';

function Profile() {
    return (
        <>
            <Helmet>
                <title>Profil użytkownika</title>
            </Helmet>
            <StyledWrapper>
                <NavBar />
                <p>
                    Profile view - not implemented yet.
                </p>
            </StyledWrapper>
        </>
    );
}

export default Profile;