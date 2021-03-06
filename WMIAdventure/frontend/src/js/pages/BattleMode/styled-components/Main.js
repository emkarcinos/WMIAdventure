import styled from 'styled-components';

const Main = styled.main`
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  grid-auto-columns: 1fr;
  padding: 0 12px;
  height: 100vh;
  background-color: ${({theme}) => theme.colors.greenyBluey};
  overflow: hidden;
  position: relative;

  @media (min-width: ${({theme}) => theme.overMobile}px) {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    padding: 132px 16px 268px;
  }
`;

export default Main;