import styled from 'styled-components';

const Div = styled.div`
  position: absolute;
  top: 48px;
  left: 0;
  width: 100%;
  height: calc(100vh - 48px);
  z-index: 2;
  background-color: ${({theme}) => theme.colors.light2};
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  transform: ${({hide}) => hide ? 'translateY(calc(100vh - (48px + 60px)))' : 'translateY(0)'};
  transition: transform 0.3s ease-in-out;
  overflow-y: scroll;

  @media (min-width: ${({theme}) => theme.overMobile}px) {
    display: none;
  }
`;

export default Div;