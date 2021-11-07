import React from 'react';
import Container from "./styled-components/Container";
import Icon from "./styled-components/Icon";
import iconPlaceholder from '../../../../../assets/icons/upload_image_dark.svg';
import IconContainer from "./styled-components/IconContainer";

class MiniCardView extends React.Component {
    /*
    props:
        setTranslateX -> handle init animation
        enemy -> signal that card belong to enemy
        user -> signal that card belong to current user
        cardLevel -> information about card level
        visible -> handle visibility of card
        cardImage -> card icon
     */

    render() {
        return (
            <Container visible={this.props.visible} setTranslateX={this.props.setTranslateX}
                       enemy={this.props.enemy} user={this.props.user} level={this.props.cardLevel}
                       animationDuration={this.props.animationDuration}>
                {
                    this.props.enemy ?
                        <>
                            <IconContainer enemy>
                                <Icon src={this.props.cardImage ? this.props.cardImage : iconPlaceholder} />
                            </IconContainer>
                        </>
                        : ''
                }
                {
                    this.props.user ?
                        <>
                            <IconContainer>
                                <Icon src={this.props.cardImage ? this.props.cardImage : iconPlaceholder} />
                            </IconContainer>
                        </>
                        : ''
                }
            </Container>
        );
    }
}

export default MiniCardView;