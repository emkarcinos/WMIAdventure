import styled from 'styled-components';

const Button = styled.button`
  background-color: transparent;
  color: ${({theme}) => theme.colors.ui01};
  border: 2px solid ${({theme}) => theme.colors.ui01};
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 10px;
  padding: 12px;
  cursor: pointer;
`;

export default Button;