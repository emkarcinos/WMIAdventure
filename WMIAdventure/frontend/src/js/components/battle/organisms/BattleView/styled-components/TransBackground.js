import styled from 'styled-components';

const TransBackground = styled.div`
  display: ${({visible}) => visible ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: ${({theme}) => theme.colors.transBack};
`;

export default TransBackground;