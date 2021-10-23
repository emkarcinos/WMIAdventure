import React from 'react';
import Label from './styled-components/Label';
import Icon from './styled-components/Icon';
import Number from './styled-components/Number';


class UserLabel extends React.Component {

    render() {
        return (
            <Label term={this.props.term}
                   level={this.props.level}
                   rank={this.props.rank}
                   setMargin={this.props.setMargin}>
                <Icon src={this.props.icon} />
                <Number>
                    {this.props.number}
                </Number>
            </Label>
        );
    }
}

export default UserLabel;