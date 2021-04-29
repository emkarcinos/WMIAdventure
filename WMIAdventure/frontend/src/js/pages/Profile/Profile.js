import React from 'react';
import './Profile.scss';
import NavBar from '../../components/organisms/NavBar';
import Logo from '../../components/atoms/Logo';
import NotificationButton from '../../components/atoms/NotificationButton';
import ProfileButton from '../../components/atoms/ProfileButton';
import ShowMoreButton from '../../components/atoms/ShowMoreButton';

function Profile() {
    return (
        <div className='Profile'>
            <NavBar logo={<Logo />} notification={<NotificationButton />} profile={<ProfileButton />} showMore={<ShowMoreButton />}/>
            <p className='Profile__paragraph'>
                Profile view - not implemented yet.
            </p>
        </div>
    );
}

export default Profile;