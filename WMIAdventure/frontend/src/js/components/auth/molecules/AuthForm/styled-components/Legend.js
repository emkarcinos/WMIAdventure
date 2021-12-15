import styled from "styled-components";

const Legend = styled.legend`
  width: 100%;
  text-align: center;
  margin-bottom: 80px;
  font-size: 32px;
  font-family: 'Roboto', sans-serif;
  font-weight: ${({theme}) => theme.weight.bold};
  color: ${({theme}) => theme.colors.dark};
`;

export default Legend;