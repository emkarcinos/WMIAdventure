import styled from 'styled-components';

function handleColor(number, theme) {
    if (number < 10)
        return theme.colors.greenyBluey;
    else if ((number >= 10 && number < 20))
        return theme.colors.yellowyOrangy;
    else if (number >= 20)
        return theme.colors.purplyPinky;
}

const ValueDiv = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: calc(-100% + 28px);
  transition: transform 0.5s ease-in-out;
  transform: ${({setTransform}) => setTransform ? `translateX(${setTransform})` : `translateX(0)`};
  background-color: ${({levelNumber, theme}) => handleColor(levelNumber, theme)};
`;

export default ValueDiv;