import React from 'react';
import './Profile.scss';
import NavBar from '../../components/containers/NavBar';
import Logo from '../../components/elements/Logo';
import NotificationButton from '../../components/elements/NotificationButton';
import ProfileButton from '../../components/elements/ProfileButton';
import ShowMoreButton from '../../components/elements/ShowMoreButton';

function Profile() {
    return (
        <div className='Profile'>
            <NavBar logo={<Logo />} notification={<NotificationButton />} profile={<ProfileButton />} showMore={<ShowMoreButton />}/>
            <p className='Profile__paragraph'>
                Profile view - Have not implemented yet.
            </p>
        </div>
    );
}

export default Profile;