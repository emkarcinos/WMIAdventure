import React from 'react';
import Div from './styled-components/Div';

class TransBack extends React.Component {
    render() {
        return (
            <Div visible={this.props.visible}
                 setOpacity={this.props.setOpacity}
                 onClick={this.props.closeHandler}
                 customZIndex={this.props.customZIndex}
            >
                {this.props.children}
            </Div>
        );
    }
}

export default TransBack;