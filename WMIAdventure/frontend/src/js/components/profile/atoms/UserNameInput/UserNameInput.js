import React from 'react';
import Label from "./styled-components/Label";
import DivInput from "./styled-components/DivInput";
import Input from "./styled-components/Input";
import {maxUserName} from "../../../../utils/globals";
import Div from "./styled-components/Div";

class UserNameInput extends React.Component {
    render() {
        return (
            <Div>
                <Label htmlFor='username'>
                    Nazwa użytkownika
                </Label>
                <DivInput>
                    <Input id='username' name='userName' type='text'
                           onChange={this.props.updateUserName}
                           placeholder={'Nazwa'} maxLength={maxUserName}
                           defaultValue={this.props.currentUsername
                               ? this.props.currentUsername : null}
                    />
                </DivInput>
            </Div>
        );
    }
}

export default UserNameInput;