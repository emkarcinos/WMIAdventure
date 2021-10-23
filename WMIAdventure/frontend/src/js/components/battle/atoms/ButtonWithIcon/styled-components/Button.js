import styled from 'styled-components';

const Button = styled.button`
  margin: ${({setMargin}) => setMargin};
  padding: 0;
  border-radius: 6px;
  border: none;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  background-color: ${({theme}) => theme.colors.light2};
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: 360px) {
    height: 36px;
  }
`;

export default Button;