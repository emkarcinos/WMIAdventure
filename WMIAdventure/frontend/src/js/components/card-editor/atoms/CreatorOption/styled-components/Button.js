import styled from 'styled-components';

const Button = styled.button`
  color: ${({theme}) => theme.colors.whiteAlmost};
  font-size: 18px;
  filter: drop-shadow(0 4px 4px rgba(0, 0, 0, 0.25));
  width: 100%;
  background-color: transparent;
  border: 2px solid ${({theme}) => theme.colors.whiteAlmost};
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0 10px 0;
  padding: 12px;
  cursor: pointer;
  text-decoration: none;
  max-width: 380px;
  
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
  
  @media (min-width: ${({theme}) => theme.overMobile}px) {
    padding: 14px;
  }
`;

export default Button;