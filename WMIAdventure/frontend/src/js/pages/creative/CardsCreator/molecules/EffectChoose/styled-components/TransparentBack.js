import styled from 'styled-components';

const TransparentBack = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  
  display: ${({show}) => show ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  
  background-color: ${({theme}) => theme.colors.ui07}44;
  width: 100%;
  height: 100%;
  z-index: 3;
`;

export default TransparentBack;