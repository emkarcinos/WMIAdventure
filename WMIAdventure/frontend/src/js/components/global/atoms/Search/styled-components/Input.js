import styled from 'styled-components';

const Input = styled.input`
  background-color: transparent;
  border: none;
  width: 100%;
  margin: 2px 0 0 32px;
  ::placeholder {
    color: ${({theme}) => theme.colors.lightGray};
    font-size: 14px;
  }
`;

export default Input;