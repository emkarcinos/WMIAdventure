import styled from 'styled-components';

function backColorHandle(theme, type) {
    switch (type) {
        case 'damage':
            return theme.colors.red;
        case 'true-damage':
            return theme.colors.red;
        case 'heal':
            return theme.colors.greenyBluey;
        case 'shield':
            return theme.colors.purplyPinky;
    }
}

const EffectFrame = styled.div`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({theme, type}) => backColorHandle(theme, type)};
  transition: opacity 0.5s ease-in-out;
  opacity: ${({setOpacity}) => setOpacity ? setOpacity : '0'};
  z-index: -1;
  border-top-right-radius: 16px;
  border-top-left-radius: 16px;

  @media (min-width: ${({theme}) => theme.overMobile}px) {
    border-radius: 0 0 16px 16px;
  }
`;

export default EffectFrame;