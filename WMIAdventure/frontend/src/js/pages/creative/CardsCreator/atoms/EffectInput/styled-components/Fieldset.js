import styled from 'styled-components';

const Fieldset = styled.fieldset`
  border: none;
  background-color: ${({theme}) => theme.colors.ui01};
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 10px;
`

export default Fieldset;
