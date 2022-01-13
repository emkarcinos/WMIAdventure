import styled from 'styled-components';

const TransparentBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  background-color: ${({theme}) => theme.colors.darkTrans};
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100vh - 56px);
  transition: opacity 0.3s ease-in-out;
  opacity: ${({setOpacity}) => setOpacity ? setOpacity : '0'};

  @media (min-width: ${({theme}) => theme.overMobile}px) {
    height: 100%;
  }
`;

export default TransparentBackground;