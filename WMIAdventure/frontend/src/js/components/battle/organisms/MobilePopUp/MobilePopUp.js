import React from 'react';
import Div from './styled-components/Div';
import Close from './styled-components/Close';

class MobilePopUp extends React.Component {
    render() {
        return (
            <Div visible={this.props.visible}
                 setOpacity={this.props.setOpacity}
                 setTranslateY={this.props.setTranslateY}>
                {this.props.children}
                <Close onClick={this.props.closeHandler} />
            </Div>
        );
    }
}

export default MobilePopUp;