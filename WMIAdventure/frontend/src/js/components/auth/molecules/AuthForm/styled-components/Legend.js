import styled from "styled-components";

const Legend = styled.h2`
  width: 100%;
  text-align: center;
  font-size: 32px;
  font-family: 'Roboto', sans-serif;
  font-weight: ${({theme}) => theme.weight.bold};
  color: ${({theme}) => theme.colors.dark};
  margin: 0 0 70px 0;
`;

export default Legend;