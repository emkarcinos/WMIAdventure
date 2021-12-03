import React from 'react';
import Container from "./styled-components/Container";
import Decoration from "./styled-components/Decoration";
import Icon from "./styled-components/Icon";
import imgPlaceholder from '../../../../../assets/icons/upload_image_dark.svg';

class MiniCard extends React.Component {
    render() {
        return (
            <Container borderDown={this.props.borderDown}>
                <Decoration borderDown={this.props.borderDown}/>
                <Icon src={this.props.icon ? this.props.icon : imgPlaceholder}/>
            </Container>
        );
    }
}

export default MiniCard;