import styled from 'styled-components';

const TransparentBack = styled.div`
  position: fixed;
  top: 56px;
  left: 0;
  width: 100%;
  height: calc(100vh - 56px);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease-in-out;
  opacity: ${({setOpacity}) => setOpacity ? setOpacity : '1'};
  z-index: 100;
  background-color: ${({theme}) => theme.colors.darkTrans};
`;

export default TransparentBack;