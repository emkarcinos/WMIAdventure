import styled from 'styled-components';

const Div = styled.div`
  position: absolute;
  top: 48px;
  left: 0;
  width: 100%;
  height: calc(100vh - 48px);
  background-color: ${({theme}) => theme.colors.ui01};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  @media(min-width: 768px) {
    height: calc(100vh - 64px);
    top: 64px;
  }
`;

export default Div;