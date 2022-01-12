import styled from 'styled-components';

const MainDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: ${({setMargin}) => setMargin ? setMargin : '0 0 16px 0'};
  overflow: hidden;
`;

export default MainDiv;