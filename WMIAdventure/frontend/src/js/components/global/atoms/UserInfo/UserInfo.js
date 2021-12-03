import React from 'react';
import Div from './styled-components/Div';
import Value from './styled-components/Value';
import Label from './styled-components/Label';

class UserInfo extends React.Component {
    render() {
        return (
            <Div setMargin={this.props.setMargin}>
                <Label>
                    {this.props.label}
                </Label>
                <Value>
                    {this.props.value}
                </Value>
            </Div>
        );
    }
}

export default UserInfo;