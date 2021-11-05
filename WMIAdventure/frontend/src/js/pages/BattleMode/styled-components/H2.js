import styled from 'styled-components';

const H2 = styled.h2`
  font-size: 26px;
  text-transform: uppercase;
  text-align: center;
  font-weight: ${({theme}) => theme.weight.bold};
  margin: 80px 0 32px 0;
  color: ${({theme}) => theme.colors.light2};

  @media(min-width: ${({theme}) => theme.overMobile}px) {
    margin: 0;
    font-family: 'Roboto', sans-serif;
    font-weight: ${({theme}) => theme.weight.regular};
    font-size: 48px;
    color: ${({theme}) => theme.colors.whiteAlmost};
    letter-spacing: 3px;
    order: 3;
  }

  @media (min-width: ${({theme}) => theme.overMobile}px) and (max-height: 900px) {
    font-size: 36px;
  }
`;

export default H2;