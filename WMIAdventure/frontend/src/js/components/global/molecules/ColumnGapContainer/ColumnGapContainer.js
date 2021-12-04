import React from 'react';
import Div from './styled-components/Div';

class ColumnGapContainer extends React.Component {
    render() {
        return (
            <Div gap={this.props.gap} setRelative={this.props.setRelative}
                 setMargin={this.props.setMargin}
                 setWidth={this.props.setWidth} setHeight={this.props.setHeight}>
                {this.props.children}
            </Div>
        );
    }
}

export default ColumnGapContainer;