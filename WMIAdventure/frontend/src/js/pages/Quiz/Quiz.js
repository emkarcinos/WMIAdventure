import React from 'react';
import './Quiz.scss';
import NavBar from '../../components/organisms/NavBar';
import Logo from '../../components/atoms/Logo';
import NotificationButton from '../../components/atoms/NotificationButton';
import ProfileButton from '../../components/atoms/ProfileButton';
import ShowMoreButton from '../../components/atoms/ShowMoreButton';

function Quiz() {
    return (
        <div className='Quiz'>
            <NavBar logo={<Logo />} notification={<NotificationButton />} profile={<ProfileButton />} showMore={<ShowMoreButton />}/>
            <p className='Quiz__paragraph'>
                Quiz View - not implemented yet.
            </p>
        </div>
    );
}

export default Quiz;