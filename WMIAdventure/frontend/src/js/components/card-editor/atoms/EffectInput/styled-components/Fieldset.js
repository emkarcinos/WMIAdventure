import styled from 'styled-components';

const Fieldset = styled.fieldset`
  border: none;
  background-color: ${({theme}) => theme.colors.whiteAlmost};
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 10px;
  position: relative;
`

export default Fieldset;
