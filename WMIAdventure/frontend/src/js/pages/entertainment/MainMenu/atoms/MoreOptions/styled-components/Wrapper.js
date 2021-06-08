import styled from 'styled-components';

const Wrapper = styled.div`
  display: ${({show}) => show ? 'block' : 'none'};
  position: absolute;
  left: 0;
  top: 48px;
  width: 100vw;
  height: calc(100vh - 48px);
  background-color: ${({theme}) => theme.colors.ui07trans};
  
  @media (min-width: 768px) {
    height: calc(100vh - 64px);
    top: 64px;
  }
`;

export default Wrapper;