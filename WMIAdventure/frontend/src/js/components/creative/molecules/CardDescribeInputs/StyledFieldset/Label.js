import styled from 'styled-components';

const Label = styled.label`
  padding: ${({textarea}) => textarea ? '0 0 8px 0' : '0 8px 0 0'};
`;

export default Label;