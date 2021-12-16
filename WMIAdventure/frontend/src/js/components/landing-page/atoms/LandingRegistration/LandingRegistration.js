import React from 'react';
import A from "./styled-components/A";

class LandingRegistration extends React.Component {
    render() {
        return (
            <A to={this.props.url}>
                {this.props.text}
            </A>
        );
    }
}

export default LandingRegistration;