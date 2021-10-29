import React from 'react';
import {Helmet} from "react-helmet";
import StyledWrapper from "./StyledWrapper";
import NavBar from "../../components/prototype/organisms/NavBar";
import UserRegistration from "../../components/auth/organisms/UserRegistration/UserRegistration";

function UserRegistrationPage() {
    return (
        <>
            <Helmet>
                <title>Zarejestruj się</title>
            </Helmet>
            <StyledWrapper>
                <NavBar />
                <UserRegistration />
            </StyledWrapper>
        </>
    )
}

export default UserRegistrationPage