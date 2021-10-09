import styled from 'styled-components';

const DesktopContainer = styled.div`
  @media (min-width: ${({theme}) => theme.overMobile}px) {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default DesktopContainer;