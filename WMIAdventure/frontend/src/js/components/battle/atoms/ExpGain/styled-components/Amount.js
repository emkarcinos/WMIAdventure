import styled from "styled-components";

const Amount = styled.p`
  font-size: 18px;
  font-family: 'Roboto', sans-serif;
  font-weight: ${({theme}) => theme.weight.medium};
  color: ${({theme}) => theme.colors.greenyBluey};
`;

export default Amount;