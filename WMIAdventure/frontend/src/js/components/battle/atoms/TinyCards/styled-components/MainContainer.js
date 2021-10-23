import styled from 'styled-components';

const MainContainer = styled.div`
  margin: ${({setMargin}) => setMargin};
  display: flex;
  gap: ${({gap}) => gap ? gap : '10px'};
`;

export default MainContainer;