import styled from "styled-components";

const P = styled.p`
  color: ${({theme}) => theme.colors.dark};
  font-size: 13px;
  font-weight: ${({theme}) => theme.weight.regular};
  text-transform: uppercase;
  font-family: 'Roboto', sans-serif;
  margin: 14px 0 0;
`

export default P;