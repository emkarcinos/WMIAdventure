import React from 'react';
import './Event.scss';
import NavBar from '../../components/containers/NavBar';
import Logo from '../../components/elements/Logo';
import NotificationButton from '../../components/elements/NotificationButton';
import ProfileButton from '../../components/elements/ProfileButton';
import ShowMoreButton from '../../components/elements/ShowMoreButton';

function Event() {
    return (
        <div className="Event">
            <NavBar logo={<Logo />} notification={<NotificationButton />} profile={<ProfileButton />} showMore={<ShowMoreButton />}/>
            <p className='Event__paragraph'>
                Event View - have not implemented yet.
            </p>
        </div>
    );
}

export default Event;