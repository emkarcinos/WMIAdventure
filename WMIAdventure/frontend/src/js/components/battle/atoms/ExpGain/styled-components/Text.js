import styled from "styled-components";

const Text = styled.p`
  font-size: 18px;
  font-family: 'Roboto', sans-serif;
  font-weight: ${({theme}) => theme.weight.regular};
  color: ${({theme}) => theme.colors.dark};
`;

export default Text;