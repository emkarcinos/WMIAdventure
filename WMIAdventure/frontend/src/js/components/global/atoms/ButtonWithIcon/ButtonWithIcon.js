import React from 'react';
import Button from './styled-components/Button';
import IconContainer from './styled-components/IconContainer';
import Img from './styled-components/Img';
import placeholderImg from '../../../../../assets/icons/upload_image.svg';
import P from './styled-components/P';

class ButtonWithIcon extends React.Component {
    render() {
        return (
            <Button onClick={this.props.handler} setWidth={this.props.setWidth}
                    setMargin={this.props.setMargin} access={this.props.access}>
                <IconContainer color={this.props.color}
                               access={this.props.access !== undefined ? this.props.access : true}>
                    <Img src={this.props.icon ? this.props.icon : placeholderImg}/>
                </IconContainer>
                <P access={this.props.access !== undefined ? this.props.access : true}>
                    {this.props.children}
                </P>
            </Button>
        );
    }
}

export default ButtonWithIcon;