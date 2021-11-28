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
  border-top-right-radius: 16px;
  border-top-left-radius: 16px;
`;

export default DamageBorder;