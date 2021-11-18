import React from 'react';
import Div from './styled-components/Div';
import Close from './styled-components/Close';

class PopUp extends React.Component {
    render() {
        return (
            <Div visible={this.props.visible} setWidth={this.props.setWidth} setHeight={this.props.setHeight}
                 setMaxWidth={this.props.setMaxWidth} setMaxHeight={this.props.setMaxHeight}
                 onMouseEnter={this.props.hoverTrue} onMouseLeave={this.props.hoverFalse}
                 setOpacity={this.props.setOpacity}
                 setTranslateY={this.props.setTranslateY}>
                {this.props.children}
                <Close visible={!this.props.disableClose} onClick={this.props.closeHandler}/>
            </Div>
        );
    }
}

export default PopUp;