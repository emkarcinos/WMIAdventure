import React from 'react';
import {Helmet} from 'react-helmet';
import Login from "../../components/auth/organisms/Login";
import Navbar from "../../components/global/molecules/Navbar";
import MainContainer from "../MainMenu/styled-components/MainContainer";


class LoginPage extends React.Component {
    render() {
        return (
            <>
                <Helmet>
                    <title>Login Page</title>
                </Helmet>
                <MainContainer>
                    <Navbar/>
                    <Login/>
                </MainContainer>
            </>

        )
    }
}

export default LoginPage;