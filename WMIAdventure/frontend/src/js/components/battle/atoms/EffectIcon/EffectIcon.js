import React from 'react';
import Container from "./styled-components/Container";
import Icon from "./styled-components/Icon";
import Value from "./styled-components/Value";
import imgPlaceholder from '../../../../../assets/icons/upload_image_dark.svg';

class EffectIcon extends React.Component {
    render() {
        return (
            <Container type={this.props.type} visible={this.props.visible}
                       setTranslateX={this.props.setTranslateX}
                       setTranslateY={this.props.setTranslateY}>
                <Icon src={this.props.icon ? this.props.icon : imgPlaceholder} />
                {
                    this.props.value ?
                        <Value>
                            {this.props.value}
                        </Value>
                        : ''
                }
            </Container>
        );
    }
}

export default EffectIcon;