import styled from 'styled-components';

const Header = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 24px;
  margin: 0 0 26px 0;
  font-weight: ${({theme}) => theme.weight.semibold};
  color: ${({theme}) => theme.colors.dark};
  text-transform: uppercase;
`;

export default Header;