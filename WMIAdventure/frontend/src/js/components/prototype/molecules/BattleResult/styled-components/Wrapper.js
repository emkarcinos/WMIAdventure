import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  top: 48px;
  left: 0;
  width: 100%;
  min-height: calc(100vh - 48px);
  background-color: ${({theme}) => theme.colors.whiteAlmost};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px 0;

  @media (min-width: ${({theme}) => theme.overMobile}px) {
    min-height: calc(100vh - 64px);
    top: 64px;
  }
`;

export default Wrapper;