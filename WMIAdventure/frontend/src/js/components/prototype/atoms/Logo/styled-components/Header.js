import styled from 'styled-components';

const Header = styled.h1`
  font-size: 12px;
  font-weight: 600;
  margin: 8px;
  
  @media (min-width: ${({theme}) => theme.overMobile}px) {
    font-size: 24px;
    font-weight: 600;
    margin-left: 16px;
  }
`;

export default Header;