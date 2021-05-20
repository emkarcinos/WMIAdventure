import styled from 'styled-components';

const TransparentBack = styled.div`
  display: ${({show}) => show ? 'block' : 'none'};
  position: absolute;
  top: -76px;
  left: -18px;
  max-width: 411px;
  max-height: 824px;
  width: 100vw;
  height: 100vh;
  border-radius: 20px;
  background-color: ${({theme}) => theme.colors.ui07}44;
`;

export default TransparentBack;