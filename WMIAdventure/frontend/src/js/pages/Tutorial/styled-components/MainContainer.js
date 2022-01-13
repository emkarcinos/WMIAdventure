import styled from 'styled-components';

const MainContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 56px);
  margin-top: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.colors.whiteAlmost};
  position: relative;
`;

export default MainContainer;