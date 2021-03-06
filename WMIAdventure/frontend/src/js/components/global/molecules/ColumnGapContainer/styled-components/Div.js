import styled from 'styled-components';

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${({gap}) => gap ? gap : '0'};
  margin: ${({setMargin}) => setMargin ? setMargin : '0'};
  width: ${({setWidth}) => setWidth ? setWidth : 'auto'};
  height: ${({setHeight}) => setHeight ? setHeight : 'auto'};
  position: ${({setRelative}) => setRelative ? 'relative' : 'static'};
  padding: ${({setPadding}) => setPadding ? setPadding : '0'};
`;

export default Div;