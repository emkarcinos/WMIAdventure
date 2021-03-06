import React from 'react';
import Div from './styled-components/Div';

class ColumnGapContainer extends React.Component {
    render() {
        return (
            <Div as={this.props.as} gap={this.props.gap} setRelative={this.props.setRelative}
                 setMargin={this.props.setMargin} setPadding={this.props.setPadding}
                 setWidth={this.props.setWidth} setHeight={this.props.setHeight}>
                {this.props.children}
            </Div>
        );
    }
}

export default ColumnGapContainer;