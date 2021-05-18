import React from 'react';
import profile from '../../../../../assets/icons/profile.svg';
import StyledProfileButton from './StyledProfileButton';

function ProfileButton() {
    return (
        <StyledProfileButton to={'/profile'} onClick={() => {console.log('profile button clicked');}}>
            <StyledProfileButton.Icon src={profile} alt='Ikona oznaczająca profil użytkownika, taki tors ludzika.'/>
        </StyledProfileButton>
    );
}

export default ProfileButton;