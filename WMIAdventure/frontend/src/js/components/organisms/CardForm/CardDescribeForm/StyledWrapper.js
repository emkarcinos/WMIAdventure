import styled from 'styled-components';

const StyledWrapper = styled.fieldset`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 0;
    padding: 16px;
    font-size: 16px;
  
    legend {
      font-size: 24px;
      font-weight: 600;
    }
  
    p {
      width: 280px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin: 0 0 32px 0;
    }
  
    label {
      padding-right: 8px;
    }
  
    textarea {
      width: 280px;
      height: 320px;
      padding: 8px;
      resize: none;
    }
`;

export default StyledWrapper;