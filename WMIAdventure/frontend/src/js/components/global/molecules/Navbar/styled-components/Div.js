import styled from "styled-components";

const Div = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  font-family: 'Roboto', sans-serif;
  font-size: 18px;
  color: ${({theme}) => theme.colors.dark};

`;

export default Div;