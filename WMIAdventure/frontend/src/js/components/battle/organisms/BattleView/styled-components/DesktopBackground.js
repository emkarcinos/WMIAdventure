import styled from 'styled-components';

const DesktopBackground = styled.div`
  display: ${({visible}) => visible ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 56px;
  left: 0;
  width: 100%;
  height: calc(100vh - 56px);
  background-color: ${({theme}) => theme.colors.greenyBluey};
  transition: transform 0.5s ease-in-out;
  transform: scale(${({setScale}) => setScale ? setScale : '1'});
  overflow: hidden;
`;

export default DesktopBackground;