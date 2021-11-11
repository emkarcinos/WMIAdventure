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

const CardsContainer = styled.div`
  border-top-left-radius: ${({user}) => user ? '16px' : '0'};
  border-top-right-radius: ${({user}) => user ? '16px' : '0'};
  border-bottom-left-radius: ${({enemy}) => enemy ? '16px' : '0'};
  border-bottom-right-radius: ${({enemy}) => enemy ? '16px' : '0'};
  background-color: ${({level, theme}) => handleColor(level, theme)};
  width: 54px;
  height: 64px;
  display: ${({cardIndexInDeck}) => (cardIndexInDeck === 1) ? 'none' : 'flex'};
  flex-direction: column;
  justify-content: flex-end;
  order: ${({cardIndexInDeck}) => cardIndexInDeck};
  transition: transform ${({animationDuration}) => animationDuration ? animationDuration : '0.5'}s, opacity 0.5s ease-in-out;
  transform: translateX(${({setTranslateX}) => setTranslateX ? setTranslateX : '0'});
  opacity: ${({setOpacity}) => setOpacity ? setOpacity : '1'};
`;

export default CardsContainer;