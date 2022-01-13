import styled from 'styled-components';

const P = styled.p`
  font-family: 'Open Sans', sans-serif;
  font-size: 14px;
  font-weight: ${({theme}) => theme.weight.regular};
  color: ${({theme}) => theme.colors.dark};
  margin: 0 20px;
  text-align: center;

  @media (min-width: ${({theme}) => theme.overMobile}px) {
    max-width: 400px;
    line-height: 24px;
  }
`;

export default P;