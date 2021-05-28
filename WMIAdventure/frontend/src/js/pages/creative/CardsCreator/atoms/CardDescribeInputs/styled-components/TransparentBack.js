import styled from 'styled-components';

const TransparentBack = styled.div`
  display: ${({show}) => show ? 'flex' : 'none'};
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({theme}) => theme.colors.transBack};
  z-index: 2;
`;

export default TransparentBack;