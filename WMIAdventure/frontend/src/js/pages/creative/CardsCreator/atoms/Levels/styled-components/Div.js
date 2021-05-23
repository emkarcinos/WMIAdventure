import styled from 'styled-components';

const Div = styled.div`
  position: relative;
  height: 100%;
  padding: ${({active}) => active ? '4px 24px 4px 4px' : '0'};
  margin: ${({exist}) => exist ? '0 0 0 12px' : '0'};
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

export default Div;