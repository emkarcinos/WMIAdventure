import React from 'react';
import {Helmet} from 'react-helmet';
import WholePageDiv from "./styled-components/WholePageDiv";
import LoginForm from "./styled-components/LoginForm";
import FormItemContainer from "./styled-components/FormItemContainer";
import AuthAPIGateway from "../../api/gateways/AuthAPIGateway";


class LoginPage extends React.Component {
    state = {
        username: null
    }

    loginFailedHandler = () => {
        alert("Login failed");
    }

    submitHandler = (event) => {
        event.preventDefault();

        AuthAPIGateway.login(this.state.username)
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

                    <LoginForm onSubmit={this.submitHandler}>
                        <FormItemContainer>
                            <label htmlFor={'username'}>Nazwa użytkownika: </label>
                            <input type={'text'} id={'username'} name={'username'} onChange={this.usernameChangedHandler} autoFocus={true}/>
                        </FormItemContainer>

                        <FormItemContainer>
                            <input type={'submit'} value={'Zaloguj się'} />
                        </FormItemContainer>
                    </LoginForm>
                </WholePageDiv>

            </>

        )
    }
}

export default LoginPage;