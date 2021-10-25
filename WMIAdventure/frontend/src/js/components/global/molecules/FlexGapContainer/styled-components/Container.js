import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({gap}) => gap ? gap : '0'};
  margin: ${({setMargin}) => setMargin ? setMargin : '0'};
  width: ${({setWidth}) => setWidth ? setWidth : 'auto'};
  height: ${({setHeight}) => setHeight ? setHeight : 'auto'};
`;

export default Container;