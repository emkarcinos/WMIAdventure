import React from 'react';
import {Helmet} from "react-helmet";
import StyledWrapper from "./StyledWrapper";
import UserRegistration from "../../components/auth/organisms/UserRegistration/UserRegistration";
import Navbar from "../../components/global/molecules/Navbar";

function UserRegistrationPage() {
    return (
        <>
            <Helmet>
                <title>Rejestracja</title>
            </Helmet>
            <StyledWrapper>
                <Navbar/>
                <UserRegistration/>
            </StyledWrapper>
        </>
    )
}

export default UserRegistrationPage