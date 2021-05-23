import styled from 'styled-components';

const Input = styled.input`
  border: none;
  border-bottom: solid 2px #333333;
  background-color: #F2F2F2;
  width: 80%;
  height: 20px;
  font-size: 12px;
  
  :focus {
    outline: dotted 1px #333333;
  }
`;

export default Input;