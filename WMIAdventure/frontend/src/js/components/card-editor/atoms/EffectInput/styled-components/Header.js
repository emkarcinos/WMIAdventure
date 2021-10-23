import styled from 'styled-components';

const Header = styled.p`
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 16px 0;
  max-width: 90%;
  color: ${({theme}) => theme.colors.borderLine};
`;

export default Header;