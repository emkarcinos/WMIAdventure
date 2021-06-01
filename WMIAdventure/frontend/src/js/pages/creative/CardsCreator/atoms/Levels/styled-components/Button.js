import styled from 'styled-components';

const Button = styled.button`
  display: ${({show}) => show ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  
  cursor: pointer;
  height: 100%;
  padding: 0;
  margin: 2px 0 0 0;
  border: none;
  outline: none;
  font-size: 12px;
  font-weight: 700;
  background-color: transparent;
  color: inherit;
`;

export default Button;