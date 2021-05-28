import styled from 'styled-components';

function dotColor(rank, theme) {
    if(rank === 1)
        return theme.colors.common;
    if(rank === 2)
        return theme.colors.gold;
    if(rank === 3)
        return theme.colors.epic;
}

const Button = styled.button`
  font-size: 18px;
  font-weight: 300;
  padding: 0;
  border: none;
  cursor: pointer;
  background: transparent;
  position: relative;
  width: 100%;
  text-align: center;
  
  :before {
    content: '';
    display: block;
    width: 12px;
    height: 12px;
    position: absolute;
    top: 4px;
    left: 30%;
    border-radius: 50%;
    background-color: ${({rank, theme}) => dotColor(rank, theme)};
  }
`;

export default Button;