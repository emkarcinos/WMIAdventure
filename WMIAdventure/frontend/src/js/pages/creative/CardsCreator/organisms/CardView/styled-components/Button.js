import styled from 'styled-components';

const Button = styled.button`
  width: calc(100% / 3);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: ${({theme}) => theme.weight.bold};
  padding: 0;
  margin: 0;
  border: none;
  
  
`;

export default Button;