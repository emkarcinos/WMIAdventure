import React from 'react';
import './BattleMode.scss';
import NavBar from '../../components/containers/NavBar';
import Logo from '../../components/elements/Logo';
import NotificationButton from '../../components/elements/NotificationButton';
import ProfileButton from '../../components/elements/ProfileButton';
import ShowMoreButton from '../../components/elements/ShowMoreButton';

function BattleMode() {
    return (
        <div className="BattleMode">
            <NavBar logo={<Logo />} notification={<NotificationButton />} profile={<ProfileButton />} showMore={<ShowMoreButton />}/>
            <p className='AdventureMode__paragraph'>
                Battle Mode View - have not implemented yet.
            </p>
        </div>
    );
}

export default BattleMode;