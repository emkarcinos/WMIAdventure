import React from 'react';
import {Helmet} from 'react-helmet';
import StyledWrapper from "../MainMenu/StyledWrapper";
import Login from "../../components/auth/organisms/Login";
import Navbar from "../../components/global/molecules/Navbar";


class LoginPage extends React.Component {
    render() {
        return (
            <>
                <Helmet>
                    <title>Login Page</title>
                </Helmet>
                <StyledWrapper>
                    <Navbar/>
                    <Login/>
                </StyledWrapper>
            </>

        )
    }
}

export default LoginPage;