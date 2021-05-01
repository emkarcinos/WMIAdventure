import React from 'react';
import './NavBar.scss';
import Logo from '../../atoms/Logo';
import NotificationButton from '../../atoms/NotificationButton';
import ProfileButton from '../../atoms/ProfileButton';
import ShowMoreButton from '../../atoms/ShowMoreButton';

function NavBar() {
    return (
        <header className="NavBar">
            <nav className="NavBar__navigation">
                <Logo />
                <div className="NavBar__icons">
                    <NotificationButton />
                    <ProfileButton />
                    <ShowMoreButton />
                </div>
            </nav>
        </header>
    );
}

export default NavBar;