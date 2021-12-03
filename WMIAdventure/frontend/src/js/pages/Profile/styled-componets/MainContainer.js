import styled from 'styled-components';

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({theme}) => theme.colors.greenyBluey};
  padding: 0 26px;
`;

export default MainContainer;