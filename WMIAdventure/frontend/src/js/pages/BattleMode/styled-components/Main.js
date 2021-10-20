import styled from 'styled-components';

const Main = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
  background-color: ${({theme}) => theme.colors.uiGreen};
  height: 100vh;
  
  @media (min-width: ${({theme}) => theme.overMobile}px) {
    width: 80%;
    margin-top: 112px;
  }
`;

export default Main;