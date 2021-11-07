import styled from 'styled-components';

const handleLevelColor = (number, theme) => {
    if (number < 10)
        return theme.colors.greenyBluey;
    else if ((number >= 10) && (number < 20))
        return theme.colors.yellowyOrangy;
    else if (number >= 20)
        return theme.colors.purplyPinky;
};

const handleHpColor = (number, theme) => {
    if (number < 25)
        return theme.colors.red;
    else if((number >= 25) && (number < 50))
        return theme.colors.yellowyOrangy;
    else if(number >= 50)
        return theme.colors.greenyBluey;
};

const handleShieldColor = (theme) => {
    return theme.colors.purplyPinky;
};

const handleColor = (number, theme, type) => {
    if(type === 'level')
        return handleLevelColor(number, theme);
    else if(type === 'hp')
        return handleHpColor(number, theme);
    else if(type === 'shield')
        return handleShieldColor(theme);
    else return handleLevelColor(number, theme);
};

const handleLevelTransform = (currentLvlValue) => {
    return `${currentLvlValue}%`;
};

const handleHpTransform = (number) => {
    return `${number}%`;
};

const handleShieldTransform = (number) => {
    return `${Number(number) * 5}%`;
};

const handleTransform = (number, type, currentLvlValue) => {
    if(type === 'level' && currentLvlValue)
        return handleLevelTransform(currentLvlValue);
    else if(type === 'hp')
        return handleHpTransform(number);
    else if(type === 'shield')
        return handleShieldTransform(number);
    else return '0';
};

const ValueDiv = styled.div`
  width: calc(100% - 28px);
  height: 100%;
  position: absolute;
  top: 0;
  left: calc(-100% + 56px);
  transition: transform 0.5s ease-in-out;
  transform: ${({statisticNumber, type, currentLvlValue}) => (statisticNumber && type) ? 
          `translateX(${handleTransform(statisticNumber, type, currentLvlValue)})` : `translateX(0)`};
  background-color: ${({statisticNumber, theme, type}) => handleColor(statisticNumber, theme, type)};
`;

export default ValueDiv;