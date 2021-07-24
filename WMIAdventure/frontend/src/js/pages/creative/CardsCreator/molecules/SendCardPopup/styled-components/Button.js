import styled from 'styled-components';

const Button = styled.button`
  display: flex;
  
  /* Flex options */
  justify-content: center;
  align-items: center;
  
  /* Other */
  padding: 16px 40px;
  @media (max-width: 768px){
    padding: 8px 24px;
  }
  text-align: center;
  
  /* Styling */
  border: 2px solid ${({theme}) => theme.colors.text01};
  border-radius: 12px;
  cursor: pointer;
  
  /* Font styling */
  font-family: 'Open Sans', sans-serif;
  font-size: 18px;
  font-weight: ${({theme}) =>  theme.weight.bold};
  color: ${({theme}) => theme.colors.text01};
`;

export default Button;