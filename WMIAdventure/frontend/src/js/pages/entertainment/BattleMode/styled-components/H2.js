import styled from 'styled-components';

const H2 = styled.h2`
  font-size: 20px;
  max-width: 290px;
  text-align: center;
  font-weight: 600;
  margin: 0 0 24px 0;
  color: ${({theme}) => theme.colors.text01};
  
  @media (min-width: ${({theme}) => theme.overMobile}px) {
    font-size: 32px;
    max-width: 600px;
    margin: 0 0 64px 0;
  }
`;

export default H2;