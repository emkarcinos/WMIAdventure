import styled from 'styled-components';

const MainDesktopContainer = styled.div`
  display: flex;
  width: 100%;
  padding-top: 56px;
  height: 100vh;
  background-color: ${({theme}) => theme.colors.greenyBluey};
`;

export default MainDesktopContainer;