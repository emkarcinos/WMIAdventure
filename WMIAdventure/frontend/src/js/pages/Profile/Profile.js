import React from 'react';
import {Helmet} from 'react-helmet';
import StyledWrapper from './StyledWrapper';
import NavBar from '../../components/prototype/organisms/NavBar';

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