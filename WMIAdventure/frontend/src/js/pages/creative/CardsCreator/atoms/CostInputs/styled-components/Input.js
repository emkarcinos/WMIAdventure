import styled from 'styled-components';

const Input = styled.input`
  width: 48px;
  height: 24px;
  border: none;
  border-bottom: 1px solid ${({theme}) => theme.colors.grey2};
  text-align: end;
  padding-right: 6px;
  font-size: 16px;
  font-weight: 700;
  position: relative;

  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export default Input;