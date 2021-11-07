import React from 'react';
import Container from "./styled-components/Container";
import Icon from "./styled-components/Icon";
import LevelBorder from "./styled-components/LevelBorder";
import iconPlaceholder from '../../../../../assets/icons/upload_image_dark.svg';

class MiniCardView extends React.Component {
    render() {
        return (
            <Container visible={this.props.visible}
                       enemy={this.props.enemy} user={this.props.user}>
                {
                    this.props.enemy ?
                        <>
                            <Icon src={this.props.icon ? this.props.icon : iconPlaceholder} />
                            <LevelBorder enemy={this.props.enemy} user={this.props.user} rank={this.props.rank} />
                        </>
                        : ''
                }
                {
                    this.props.user ?
                        <>
                            <LevelBorder enemy={this.props.enemy} user={this.props.user} rank={this.props.rank} />
                            <Icon src={this.props.icon ? this.props.icon : iconPlaceholder} />
                        </>
                        : ''
                }
            </Container>
        );
    }
}

export default MiniCardView;