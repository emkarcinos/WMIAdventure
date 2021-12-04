import styled from 'styled-components';

const Button = styled.button`
  margin: ${({setMargin}) => setMargin};
  padding: 0;
  border-radius: 6px;
  border: none;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  background-color: ${({theme}) => theme.colors.light2};
  width: ${({setWidth}) => setWidth ? setWidth : 'auto'};
  height: 32px;
  display: flex;
  align-items: center;
  cursor: pointer;
  z-index: 500;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }

  @media (min-width: 360px) {
    height: 36px;
  }
`;

export default Button;