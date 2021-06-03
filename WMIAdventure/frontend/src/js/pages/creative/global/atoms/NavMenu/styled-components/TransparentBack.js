import styled from 'styled-components';

const TransparentBack = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  display: ${({show}) => show ? 'flex' : 'none'};
  flex-direction: column;
  justify-content: start;
  align-items: center;

  background-color: ${({theme}) => theme.colors.transBack};
  width: 100%;
  height: 100%;
  z-index: 3;
`;

export default TransparentBack;