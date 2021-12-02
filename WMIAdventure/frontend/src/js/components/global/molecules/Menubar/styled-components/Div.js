import styled from "styled-components";

const Div = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  width: 254px;
  height: calc(100vh - 54px);
  background-color: ${({theme}) => theme.colors.dark};
  z-index: 10;
`;

export default Div;