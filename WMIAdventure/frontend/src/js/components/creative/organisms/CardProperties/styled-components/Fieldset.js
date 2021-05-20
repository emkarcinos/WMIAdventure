import styled from 'styled-components';

const Fieldset = styled.fieldset`
  width: 100%;
  max-height: 490px;
  height: 100%;
  background-color: ${({theme}) => theme.colors.ui01};
  border-radius: 20px;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export default Fieldset;