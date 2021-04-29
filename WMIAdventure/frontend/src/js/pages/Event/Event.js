import React from 'react';
import './Event.scss';
import NavBar from '../../components/organisms/NavBar';
import Logo from '../../components/atoms/Logo';
import NotificationButton from '../../components/atoms/NotificationButton';
import ProfileButton from '../../components/atoms/ProfileButton';
import ShowMoreButton from '../../components/atoms/ShowMoreButton';

function Event() {
    return (
        <div className="Event">
            <NavBar logo={<Logo />} notification={<NotificationButton />} profile={<ProfileButton />} showMore={<ShowMoreButton />}/>
            <p className='Event__paragraph'>
                Event View - not implemented yet.
            </p>
        </div>
    );
}

export default Event;