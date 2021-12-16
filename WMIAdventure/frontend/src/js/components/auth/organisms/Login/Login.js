import React from "react";
import UsersAPIGateway from "../../../../api/gateways/UsersAPIGateway";
import {Redirect} from "react-router-dom";
import AuthForm from "../../molecules/AuthForm";
import MainContainer from "./styled-components/MainContainer";

class Login extends React.Component {
    state = {
        username: null,
        password: null,
        loggedIn: false
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
        this.setState({loggedIn: true});
    }

    submitHandler = (event) => {
        event.preventDefault();

        UsersAPIGateway.login(this.state.username, this.state.password)
            .then(response => {
                if (response.ok)
                    this.loginSuccessHandler();
                else
                    this.loginFailedHandler(response);
            })
            .catch(err => {
                console.log(err);
                this.loginFailedHandler()
            });
    }

    fieldChangedHandler = (event, field) => {
        event.preventDefault();
        this.setState({[field]: event.target.value})
    }

    render() {
        return (
            <MainContainer>
                <AuthForm
                    onSubmit={this.submitHandler}
                    legend={'Zaloguj się'}
                    linkValue={'/registration'}
                    linkText='Nie masz konta?'
                    updateUsernameState={evt => this.fieldChangedHandler(evt, 'username')}
                    updatePasswordState={evt => this.fieldChangedHandler(evt, 'password')}
                />

                {
                    // Redirects to main page if logged in
                    this.state.loggedIn ? <Redirect to={'/'}/> : null
                }
            </MainContainer>


        )
    }
}

export default Login;