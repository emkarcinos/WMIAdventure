import React from 'react';
import Container from "./styled-components/Container";
import Icon from "./styled-components/Icon";
import imgPlaceholder from '../../../../../assets/icons/upload_image_dark.svg';
import IconContainer from "./styled-components/IconContainer";

class MiniCard extends React.Component {
    render() {
        return (
            <Container borderDown={this.props.borderDown} level={this.props.level}>
                <IconContainer borderDown={this.props.borderDown}>
                    <Icon src={this.props.icon ? this.props.icon : imgPlaceholder}/>
                </IconContainer>
            </Container>
        );
    }
}

export default MiniCard;