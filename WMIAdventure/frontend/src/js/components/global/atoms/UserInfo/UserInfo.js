import React from 'react';
import Div from './styled-components/Div';
import Value from './styled-components/Value';
import Label from './styled-components/Label';
import Span from "./styled-components/Span";

class UserInfo extends React.Component {
    render() {
        return (
            <Div setMargin={this.props.setMargin}>
                <Label>
                    {this.props.label}
                </Label>
                {this.props.points ?
                    <Value>
                        <Span setColor={this.props.setPointsColor}>
                            {this.props.points}
                        </Span>&nbsp;
                        {this.props.value}
                    </Value> :
                    <Value>
                        {this.props.value}
                    </Value>
                }

            </Div>
        );
    }
}

export default UserInfo;