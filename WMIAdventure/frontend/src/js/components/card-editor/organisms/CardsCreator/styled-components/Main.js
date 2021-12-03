import styled from 'styled-components';

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 56px;
  width: 100%;
  min-height: calc(100vh - 56px);
  padding: 20px 16px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  background-color: ${({theme}) => theme.colors.dark};
`;

export default Main;