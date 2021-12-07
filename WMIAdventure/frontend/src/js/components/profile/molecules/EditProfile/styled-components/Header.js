import styled from 'styled-components';

const Header = styled.h3`
  font-size: 32px;
  font-weight: ${({theme}) => theme.weight.regular};
  color: ${({theme}) => theme.colors.dark};
  font-family: 'Roboto', sans-serif;
  text-transform: uppercase;
  margin: 0;
`;

export default Header;