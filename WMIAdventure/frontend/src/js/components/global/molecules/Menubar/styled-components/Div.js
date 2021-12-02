import styled from "styled-components";

const Div = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  width: 254px;
  height: calc(100vh - 54px);
  background-color: ${({theme}) => theme.colors.light2};
  transform: ${({visible}) => visible ? 'translateX(0)' : 'translateX(254px)'};
  transition: transform 0.2s ease-in-out;
  z-index: 10;
`;

export default Div;