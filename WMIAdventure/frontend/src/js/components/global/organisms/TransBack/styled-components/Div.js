import styled from 'styled-components';

const Div = styled.div`
  display: ${({visible}) => visible ? 'flex' : 'none'};
  opacity: ${({setOpacity}) => setOpacity ? setOpacity : '0'};
  transition: opacity 0.3s ease-in-out;
  justify-content: center;
  align-items: center;
  top: ${({fullscreen}) => fullscreen ? '0' : '56px'};
  position: fixed;
  left: 0;
  height: ${({fullscreen}) => fullscreen ? '100vh' : 'calc(100vh - 56px)'};
  width: 100%;
  z-index: ${({customZIndex}) => customZIndex ? customZIndex : 'auto'};
  background-color: ${({theme}) => theme.colors.darkTrans};
  overflow: hidden;
`;

export default Div;