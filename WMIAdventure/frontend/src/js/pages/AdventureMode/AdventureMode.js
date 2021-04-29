import React from 'react';
import './AdventureMode.scss';

import NavBar from '../../components/organisms/NavBar';
import Logo from '../../components/atoms/Logo';
import NotificationButton from '../../components/atoms/NotificationButton';
import ProfileButton from '../../components/atoms/ProfileButton';
import ShowMoreButton from '../../components/atoms/ShowMoreButton';

function AdventureMode() {
    return (
        <div className='AdventureMode'>
            <NavBar logo={<Logo />} notification={<NotificationButton />} profile={<ProfileButton />} showMore={<ShowMoreButton />}/>
            <p className='AdventureMode__paragraph'>
                Adventure Mode View - not implemented yet.
            </p>
        </div>
    );
}

export default AdventureMode;
