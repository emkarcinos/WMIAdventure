import styled from "styled-components";

const Line = styled.hr`
  border: none;
  height: 1px;
  background-color: ${({theme}) => theme.colors.dark};
  width: 100%;
`;

export default Line;