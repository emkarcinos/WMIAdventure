import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  margin-right: calc(4px + 1%);
  
  @media (min-width: 1172px) {
    margin-right: 4%;
  }
`;

export default Container;