import styled from 'styled-components';

const Header = styled.h2`
  font-family: 'Open Sans', sans-serif;
  font-size: 32px;
  font-weight: ${({theme}) => theme.weight.bold};
  margin: 0 0 10px 0;
  text-transform: uppercase;
  text-align: center;
  color: ${({theme}) => theme.colors.uiBlue};
`;

export default Header;