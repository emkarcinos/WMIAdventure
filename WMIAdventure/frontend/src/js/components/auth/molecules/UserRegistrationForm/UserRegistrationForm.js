import React from 'react';
import Form from "./styled-components/Form";
import Fieldset from "./styled-components/Fieldset";
import Legend from "./styled-components/Legend";
import Input from "./styled-components/Input";
import Button from "./styled-components/Button";
import Label from "./styled-components/Label";

class UserRegistrationForm extends React.Component {
    render() {
        return (
            <Form action={this.props.handler}>
                <Fieldset>
                    <Legend>Zarejestruj się</Legend>
                    <Label for='username'>Nazwa użytkownika</Label>
                    <Input type='text' id='username' name='username' value={this.props.username}
                           onChange={this.props.updateState}/>
                    <Label for='password'>Hasło</Label>
                    <Input type='password' id='password' name='password' value={this.props.password}
                           onChange={this.props.updateState}/>
                    <Label for='password2'>Powtórz hasło</Label>
                    <Input type='password' id='password2' name='password2' value={this.props.password2}
                           onChange={this.props.updateState}/>
                    <Button type='submit' onClick={this.props.onSubmit}>Wyślij</Button>
                </Fieldset>
            </Form>
        )
    }
}

export default UserRegistrationForm