import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: ${({last}) => last ? '0' : '8px'};
`;

export default Container;