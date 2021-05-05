import React from 'react';
import Logo from '../../atoms/Logo';
import NotificationButton from '../../molecules/NotificationButton';
import ProfileButton from '../../atoms/ProfileButton';
import ShowMoreButton from '../../molecules/ShowMoreButton';
import StyledNavBar from './StyledNavBar';

function NavBar() {
    return (
        <StyledNavBar className="NavBar">
            <StyledNavBar.Navigation className="NavBar__navigation">
                <Logo />
                <StyledNavBar.IconsWrapper className="NavBar__icons">
                    <NotificationButton />
                    <ProfileButton />
                    <ShowMoreButton />
                </StyledNavBar.IconsWrapper>
            </StyledNavBar.Navigation>
        </StyledNavBar>
    );
}

export default NavBar;