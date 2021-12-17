import React from "react";
import AuthForm from "../../molecules/AuthForm";
import UsersAPIGateway from "../../../../api/gateways/UsersAPIGateway";
import {Redirect} from "react-router-dom";
import MainContainer from "./styled-components/MainContainer";

class UserRegistration extends React.Component {
    state = {
        username: null,
        password: null,
        password2: null,
        hasRegistered: false
    }
    onRegistrationSuccess = () => {
        UsersAPIGateway.login(this.state.username, this.state.password)
            .then(resp => {
                resp.ok ? this.setState({hasRegistered: true}) : null;
            });
    }
    onRegistrationFormSubmit = (event) => {
        event.preventDefault();
        UsersAPIGateway.registerUser(this.state)
            .then(resp => {
                    resp.json().then(msg => alert(JSON.stringify(msg)
                        .replace(/[{}"\]]+/g, '')
                        .replace(/[,[]+/g, ' ')))
                    resp.ok ? this.onRegistrationSuccess() : null;
                }
            );
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
                />
                {
                    this.state.hasRegistered ? <Redirect to={'/main'}/> : null
                }
            </MainContainer>
        )
    }
}

export default UserRegistration;