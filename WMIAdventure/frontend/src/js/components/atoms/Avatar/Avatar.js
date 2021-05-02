import React from 'react';
import StyledWrapper from './StyledWrapper';

function Avatar({image}) {
    return (
        <StyledWrapper>
            <img src={image} alt='Avatar profilowy.' />
            <h2>
                Nazwa użytkownika
            </h2>
            <p>
                5 semestr
            </p>
        </StyledWrapper>
    );
}

export default Avatar;