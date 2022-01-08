import styled from 'styled-components';

const Div = styled.div`
  display: ${({visible}) => visible ? 'flex' : 'none'};
  opacity: ${({setOpacity}) => setOpacity ? setOpacity : '1'};
  transform: translate(${({setTranslateX}) => setTranslateX ? setTranslateX : '0'},
  ${({setTranslateY}) => setTranslateY ? setTranslateY : '0'});
  flex-direction: column;
  align-items: center;
  position: ${({setPosition}) => setPosition ? setPosition : 'absolute'};
  top: ${({setTop}) => setTop ? setTop : '56px'};
  left: 0;
  width: ${({setWidth}) => setWidth ? setWidth : '100%'};
  height: ${({setHeight}) => setHeight ? setHeight : 'calc(100vh - 48px)'};
  max-width: ${({setMaxWidth}) => setMaxWidth ? setMaxWidth : 'none'};
  max-height: ${({setMaxHeight}) => setMaxHeight ? setMaxHeight : 'none'};
  background-color: ${({theme}) => theme.colors.whiteAlmost};
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
  z-index: 5;
  overflow-x: hidden;
  overflow-y: scroll;

  @media (min-width: ${({theme}) => theme.overMobile}px) {
    position: static;
    border-radius: 20px;
    width: ${({setWidth}) => setWidth ? setWidth : '924px'};
    height: ${({setHeight}) => setHeight ? setHeight : '454px'};
    max-width: ${({setMaxWidth}) => setMaxWidth ? setMaxWidth : 'auto'};
    max-height: ${({setMaxHeight}) => setMaxHeight ? setMaxHeight : '100%'};
    justify-content: ${({setAlignment}) => setAlignment ? setAlignment : 'center'};
    -ms-overflow-style: none; /* IE 10+ */
    scrollbar-width: none;
    ::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
  }
`;

export default Div;