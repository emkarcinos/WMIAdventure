import styled from 'styled-components';

const MainMobileContainer = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  min-height: 100vh;
  background-color: ${({theme}) => theme.colors.greenyBluey};
  padding: 92px 26px 26px;
`;

export default MainMobileContainer;