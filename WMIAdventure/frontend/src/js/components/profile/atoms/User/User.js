import React from 'react';
import AvatarContainer from "./styled-components/AvatarContainer";
import Avatar from "./styled-components/Avatar";
import Container from "./styled-components/Container";
import Nick from "./styled-components/Nick";
import kuc1 from '../../../../../assets/icons/kuc1.svg'

class User extends React.Component {
    render() {
        return (
            <Container>
                <AvatarContainer>
                    <Avatar src={this.props.image ? this.props.image : kuc1}
                            alt="profile-picture"/>
                </AvatarContainer>
                <Nick>
                    {this.props.username}
                </Nick>
            </Container>
        );
    }
}

export default User;