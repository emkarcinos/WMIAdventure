import React from 'react';
import Container from "./styled-components/Container";
import Icon from "./styled-components/Icon";
import LevelBorder from "./styled-components/LevelBorder";
import iconPlaceholder from '../../../../../assets/icons/upload_image_dark.svg';

class MiniCardView extends React.Component {
    /*
    props:
        setTranslateX -> handle init animation
        enemy -> signal that card belong to enemy
        user -> signal that card belong to current user
        level -> information about card level
        visible -> handle visibility of card
        cardImage -> card icon
     */

    render() {
        return (
            <Container visible={this.props.visible} setTranslateX={this.props.setTranslateX}
                       enemy={this.props.enemy} user={this.props.user}
                       animationDuration={this.props.animationDuration}>
                {
                    this.props.enemy ?
                        <>
                            <Icon src={this.props.cardImage ? this.props.cardImage : iconPlaceholder} />
                            <LevelBorder enemy={this.props.enemy} user={this.props.user} level={this.props.level} />
                        </>
                        : ''
                }
                {
                    this.props.user ?
                        <>
                            <LevelBorder enemy={this.props.enemy} user={this.props.user} level={this.props.level} />
                            <Icon src={this.props.cardImage ? this.props.cardImage : iconPlaceholder} />
                        </>
                        : ''
                }
            </Container>
        );
    }
}

export default MiniCardView;