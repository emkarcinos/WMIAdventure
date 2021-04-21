import React from 'react';
import './ProfileButton.scss';

import {Link} from 'react-router-dom';

import profile from '../../../../assets/icons/profile.svg';

function ProfileButton() {
    return (
        <Link className='ProfileButton' to={'/Profile'} onClick={() => {console.log('profile button clicked');}}>
            <img className='ProfileButton__icon' src={profile} alt='Ikona oznaczająca profil użytkownika, taki tors ludzika.'/>
        </Link>
    );
}

export default ProfileButton;