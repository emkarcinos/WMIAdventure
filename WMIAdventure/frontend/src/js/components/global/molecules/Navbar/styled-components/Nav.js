import styled from "styled-components";

const Nav = styled.nav`
  height: 56px;
  width: 100vw;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 28px;
  z-index: 13;
  background-color: ${({theme}) => theme.colors.whiteAlmost}
`;

export default Nav;