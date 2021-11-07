import styled from 'styled-components';

function handleColor(rank, theme) {
    if(rank === 1)
        return theme.colors.greenyBluey;
    else if(rank === 2)
        return theme.colors.yellowyOrangy;
    else if(rank === 3)
        return  theme.colors.purplyPinky;
    else return theme.colors.greenyBluey;
}

const LevelBorder = styled.div`
  border-top-left-radius: ${({user}) => user ? '16px' : '0'};
  border-top-right-radius: ${({user}) => user ? '16px' : '0'};
  border-bottom-left-radius: ${({enemy}) => enemy ? '16px' : '0'};
  border-bottom-right-radius: ${({enemy}) => enemy ? '16px' : '0'};
  background-color: ${({rank, theme}) => handleColor(rank, theme)};
  width: 54px;
  height: 10px;
`;

export default LevelBorder;