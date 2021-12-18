import styled from 'styled-components';

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 56px;
  width: 100%;
  min-height: calc(100vh - 56px);
  padding: 16px;
  background-color: ${({theme}) => theme.colors.greenyBluey};
`;

export default Main;