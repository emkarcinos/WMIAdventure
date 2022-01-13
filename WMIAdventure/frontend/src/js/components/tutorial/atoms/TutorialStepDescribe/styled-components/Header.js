import styled from 'styled-components';

const Header = styled.h2`
  font-family: 'Open Sans', sans-serif;
  font-size: 24px;
  font-weight: ${({theme}) => theme.weight.semibold};
  color: ${({theme}) => theme.colors.dark};
  margin: 0;
`;

export default Header;