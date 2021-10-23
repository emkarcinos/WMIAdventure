import styled from 'styled-components';

const H3 = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 24px 0;
  
  @media (min-width: ${({theme}) => theme.overMobile}px) {
    font-size: 32px;
    margin: 0 0 36px 0;
  }
`;

export default H3;