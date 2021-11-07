import styled from 'styled-components';

function handleColor(level, theme) {
    if(level === 1)
        return theme.colors.greenyBluey;
    else if(level === 2)
        return theme.colors.yellowyOrangy;
    else if(level === 3)
        return  theme.colors.purplyPinky;
    else return theme.colors.greenyBluey;
}

const LevelBorder = styled.div`
  border-top-left-radius: ${({user}) => user ? '16px' : '0'};
  border-top-right-radius: ${({user}) => user ? '16px' : '0'};
  border-bottom-left-radius: ${({enemy}) => enemy ? '16px' : '0'};
  border-bottom-right-radius: ${({enemy}) => enemy ? '16px' : '0'};
  background-color: ${({level, theme}) => handleColor(level, theme)};
  width: 54px;
  height: 10px;
`;

export default LevelBorder;