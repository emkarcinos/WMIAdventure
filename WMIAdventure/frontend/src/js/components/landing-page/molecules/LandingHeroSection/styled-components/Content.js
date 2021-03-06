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
    top: 24%;
    left: 2%;
    width: auto;
  }

  @media (min-width: ${({theme}) => theme.overMobile}px) and (max-width: 1260px) {
    top: 20%;
    left: 4%;
  }
`;

export default Content;