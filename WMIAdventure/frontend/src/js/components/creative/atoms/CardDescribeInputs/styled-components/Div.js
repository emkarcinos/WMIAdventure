import styled from 'styled-components';

const Div = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  margin-bottom: ${({last}) => last ? '0' : '12px'};
`;

export default Div;