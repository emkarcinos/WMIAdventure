import React from "react";
import UserRegistrationForm from "../../molecules/UserRegistrationForm";
import registerUser from "../../../../api/gateways/UsersAPIGateway";

class UserRegistration extends React.Component {
    state = {
        username: null,
        email: null,
        password: null,
        password2: null,
    }
    
    onRegistrationFormSubmit = (event) => {
        event.preventDefault();
        registerUser(this.state)
            .then(resp => {
                alert(JSON.stringify(resp)
                    .replace(/[{}"\]]+/g, '')
                    .replace(/[,[]+/g, ' '))
            })
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
            </>
        )
    }
}

export default UserRegistration;