import React from 'react';
import Logo from '../../atoms/Logo';
import NotificationButton from '../../molecules/NotificationButton';
import ProfileButton from '../../atoms/ProfileButton';
import ShowMoreButton from '../../molecules/ShowMoreButton';
import StyledNavBar from './StyledNavBar';
import {Link} from "react-router-dom";
import UsersAPIGateway from "../../../../api/gateways/UsersAPIGateway";

class NavBar extends React.Component {
    state = {
        userLoggedIn: false
    }

    checkIfUserLoggedIn = () => {
        UsersAPIGateway.isUserLoggedIn()
            .then(userLoggedIn => this.setState({userLoggedIn: userLoggedIn}));
    }

    logoutHandler = (event) => {
        event.preventDefault();
        UsersAPIGateway.logout();
        this.checkIfUserLoggedIn();
        alert("You've been logged out.")
    }

    componentDidMount() {
        this.checkIfUserLoggedIn();
    }

    render() {
        return (
            <StyledNavBar>
                <StyledNavBar.Navigation>
                    <Logo />
                    <StyledNavBar.IconsWrapper>
                        {
                             this.state.userLoggedIn ?
                                 <>
                                     <NotificationButton />
                                     <ProfileButton />
                                     <ShowMoreButton />
                                     <button onClick={this.logoutHandler}>Logout</button>
                                 </> :
                                 <button><Link to={'/login/'}>Login</Link></button>

                        }

                    </StyledNavBar.IconsWrapper>
                </StyledNavBar.Navigation>
            </StyledNavBar>
        );
    }
}

export default NavBar;