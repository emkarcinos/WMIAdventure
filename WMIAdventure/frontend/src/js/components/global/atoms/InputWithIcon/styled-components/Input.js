import styled from "styled-components";

const Input = styled.input`
  text-align: center;
  border-right: none;
  border-top: none;
  border-left: none;
  border-color: ${({theme}) => theme.colors.dark};
  border-width: 1px;
  width: ${({width}) => width ? width : '40px'};
  color: ${({theme}) => theme.colors.dark};
  font-family: 'Open Sans', sans-serif;
  font-size: 18px;
  font-weight: ${({theme}) => theme.weight.light};

  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export default Input;