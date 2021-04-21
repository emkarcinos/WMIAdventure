import React from 'react';
import './Ranking.scss';
import NavBar from '../../components/containers/NavBar';
import Logo from '../../components/elements/Logo';
import NotificationButton from '../../components/elements/NotificationButton';
import ProfileButton from '../../components/elements/ProfileButton';
import ShowMoreButton from '../../components/elements/ShowMoreButton';

function Ranking() {
    return (
        <div className='Ranking'>
            <NavBar logo={<Logo />} notification={<NotificationButton />} profile={<ProfileButton />} showMore={<ShowMoreButton />}/>
            <p className='Ranking__paragraph'>
                Ranking View - have not implemented yet.
            </p>
        </div>
    );
}

export default Ranking;