import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  top: 64px;
  left: 0;
  width: 100vw;
  height: calc(100vh - 64px);
  background-color: ${({theme}) => theme.colors.ui07trans};
`;

export default Wrapper;