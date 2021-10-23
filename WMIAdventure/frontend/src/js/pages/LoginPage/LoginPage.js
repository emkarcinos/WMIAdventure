import React from 'react';
import {Helmet} from 'react-helmet';
import WholePageDiv from "./styled-components/WholePageDiv";
import UsersAPIGateway from "../../api/gateways/UsersAPIGateway";
import LoginForm from "../../components/auth/molecules/LoginForm";


class LoginPage extends React.Component {
    state = {
        username: null
    }

    loginFailedHandler = () => {
        alert("Login failed");
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
                    this.loginFailedHandler();
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

                <WholePageDiv>
                    <h1>Login Page</h1>

                    <LoginForm
                        usernameChangedHandler={this.usernameChangedHandler}
                        submitHandler={this.submitHandler}
                    />
                </WholePageDiv>

            </>

        )
    }
}

export default LoginPage;