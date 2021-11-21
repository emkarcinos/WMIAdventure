import styled from 'styled-components';

const FullCardActionBackground = styled.div`
  display: ${({visible}) => visible ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100vh - 48px);
  transition: opacity 0.5s ease-in-out;
  opacity: ${({setOpacity}) => setOpacity ? setOpacity : '1'};
  background-color: ${({theme}) => theme.colors.transBack};
  overflow: hidden;
  z-index: 10;
`;

export default FullCardActionBackground;