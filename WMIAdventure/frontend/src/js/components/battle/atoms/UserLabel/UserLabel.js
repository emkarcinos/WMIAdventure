import React from 'react';
import Label from './styled-components/Label';


class UserLabel extends React.Component {
    render() {
        return (
            <Label term={this.props.term}
                   level={this.props.level}
                   rank={this.props.rank}
                   setMargin={this.props.setMargin}>
                {this.props.children}
            </Label>
        );
    }
}

export default UserLabel;