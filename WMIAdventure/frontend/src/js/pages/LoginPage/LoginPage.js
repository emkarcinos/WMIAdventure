import React from 'react';
import {Helmet} from 'react-helmet';
import WholePageDiv from "./styled-components/WholePageDiv";
import StyledWrapper from "../MainMenu/StyledWrapper";
import NavBar from "../../components/prototype/organisms/NavBar";
import Login from "../../components/auth/organisms/Login";


class LoginPage extends React.Component {
    render() {
        return (
            <>
                <Helmet>
                    <title>Login Page</title>
                </Helmet>

                <StyledWrapper>
                    <NavBar/>
                    <WholePageDiv>
                        <h1>Login</h1>
                        <Login />
                    </WholePageDiv>
                </StyledWrapper>
            </>

        )
    }
}

export default LoginPage;