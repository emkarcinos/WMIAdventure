import styled from 'styled-components';

const Button = styled.button`
  padding: 12px 10px;
  margin: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: transparent;
  border: none;
  transition: background-color 0.4s ease-in-out;
  cursor: pointer;
  
  :hover {
    background-color: ${({theme}) => theme.colors.grey2};
  }
`;

export default Button;