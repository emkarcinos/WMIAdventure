import React from 'react';
import {Helmet} from 'react-helmet';
import WholePageDiv from "./styled-components/WholePageDiv";
import UsersAPIGateway from "../../api/gateways/UsersAPIGateway";
import LoginForm from "../../components/auth/molecules/LoginForm";
import StyledWrapper from "../MainMenu/StyledWrapper";
import NavBar from "../../components/prototype/organisms/NavBar";


class LoginPage extends React.Component {
    state = {
        username: null
    }

    loginFailedHandler = (response) => {
        let msg;

        if (response.status === 404) {
            msg = 'User not found.';
        }

        alert(`Login failed. ${msg} Status: ${response.status}`);
    }

    loginSuccessHandler = () => {
        alert(`Logged in as ${this.state.username}`);
    }

    submitHandler = (event) => {
        event.preventDefault();

        UsersAPIGateway.login(this.state.username)
            .then(response => {
                if (response.ok)
                    this.loginSuccessHandler();
                else
                    this.loginFailedHandler(response);
            })
            .catch(err => {console.log(err); this.loginFailedHandler()});
    }

    usernameChangedHandler = (event) => {
        event.preventDefault();
        this.setState({username: event.target.value})
    }

    render() {
        return (
            <>
                <Helmet>
                    <title>Login Page</title>
                </Helmet>

                <StyledWrapper>
                    <NavBar/>
                    <WholePageDiv>
                        <h1>Login Page</h1>

                        <LoginForm
                            usernameChangedHandler={this.usernameChangedHandler}
                            submitHandler={this.submitHandler}
                        />
                    </WholePageDiv>
                </StyledWrapper>
            </>

        )
    }
}

export default LoginPage;