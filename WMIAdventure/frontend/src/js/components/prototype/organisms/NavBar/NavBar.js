import React from 'react';
import Logo from '../../atoms/Logo';
import NotificationButton from '../../molecules/NotificationButton';
import ProfileButton from '../../atoms/ProfileButton';
import ShowMoreButton from '../../molecules/ShowMoreButton';
import StyledNavBar from './StyledNavBar';
import {Link} from "react-router-dom";

function NavBar() {
    return (
        <StyledNavBar>
            <StyledNavBar.Navigation>
                <Logo />
                <StyledNavBar.IconsWrapper>
                    <NotificationButton />
                    <ProfileButton />
                    <ShowMoreButton />
                    <Link to={'/login/'}>Login</Link>
                </StyledNavBar.IconsWrapper>
            </StyledNavBar.Navigation>
        </StyledNavBar>
    );
}

export default NavBar;