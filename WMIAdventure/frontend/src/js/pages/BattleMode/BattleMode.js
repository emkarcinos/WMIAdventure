import React from 'react';
import './BattleMode.scss';
import NavBar from '../../components/organisms/NavBar';
import Logo from '../../components/atoms/Logo';
import NotificationButton from '../../components/atoms/NotificationButton';
import ProfileButton from '../../components/atoms/ProfileButton';
import ShowMoreButton from '../../components/atoms/ShowMoreButton';

function BattleMode() {
    return (
        <div className="BattleMode">
            <NavBar logo={<Logo />} notification={<NotificationButton />} profile={<ProfileButton />} showMore={<ShowMoreButton />}/>
            <p className='AdventureMode__paragraph'>
                Battle Mode View - not implemented yet.
            </p>
        </div>
    );
}

export default BattleMode;