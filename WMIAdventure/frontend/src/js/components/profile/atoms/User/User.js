import React from 'react';
import AvatarContainer from "./styled-components/AvatarContainer";
import Avatar from "./styled-components/Avatar";
import {getCurrentUserData} from "../../../../storage/user/userData";
import Container from "./styled-components/Container";
import Nick from "./styled-components/Nick";

class User extends React.Component {

    state = {
        username: false,
        image: false
    }

    componentDidMount() {
        getCurrentUserData()
            .then(data => data ? this.setState({
                username: data.displayedUsername,
                image: data.image
            }) : null);
    }

    render() {
        return (
            <Container>
                <AvatarContainer>
                    <Avatar src={this.state.image ? this.state.image : null}
                            alt=""/>
                </AvatarContainer>
                <Nick>
                    {this.state.username}
                </Nick>
            </Container>
        );
    }
}

export default User;