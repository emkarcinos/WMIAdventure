import styled from 'styled-components';

const StyledWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 16px;
  flex-direction: column;
    
  label {
    padding-left: 8px;
  }
  
  div {
    display: flex;
    align-items: center;
    padding: 8px;
  }
  
  input {
    order: -1;
  }
`;

export default StyledWrapper;