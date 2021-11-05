import styled from 'styled-components';

function dotColor(rank, theme) {
    if (rank === 1)
        return theme.colors.greenyBluey;
    if (rank === 2)
        return theme.colors.yellowyOrangy;
    if (rank === 3)
        return theme.colors.purplyPinky;
}

const Button = styled.button`
  font-size: 18px;
  font-weight: 300;
  padding: 0;
  border: none;
  cursor: ${
          ({disabled}) => disabled ? "initial" : "pointer"
  };
  background-color: ${
          ({theme, disabled}) => disabled ? theme.colors.lightGray : "transparent"
  };
  color: ${
          ({theme, disabled}) => disabled ? theme.colors.dark : "initial"
  };
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;

  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: ${
            ({theme, disabled}) => disabled ? theme.colors.lightGray : theme.colors.lightGray
    };
  }


  :before {
    content: '';
    display: block;
    width: 12px;
    height: 12px;
    position: absolute;
    top: 14px;
    left: 30%;
    border-radius: 50%;
    background-color: ${({rank, theme, disabled}) => disabled ? theme.colors.darkTrans : dotColor(rank, theme)};
  }
`;

export default Button;