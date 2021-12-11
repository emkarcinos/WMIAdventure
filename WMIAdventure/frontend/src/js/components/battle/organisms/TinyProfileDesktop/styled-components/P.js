import styled from "styled-components";

const P = styled.p`
  font-family: 'Roboto', sans-serif;
  font-size: 12px;
  text-align: center;
  line-height: 24px;
  width: 106px;
  margin-left: 50px;
  font-weight: ${({theme}) => theme.weight.light};
  color: ${({theme}) => theme.colors.darkGray};
`;

export default P;