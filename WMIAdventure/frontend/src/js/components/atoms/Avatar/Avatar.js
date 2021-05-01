import React from 'react';
import styled from 'styled-components';

const StyledWrapper = styled.section`
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
  
      img {
        width: 96px;
        height: 96px;
      }
  
      h2 {
        font-size: 16px;
        font-weight: 600;
        margin: 16px 0 0 0;
      }
  
      p {
        font-size: 12px;
        margin: 12px 0 0 0;
      }
`;

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