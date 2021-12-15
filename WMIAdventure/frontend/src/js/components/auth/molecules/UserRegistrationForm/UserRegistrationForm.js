import React from 'react';
import Form from "./styled-components/Form";
import Fieldset from "./styled-components/Fieldset";
import Legend from "./styled-components/Legend";
import Input from "./styled-components/Input";
import Submit from "./styled-components/Submit";
import Label from "./styled-components/Label";
import InputContainer from "./styled-components/InputContainer";
import ColumnGapContainer from "../../../global/molecules/ColumnGapContainer";
import Line from "./styled-components/Line";
import A from "./styled-components/A";

class UserRegistrationForm extends React.Component {
    render() {
        return (
            <Form action={this.props.handler}>
                <Fieldset>
                    <Legend>
                        Zarejestruj się
                    </Legend>
                    <Label for='username'>Nazwa użytkownika</Label>
                    <InputContainer>
                        <Input type='text' id='username' name='username' value={this.props.username}
                               onChange={this.props.updateState}/>
                        <Line/>
                    </InputContainer>
                    <Label for='password'>Hasło</Label>
                    <InputContainer>
                        <Input type='password' id='password' name='password' value={this.props.password}
                               onChange={this.props.updateState}/>
                        <Line/>
                    </InputContainer>
                    <Label for='password2'>Powtórz hasło</Label>
                    <InputContainer>
                        <Input type='password' id='password2' name='password2' value={this.props.password2}
                               onChange={this.props.updateState}/>
                        <Line/>
                    </InputContainer>
                    <ColumnGapContainer setMargin={'72px 0 0 0'} gap={'24px'}>
                        <Submit type='submit' value='Zarejestruj się' onClick={this.props.onSubmit}/>
                        <A>
                            Masz już konto?
                        </A>
                    </ColumnGapContainer>
                </Fieldset>
            </Form>
        )
    }
}

export default UserRegistrationForm