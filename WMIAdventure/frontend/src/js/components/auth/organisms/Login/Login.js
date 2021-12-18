import React from "react";
import UsersAPIGateway from "../../../../api/gateways/UsersAPIGateway";
import {Redirect} from "react-router-dom";
import AuthForm from "../../molecules/AuthForm";
import MainContainer from "./styled-components/MainContainer";
import {concatMessage, translateErrors} from "../../../../api/data-models/errors/errors";

class Login extends React.Component {
    state = {
        username: null,
        password: null,
        loggedIn: false,
        usernameError: null,
        passwordError: null,
    }

    loginFailedHandler = (response) => {
        const asyncHandle = async (response) => {
            const data = await response.json()
            const translatedError = translateErrors(data);
            if (translatedError.username)
                this.setState({usernameError: concatMessage(translatedError.username)})
            if (translatedError.password)
                this.setState({passwordError: concatMessage(translatedError.password)})
        }
        asyncHandle(response);
    }

    loginSuccessHandler = () => {
        window.location.reload();
    }

    clearErrors = () => {
        this.setState({usernameError: null, passwordError: null})
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.clearErrors();

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
                    loginError={this.state.usernameError} passwordError={this.state.passwordError}
                />

                {
                    // Redirects to main page if logged in
                    this.state.loggedIn ? <Redirect to={'/main'}/> : null
                }
            </MainContainer>


        )
    }
}

export default Login;