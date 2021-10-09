import styled from 'styled-components';

const Header = styled.p`
  top: 52px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  font-weight: 600;
  z-index: 2;
  margin: 0 0 12px 0;
  font-size: 32px;

  @media(min-width: ${({theme}) => theme.overMobile}px) {
    position: absolute;
    font-size: 40px;
    margin: 0;
  }
`;

export default Header;