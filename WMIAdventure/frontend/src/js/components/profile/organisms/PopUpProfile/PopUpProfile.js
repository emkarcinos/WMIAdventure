import React from 'react';
import TransparentBack from "./styled-components/TransparentBack";
import Container from "./styled-components/Container";
import Close from "./styled-components/Close";

class PopUpProfile extends React.Component {
    render() {
        return (
            <TransparentBack setOpacity={this.props.setOpacity}>
                <Container setTranslateX={this.props.setTranslateX}>
                    <Close onClick={this.props.closeHandler}/>
                    {this.props.children}
                </Container>
            </TransparentBack>
        );
    }
}

export default PopUpProfile;