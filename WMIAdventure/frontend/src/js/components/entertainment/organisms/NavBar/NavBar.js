import React from 'react';
import Logo from '../../atoms/Logo';
import NotificationButton from '../../molecules/NotificationButton';
import ProfileButton from '../../atoms/ProfileButton';
import ShowMoreButton from '../../molecules/ShowMoreButton';
import StyledNavBar from './StyledNavBar';

function NavBar() {
    return (
        <StyledNavBar>
            <StyledNavBar.Navigation>
                <Logo />
                <StyledNavBar.IconsWrapper>
                    <NotificationButton />
                    <ProfileButton />
                    <ShowMoreButton />
                </StyledNavBar.IconsWrapper>
            </StyledNavBar.Navigation>
        </StyledNavBar>
    );
}

export default NavBar;