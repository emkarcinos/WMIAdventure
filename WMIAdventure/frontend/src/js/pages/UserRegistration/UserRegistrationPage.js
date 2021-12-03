import React from 'react';
import {Helmet} from "react-helmet";
import StyledWrapper from "./StyledWrapper";
import UserRegistration from "../../components/auth/organisms/UserRegistration/UserRegistration";
import Navbar from "../../components/global/atoms/Navbar";

function UserRegistrationPage() {
    return (
        <>
            <Helmet>
                <title>Zarejestruj się</title>
            </Helmet>
            <StyledWrapper>
                <Navbar/>
                <UserRegistration/>
            </StyledWrapper>
        </>
    )
}

export default UserRegistrationPage