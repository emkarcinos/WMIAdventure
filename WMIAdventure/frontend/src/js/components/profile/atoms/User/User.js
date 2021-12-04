import React from 'react';
import AvatarContainer from "./styled-components/AvatarContainer";
import Avatar from "./styled-components/Avatar";
import Container from "./styled-components/Container";
import Nick from "./styled-components/Nick";

class User extends React.Component {
    render() {
        return (
            <Container>
                <AvatarContainer>
                    <Avatar src={this.props.image ? this.props.image : null}
                            alt=""/>
                </AvatarContainer>
                <Nick>
                    {this.props.username}
                </Nick>
            </Container>
        );
    }
}

export default User;