import React from 'react';
import './AdventureMode.scss';

import NavBar from '../../components/containers/NavBar';
import Logo from '../../components/elements/Logo';
import NotificationButton from '../../components/elements/NotificationButton';
import ProfileButton from '../../components/elements/ProfileButton';
import ShowMoreButton from '../../components/elements/ShowMoreButton';

function AdventureMode() {
    return (
        <div className='AdventureMode'>
            <NavBar logo={<Logo />} notification={<NotificationButton />} profile={<ProfileButton />} showMore={<ShowMoreButton />}/>
            <p className='AdventureMode__paragraph'>
                Adventure Mode View - have not implemented yet.
            </p>
        </div>
    );
}

export default AdventureMode;
