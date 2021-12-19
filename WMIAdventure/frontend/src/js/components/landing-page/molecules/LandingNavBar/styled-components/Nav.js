import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 28px;
  width: 100%;
  height: 100%;
  transition: background-color 0.3s ease-in-out;
  background-color: ${({theme, showBackground}) => showBackground ? theme.colors.whiteAlmost : 'transparent'};

  @media (min-width: ${({theme}) => theme.overMobile}px) {
    background: ${({showBackground}) => showBackground ? 'rgba(253, 253, 253, 70%)' : 'transparent'};
  }
`;

export default Nav;