import styled from 'styled-components';

const Input = styled.input`
  background-color: transparent;
  border: none;
  color: ${({theme}) => theme.colors.dark};
  font-family: 'Open Sans', sans-serif;
  font-weight: ${({theme}) => theme.weight.regular};
  font-size: 16px;
  line-height: 24px;
  width: calc(100% - 24px);
  margin: 4px 0 0 0;
`;

export default Input;