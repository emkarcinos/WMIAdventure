import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  gap: ${({gap}) => gap ? gap : '0'};
  margin: ${({setMargin}) => setMargin ? setMargin : '0'}
`;

export default Container;