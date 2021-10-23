import React from "react";
import FormItemContainer from "./styled-components/FormItemContainer";
import Form from "./styled-components/Form";

class LoginForm extends React.Component {
    render() {
        return (
            <Form onSubmit={this.props.submitHandler}>
                <FormItemContainer>
                    <label htmlFor={'username'}>Nazwa użytkownika: </label>
                    <input type={'text'} id={'username'} name={'username'} onChange={this.props.usernameChangedHandler} autoFocus={true}/>
                </FormItemContainer>

                <FormItemContainer>
                    <input type={'submit'} value={'Zaloguj się'} />
                </FormItemContainer>
            </Form>
        )
    }
}

export default LoginForm;