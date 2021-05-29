import styled from 'styled-components';

const Div = styled.div`
  display: ${({show}) => show ? 'flex' : 'none'};
  justify-content: space-between;
  margin-bottom: ${({marginBottom}) => marginBottom ? '16px' : 0};
`;

export default Div;