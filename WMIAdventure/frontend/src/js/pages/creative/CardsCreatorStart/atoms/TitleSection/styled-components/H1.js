import styled from 'styled-components';

const H1 = styled.h1`
  font-size: 36px;
  font-family: 'Ubuntu', sans-serif;
  font-weight: ${({theme}) => theme.weight.regular};
  margin: 0 0 16px 0;
  @media (min-width: ${({theme}) => theme.overMobile}px) {
    font-size: 52px;
    text-align: center;
    margin: 0 0 24px 0;
  }
`;

export default H1;