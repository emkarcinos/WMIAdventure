import React from 'react';
import Button from './styled-components/Button';
import IconContainer from './styled-components/IconContainer';
import Img from './styled-components/Img';
import placeholderImg from '../../../../../assets/icons/upload_image.svg';
import P from './styled-components/P';

class ButtonWithIcon extends React.Component {
    render() {
        return (
            <Button setMargin={this.props.setMargin}>
                <IconContainer color={this.props.color}>
                    <Img src={this.props.icon ? this.props.icon : placeholderImg} />
                </IconContainer>
                <P>
                    {this.props.children}
                </P>
            </Button>
        );
    }
}

export default ButtonWithIcon;