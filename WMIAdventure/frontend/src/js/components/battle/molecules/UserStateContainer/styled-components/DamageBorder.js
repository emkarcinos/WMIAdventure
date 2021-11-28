import styled from 'styled-components';

const DamageBorder = styled.div`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({theme}) => theme.colors.red};
  transition: opacity 0.3s ease-in-out;
  opacity: ${({setOpacity}) => setOpacity ? setOpacity : '0'};
  z-index: -1;
  border-bottom-right-radius: 16px;
  border-bottom-left-radius: 16px;

  @media (min-width: ${({theme}) => theme.overMobile}px) {
    border-radius: 16px 16px 0 0;
  }
`;

export default DamageBorder;