import React from 'react';
import Logo from '../../atoms/Logo';
import NotificationButton from '../../molecules/NotificationButton';
import ProfileButton from '../../atoms/ProfileButton';
import ShowMoreButton from '../../molecules/ShowMoreButton';
import StyledNavBar from './StyledNavBar';
import {Link, Redirect} from "react-router-dom";
import UsersAPIGateway from "../../../../api/gateways/UsersAPIGateway";

class NavBar extends React.Component {
    state = {
        userLoggedIn: false,
        postLogout: false
    }

    checkIfUserLoggedIn = () => {
        UsersAPIGateway.isUserLoggedIn()
            .then(userLoggedIn => this.setState({userLoggedIn: userLoggedIn}));
    }

    logoutHandler = (event) => {
        event.preventDefault();
        UsersAPIGateway.logout();
        this.checkIfUserLoggedIn();
        alert("You've been logged out.");

        this.setState({postLogout: true});
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
                                 <>
                                     <button><Link to={'/login/'}>Login</Link></button>
                                     <button><Link to={'/registration'}>Rejestracja</Link></button>
                                 </>
                        }
                    </StyledNavBar.IconsWrapper>
                    {
                        this.state.postLogout ?
                            <>
                                <Redirect to={''}/>
                            </>: null
                    }
                </StyledNavBar.Navigation>
            </StyledNavBar>

        );
    }
}

export default NavBar;