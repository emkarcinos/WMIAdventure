import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: ${({reverse}) => reverse ? 'row-reverse' : 'row'};
  justify-content: ${({space}) => space ? 'space-between' : 'center'};
  gap: ${({gap}) => gap ? gap : '0'};
  margin: ${({setMargin}) => setMargin ? setMargin : '0'};
  width: ${({setWidth}) => setWidth ? setWidth : 'auto'};
  height: ${({setHeight}) => setHeight ? setHeight : 'auto'};
`;

export default Container;