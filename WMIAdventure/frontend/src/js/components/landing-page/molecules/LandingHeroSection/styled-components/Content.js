import styled from 'styled-components';

const Content = styled.div`
  z-index: 2;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (min-width: ${({theme}) => theme.overMobile}px) {
    top: 176px;
    left: 60px;
    width: auto;
  }
`;

export default Content;