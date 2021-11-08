import styled from 'styled-components';

function colorHandler(level, theme) {
    if (level === 1)
        return theme.colors.greenyBluey;
    else if (level === 2)
        return theme.colors.yellowyOrangy;
    else if (level === 3)
        return theme.colors.purplyPinky;
}

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: ${({setWidth}) => setWidth ? setWidth : '114px'};
  height: ${({setHeight}) => setHeight ? setHeight : '182px'};
  background-color: ${({theme}) => theme.colors.light2};
  border-radius: 8px;
  position: relative;
  margin: ${({setMargin}) => setMargin ? setMargin : '0 0 60px 0'};
  padding-top: 18px;
  overflow-y: hidden;
  font-family: 'Roboto', sans-serif;
  box-shadow: ${({shadow}) => shadow ? '0 4px 4px rgba(0, 0, 0, 0.1)' : 'nome'};
  
  transition: transform 0.5s ease-in-out;
  transform: translateX(${({setTranslateX}) => setTranslateX ? setTranslateX : '0'});

  @media (min-width: ${({theme}) => theme.overMobile}px) {
    width: ${({setWidth}) => setWidth ? setWidth : '144px'};
    height: ${({setHeight}) => setHeight ? setHeight : '220px'};
    box-shadow: ${({shadow}) => shadow ? '0 4px 4px rgba(0, 0, 0, 0.1)' : 'nome'};
    margin: ${({setMargin}) => setMargin ? setMargin : '0 0 60px 0'};
  }

  &:before {
    content: '';
    display: block;
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