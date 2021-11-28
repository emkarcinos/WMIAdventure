import React from 'react';
import Container from "./styled-components/Container";
import Icon from "./styled-components/Icon";
import Value from "./styled-components/Value";
import imgPlaceholder from '../../../../../assets/icons/upload_image_dark.svg';
import {getEffectById} from "../../../../storage/effects/effectStorage";

class EffectIcon extends React.Component {
    state = {
        icon: null
    }

    retrieveIcon = () => {
        getEffectById(this.props.effectId).then(
            effectData => {
                this.setState({icon: effectData.icon});
            }
        )
    }

    componentDidMount() {
        this.retrieveIcon();
    }

    render() {
        return (
            <Container type={this.props.type}
                       setScale={this.props.setScale}
                       setOpacity={this.props.setOpacity}
                       setTranslateX={this.props.setTranslateX}
                       setTranslateY={this.props.setTranslateY}>
                <Icon src={this.state.icon ? this.state.icon : imgPlaceholder} />
                {
                    this.props.value ?
                        <Value value={this.props.value}>
                            {this.props.value}
                        </Value>
                        : ''
                }
            </Container>
        );
    }
}

export default EffectIcon;