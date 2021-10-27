import styled from 'styled-components';

const MainContainer = styled.div`
  margin: ${({setMargin}) => setMargin ? setMargin : '0'};
  display: flex;
  gap: ${({gap}) => gap ? gap : '10px'};
`;

export default MainContainer;