import styled from 'styled-components';

const Div = styled.div`
  display: ${({visible}) => visible ? 'flex' : 'none'};
  opacity: ${({setOpacity}) => setOpacity ? setOpacity : '1'};
  transition: opacity 0.3s ease-in-out;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 48px;
  left: 0;
  height: calc(100vh - 48px);
  width: 100%;
  background-color: ${({theme}) => theme.colors.ui07trans};
`;

export default Div;