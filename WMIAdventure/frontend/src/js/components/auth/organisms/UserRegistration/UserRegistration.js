import React from "react";
import AuthForm from "../../molecules/AuthForm";
import UsersAPIGateway from "../../../../api/gateways/UsersAPIGateway";
import {Redirect} from "react-router-dom";
import MainContainer from "./styled-components/MainContainer";
import {concatMessage, translateErrors} from "../../../../api/data-models/errors/errors";

class UserRegistration extends React.Component {
    state = {
        username: null,
        password: null,
        password2: null,
        hasRegistered: false,
        usernameError: null,
        passwordError: null,
        password2Error: null,
    }
    onRegistrationSuccess = () => {
        UsersAPIGateway.login(this.state.username, this.state.password)
            .then(resp => {
                resp.ok ? this.setState({hasRegistered: true}) : null;
            });
    }

    onRegistrationFailure = (response) => {
        const asyncHandle = async (response) => {
            const data = await response.json()
            const translatedError = translateErrors(data);
            if (translatedError.username)
                this.setState({usernameError: concatMessage(translatedError.username)})
            if (translatedError.password)
                this.setState({passwordError: concatMessage(translatedError.password)})
            if (translatedError.password2)
                this.setState({password2Error: concatMessage(translatedError.password2)})
        }
        asyncHandle(response);
    }

    clearErrors = () => {
        this.setState({usernameError: null, passwordError: null, password2Error: null});
    }

    onRegistrationFormSubmit = (event) => {
        event.preventDefault();
        this.clearErrors()
        UsersAPIGateway.registerUser(this.state)
            .then(resp => resp.ok ? this.onRegistrationSuccess() : this.onRegistrationFailure(resp));
    }

    fieldChangedHandler = (event, field) => {
        event.preventDefault();
        this.setState({[field]: event.target.value})
    }


    render() {
        return (
            <MainContainer>
                <AuthForm legend='Zarejestruj się'
                          linkValue={'/login'}
                          linkText='Masz już konto?'
                          username={this.state.username}
                          password={this.state.password}
                          password2={this.state.password2}
                          onSubmit={this.onRegistrationFormSubmit}
                          updateUsernameState={evt => this.fieldChangedHandler(evt, 'username')}
                          updatePasswordState={evt => this.fieldChangedHandler(evt, 'password')}
                          updatePassword2State={evt => this.fieldChangedHandler(evt, 'password2')}
                          loginError={this.state.usernameError}
                          passwordError={this.state.passwordError}
                          password2Error={this.state.password2Error}
                />
                {
                    this.state.hasRegistered ? <Redirect to={'/main'}/> : null
                }
            </MainContainer>
        )
    }
}

export default UserRegistration;