import styled from 'styled-components';

const MainContainer = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  padding-top: 64px;

  @media (min-width: ${({theme}) => theme.overMobile}px) {
    padding-top: 0;
    margin-top: 56px;
    flex-direction: row;
    min-height: auto;
    max-width: 1390px;
    height: 842px;
    border-radius: 40px;
    background-color: ${({theme}) => theme.colors.whiteAlmost};
  }

  @media (min-width: ${({theme}) => theme.overMobile}px) and (max-width: 1312px) {
    padding-top: 0;
    height: 680px;
  }
`;

export default MainContainer;