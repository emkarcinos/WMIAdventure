import styled from 'styled-components';

const StyledWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 16px;
    
  label {
    padding-left: 8px;
  }
  
  input {
    order: -1;
  }
`;

export default StyledWrapper;