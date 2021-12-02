import React from 'react';
import {Helmet} from 'react-helmet';
import NavBar from '../../components/prototype/organisms/NavBar';
import MainContainer from "./styled-componets/MainContainer";
import User from "../../components/profile/atoms/User";

function Profile() {
    return (
        <>
            <Helmet>
                <title>Profil użytkownika</title>
            </Helmet>
            <MainContainer>
                <NavBar/>
                <User/>
            </MainContainer>
        </>
    );
}

export default Profile;