import styled from 'styled-components';

const TransparentBack = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({theme}) => theme.colors.transBack};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  opacity: ${({setOpacity}) => setOpacity ? setOpacity : '0'};
  transition: opacity 0.3s ease-in-out;
  overflow-y: hidden;
`;

export default TransparentBack;