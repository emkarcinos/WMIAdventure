import styled from 'styled-components';

function handleBorder(type, theme) {
  if(type === 'heal')
    return theme.colors.greenyBluey;
  else if(type === 'shield')
    return theme.colors.purplyPinky;
  else if(type === 'damage')
    return theme.colors.red;
  else return theme.colors.yellowyOrangy;
}

const Container = styled.div`
  display: ${({visible}) => visible ? 'flex' : 'none'};
  border: 1px solid ${({type, theme}) => handleBorder(type, theme)};
  border-radius: 124px;
  justify-content: center;
  align-items: center;
  position: absolute;
  padding: 4px 10px;
  top: 50%;
  left: 50%;
  transition: transform 0.3s, opacity 0.2s ease-in-out;
  transform: translate(${({setTranslateX}) => setTranslateX ? setTranslateX : '0'}, 
  ${({setTranslateY}) => setTranslateY ? setTranslateY : '0'}) scale(${({setScale}) => setScale ? setScale : '1'});
`;

export default Container;