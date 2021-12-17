import styled from 'styled-components';

const MainContainer = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;

  @media (min-width: ${({theme}) => theme.overMobile}px) {
    margin-top: 56px;
    flex-direction: row;
    min-height: auto;
    max-width: 1390px;
    height: 842px;
    border-radius: 40px;
    background-color: ${({theme}) => theme.colors.whiteAlmost};
  }
`;

export default MainContainer;