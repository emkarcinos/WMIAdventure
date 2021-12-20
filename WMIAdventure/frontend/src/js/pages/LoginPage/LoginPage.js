import React from 'react';
import {Helmet} from 'react-helmet';
import Login from "../../components/auth/organisms/Login";
import Navbar from "../../components/global/molecules/Navbar";
import StyledWrapper from "./StyledWrapper";


class LoginPage extends React.Component {
    render() {
        return (
            <>
                <Helmet>
                    <title>Logowanie</title>
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