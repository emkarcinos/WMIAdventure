import React from 'react';
import profile from '../../../../../../assets/icons/profile.svg';
import Wrapper from './styled-components/Wrapper';
import Icon from './styled-components/Icon';

function ProfileButton() {
    return (
        <Wrapper to={'/profile'} onClick={() => {console.log('profile button clicked');}}>
            <Icon src={profile} alt='Ikona oznaczająca profil użytkownika, taki tors ludzika.'/>
        </Wrapper>
    );
}

export default ProfileButton;