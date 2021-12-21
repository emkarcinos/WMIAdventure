import styled from 'styled-components';

const H2 = styled.h2`
  font-family: 'Roboto', sans-serif;
  font-size: 32px;
  font-weight: ${({theme}) => theme.weight.bold};
  color: ${({theme}) => theme.colors.dark};
  text-transform: uppercase;
  margin: 0 0 40px 0;
  width: 100%;
  text-align: center;

  @media (min-width: ${({theme}) => theme.overMobile}px) {
    margin: 0 0 60px 0;
  }
`;

export default H2;