import styled from 'styled-components';

const MainContainer = styled.main`
  padding-top: 56px;
  width: 100%;
  min-height: 100vh;
  background-color: ${({theme}) => theme.colors.greenyBluey};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default MainContainer;