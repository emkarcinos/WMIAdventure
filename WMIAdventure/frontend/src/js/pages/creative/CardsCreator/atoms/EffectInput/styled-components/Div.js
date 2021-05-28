import styled from 'styled-components';

const Div = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({marginBottom}) => marginBottom ? '16px' : 0};
`;

export default Div;