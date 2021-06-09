import styled from 'styled-components';

const CardsDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  
  @media (min-width: 1200px) {
    flex-direction: column;
  }
`;

export default CardsDiv;