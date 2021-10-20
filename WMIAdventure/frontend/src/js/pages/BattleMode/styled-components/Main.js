import styled from 'styled-components';

const Main = styled.main`
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  grid-auto-columns: 1fr;
  padding: 0 12px;
  height: 100vh;
  background-color: ${({theme}) => theme.colors.uiGreen};
  overflow: hidden;
  position: relative;
`;

export default Main;