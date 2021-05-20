import styled from 'styled-components';

const TransparentBack = styled.div`
  display: ${({show}) => show ? 'flex' : 'none'};
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: -76px;
  left: -17px;
  max-width: 420px;
  max-height: 824px;
  width: 100vw;
  height: 100vh;
  border-radius: 20px;
  background-color: ${({theme}) => theme.colors.ui07}44;
`;

export default TransparentBack;