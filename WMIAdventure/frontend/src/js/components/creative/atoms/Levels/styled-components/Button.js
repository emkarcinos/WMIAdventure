import styled from 'styled-components';

const Button = styled.button`
  display: ${({show}) => show ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  
  padding: 4px;
  margin: 0 12px 0 0;
  border: none;
  outline: none;
  font-size: 12px;
  font-weight: 700;
  width: 90px;
  height: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

export default Button;