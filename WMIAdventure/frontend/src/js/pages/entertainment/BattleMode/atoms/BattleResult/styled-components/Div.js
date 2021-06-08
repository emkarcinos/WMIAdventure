import styled from 'styled-components';

const Div = styled.div`
  position: absolute;
  top: 64px;
  left: 0;
  width: 100%;
  height: calc(100vh - 64px);
  background-color: ${({theme}) => theme.colors.ui01};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Div;