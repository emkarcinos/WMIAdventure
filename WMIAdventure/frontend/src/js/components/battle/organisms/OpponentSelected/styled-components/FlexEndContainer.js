import styled from 'styled-components';

const FlexEndContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: ${({gap}) => gap ? gap : '0'};
  width: 100%;
  height: 100%;
`;

export default FlexEndContainer;