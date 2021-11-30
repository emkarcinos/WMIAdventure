import styled from 'styled-components';

function colorHandler(level, theme) {
    if (level === 1)
        return theme.colors.greenyBluey;
    else if (level === 2)
        return theme.colors.yellowyOrangy;
    else if (level === 3)
        return theme.colors.purplyPinky;
}

function visibleHandle(cardIndexInDeck, battleOnDesktop) {
    if (cardIndexInDeck && !battleOnDesktop) {
        if (cardIndexInDeck === 1)
            return 'flex';
        else return 'none';
    } else return 'flex';
}

const Div = styled.div`
  display: ${({cardIndexInDeck, battleOnDesktop}) => visibleHandle(cardIndexInDeck, battleOnDesktop)};
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: ${({setWidth}) => setWidth ? setWidth : '114px'};
  height: ${({setHeight}) => setHeight ? setHeight : '182px'};
  background-color: ${({theme}) => theme.colors.light2};
  border-radius: 18px 18px 8px 8px;
  position: relative;
  margin: ${({setMargin}) => setMargin ? setMargin : '0 0 60px 0'};
  padding-top: 18px;
  overflow-y: hidden;
  font-family: 'Roboto', sans-serif;
  box-shadow: ${({shadow}) => shadow ? '0 4px 4px rgba(0, 0, 0, 0.1)' : 'none'};
  transition: transform 0.5s, opacity 0.5s ease-in-out;
  opacity: ${({setOpacity}) => setOpacity ? setOpacity : '1'};
  transform: translate(${({setTranslateX}) => setTranslateX ? setTranslateX : '0'},
  ${({setTranslateY}) => setTranslateY ? setTranslateY : '0'}) scale(${({setScale}) => setScale ? setScale : '1'});
  order: ${({cardIndexInDeck, battleOnDesktop}) => (cardIndexInDeck && battleOnDesktop) ? cardIndexInDeck : '0'};
  border: 2px solid ${({hasBuff, level, theme}) => hasBuff ? colorHandler(level, theme) : 'none'};

  @media (min-width: ${({theme}) => theme.overMobile}px) {
    width: ${({setWidth}) => setWidth ? setWidth : '144px'};
    height: ${({setHeight}) => setHeight ? setHeight : '220px'};
    box-shadow: ${({shadow}) => shadow ? '0 4px 4px rgba(0, 0, 0, 0.1)' : 'none'};
    margin: ${({setMargin}) => setMargin ? setMargin : '0 0 60px 0'};
  }

  &:before {
    content: '';
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: ${({decorationHeight}) => decorationHeight ? decorationHeight : '20px'};
    border-top: ${({decorationHeight}) => decorationHeight ? decorationHeight : '22px'} solid ${({
                                                                                                   level, theme
                                                                                                 }) => colorHandler(level, theme)};
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }
`;

export default Div;