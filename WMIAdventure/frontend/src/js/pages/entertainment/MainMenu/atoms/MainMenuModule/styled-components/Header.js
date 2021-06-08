import styled from 'styled-components';

const Header = styled.p`
  top: 52px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  font-weight: 600;
  z-index: 2;
  margin: 12px 0 12px 0;
  font-size: 32px;

  @media(min-width: 768px) {
    position: absolute;
    margin: 0;
    font-size: 40px;
  }
`;

export default Header;