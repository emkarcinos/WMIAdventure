import React from 'react';
import './Quiz.scss';
import NavBar from '../../components/containers/NavBar';
import Logo from '../../components/elements/Logo';
import NotificationButton from '../../components/elements/NotificationButton';
import ProfileButton from '../../components/elements/ProfileButton';
import ShowMoreButton from '../../components/elements/ShowMoreButton';

function Quiz() {
    return (
        <div className='Quiz'>
            <NavBar logo={<Logo />} notification={<NotificationButton />} profile={<ProfileButton />} showMore={<ShowMoreButton />}/>
            <p className='Quiz__paragraph'>
                Quiz View - have not implemented yet.
            </p>
        </div>
    );
}

export default Quiz;