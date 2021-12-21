import styled from "styled-components";

const Container = styled.div`
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.1));
  position: fixed;;
  display: flex;
  width: 349px;
  top: 50%;
  transform: translate(0, -50%);
  transition: transform 0.5s ease-in-out;
  height: 70vh;
  background-color: ${({theme}) => theme.colors.whiteAlmost};
  border-radius: 20px;
  z-index: 5;
`;

export default Container;