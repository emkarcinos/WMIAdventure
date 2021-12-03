import React from 'react';
import {Helmet} from 'react-helmet';
import WholePageDiv from "./styled-components/WholePageDiv";
import StyledWrapper from "../MainMenu/StyledWrapper";
import Login from "../../components/auth/organisms/Login";
import Navbar from "../../components/global/atoms/Navbar";


class LoginPage extends React.Component {
    render() {
        return (
            <>
                <Helmet>
                    <title>Login Page</title>
                </Helmet>

                <StyledWrapper>
                    <Navbar/>
                    <WholePageDiv>
                        <h1>Login</h1>
                        <Login/>
                    </WholePageDiv>
                </StyledWrapper>
            </>

        )
    }
}

export default LoginPage;