import styled from 'styled-components';

const Div = styled.div`
  display: ${({visible}) => visible ? 'flex' : 'none'};
  opacity: ${({setOpacity}) => setOpacity ? setOpacity : '1'};
  transform: translateY(${({setTranslateY}) => setTranslateY ? setTranslateY : '0'});
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 48px;
  left: 0;
  height: calc(100vh - 48px);
  width: 100%;
  background-color: ${({theme}) => theme.colors.ui01};
  transition: opacity 0.5s ease-in-out, transform  0.5s ease-in-out;
`;

export default Div;