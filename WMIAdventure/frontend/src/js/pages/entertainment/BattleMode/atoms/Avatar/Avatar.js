import React from 'react';
import StyledAvatar from './StyledAvatar';

function Avatar({image}) {
    return (
        <StyledAvatar>
            <StyledAvatar.Image src={image} alt='Avatar profilowy.' />
            <StyledAvatar.Header>
                Nazwa użytkownika
            </StyledAvatar.Header>
            <StyledAvatar.Paragraph>
                5 semestr
            </StyledAvatar.Paragraph>
        </StyledAvatar>
    );
}

export default Avatar;