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
  display: flex;
  border: 1px solid ${({type, theme}) => handleBorder(type, theme)};
  border-radius: 124px;
  justify-content: center;
  align-items: center;
  padding: 4px 10px;
  background-color: ${({theme}) => theme.colors.light2};
  transition: transform 0.5s;
  transform: scale(${({setScale}) => setScale ? setScale : '1'});
`;

export default Container;