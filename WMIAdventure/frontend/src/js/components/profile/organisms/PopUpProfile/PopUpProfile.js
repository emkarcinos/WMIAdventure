import React from 'react';
import TransparentBack from "./styled-components/TransparentBack";
import Container from "./styled-components/Container";
import Close from "./styled-components/Close";

class PopUpProfile extends React.Component {

    state = {
        popUpHover: false,
    }

    hoverTrue = () => {
        this.setState({popUpHover: true});
    }

    hoverFalse = () => {
        this.setState({popUpHover: false});
    }

    handleHiding = () => {
        if (!this.state.popUpHover) {
            this.props.closeHandler();
        }
    }

    render() {
        return (
            <TransparentBack setOpacity={this.props.setOpacity} onClick={this.handleHiding}>
                <Container onMouseEnter={this.hoverTrue} onMouseLeave={this.hoverFalse}
                           setTranslateX={this.props.setTranslateX}>
                    <Close onClick={this.props.closeHandler}/>
                    {this.props.children}
                </Container>
            </TransparentBack>
        );
    }
}

export default PopUpProfile;