import React from 'react';
import './Ranking.scss';
import NavBar from '../../components/organisms/NavBar';
import Logo from '../../components/atoms/Logo';
import NotificationButton from '../../components/atoms/NotificationButton';
import ProfileButton from '../../components/atoms/ProfileButton';
import ShowMoreButton from '../../components/atoms/ShowMoreButton';

function Ranking() {
    return (
        <div className='Ranking'>
            <NavBar logo={<Logo />} notification={<NotificationButton />} profile={<ProfileButton />} showMore={<ShowMoreButton />}/>
            <p className='Ranking__paragraph'>
                Ranking View - not implemented yet.
            </p>
        </div>
    );
}

export default Ranking;