import styled from 'styled-components';

const Subtitle = styled.p`
  margin: 0 0 20px 0;
  text-transform: uppercase;
  font-size: 18px;
  font-family: 'Roboto', sans-serif;
  font-weight: ${({theme}) => theme.weight.light};
  color: ${({theme}) => theme.colors.dark};
  text-align: center;
  z-index: 2;
  max-width: 290px;

  @media (min-width: ${({theme}) => theme.overMobile}px) {
    font-size: 28px;
    max-width: 400px;
    line-height: 38px;
  }

  @media (min-width: ${({theme}) => theme.overMobile}px) and (max-width: 1460px) {
    font-size: 24px;
  }

  @media (min-width: ${({theme}) => theme.overMobile}px) and (max-width: 1260px) {
    line-height: 32px;
    font-size: 18px;
    max-width: 300px;
  }
`;

export default Subtitle;