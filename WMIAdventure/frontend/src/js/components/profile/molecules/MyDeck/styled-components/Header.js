import styled from 'styled-components';

const Header = styled.h2`
  font-family: 'Roboto', sans-serif;
  font-size: 24px;
  font-weight: ${({theme}) => theme.weight.medium};
  text-transform: uppercase;
  margin: 0;
`;

export default Header;