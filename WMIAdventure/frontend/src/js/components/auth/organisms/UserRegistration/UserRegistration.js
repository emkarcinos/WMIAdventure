import React from "react";
import UserRegistrationForm from "../../molecules/UserRegistrationForm";
import UsersAPIGateway from "../../../../api/gateways/UsersAPIGateway";
import {Redirect} from "react-router-dom";

class UserRegistration extends React.Component {
    state = {
        username: null,
        email: null,
        password: null,
        password2: null,
        hasRegistered: false
    }
    onRegistrationSuccess = () => {
        UsersAPIGateway.login(this.state.username)
            .then(resp => {
                resp.ok ? this.setState({hasRegistered: true}) : null;
            });
    }
    onRegistrationFormSubmit = (event) => {
        event.preventDefault();
        UsersAPIGateway.registerUser(this.state)
            .then(resp => {
                resp.json().then( msg => alert(JSON.stringify(msg)
                    .replace(/[{}"\]]+/g, '')
                    .replace(/[,[]+/g, ' ')))
                resp.ok ? this.onRegistrationSuccess() : null;
                }
            );
    }

    updateState = (event) => {
        const keyName = event.target.name;
        let keyValue;
        if (event.target.value !== '')
            keyValue = event.target.value;
        else keyValue = '';
        this.setState({[keyName]: keyValue});
    }

    render() {
        return (
            <>
                <UserRegistrationForm username={this.state.username}
                                      email={this.state.email}
                                      password={this.state.password}
                                      password2={this.state.password2}
                                      onSubmit={this.onRegistrationFormSubmit}
                                      updateState={this.updateState}
                />
                {
                    this.state.hasRegistered ? <Redirect to={'/'}/> : null
                }
            </>
        )
    }
}

export default UserRegistration;