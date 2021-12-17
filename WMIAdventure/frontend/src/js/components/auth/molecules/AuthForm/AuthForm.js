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
import Div from "./styled-components/Div";
import ErrorDecoration from "./styled-components/ErrorDecoration";
import errorInfoIcon from '../../../../../assets/icons/ErrorInfoIcon.svg';
import ErrorMessage from "./styled-components/ErrorMessage";
import ErrorContainer from "./styled-components/ErrorContainer";

class AuthForm extends React.Component {
    render() {
        return (
            <Form onSubmit={this.props.onSubmit}>
                <Fieldset>
                    <Legend>
                        {this.props.legend}
                    </Legend>
                    <Div>
                        <Label for='username'>Nazwa użytkownika</Label>
                        <InputContainer>
                            <Input type='text' id='username' name='username' value={this.props.username}
                                   onChange={this.props.updateUsernameState}/>
                            <Line/>
                        </InputContainer>
                        {this.props.loginError ?
                            <ErrorContainer>
                                <ErrorDecoration src={errorInfoIcon} alt={'Błąd.'}/>
                                <ErrorMessage>
                                    {this.props.loginError}
                                </ErrorMessage>
                            </ErrorContainer> : null
                        }
                        <Label for='password'>Hasło</Label>
                        <InputContainer>
                            <Input type='password' id='password' name='password'
                                   pattern='^.{10}.*'
                                   title='Hasło musi składać się z conajmniej 10 znaków.'
                                   value={this.props.password}
                                   onChange={this.props.updatePasswordState}/>
                            <Line/>
                        </InputContainer>
                        {this.props.passwordError ?
                            <ErrorContainer>
                                <ErrorDecoration src={errorInfoIcon} alt={'Błąd.'}/>
                                <ErrorMessage>
                                    {this.props.passwordError}
                                </ErrorMessage>
                            </ErrorContainer> : null
                        }
                        {
                            (this.props.password2 !== undefined) ?
                                <>
                                    <Label for='password2'>Potwierdź hasło</Label>
                                    <InputContainer>
                                        <Input type='password' id='password2' name='password2'
                                               pattern='^.{10}.*'
                                               title='Hasło musi składać się z conajmniej 10 znaków.'
                                               value={this.props.password2}
                                               onChange={this.props.updatePassword2State}/>
                                        <Line/>
                                    </InputContainer>
                                    {this.props.password2Error ?
                                        <ErrorContainer>
                                            <ErrorDecoration src={errorInfoIcon} alt={'Błąd.'}/>
                                            <ErrorMessage>
                                                {this.props.password2Error}
                                            </ErrorMessage>
                                        </ErrorContainer> : null
                                    }
                                </> : null
                        }
                    </Div>
                    <ColumnGapContainer setMargin={'20px 0 0 0'} gap={'24px'}>
                        <Submit type='submit' value={this.props.legend}/>
                        <A to={this.props.linkValue}>
                            {this.props.linkText}
                        </A>
                    </ColumnGapContainer>
                </Fieldset>
            </Form>
        )
    }
}

export default AuthForm