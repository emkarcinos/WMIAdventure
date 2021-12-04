import React from 'react';
import {Helmet} from 'react-helmet';
import StyledWrapper from './StyledWrapper';
import Navbar from "../../components/global/molecules/Navbar";

function Profile() {
    return (
        <>
            <Helmet>
                <title>Profil użytkownika</title>
            </Helmet>
            <StyledWrapper>
                <Navbar/>
                <p>
                    Profile view - not implemented yet.
                </p>
            </StyledWrapper>
        </>
    );
}

export default Profile;