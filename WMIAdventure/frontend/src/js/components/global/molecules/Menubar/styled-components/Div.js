import styled from "styled-components";

const Div = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  width: 254px;
  height: calc(100vh - calc(100vh - 100%));
  background-color: ${({theme}) => theme.colors.whiteAlmost};
  transform: ${({visible}) => visible ? 'translateX(0)' : 'translateX(254px)'};
  transition: transform 0.2s ease-in-out;
  z-index: 20;
`;

export default Div;