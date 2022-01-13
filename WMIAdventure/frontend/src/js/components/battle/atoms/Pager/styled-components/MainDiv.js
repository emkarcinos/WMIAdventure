import styled from 'styled-components';

const MainDiv = styled.div`

  /* Flex options */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 16px;

  margin: ${({setMargin}) => setMargin ? setMargin : '16px 0 76px 0'};
`

export default MainDiv;