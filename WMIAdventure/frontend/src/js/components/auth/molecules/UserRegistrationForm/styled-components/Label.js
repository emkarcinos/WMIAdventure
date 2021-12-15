import styled from "styled-components";

const Label = styled.label`
  color: ${({theme}) => theme.colors.dark};
  font-size: 18px;
  margin-bottom: 8px;
  font-family: 'Open Sans', sans-serif;
  font-weight: ${({theme}) => theme.weight.light};
`;

export default Label;