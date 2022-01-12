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
  cursor: ${({access}) => access ? 'pointer' : 'default'};
  transition: transform 0.3s ease-in-out;
  z-index: ${({setZindex}) => setZindex ? setZindex : 'auto'};

  &:hover {
    transform: ${({access}) => access ? 'scale(1.05)' : 'none'};
  }

  @media (min-width: 360px) {
    height: 36px;
  }
`;

export default Button;