import React from 'react';
import Div from './styled-components/Div';

class TransBack extends React.Component {
    render() {
        return (
            <Div visible={this.props.visible}>
                {this.props.children}
            </Div>
        );
    }
}

export default TransBack;