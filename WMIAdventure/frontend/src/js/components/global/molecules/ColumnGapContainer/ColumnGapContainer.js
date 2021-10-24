import React from 'react';
import Div from './styled-components/Div';

class ColumnGapContainer extends React.Component {
    render() {
        return (
            <Div gap={this.props.gap} setMargin={this.props.setMargin}>
                {this.props.children}
            </Div>
        );
    }
}

export default ColumnGapContainer;